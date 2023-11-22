export interface Book {
  id: number
  name: string
  author: string
  genre: string
  nPages: number
  edition: string
  publisher: string
  language: string
};

export interface BookData {
  name: string
  author: string
  genre: string
  nPages: number
  edition: string
  publisher: string
  language: string
};

export type Books = {
  books: Book[];
  totalElements: number;
  totalPages: number;
};

