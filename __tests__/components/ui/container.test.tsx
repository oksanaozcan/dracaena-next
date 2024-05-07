import React from "react";
import { render } from "@testing-library/react";
import Container from "@/components/ui/container";
const { expect, describe } = require('@jest/globals');

describe("Container component", () => {
  test("renders children", () => {
    const { getByText } = render(
      <Container>
        <div>Child component</div>
      </Container>
    );
    const childComponent = getByText("Child component");
    expect(childComponent).toBeInTheDocument();
  });

  test("applies correct className", () => {
    const { container } = render(
      <Container>
        <div>Child component</div>
      </Container>
    );
    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass("mx-auto max-w-7xl");
  });
});
