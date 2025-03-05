import { useState, useReducer, useEffect } from "react";
import GameCard from "./components/GameCard";
import "./App.css";
import { Navbar, Nav, NavDropdown, Row, Col, Container } from "react-bootstrap";
import axios from "./axios";
import { propTypes } from "react-bootstrap/esm/Image";

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

function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [score, setScore] = useState(0);
  const [highScore, setHS] = useState(0);
  const [pokedex, setPokedex] = useState(defaultPokedex);
  const [imageCache, setImageCache] = useState({});
  const [pokemonToDisplay, setPokemonToDisply] = useState(defaultPokedex);
  const [isLoading, setLoading] = useState(null);

  function isHighScore(newScore) {
    if (newScore > highScore) setHS(newScore);
    setScore(0);
  }

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle
    while (currentIndex !=0 ) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    setPokemonToDisply(array);
    forceUpdate();
  }
  useEffect(() => {
    async function cacheImages() {
      try {
        let cacheImages = {};
        pokedex.map(async (pokemon) => {
          const response = await axios.get(pokemon.name);
          const img_url = response.data.sprites.other["official-artwork"];
          cacheImages[pokemon.name] = img_url.front_default;
        console.log(img_url.front_default);
        console.log(cacheImages[pokemon.name]);
      });
      setImageCache(cacheImages);
    } catch (error) {
      console.error(error);
    }
    }
    cacheImages();
    setLoading(false);
  },[pokedex])

  const handleClick = (pokemonID) => {
    let newState = (pokedex.map(pokemon => {
      if (pokemon.id === pokemonID) {
        pokemon.clicked ? (isHighScore(score)) : (setScore(score +1 ));
        return {...pokedex, clicked: true};
      } else {
        return pokemon;
      }
    }));
    setPokedex(newState);
    shuffle(newState);
  };

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" pb={4}>
      <Container>
        <Navbar.Brand href="#home">Pokemon Memorization</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
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
      </Container>

    </Navbar>
    <Container>
        <Row className="justify-content-md-center pt-5">
        {pokemonToDisplay.map((pokemon, index) => (
          <GameCard
            key={index}
            name={pokemon.name}
            handleClick={handleClick}
            images={imageCache}
            id={pokemon.id}
            isLoading={isLoading}
          />
        ))}
      </Row>
    </Container>
    </>
  );
}
export default App;
