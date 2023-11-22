import { useState } from "react";
import { CreateBookModal } from "./CreateBookModal";

export const Header =  () => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://github.com/CamilaRomualdo">Github</a>
          <button type="button" className="btn btn-light"onClick={() => setModalShow(true)}>New Book</button>
        </div>
      </nav>
      <CreateBookModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}