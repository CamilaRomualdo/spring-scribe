import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { fetchBookCreate } from "../services/bookAPI";
import 'bootstrap/dist/css/bootstrap.min.css';

interface CreateBookModalProps {
  onHide: () => void
  show: boolean;
}

export const CreateBookModal = ({ onHide, show }: CreateBookModalProps) => {
  const initialState = {
    name: "",
    author: "",
    genre: "",
    nPages: 0,
    edition: "",
    publisher: "",
    language: "",
  };

  const [book, setBook] = useState(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: name === "year" ? (value === "" ? "" : parseInt(value, 10)) : value
    }));
  };

  const addBook = async () => {
    try {
      const newData = { ...book };
      await fetchBookCreate(newData);
      setSubmitted(true);
      onHide();
      toast.success('Successfully added!')
      setBook(initialState)
    } catch (error) {
      onHide();
      toast.error('Error, please try again.')
      setBook(initialState)
    }
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      styles={{ width: "510px !important" }}
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row">
          <div className="col-md-12">
            <label className="form-label" htmlFor="name" style={labelAdjust}>Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={book.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="col-md-6" style={{ marginTop: "5px" }}>
            <label className="form-label" htmlFor="author" style={labelAdjust}>Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={book.author}
              onChange={handleInputChange}
              name="author"
            />
          </div>
          <div className="col-6" style={{ marginTop: "5px" }}>
            <label className="form-label" htmlFor="genre" style={labelAdjust}>Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              value={book.genre}
              onChange={handleInputChange}
              name="genre"
            />
          </div>
          <div className="col-md-2" style={{ marginTop: "5px" }}>
            <label className="form-label" htmlFor="nPages" style={labelAdjust}>Pages</label>
            <input
              type="number"
              className="form-control"
              id="nPages"
              value={book.nPages}
              onChange={handleInputChange}
              name="nPages"
            />
          </div>
          <div className="col-md-6" style={{ marginTop: "5px" }}>
            <label className="form-label" htmlFor="edition" style={labelAdjust}>Edition</label>
            <input
              type="text"
              className="form-control"
              id="edition"
              value={book.edition}
              onChange={handleInputChange}
              name="edition"
            />
          </div>
          <div className="col-md-4" style={{ marginTop: "5px" }}>
            <label className="form-label" htmlFor="publisher" style={labelAdjust}>Publisher</label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              required
              value={book.publisher}
              onChange={handleInputChange}
              name="publisher"
            />
          </div>
          <div className="col-lg-12" style={{ marginTop: "5px" }}>
            <label className="form-label" htmlFor="language" style={labelAdjust}>Language</label>
            <input
              type="text"
              className="form-control"
              id="language"
              value={book.language}
              onChange={handleInputChange}
              name="language"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addBook} variant="primary">
          Submit
        </Button>
        <Button onClick={onHide} variant="danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const labelAdjust = {
  fontSize: "14px", 
  marginBottom: "3px" 
}