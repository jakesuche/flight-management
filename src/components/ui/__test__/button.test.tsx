import * as React from "react";
import { render, screen,within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "../button";
import "@testing-library/jest-dom/vitest";

describe("Button Component", () => {
  it("renders default button", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    const buttonContent = within(button);
    expect(buttonContent.getByText(/click me/i)).toBeDefined();

    // Use jest-dom matchers
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("h-10");
  });

  it("renders with destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button");

    const buttonContent = within(button);
    expect(buttonContent.getByText(/delete/i)).toBeDefined();
    expect(button).toHaveClass("bg-destructive");
  });

  it("renders with small size", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole("button");

    const buttonContent = within(button);
    expect(buttonContent.getByText(/small button/i)).toBeDefined();
    expect(button).toHaveClass("h-9");
  });

  it("supports asChild prop", () => {
    render(
      <Button asChild>
        <a href="/link">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("button");
    expect(link.tagName.toLowerCase()).toBe("a");

    const linkContent = within(link);
    expect(linkContent.getByText(/link button/i)).toBeDefined();
  });

  it("handles disabled state", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button");

    const buttonContent = within(button);
    expect(buttonContent.getByText(/disabled button/i)).toBeDefined();
    expect(button).toBeDisabled();
  });
});