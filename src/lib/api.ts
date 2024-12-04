
const API_BASE_URL = "https://flight-api-rdtr.onrender.com";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || "An error occurred");
  }

  return data;
}

export const api = {
  setToken(token: string) {
    this.token = token;
  },

  clearToken() {
    this.token = null;
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    return handleResponse<T>(response);
  },

  // Auth endpoints
  auth: {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
      return api.request<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
      return api.request<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },

    async me(): Promise<User> {
      return api.request<User>("/auth/me");
    },

    async refresh(refreshToken: string): Promise<AuthResponse> {
      return api.request<AuthResponse>("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
    },
  },

  // Flights endpoints
  flights: {
    async list(
      params: FlightSearchParams = {}
    ): Promise<{ flights: Flight[]; total: number }> {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());
      if (params.search) searchParams.set("search", params.search);

      return api.request<{ flights: Flight[]; total: number }>(
        `/flights?${searchParams}`
      );
    },

    async create(flight: FlightCreateInput): Promise<Flight> {
      return api.request<Flight>("/flights", {
        method: "POST",
        body: JSON.stringify(flight),
      });
    },

    async update(
      id: string,
      flight: Partial<FlightCreateInput>
    ): Promise<Flight> {
      return api.request<Flight>(`/flights/${id}`, {
        method: "PUT",
        body: JSON.stringify(flight),
      });
    },

    async delete(id: string): Promise<void> {
      return api.request(`/flights/${id}`, {
        method: "DELETE",
      });
    },

    async uploadPhoto(id: string, photo: File): Promise<Flight> {
      const formData = new FormData();
      formData.append("photo", photo);

      return api.request<Flight>(`/flights/${id}/withPhoto`, {
        method: "PUT",
        headers: {},
        body: formData,
      });
    },
  },
} as {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  request: <T>(endpoint: string, options?: RequestInit) => Promise<T>;
  auth: {
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
    me: () => Promise<User>;
    refresh: (refreshToken: string) => Promise<AuthResponse>;
  };
  flights: {
    list: (
      params?: FlightSearchParams
    ) => Promise<{ flights: Flight[]; total: number }>;
    create: (flight: FlightCreateInput) => Promise<Flight>;
    update: (id: string, flight: Partial<FlightCreateInput>) => Promise<Flight>;
    delete: (id: string) => Promise<void>;
    uploadPhoto: (id: string, photo: File) => Promise<Flight>;
  };
};
