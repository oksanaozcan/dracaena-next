import React from "react";
import { render, fireEvent } from "@testing-library/react";
import IconButton from "@/components/ui/icon-button";
const { expect, describe } = require('@jest/globals');

describe("IconButton component", () => {
  const mockOnClick = jest.fn();
  const mockIcon = <span>Icon</span>;

  test("renders icon", () => {
    const { getByText } = render(<IconButton onClick={mockOnClick} icon={mockIcon} />);
    const iconElement = getByText("Icon");
    expect(iconElement).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const { container } = render(<IconButton onClick={mockOnClick} icon={mockIcon} className="custom" />);
    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("custom");
  });

  test("fires onClick event", () => {
    const { container } = render(<IconButton onClick={mockOnClick} icon={mockIcon} />);
    const buttonElement = container.querySelector("button") as HTMLElement; // Type assertion
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
