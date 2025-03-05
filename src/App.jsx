import { useState } from "react";
import GameCard from "./components/GameCard";
import "./App.css";
import { Navbar, Nav, NavDropdown, Row, Col, Container, CardGroup } from "react-bootstrap";

const defaultPokedex = [
  {
    id: 1,
    name: "Pikachu",
    clicked: false,
  },
  {
    id: 2,
    name: "Charmander",
    clicked: false,
  },
  {
    id: 3,
    name: "Squirtle",
    clicked: false,
  },
  {
    id: 4,
    name: "Jigglypuff",
    clicked: false,
  },
  {
    id: 5,
    name: "Meowth",
    clicked: false,
  },
  {
    id: 6,
    name: "Eevee",
    clicked: false,
  },
  {
    id: 7,
    name: "Snorlax",
    clicked: false,
  },
  {
    id: 8,
    name: "Gengar",
    clicked: false,
  },
  {
    id: 9,
    name: "Mewtwo",
    clicked: false,
  },
  {
    id: 10,
    name: "Charizard",
    clicked: false,
  },
  {
    id: 11,
    name: "Vaporeon",
    clicked: false,
  },
  {
    id: 12,
    name: "ditto",
    clicked: false,
  },
];

// FIXME: When high score is recorded images stop changing.
function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokedex,] = useState(defaultPokedex);
  const [selectedTokens, setSelected] = useState([]);
  const [pokemonToDisplay, setPokemonToDisply] = useState(defaultPokedex);

  function gameOver(newScore) {
    // Check if score is higher than old HS
    // if (newScore > highScore) { setHS(newScore) } //Set HS to new score
    if (newScore > highScore) {
      setHighScore(newScore);
    }
    // reset score
    // TODO: Reset clicked values.
    setScore(0);
  }

  function resetGame() {
    const resetDex = pokedex.map((pokemon) => {
      return { ...pokemon, clicked: false };
    });
    console.log(resetDex);
    setSelected('');
    console.log("Reset Pokedex")
  }

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const handleClick = (pokemonName) => {
    if (selectedTokens.indexOf(pokemonName) >= 0) {
      gameOver(score);
      resetGame();
    } else {
      console.log(`Added ${pokemonName}`);
      setSelected([...selectedTokens, pokemonName])
      setScore(score + 1);
    }

    // Set new order
    setPokemonToDisply(shuffle(pokemonToDisplay));
  };

  return (
    <>
      <Container fluid>
        <Navbar expand="lg" className="bg-body-tertiary" pb={4} fixed="top">

          <Navbar.Brand href="#home">Pokemon Memorization</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Col>
              <Row>
                <Navbar.Text>
                  Score: {score}
                </Navbar.Text>
              </Row>
              <Row>
                <Navbar.Text>
                  High Score: {highScore}
                </Navbar.Text>
              </Row>
            </Col>
          </Navbar.Collapse>


        </Navbar >
      </Container>
      <Container fluid>
        {/* TODO add two rows. */}
        <Row>
          {pokemonToDisplay.slice(0, (pokemonToDisplay.length / 2) - 1).map((pokemon, index) => (
            <GameCard
              key={index}
              pokemon={pokemon}
              handleClick={handleClick}
            />
          ))}
          {pokemonToDisplay.slice((pokemonToDisplay.length / 2), pokemonToDisplay.length - 1).map((pokemon, index) => (
            <GameCard
              key={index}
              pokemon={pokemon}
              handleClick={handleClick}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}
export default App;
