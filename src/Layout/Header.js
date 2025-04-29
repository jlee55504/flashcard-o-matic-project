import React from "react";
import { MDBContainer } from 'mdb-react-ui-kit';
function Header() {
  return (
    <header className="jumbotron top-header bg-dark">
      <MDBContainer className="text-white">
        <h1 className="display-4">Flashcard-o-matic</h1>
        <p className="lead">Discover The Flashcard Difference.</p>
      </MDBContainer>
    </header>
  );
}

export default Header;
