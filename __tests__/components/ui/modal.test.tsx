import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
const { expect, describe } = require('@jest/globals');
import Modal from "@/components/ui/modal";

describe("Modal component", () => {
  const handleClose = jest.fn();
  const mockChildComponent = <div>Child component</div>;

  test("renders children", () => {
    const { getByText } = render(
      <Modal open onClose={handleClose}>
        {mockChildComponent}
      </Modal>
    );
    const childComponent = getByText("Child component");
    expect(childComponent).toBeInTheDocument();
  });  
});

