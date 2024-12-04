import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginForm } from "../login-form";
import "@testing-library/jest-dom/vitest";
// Mock the hooks
vi.mock("@/hooks/use-form", () => ({
  useLoginForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn((handler) => handler),
    formState: { errors: {} },
  }),
}));

vi.mock("@/hooks/use-api", () => ({
  useAuth: () => ({
    login: vi.fn(),
    isLoading: false,
  }),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe("LoginForm", () => {
  it("renders email and password inputs", () => {
    render(<LoginForm />);
    const check = screen.getByLabelText(/email/i)
    

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });


  it("shows error messages for invalid inputs", async () => {
    // You would need to mock form validation to test this thoroughly
    // This is a placeholder for more comprehensive error state testing
  });

//   it("handles form submission", async () => {
//     const mockLogin = vi.fn();
//     const mockToast = vi.fn();

//     vi.mock("@/hooks/use-api", () => ({
//       useAuth: () => ({
//         login: mockLogin,
//         isLoading: false,
//       }),
//     }));

//     vi.mock("@/hooks/use-toast", () => ({
//       useToast: () => ({
//         toast: mockToast,
//       }),
//     }));

//     render(<LoginForm />);

//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const loginButton = screen.getByRole("button", { name: /login/i });

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });

//     fireEvent.click(loginButton);

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalledWith({
//         email: "test@example.com",
//         password: "password123",
//       });
//       expect(mockToast).toHaveBeenCalledWith(
//         expect.objectContaining({ title: "Success" })
//       );
//     });
//   });
});
