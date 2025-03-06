/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, { useState, useEffect } from "react";
/* Imports the "Header" 'component' from './Header.js'. */
import Header from "./Header";
/* Imports the "Footer" 'component' from './Footer.js'. */
import Footer from './Footer'
/* Imports the "NotFound" 'component' from './NotFound.js'.  */
import NotFound from "./NotFound";
/* Imports the 'Routes', 'Route', 'useNavigate', and the 'useLocation' 
'components' from 'react-router-dom'. */
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
/* Imports the "CreateDeck" 'component' from '../decks/CreateDeck.js'. */
import CreateDeck from '../decks/CreateDeck';
/* Imports the './style.css' file (CSS stylesheet). */
import './style.css';
/* Imports the "Deck" 'component' from '../decks/Deck.js'. */
import Deck from '../decks/Deck';
/* Imports the "AddCard" 'component' from '../cards/AddCard.js'. */
import AddCard from '../cards/AddCard';
/* Imports the "EditDeck" from 'component' '../decks/EditDeck.js'. */
import EditDeck from '../decks/EditDeck';
/* Imports the "EditCard" from 'component' '../cards/EditCard.js'. */
import EditCard from '../cards/EditCard';
/* Imports the "Study" 'component' from '../cards/Study.js'. */
import Study from '../cards/Study';
/* Imports the "listDecks" and "deleteDeck" 'functions/components'
 from '../utils/api/index.js'. */
import { listDecks, deleteDeck } from '../utils/api/index';
// Imports all the images used in this 'component'
import AddEditCards from '../cards//AddEditCards';
import eye from '../imgs/eye.png'
import add from '../imgs/add.png';
import trashcan from '../imgs/trashcan.png';
import book from '../imgs/book.png';
// Imports 'react-bootstrap' 'Elements'
import { Image, Button }from 'react-bootstrap';
import { MDBCol, MDBRow, MDBContainer } from 'mdb-react-ui-kit';

