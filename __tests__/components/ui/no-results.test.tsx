import React from 'react';
import { render } from '@testing-library/react';
import NoResults from '@/components/ui/no-results';
const { expect, describe } = require('@jest/globals');

describe('NoResults component', () => {
  test('renders with correct text', () => {
    // Render the NoResults component
    const { getByText } = render(<NoResults />);
    
    // Assert that the component renders with the correct text
    const noResultsElement = getByText('No results found.');
    expect(noResultsElement).toBeInTheDocument();
  });

  test('renders with correct class', () => {
    // Render the NoResults component
    const { container } = render(<NoResults />);
    
    // Assert that the component renders with the correct class
    const divElement = container.querySelector('.flex.items-center.justify-center.h-full.w-full.text-neutral-500');
    expect(divElement).toBeInTheDocument();
  });
});
