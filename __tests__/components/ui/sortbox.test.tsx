import { render, fireEvent, waitFor } from '@testing-library/react';
import Sortbox from '@/components/ui/sortbox';
import { SortParamItem } from '@/lib/sorting-params';
const { expect, describe } = require('@jest/globals');

// Mocking useRouter from next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockParams: SortParamItem[] = [
  { id: 1, value: 'default', label: 'Recommended' },
  { id: 2, value: 'price_asc', label: 'Price Low to High' },
  { id: 3, value: 'price_desc', label: 'Price High to Low' },
];

describe('Sortbox component', () => {
  it('renders with default label', () => {
    const { getByText } = render(<Sortbox params={mockParams} />);
    expect(getByText('Sort by: Recommended')).toBeInTheDocument();
  });

  it('changes sorting option on selection', async () => {
    const { getByText } = render(<Sortbox params={mockParams} />);
    fireEvent.click(getByText('Sort by: Recommended'));

    await waitFor(() => {
      fireEvent.click(getByText('Price Low to High'));
    });

    expect(getByText('Sort by: Price Low to High')).toBeInTheDocument();
  }); 
});
