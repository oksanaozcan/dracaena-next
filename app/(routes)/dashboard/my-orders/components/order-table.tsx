"use client";

import { IOrder } from '@/types';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from "react";

const columnHelper = createColumnHelper<IOrder>()

const columns = [
  // columnHelper.accessor('id', {
  //   cell: info => info.getValue(),
  //   footer: info => info.column.id,
  // }),
  // columnHelper.accessor(row => row.session_id, {
  //   id: 'session_id',
  //   cell: info => <i>{info.getValue()}</i>,
  //   header: () => <span>Session Id</span>,
  //   footer: info => info.column.id,
  // }),
  columnHelper.accessor('customer_name', {
    header: () => 'Customer Name',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('customer_email', {
    header: () => <span>Customer Email</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('payment_status', {
    header: 'Payment Status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('total_amount', {
    header: 'total_amount',
    footer: info => info.column.id,
  }),
]

const OrderTable: React.FC<IOrder[]> = ({orders}) => {
  const [data, _setData] = React.useState(() => [...orders])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
    <div className="h-4" />
    <button onClick={() => rerender()} className="border p-2">
      Rerender
    </button>
  </div>    
  );
}

export default OrderTable;