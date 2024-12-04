import { useState, useCallback, useEffect } from "react";
import { api } from "@/lib/api";



export function useAuth(): AuthHook {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.setToken(token);
      getUser().catch(() => {
        localStorage.removeItem("token");
        api.clearToken();
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.auth.login(credentials);
      handleAuthResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.auth.register(credentials);
      handleAuthResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await api.auth.me();
      setUser(user);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    api.clearToken();
    setUser(null);
  }, []);

  const handleAuthResponse = (response: AuthResponse) => {
    localStorage.setItem("token", response.accessToken);
    api.setToken(response.accessToken);
    setUser(response.user);
  };

  return { user, isLoading, error, login, register, logout, getUser };
}

export function useFlights() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getFlights = useCallback(async (params: FlightSearchParams = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.flights.list(params);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createFlight = useCallback(async (flight: FlightCreateInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.flights.create(flight);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateFlight = useCallback(
    async (id: string, flight: Partial<FlightCreateInput>) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.flights.update(id, flight);
        return response;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteFlight = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.flights.delete(id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getFlights,
    createFlight,
    updateFlight,
    deleteFlight,
    isLoading,
    error,
  };
}
