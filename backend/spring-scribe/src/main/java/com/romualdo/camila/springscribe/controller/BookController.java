package com.romualdo.camila.springscribe.controller;

import com.romualdo.camila.springscribe.exception.ResourceNotFoundException;
import com.romualdo.camila.springscribe.exception.ServerError;
import com.romualdo.camila.springscribe.model.Book;
import com.romualdo.camila.springscribe.repository.BookRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class BookController {
    @Autowired
    BookRepository bookRepository;

    @GetMapping("/books")
    public Map<String, Object> getAllBooks(
            @RequestParam(value = "author", required = false) String author,
            @RequestParam(value = "publisher", required = false) String publisher,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        try {
            List<Book> books = new ArrayList<>();
            Pageable pageable = PageRequest.of(page, size);
            Page<Book> bookPage;

            if (author == null && publisher == null) {
                bookPage = bookRepository.findAll(pageable);
            } else if (author != null && publisher == null) {
                bookPage = bookRepository.findByAuthorContaining(author, pageable);
            } else if (publisher != null && author == null) {
                bookPage = bookRepository.findByPublisherContaining(publisher, pageable);
            } else {
                bookPage = bookRepository.findByAuthorContainingAndPublisherContaining(author, publisher, pageable);
            }

            books = bookPage.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("books", books);
            response.put("totalElements", bookPage.getTotalElements());
            response.put("totalPages", bookPage.getTotalPages());

            return response;
        } catch (Exception exception) {
            throw new ServerError(exception.getMessage());
        }
    }

    @PostMapping("/books")
    public Book addBook(@RequestBody @Valid Book book) {
        return bookRepository.save(book);
    }

    @PutMapping("/books/{id}")
    public Book updateBook(@PathVariable("id") Long id, @RequestBody Book book) {

        Book bookDetails = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book Not Found"));
        bookDetails.setName(book.getName());
        bookDetails.setAuthor(book.getAuthor());
        bookDetails.setGenre(book.getGenre());
        bookDetails.setnPages(book.getnPages());
        bookDetails.setEdition(book.getEdition());
        bookDetails.setPublisher(book.getPublisher());
        bookDetails.setLanguage(book.getLanguage());

        return bookRepository.save(bookDetails);
    }

    @DeleteMapping("books/{id}")
    public Boolean deleteBook(@PathVariable("id") Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book Not Found"));
        bookRepository.delete(book);
        return true;
    }

    @GetMapping("books/{id}")
    public Book findById(@PathVariable("id") Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book Not Found"));
    }
}
