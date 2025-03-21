/* Imports 'React', the 'useState' and 'useEffect' 'components' from 'react'. */
import React, {useState, useEffect} from 'react';
/* Imports the 'useParams', 'Link', and the 'useNavigate' 'components' from 
'react-router-dom'. */
import {useNavigate, useParams, Link } from 'react-router-dom';
/* Imports the "classNames" from '../utils/class-names/index.js'. */
import { classNames } from '../utils/class-names/index';
/* Imports the "readDeck", the "deleteCard" and the "deleteDeck" 
'functions/components' from '../utils/api/index.js'. */
import { readDeck, deleteCard, deleteDeck } from '../utils/api/index';
// Imports all the images used in this 'component'
import edit from '../imgs/edit.png';
import book from '../imgs/book.png';
import add from '../imgs/add.png';
import trashcan from '../imgs/trashcan.png';
import home from '../imgs/home.png';
// Imports 'react-bootstrap' 'Elements'
import { MDBCol, MDBRow, MDBContainer } from 'mdb-react-ui-kit';
import { Button, Image } from 'react-bootstrap';

/* The "Deck" 'function/component' displays the the "nav-bar" 'div' (which 
contains a 'link' to the "Home page" ('src/Layout/index.js')), the info for 
the specified "deck", 'button' JSX 'elements' to 'edit' ('EditDeck.js'), 
'study' ('Study.js'), 'add cards to the specified "deck"' ('AddCards.js'), the
info from every "card" in the specified "deck", and 'button' JSX 'elements' 
to 'edit' ('EditCard.js') or 'delete' the specified "card" from the specified 
"deck". */
function Deck() {
    /* The "deckId" 'variable' is extracted using the 'useParams' 'component'. */
    const { deckId } = useParams();
    /* The "deckCards" 'variable' and the "setDeckCards" 'function' are declared 
    using the 'useState' 'component' with an empty 'array' ('[]') as its argument. */
    const [ deckCards, setDeckCards ] = useState( [] );
    /* The "updateCardList" 'variable' and the "setUpdateCardList" 'function' are
    declared using the 'useState' 'component' with 'false' as its argument. */
    const [ updateCardList, setUpdateCardList ] = useState( false );
    /* The "deck" 'variable' and the "setDeck" 'function' are declared 
    using the 'useState' 'component' with an empty 'object' ('{}') as its argument. */
    const [ deck, setDeck ] = useState( {} );
    /* The "navigate" 'variable' holde the 'useNavigate' 'component'. */
    const navigate = useNavigate();
    /* The "abortcontroller" holds a 'new AbortController' 'method'. */
    const abortController = new AbortController();
    const [loadDeckInfo, setLoadDeckInfo] = useState( false );

    useEffect(() => {
      async function loadTheDeckInfo() {
        try {
          setLoadDeckInfo( true );
        } catch ( error ) {
            console.log( error );
          }
      } loadTheDeckInfo();
        return () => abortController.abort();
    }, [ deckId ] )
  
    /* This 'useEffect' 'component' runs every time the "loadDeckInfo" and 
    "updateCardList" 'variables' change using the 'async function' "getDeck" 
    which uses a 'try/catch statement' and calls the "readDeck" 
    'function/component' using 'await' with the "deckId" 'variable' and 
    "abortController.signal" as its arguments (which is stored in the 
    "seleckedDeck" 'variable'). The "deck" 'variable' is then 'set' with 
    data retrieved from the "selectedDeck" 'variable' with the "setDeck" 
    'function' and the "deckCards" 'variable' is set with the "cards" 'key'
    from the "selectedDeck" 'variable's' "cards" 'key' using the "setDeckCards" 
    'function'. If the "updateCardList" 'variable's' 'value' is 'truthy', the 
    "setUpdateCardList" 'function' sets it to 'false'. Finally, an 
    'abortController.abort method' is 'returned'. */
    useEffect(() => {
      async function getDeck() {
        try {
          const selectedDeck = await readDeck( deckId, abortController.signal );
          setDeck( selectedDeck );
          setDeckCards( selectedDeck.cards );
          if( updateCardList ) setUpdateCardList( false );
        } catch ( error ) {
            console.log( error );
          }
      } getDeck();
        return ()=> abortController.abort();
    }, [ loadDeckInfo, updateCardList ]);
  
    /* The "handleDeleteCard" 'function' takes a 'parameter' named "cardId"
    and 'window.confirm' screen displays 'text' confirming wanting to delete a 
    specific "card" (which is stored in the "confirm" 'variable'). If the 
    "confirm" 'variable' 'value' is 'true', the "deleteThecard" 'async function' 
    is run using a 'try/catch statement' is run and the "deleteCard" 
    'function/component' is 'called' using 'await' with the "cardId" 'parameter' 
    and "abortController.signal" as 'arguments', then the "setUpdateCardList" 
    'function' is 'called' with 'true' as its 'argument'. Finally, an 
    'abortController.abort method' is 'returned'. */
    const handleDeleteCard = ( cardId ) => {
      const confirm = window.confirm("Delete this card? \n You will not be able to recover it.");
      if ( confirm === true) {
        async function deleteTheCard() {
          try {
            await deleteCard( cardId, abortController.signal );   
            setUpdateCardList( true );
          } catch ( error ) {
              console.log( error );
            }
        } deleteTheCard();
          return ()=> abortController.abort();
      }
    }
  
    /* The "handleDeleteDeck" 'function' takes a 'parameter' named "deckId"
    and 'window.confirm' screen displays 'text' confirming wanting to delete a 
    specific "deck" (which is stored in the "confirm" 'variable'). If the 
    "confirm" 'variable' value is 'true', the "deleteTheDeck" 'async function' 
    is run using a 'try/catch statement' is run and the "deleteDeck" 
    'function/component' is 'called' using 'await' with the "deckId" 'parameter' 
    and "abortController.signal" as 'arguments', then the "navigate" 
    ('useNavigate' 'component') is called with "/" (the "Home page") as its 
    argument. Finally, an 'abortController.abort method' is 'returned'. */
    const handleDeleteDeck = ( deckId ) => {
        const confirm = window.confirm("Delete this deck? \n You will not be able to recover it.");
          if ( confirm === true ) {
              async function deleteTheDeck() {
              try {
                await deleteDeck( deckId, abortController.signal ); 
                navigate("/");
              } catch (error) {
                  console.log(error)
              }
          } deleteTheDeck();
          return () => abortController.abort();
          }
    }

    return (
      <MDBRow className='mx-4 px-2 Deck-main-row'>
        <MDBRow className='nav-bar-row'>
          <MDBCol className='nav-bar col-12'>
            <Link to="/" className='home-link' >
              <Image src={ home } 
                alt="home icon" className='home-icon' />
                  Home
              </Link> <span className='nav-bar-slash'>/</span> { deck.name }
            </MDBCol>
          </MDBRow>
          <MDBRow className='Deck-deck-row'>
            <MDBCol className="Deck-deck-col col-12 px-0 py-0 mx-0 py-0">
              <h3>{ deck.name }</h3>
              <p>{ deck.description }</p>
              <div className="Deck-deck-btns-div">
                <div className='first-deck-btns-div'>
                  <Button type="button" className="Deck-deck-edit-deck-btn" variant="secondary"
                    onClick={ ()=> navigate(`/decks/${ deckId }/edit`) } >
                    <Image src={ edit } className='Deck-deck-edit-image'
                      alt="edit icon" />
                    Edit
                  </Button>
                  <Button type="button" variant="primary" className="Deck-deck-study-btn" 
                    onClick={ ()=> navigate(`/decks/${ deckId }/study`) } >
                      <Image src={ book } 
                        alt="bookmark icon" className="Deck-deck-book-image" />
                    Study
                  </Button>
                  <Button type="button" className="Deck-deck-add-cards-to-deck-btn" variant="primary"
                    onClick={ ()=> navigate(`/decks/${ deckId }/cards/new`) } >
                    <Image src={ add } className="Deck-deck-add-image"
                      alt="plus-math icon" />
                    Add Cards
                  </Button>
                </div>
                <Button type="button" className="Deck-deck-delete-deck-btn" variant="danger"
                  onClick={ () => handleDeleteDeck( deckId ) } >
                  <Image src={ trashcan } 
                    className="Deck-deck-trashcan-image" alt="trashcan icon" />
                </Button>
              </div>
            </MDBCol>
            </MDBRow>
            <MDBRow className="Deck-card-row">    
              <h2>Cards</h2>
              {deckCards && deckCards.length ? deckCards.map(( card, index ) => (
                <MDBCol className="Deck-card-col col-12 px-3 pt-3 pb-2" key={ index } >
                  <div className="Deck-card-div-front-div" >
                  <p className="Deck-card-div-front-p" >{ card.front }</p>
                  </div>
                  <div className="Deck-card-div-back-div" >
                    <p className="Deck-card-div-back-p" >{ card.back }</p>
                    <div className="Deck-card-div-btns-div" >
                      <Button variant="secondary" type="button" className="Deck-card-edit-card-btn" 
                        onClick={ ()=> navigate(`/decks/${ deckId }/cards/${ card.id }/edit`) } >
                        <Image src={ edit } className='Deck-card-edit-image'
                          alt="edit icon" />
                        Edit
                      </Button>
                      <Button variant="danger" type="button" className="Deck-card-delete-card-btn" 
                        onClick={ () => handleDeleteCard( card.id ) } >
                          <Image src={ trashcan } className="Deck-card-trashcan-image"
                            alt="trashcan icon" />
                      </Button>
                    </div>
                  </div>
                </MDBCol>
              )) : <MDBCol className='Deck-card-col-no-cards col-12 px-3 pt-3 pb-2'><h3>No cards</h3></MDBCol>}
          </MDBRow>
      </MDBRow>
      );
  }
  
  /* Exports the "Deck" 'function/component'. */
  export default Deck;