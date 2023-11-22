package com.romualdo.camila.springscribe.repository;

import com.romualdo.camila.springscribe.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findByAuthorContaining(String author, Pageable pageable);
    Page<Book> findByPublisherContaining(String publisher, Pageable pageable);
    Page<Book> findByAuthorContainingAndPublisherContaining(String author, String publisher, Pageable pageable);
}
