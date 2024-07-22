"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Packet } from "@/types/packets";
import { Button } from "../ui/button";

export const columns: ColumnDef<Packet>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Time",
    accessorKey: "timestamp",
  },
  {
    header: "MAC address src",
    accessorKey: "mac_src",
  },
  {
    header: "MAC address dst",
    accessorKey: "mac_dst",
  },
  {
    header: "Protocol",
    accessorKey: "transport_protocol",
    filterFn: (row, id, value) => {
      return value.length > 0 ? value.includes(row.getValue(id)) : true;
    },
  },
  {
    header: "Length",
    accessorKey: "length",
  },
];
