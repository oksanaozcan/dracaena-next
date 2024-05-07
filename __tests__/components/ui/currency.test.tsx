import React from "react";
import { render } from "@testing-library/react";
import Currency from "@/components/ui/currency";
const { expect, describe } = require('@jest/globals');

describe("Currency component", () => {
  test("renders value formatted as currency", () => {
    const { getByText } = render(<Currency value={1000} />);
    const currencyElement = getByText("$1,000.00");
    expect(currencyElement).toBeInTheDocument();
  });

  test("renders value formatted as currency with string input", () => {
    const { getByText } = render(<Currency value="5000" />);
    const currencyElement = getByText("$5,000.00");
    expect(currencyElement).toBeInTheDocument();
  }); 
});
