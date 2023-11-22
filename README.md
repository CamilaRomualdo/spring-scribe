# Spring Scribe

A CRUD application with sorting and pagination functionality for a table.

To-do:

[] Fix the edit cancel option.
[] Implement search functionality.

## Inspired by Learning

With the aim of learning and practicing Java and React, this project drew inspiration from ["Spring Boot + ReactJS: React Table Pagination"](https://www.knowledgefactory.net/2022/06/spring-boot-reactjs-data-table-pagination.html) provided by Knowledge Factory.

## Prerequisites

Make sure you have Node.js, Java 17, and MySQL installed.

## Getting Started

##### Backend: 

1. Create a database in MySQL:

`CREATE DATABASE spring_scribe;`

1. Select spring_scribe database:
 
`USE spring_scribe;`

1. To create the Book table in MySQL, run the following command:
 
```sql
CREATE TABLE Book(
  id bigint NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  author varchar(255) NOT NULL,
  genre varchar(255),
  nPages int,
  edition varchar(255),
  publisher varchar(255) NOT NULL,
  language varchar(255),
  PRIMARY KEY (id)
);
```

3. Verify the table creation with a DESCRIBE statement:

`DESCRIBE Book;` or `desc Book;`


```
mvn clean install
run

```

#### Frontend: 

```
npm i
npm run dev

```


## Technologies

- [Bootstrap](https://getbootstrap.com/)
- [H2 Database](https://www.h2database.com/html/main.html)
- [Java](https://www.java.com/en/)
- [MySQL](https://www.mysql.com/)
- [React](https://react.dev/)
- [SpringBoot](https://spring.io/)
- [TanStack Table](https://tanstack.com/table/v8)
- [TypeScript](https://www.typescriptlang.org/)