/* The "Layout" 'function/component' diplays the "Header" 'component' and the 
"Home.js", "Study.js", "CreateDeck.js", "Deck.js", "EditDeck.js", "AddCard.js", 
"AddEditCards", and "EditCard.js" screens depending on the 'URL'. When the 'URL' 
is "/", the "Home" page is displayed, which diplays a 'button' JSX 'element' with
the 'text' "Create Deck", all the "decks" on the local server along with the 
"view", "Study" and a 'button' JSX 'element' to delete the specific "deck". */
function Layout() {
  /* The "decksList" 'variable' holds the current "decks" on the local server 
  using the 'useState' 'component' which is first set to an empty array ('[]'). 
  The "setDecksList" 'sets' the "decksList" 'variable'. */
  const [ decksList, setDecksList ] = useState( [] );
  /* The "navigate" 'variable' holds the 'useNavigate' 'component'. */
  const navigate = useNavigate();
  /* The "decks" 'variable' may hold the data from every "deck" on the local 
  server via JSX 'elements' depending on the 'URL'.*/
  let decks;
  /* The "createDeckBtn" 'variable' may hold a 'react-bootstrap' 'Button' 'element' 
  that brings users to the "CreateDeck" screen depending on the 'URL' 'location'. */
  let createDeckBtn;
  /* The "abortController" holds a new "AbortController" 'method'.*/
  const abortController = new AbortController();
  /* The "location" holds the 'useLocation' 'component'. */
  const location = useLocation();
  const [ loadDeckInfo, setLoadDeckInfo ] = useState( false );
  
  useEffect(() => {
    async function loadTheDeckInfo() {
      try {
        setLoadDeckInfo( true );
      } catch ( error ) {
          console.log( error );
        }
    } loadTheDeckInfo();
      return () => abortController.abort();
  }, [ navigate ])

  /* This 'useEffect' 'component' runs everytime the "loadDeckInfo"
  and "navigate" 'variables' changes. It runs an 'async function' 
  ("getDecks") which checks if the "loadDeckInfo" 'variable's value' is
  'truthy'. If so, a 'try/catch statement' is run and calls the 
  "listDecks" 'function/component' using 'await', call the "setDecksList" 
  'function' with the "listOfDecks" as its 'argument'. Finally, an 
  'abortController.abort method' is 'returned'. */
  useEffect(() => {
    async function getDecks() {
     if (loadDeckInfo) { 
      try {
        const listOfDecks = await listDecks( abortController.signal );
        setDecksList( listOfDecks );
        
      } catch ( error ) {
          console.log( error );
        } 
      }
    } getDecks();
      return () => abortController.abort();
  }, [ loadDeckInfo, navigate ] );

  /* The "handleDeleteDeck" has one parameter ("deckId") and displays a 
  'window.confirm' screen asking if the user want to delete the specified "deck". 
  If yes, then the 'async function' "deleteAndUpdateDecks" is called which uses a 
  'try/catch statement' and calls the "deleteAndUpdateDecks" 'function/component' 
  with an optional 'abortContoller.signal' as its 'argument', calls the "listDecks" 
  'function/component' using 'await' which is stored in the "newListOfDecks" 
  'variable'. The "setDecksList" is finally called with the "newListOfDecks" 
  'variable' as its 'argument'. Finally, an 'abortController.abort method' is 
  'returned'. */
  function handleDeleteDeck( deckId ) {
    const confirm = window.confirm( "Delete this deck?\n You will not be able to recover it." );
    if ( confirm === true )  {
      async function deleteAndUpdateDecks() {
        try {
          await deleteDeck( deckId, abortController.signal );
          const newListOfDecks = await listDecks( abortController.signal );
          setDecksList( newListOfDecks );
        } catch ( error ) {
            console.log( error );
          } 
      } deleteAndUpdateDecks();
        return () => abortController.abort();
    }
  }

  /* This 'if statement' checks if the 'URL' is "/". If so, the "createDeckBtn" 
  'variable' will store a 'react-bootstrap' 'Button' 'element' that will load the
  "CreateDeck" 'component'. The "decks" 'variable' will also hold all data from
  every "deck" on the local server. If the 'URL' 'path' is 
  different, the "createDeckBtn" and the "CreateDeck" 'variable' will be given
  the value 'null'. */
  if ( location.pathname === "/" ) {
    createDeckBtn = <Button type="button" variant="secondary" className="Layout-index-create-deck-btn" 
    onClick={ () => navigate("/decks/new") } >
      <Image src={ add } className="add-img"
      alt="plus math icon" />
        Create Deck</Button>
    decks = decksList.map( ( deck, index ) => (
      <MDBCol className="Layout-index-deck-col col-12 px-3 pt-3 pb-2" key={ index } >
        <div className="Layout-index-header-card-count-div">
          <h2 className="Layout-index-deck-title">{ deck.name }</h2>
          <h5 className="Layout-index-card-count-div">{ deck.cards.length } cards</h5>
        </div>
        <p className="Layout-index-deck-description">{ deck.description }</p>
        <div className="Layout-index-btns-div">
          <div className="first-index-btns-div">
          <Button variant="secondary" type="button" className="Layout-index-view-deck-btn" 
          onClick={ () => navigate(`/decks/${deck.id}`) } >
            <Image src={ eye } className="eye-img" 
            alt="imgage of eye icon" />
              View</Button>    
          <Button variant="primary" type="button" className="Layout-index-study-deck-btn" 
          onClick={ () => navigate(`/decks/${deck.id}/study`) } >
            <Image src={ book }
            className="book-img" alt="bookmark icon" />
            Study</Button>
            </div> 
          <Button type="button" variant="danger" className="Layout-index-delete-deck-btn" value={ index } 
          onClick={ () => handleDeleteDeck( deck.id ) }>
            <Image src={ trashcan }
            className="trashcan-img" alt="trashcan icon" />
          </Button>     
        </div>
      </MDBCol>
    ) );
  } else {
      createDeckBtn = null;
      decks = null;
    }
 
  return (
    <div className="">
      <Header />
      <MDBContainer className="Layout-index-container">
        {/* TODO: Implement the screen starting here */}
        <MDBRow className="Layout-main-row">
          {location.pathname === "/" ? <>
          <MDBRow className="ml-3 create-deck-btn-row">{ createDeckBtn }</MDBRow>
          <MDBRow className="mx-3 decks-row">{ decks }</MDBRow>
          </> : <></>}
        <Routes>
          <Route path="/" element={ Layout } /> 
          <Route path="/decks/new" element={ <CreateDeck /> } />
          <Route path="/decks/:deckId" element={ <Deck /> } />
          <Route path="/decks/:deckId/study/*" element={ <Study /> } />
          <Route path="/decks/:deckId/edit/*" element={ <EditDeck /> } />
          <Route path="/decks/:deckId/cards/new/*" element={ <> <AddCard /> <AddEditCards /> </> } />
          <Route path="/decks/:deckId/cards/:cardId/edit/*" element={ <> <EditCard /> <AddEditCards /> </> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </div>      
  );
}

/* Exports the "Layout" 'function/component'. */
export default Layout;
