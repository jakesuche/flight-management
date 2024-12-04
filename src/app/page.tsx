import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Flight Management</h1>
      <div className="space-x-4">
        <Link href="/auth">
          <Button>Login / Register</Button>
        </Link>
        <Link href="/flights">
          <Button variant="outline">Manage Flights</Button>
        </Link>
      </div>
    </div>
  );
}
