import { createColumnHelper } from "@tanstack/react-table"
import { EditCell } from "../components/Table/EditCell"
import { TableCell } from "../components/Table/TableCell"
import { Book } from "../types/types"

const columnHelper = createColumnHelper<Book>()

export const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: TableCell,
    meta: {
      type: 'text',
      required: true
    },
  }),
  columnHelper.accessor('author', {
    header: 'Author',
    cell: TableCell,
    meta: {
      type: 'text',
      required: true
    },
  }),
  columnHelper.accessor('genre', {
    header: 'Genre',
    cell: TableCell,
    meta: {
      type: 'text'
    },
  }),
  columnHelper.accessor('nPages', {
    header: 'Pages',
    cell: TableCell,
    meta: {
      type: 'number'
    },
  }),
  columnHelper.accessor('edition', {
    header: 'Edition',
    cell: TableCell,
    meta: {
      type: 'text',
      required: true
    },
  }),
  columnHelper.accessor('publisher', {
    header: 'Publisher',
    cell: TableCell,
    meta: {
      type: 'text',
      required: true
    },
  }),
  columnHelper.accessor('language', {
    header: 'Language',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]
