package com.romualdo.camila.springscribe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotBlank(message = "The name field must not be empty or null.")
    private String name;

    @Column(name = "author")
    @NotBlank(message = "The author field must not be empty or null.")
    private String author;

    @Column(name = "genre")
    private String genre;

    @Column(name = "nPages")
    private Integer nPages;

    @Column(name = "edition")
    private String edition;

    @Column(name = "publisher")
    @NotBlank(message = "The publisher field must not be empty or null.")
    private String publisher;

    @Column(name = "language")
    private String language;

    public Book() {

    }

    public Book(Long id, String name, String author, String genre, Integer nPages, String edition, String publisher, String language) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.genre = genre;
        this.nPages = nPages;
        this.edition = edition;
        this.publisher = publisher;
        this.language = language;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Integer getnPages() {
        return nPages;
    }

    public void setnPages(Integer nPages) {
        this.nPages = nPages;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
