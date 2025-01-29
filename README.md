# Flashcard-O-Matic Project

An application built without React Bootstrap that allows users to create, add, edit, delete decks, and delete cards in the decks used for studying.

## Features

 - **Decks of Cards Management:** Creates, edits, and deletes card decks.
 - **Card Management:** Creates, edits, and deletes the cards in the decks.
 - **Study Ability:** Memorize the answers to the problems on the cards to prepare for tests.
 - **User-friendly Interface:** Simple structured layout for easy navigation.

## Technologies Used

  * **React:** Core programming language (React 18.2.0)
  * **CSS:** Provides visual styling of the application
  * **HTML:** Visually displays the content of the application
  * **Jest:** Unit testing framework

## Screenshot

![Alt text](https://github.com/jlee55504/flashcard-o-matic-project/blob/main/src/imgs/Flashcard-o-matic%20project%20home%20screen%20image.png?raw=true "Flashcard-o-matic-project 'Layout/home' screen")


## Getting Started

### Prerequisites

  - Node Package Manager (NPM)

### Installation:

  1. Clone the repository:
     ```
     git clone https://github.com/jlee55504/flashcard-o-matic-project-qualified-version.git
     ```
  2. Navigate to the project directory:
     ```
     cd flashcard-o-matic-project-qualified-version
     ```
  3. Build the project:
     ```
     npm install
     ```
  4. Run the application:
     ```
     npm start
     ```

## Usage

Upon running the application, you'll be presented with the options to:

 1. Create a new card deck
 2. View a deck of cards
 3. Study a deck of cards
 4. Delete a deck of cards
 
Navigate through the options by clicking the corresponding buttons.

## Code Structure

  - ``src/Layout/index.js:`` Main application entry point
  - ``src/decks/CreateDeck.js:`` Creates new card decks
  - ``src/decks/Deck.js:`` Allows a deck to be edited, studied, or deleted. New cards can also be added 
 to the deck the current cards being displayed can be edited or deleted
  - ``src/decks/EditDeck.js:`` Allows the name and description of a deck to be edited
  - ``src/cards/Study.js:`` Displays the front and back of every card in the deck to prepare for tests
  - ``src/cards/AddCard.js:`` Allows new cards to be added to decks
  - ``src/cards/EditCard.js:`` Allows the front and back of every card to be edited
  - ``src/Layout/style.css:`` Handles the visual styling of the application
  - ``src/imgs/:`` A folder containing the screenshot of the application

## Acknowledgments

 - This project was built for the Chegg Skill's software engineering program
 - This project taught me how to use the "useEffect" React.js hook to 
 immediately update the information displayed on the web page which was extremely helpful
  in furthering my software engineering career
