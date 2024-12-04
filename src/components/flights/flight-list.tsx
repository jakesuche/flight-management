"use client";

import { useState } from "react";
import { useFlights } from "@/hooks/use-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


interface FlightListProps {
  flights: Flight[];
  onEdit: (flight: Flight) => void;
  onDelete: (flight: Flight) => void;
  onSearch: (query: string) => void;
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function FlightList({
  flights,
  onEdit,
  onDelete,
  onSearch,
  total,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: FlightListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { deleteFlight } = useFlights();
  const { toast } = useToast();
  const [flightToDelete, setFlightToDelete] = useState<Flight | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleDelete = async (flight: Flight) => {
    setFlightToDelete(flight);
  };

  const confirmDelete = async () => {
    if (flightToDelete) {
      try {
        await deleteFlight(flightToDelete.id);
        onDelete(flightToDelete);
        toast({
          title: "Success",
          description: "Flight deleted successfully",
        });
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: `Failed to delete flight: ${error.message}`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred",
            variant: "destructive",
          });
        }
      } finally {
        setFlightToDelete(null);
      }
    }
  };

  const totalPages = Math.ceil(total / pageSize);
  const pagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

   const renderPaginationItems = () => {
     const items = [];

     if (startPage > 1) {
       items.push(
         <PaginationItem key="1">
           <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
         </PaginationItem>
       );
       if (startPage > 2) {
         items.push(
           <PaginationItem key="start-ellipsis">
             <PaginationEllipsis />
           </PaginationItem>
         );
       }
     }

     for (let page = startPage; page <= endPage; page++) {
       items.push(
         <PaginationItem key={page}>
           <PaginationLink
             isActive={page === currentPage}
             onClick={() => onPageChange(page)}
           >
             {page}
           </PaginationLink>
         </PaginationItem>
       );
     }

     if (endPage < totalPages) {
       if (endPage < totalPages - 1) {
         items.push(
           <PaginationItem key="end-ellipsis">
             <PaginationEllipsis />
           </PaginationItem>
         );
       }
       items.push(
         <PaginationItem key={totalPages}>
           <PaginationLink onClick={() => onPageChange(totalPages)}>
             {totalPages}
           </PaginationLink>
         </PaginationItem>
       );
     }

     return items;
   };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-4">
        <Input
          placeholder="Search flights..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Flight Code</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight, i) => (
              <TableRow key={`${flight.id}-${i}`}>
                <TableCell>
                  <div>
                    <img
                      className="rounded"
                      src={
                        flight.img || "https://placehold.co/30x30/000000/FFF"
                      }
                      alt="flight pix"
                    />
                  </div>
                </TableCell>
                <TableCell>{flight.code}</TableCell>
                <TableCell>
                  {new Date(flight.departureDate).toLocaleString()}
                </TableCell>
                <TableCell>{flight.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(flight)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(flight)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, total)} of {total} entries
          </span>
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <ConfirmDialog
        isOpen={!!flightToDelete}
        onClose={() => setFlightToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Flight"
        description={`Are you sure you want to delete the flight ${flightToDelete?.code}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
