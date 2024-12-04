"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useFlights } from "@/hooks/use-api";
import { FlightForm } from "@/components/flights/flight-form";
import { FlightList } from "@/components/flights/flight-list";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function FlightsPage() {
  const router = useRouter();
  const { user, logout,  } = useAuth();
  const { getFlights } = useFlights();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    } else {
      loadFlights();
    }
  }, [user, router]);

  const loadFlights = async (search?: string) => {
    try {
      const response = await getFlights({ search });
      setFlights(response.flights);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: `Failed to load flights: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to load flights",
          variant: "destructive",
        });
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

   const handleSearch = (query: string) => {
     setCurrentPage(1); // Reset to first page when searching
     loadFlights(query);
   };


   const handlePageChange = (page: number) => {
     setCurrentPage(page);
   };

   const handlePageSizeChange = (size: number) => {
     setPageSize(size);
     setCurrentPage(1); // Reset to first page when changing page size
   };

    if (!user) {
      return null;
    }

  // const flight = [
  //   {
  //     id: "25f597bb-c9d9-4308-8897-e9ea7d11454c",
  //     img: "",
  //     status: "none",
  //     code: "AbcDef",
  //     capacity: 50,
  //     departureDate: "2020-10-23",
  //   },
  //   {
  //     id: "25f597bb-c9d9-4308-8897-e9ea7d11454c",
  //     img: "",
  //     status: "none",
  //     code: "AbcDef",
  //     capacity: 50,
  //     departureDate: "2020-10-23",
  //   },
  //   {
  //     id: "25f597bb-c9d9-4308-8897-e9ea7d11454c",
  //     img: "",
  //     status: "none",
  //     code: "AbcDef",
  //     capacity: 50,
  //     departureDate: "2020-10-23",
  //   },
  // ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Flight Management</h1>
        <div className="space-x-4">
          <span>Welcome, {user?.name}!</span>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      {showFlightForm || selectedFlight ? (
        <FlightForm
          flight={selectedFlight || undefined}
          onCancel={() => {
            setShowFlightForm(false);
            setSelectedFlight(null);
            loadFlights();
          }}
        />
      ) : (
        <>
          <Button onClick={() => setShowFlightForm(true)}>Create Flight</Button>
          <FlightList
            flights={flights}
            onEdit={setSelectedFlight}
            onDelete={() => loadFlights()}
            onSearch={handleSearch}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </>
      )}
    </div>
  );
}
