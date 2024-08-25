import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import { OrderColumns } from '../lib/OrderColumns';
import Loading from './Loading';

const OrderTable = ({ rowsPerPage, paginateOn, emptyRowMsg }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/orders');
                setData(response.data); // Set the fetched data to the state
            } catch (error) {
                console.error('Error fetching the orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns: OrderColumns,
            data,
            initialState: { pageIndex: 0, pageSize: rowsPerPage || 5 },
        },
        usePagination
    );

    if (loading) {
        return (
            <Loading />
        );
    }

    // Check if data is empty and render a message if it is
    if (data.length === 0) {
        return (
            <div className="flex justify-center items-center h-1/2">
                <p className="text-gray-600">{emptyRowMsg || 'Not available. 😿'}</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
            <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
            >
                <thead className="bg-slate-100">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200"
                >
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="hover:bg-gray-100"
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-6 py-4 whitespace-nowrap"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* Table Pagination */}
            {paginateOn === true ? (
                <div className="flex justify-center gap-2">
                    <div className="inline-flex justify-center gap-1 py-3 bg-white ml-10">
                        <a
                            href="#"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className="inline-flex size-8 items-center justify-center rounded border border-green-400 bg-white text-gray-900"
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>

                        <div>
                            <label htmlFor="PaginationPage" className="sr-only">
                                Page
                            </label>

                            <input
                                type="number"
                                className="h-8 w-12 rounded border border-green-500 bg-slate-200 p-0 text-center text-xs font-medium text-gray-950 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                min="1"
                                value={pageIndex + 1}
                                onChange={(e) => {
                                    const pageNumber = e.target.value
                                        ? Number(e.target.value) - 1
                                        : 0;
                                    gotoPage(pageNumber);
                                }}
                                id="PaginationPage"
                            />
                        </div>

                        <a
                            href="#"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className="inline-flex size-8 items-center justify-center rounded border border-green-400 bg-white text-gray-900"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default OrderTable;
