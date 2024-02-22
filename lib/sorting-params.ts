export interface SortParamItem {
  id: number;
  value: string;
  label: string;
}

export const sortingParams = [
  {id: 1, value: 'default', label: 'Recommended'},
  {id: 2, value: 'price-asc', label: 'Price: Low to High'},
  {id: 3, value: 'price-desc', label: 'Price: High to Low'},
  {id: 4, value: 'name-asc', label: 'Name: Ascending'},
  {id: 5, value: 'name-desc', label: 'Name: Descending'},
  {id: 6, value: 'review', label: 'Avg. Customer Review'},
  {id: 7, value: 'date-desc-rank', label: 'Newest Arrivals'},
  {id: 8, value: 'exact-aware-popularity', label: 'Best Sellers'},
];