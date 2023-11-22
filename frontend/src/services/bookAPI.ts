import { Book, BookData, Books } from "../types/types";

const baseURL = "http://localhost:8080/api/v1/books";
const jsonHeaders = { 'Content-Type': 'application/json' };

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Erro na resposta do servidor: ${response.status} - ${errorMessage}`);
  }
  return response.json();
}

async function fetchWithConfig<T>(url: string, config?: RequestInit): Promise<T> {
  const response = await fetch(url, config);
  return handleResponse<T>(response);
}

export function fetchBookCreate(dataBook: BookData): Promise<Book> {
  return fetchWithConfig<Book>(baseURL, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(dataBook),
  });
}

export function fetchBookReadAll(params: { page: number, size: number }): Promise<Books> {
  const urlWithParams = `${baseURL}?page=${params.page}&pageSize=${params.size}`;
  return fetchWithConfig<Books>(urlWithParams);
}

export function fetchBookUpdate(id: number, bookData: BookData): Promise<Book> {
  return fetchWithConfig<Book>(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(bookData),
  });
}

export function fetchBookDelete(id: number): Promise<void> {
  return fetchWithConfig<void>(`${baseURL}/${id}`, { 
    method: 'DELETE', 
    headers: {'Content-Type':'application/json'}
  });
}