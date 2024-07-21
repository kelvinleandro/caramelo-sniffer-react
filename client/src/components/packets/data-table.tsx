"use client";

import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Packet } from "@/types/packets";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick: (packet: Packet) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    filterFns: {
      transport_protocol: (row, columnId, filterValue) => {
        // Ensure filterValue is an array
        if (!Array.isArray(filterValue)) {
          return true;
        }
        // Check if the row's transport_protocol is included in the filterValue array
        return filterValue.includes(row.getValue(columnId));
      },
    },
  });

  const transportProtocolValues = Array.from(
    new Set(data.map((item: any) => item.transport_protocol))
  );

  const handleCheckboxChange = (value: string) => {
    setColumnFilters((prevFilters) => {
      const existingFilter = prevFilters.find(
        (filter) => filter.id === "transport_protocol"
      );

      if (existingFilter) {
        const values = existingFilter.value as string[];
        if (values.includes(value)) {
          return values.length === 1
            ? prevFilters.filter((filter) => filter.id !== "transport_protocol")
            : prevFilters.map((filter) =>
                filter.id === "transport_protocol"
                  ? {
                      ...filter,
                      value: values.filter((v: string) => v !== value),
                    }
                  : filter
              );
        } else {
          return prevFilters.map((filter) =>
            filter.id === "transport_protocol"
              ? { ...filter, value: [...values, value] }
              : filter
          );
        }
      } else {
        return [...prevFilters, { id: "transport_protocol", value: [value] }];
      }
    });
  };

  const transportProtocolColors: Record<string, string> = {
    TCP: "text-blue-500 hover:bg-blue-500 hover:text-current cursor-pointer",
    UDP: "text-green-500 hover:bg-green-500 hover:text-current cursor-pointer",
    ICMP: "text-red-500 hover:bg-red-500 hover:text-current cursor-pointer",
  };

  return (
    <div>
      <div className="flex items-center justify-end py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Transport Protocol</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {transportProtocolValues.map((value) => (
              <DropdownMenuCheckboxItem
                key={value}
                className="uppercase"
                checked={columnFilters.some(
                  (filter) =>
                    filter.id === "transport_protocol" &&
                    (filter.value as string[]).includes(value)
                )}
                onCheckedChange={() => handleCheckboxChange(value)}
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    transportProtocolColors[(row.original as Packet).transport_protocol] ||
                    "cursor-pointer hover:bg-gray-950 hover:dark:bg-white hover:text-white hover:dark:text-gray-950"
                  }
                  onClick={() => onRowClick(row.original as Packet)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
