import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "../input";
import "@testing-library/jest-dom/vitest";

describe("Input", () => {
  it("renders input with default attributes", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    );
  });

 it("renders input with custom type", () => {
   const { container } = render(<Input type="password" />);

   // Use `within` to scope queries to the container
   const input = within(container).getByDisplayValue(""); // Replace with the appropriate query

   expect(input).toHaveAttribute("type", "password");
 });

  

  it("renders input with custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("passes through other props", () => {
    render(<Input placeholder="Enter text" required />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter text");
    expect(input).toBeRequired();
  });
});
