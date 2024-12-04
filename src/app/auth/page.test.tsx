import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom/vitest";
import AuthPage from "./page";
import { useAuth } from "../../hooks/use-api";


vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/hooks/use-api", () => ({
  useAuth: vi.fn(),
}));

describe("AuthPage", () => {
  it("redirects to flights page if user is authenticated", () => {
    const mockPush = vi.fn();
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "1", name: "Test User" },
    } as any);
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);

    render(<AuthPage />);
    expect(mockPush).toHaveBeenCalledWith("/flights");
  });
});
