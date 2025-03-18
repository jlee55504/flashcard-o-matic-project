/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useEffect, useState } from 'react';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
/* Imports the 'useParams', 'Link', 'Routes', and the 'Route' 'components' from 
'react-router-dom'. */
import { useParams, Link, Routes, Route } from 'react-router-dom';
/* Imports the "readDeck" 'function/component' from '../utils/api/index.js'. */
import { readDeck } from '../utils/api/index';
// Imports all the images used in this 'component'
import Image from 'react-bootstrap/Image';
import home from '../imgs/home.png';
import AddEditCards from './AddEditCards';
// Imports 'react-bootstrap' 'Elements'
import { MDBCol, MDBRow, MDBContainer } from 'mdb-react-ui-kit';
/* The "AddCard" 'function/component' allows users to add a "card" to the 
specific "deck" and 'local server'. */
function AddCard() {
  /* The "deckId" 'variable' is extracted using the 'useParams' 'component'. */
  const { deckId } = useParams();
  /* The "deckName" 'variable' and the "setDeckName" 'function' are 'declared' 
  using the 'useState' (which is set to an empty 'string' ("")). */
  const [ deckName, setDeckName ] = useState( "" );
  /* The "abortcontroller" holds a 'new AbortController' 'method'. */
  const abortController = new AbortController();

  useEffect(() => {    
    async function getDeck() {
        try {
          const selectedDeck = await readDeck( deckId, abortController.signal );
          setDeckName( selectedDeck.name );
        } catch ( error ) { 
            console.error( error ); 
          } 
    } getDeck();
      return () => abortController.abort(); 
  }, [ deckName ]);

  /* A 'div' JSX 'element' is 'returned' with the "nav-bar" 'div' inside which 
  contains a 'Link' JSX 'component' (which brings users to the "Home page") with
  an 'img' JSX 'element' inside with the 'text' "Home" followed by the text 
  " / ", a 'Link' JSX 'element' to the  the 'link' to the "Deck.js" 
  'file' that displays the current "deck", and the 'text' " / Add Card ". 
  Two 'h2' JSX 'elements' follow the "nav-bar" 'div'. The first displays the 
  'value' of the "deckName" 'variable'. The second displays the 'text' 
  "Add Card". A 'Routes' and 'Route' 'component' display the "AddEdditCards.js"
  'file/component' which handles the "AddCard.js" 'file's/component's functionality'. */
  return (
    <MDBRow className='mx-4 px-2 AddCard-main-row'>
      <MDBRow>
        <MDBCol className='nav-bar col-12'>
          <Link to="/" className='home-link' >
            <Image src={ home } alt="home" className='home-icon'/>
            Home 
          </Link>
          <span className='nav-bar-slash'> /</span>
          <span> Add Card</span>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol className='col-12 AddCard-heading-col pb-3'>
          <h1 className='AddCard-deck-name-h1'> { deckName }: </h1>
          <h1 className='AddCard-add-card-h1'> Add Card</h1>
        </MDBCol>
      </MDBRow>
      <Routes>
          <Route path="/new/*" element={<AddEditCards />} />
        </Routes>
    </MDBRow>
  );
}

/* Exports the "AddCard" 'function/component'. */
export default AddCard;