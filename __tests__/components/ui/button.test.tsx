import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "@/components/ui/button";
const { expect, describe } = require('@jest/globals');

describe("Button component", () => {
  test("renders with children", () => {
    const { getByText } = render(<Button>Hello</Button>);
    const buttonElement = getByText("Hello");
    expect(buttonElement).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const { container } = render(<Button className="custom">Test</Button>);
    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("custom");
  });

  test("disables the button", () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const buttonElement = container.querySelector("button");
    expect(buttonElement).toBeDisabled();
  });

  test("handles onClick event", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
