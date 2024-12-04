"use client";

import { useFlightForm } from "@/hooks/use-form";
import { useFlights } from "@/hooks/use-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";


interface FlightFormProps {
  flight?: Flight;
  onCancel: () => void;
}

export function FlightForm({ flight, onCancel }: FlightFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFlightForm(flight);
  const { createFlight, updateFlight, isLoading } = useFlights();
  const { toast } = useToast();

  const onSubmit = async (data: FlightCreateInput) => {
    try {
      if (flight) {
        await updateFlight(flight.id, data);
      } else {
        await createFlight(data);
      }
      toast({
        title: "Success",
        description: `Flight ${flight ? "updated" : "created"} successfully.`,
      });
      onCancel();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save flight",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{flight ? "Edit Flight" : "Create Flight"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="flightCode" className="text-sm font-medium">
                Flight Code
              </label>
              <Input
                id="flightCode"
                {...register("code")}
                aria-invalid={errors.code ? "true" : "false"}
              />
              {errors.code && (
                <p className="text-sm text-red-500">{errors.code.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="airline" className="text-sm font-medium">
                Capacity
              </label>
              <Input
                id="airline"
                {...register("capacity")}
                aria-invalid={errors.capacity ? "true" : "false"}
              />
              {errors.capacity && (
                <p className="text-sm text-red-500">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label htmlFor="origin" className="text-sm font-medium">
                Departure
              </label>
              <Input
                id="origin"
                type="datetime-local"
                {...register("departureDate")}
                aria-invalid={errors.departureDate ? "true" : "false"}
              />
              {errors.departureDate && (
                <p className="text-sm text-red-500">
                  {errors.departureDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : flight
                ? "Update Flight"
                : "Create Flight"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
