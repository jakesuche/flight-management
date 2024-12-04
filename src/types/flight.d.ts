 interface Flight {
   id: string;
   img: string;
   status: string;
   code: string;
   capacity: number;
   departureDate: string;
 }

 interface FlightCreateInput {
  code: string;
  departureDate: string;
  capacity:number;
  photo:string
}

 interface FlightSearchParams {
  page?: number;
  limit?: number;
  search?: string;
}

 