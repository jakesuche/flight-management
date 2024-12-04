"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-api";

export default function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push("/flights");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {showRegister ? (
        <>
          <RegisterForm />
          <Button variant="link" onClick={() => setShowRegister(false)}>
            Already have an account? Login
          </Button>
        </>
      ) : (
        <>
          <LoginForm />
          <Button variant="link" onClick={() => setShowRegister(true)}>
            Don't have an account? Register
          </Button>
        </>
      )}
    </div>
  );
}
