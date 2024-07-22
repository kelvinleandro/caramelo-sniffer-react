"use client";

import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
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
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [activePacketNumber, setActivePacketNumber] = useState<number | null>(
    null
  );

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
  });

  const transportProtocolValues = Array.from(
    new Set(data.map((item: any) => item.transport_protocol))
  );

  const handleCheckboxChange = (value: string) => {
    setSelectedProtocols((prev) => {
      const newProtocols = prev.includes(value)
        ? prev.filter((protocol) => protocol !== value)
        : [...prev, value];

      table.getColumn("transport_protocol")?.setFilterValue(newProtocols);
      return newProtocols;
    });
  };

  const handleRowClick = (row: Row<TData>) => {
    setActivePacketNumber((row.original as Packet).number);
    onRowClick(row.original as Packet);
  };

  const activeRowStyle: Record<string, string> = {
    TCP: "bg-blue-500",
    UDP: "bg-green-500",
    ICMP: "bg-red-500",
  };

  const rowStyle: Record<string, string> = {
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
                checked={selectedProtocols.includes(value)}
                onCheckedChange={() => handleCheckboxChange(value)}
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-y-auto max-h-[50vh] scrollbar">
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
                  className={`${
                    (row.original as Packet).number === activePacketNumber
                      ? activeRowStyle[(row.original as Packet).transport_protocol] || "bg-gray-950 dark:bg-white text-white dark:text-gray-950"
                      : rowStyle[
                          (row.original as Packet).transport_protocol
                        ] ||
                        "cursor-pointer hover:bg-gray-950 hover:dark:bg-white hover:text-white hover:dark:text-gray-950"
                  }`}
                  onClick={() => handleRowClick(row)}
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
