import { useEffect, useState } from "react";
import { FaArrowDownShortWide, FaArrowDownWideShort  } from "react-icons/fa6";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { fetchBookDelete, fetchBookReadAll, fetchBookUpdate } from "../services/bookAPI";
import { Book } from "../types/types";
import { columns } from "../utils/utils";
import { FooterCell } from "./Table/FooterCell";
import { Pagination } from "./Pagination";

export const Books = () => {
  const [data, setData] = useState<Book[]>([]);

  const [count, setCount] = useState<number>(0);
  const [countElements, setCountElements] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [editedRows, setEditedRows] = useState<Record<string, any>>({});

  const [sorting, setSorting] = useState<SortingState>([]);

  const getRequestParams = (currentPage: number, pageSize: number): { page: number, size: number } => {
    return {
      page: currentPage > 0 ? currentPage - 1 : 0,
      size: pageSize,
    };
  };

  const retrieveBooks = (page: number, pageSize: number) => {
    const params = getRequestParams(page, pageSize);
    fetchBookReadAll(params).then(result => {
      setData(result.books);
      setCountElements(result.totalElements); 
      setCount(result.totalPages);
    });
  }

  useEffect(() => {
    retrieveBooks(page, pageSize)
  }, [page, pageSize]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const updateRow = async (id: number, bookData: Book) => {
    await fetchBookUpdate(id, bookData);
    retrieveBooks(page, pageSize)
  };

  const deleteRow = async (id: number) => {
    await fetchBookDelete(id);
    retrieveBooks(page, pageSize)
  };

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number) => {
        setData((old) =>  (
          old.map((row, index) => (
            index === rowIndex ? old[rowIndex]: row 
            )
          ))
        );
        window.location.reload();
      },
      updateRow: (rowIndex: number) => {
        updateRow(data[rowIndex].id, data[rowIndex]);
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      removeRow: (rowIndex: number) => {
        deleteRow(data[rowIndex].id);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        selectedRows.forEach((rowIndex) => {
          deleteRow(data[rowIndex].id);
        });
      },
    },
    state: {
      sorting: sorting
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting
  });

  return (
    <div className="container">
      <h1>
        <span>Spring</span>
        <span className="yellow">Scribe</span>
      </h1>
      <div style={{ margin: "30px 2px -10px 2px" }}>
        <form className="d-flex">
          <input 
            className="form-control me-2" 
            type="search" 
            placeholder="Search" 
            aria-label="Search" 
            style={searchInputDisabled}
          />
          <button className="btn btn-primary" style={searchButtonDisabled} type="submit">Search</button>
        </form>
      </div>
      <table className="tableContainer">
        <thead className="tableThead">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th 
                  key={header.id} 
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <h1>{header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </h1>
                  {
                    { asc: <FaArrowDownShortWide className="icon" />, desc: <FaArrowDownWideShort className="icon" /> }
                    [ header.column.getIsSorted() as string ?? null ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>
      </table>
      <div style={{ color: "#fff", display: "flex", justifyContent: "space-between" }}>
        <span>Total of books: {countElements}</span>
        <Pagination 
          totalPages={count} 
          currentPage={page} 
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

const searchButtonDisabled = {
  backgroundColor: "rgb(193 193 193)", 
  border: "none",
  cursor: "not-allowed"
}

const searchInputDisabled = {
  backgroundColor: "rgb(193 193 193)", 
  border: "none",
  cursor: "not-allowed",
  height: "40px"
}