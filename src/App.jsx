import { useState, useEffect } from "react";
import GameCard from "./components/GameCard";
import "./App.css";
import { Navbar, Nav, NavDropdown, Row, Col, Container, CardGroup } from "react-bootstrap";
import axios from "./axios";

// const defaultPokedex = [
//   {
//     id: 1,
//     name: "Pikachu",
//     clicked: false,
//   },
//   {
//     id: 2,
//     name: "Charmander",
//     clicked: false,
//   },
//   {
//     id: 3,
//     name: "Squirtle",
//     clicked: false,
//   },
//   {
//     id: 4,
//     name: "Jigglypuff",
//     clicked: false,
//   },
//   {
//     id: 5,
//     name: "Meowth",
//     clicked: false,
//   },
//   {
//     id: 6,
//     name: "Eevee",
//     clicked: false,
//   },
//   {
//     id: 7,
//     name: "Snorlax",
//     clicked: false,
//   },
//   {
//     id: 8,
//     name: "Gengar",
//     clicked: false,
//   },
//   {
//     id: 9,
//     name: "Mewtwo",
//     clicked: false,
//   },
//   {
//     id: 10,
//     name: "Charizard",
//     clicked: false,
//   },
//   {
//     id: 11,
//     name: "Vaporeon",
//     clicked: false,
//   },
//   {
//     id: 12,
//     name: "ditto",
//     clicked: false,
//   },
// ];

function App() {
  const [fetchParams] = useState({ limit: '1000', offset: '0' });
  const [gameDiff, setDiff] = useState(12);
  const [gameStart, setStart] = useState(6);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokeDex, setPokeDex] = useState();
  const [selectedTokens, setSelected] = useState([]);
  const [pokemonToDisplay, setPokemonToDisply] = useState();

  useEffect(() => {
    //Fetch list of pokemon for pokedex
    async function fetchPokedex() {
      try {
        await axios.get(`?limit=${fetchParams.limit}&offset=${fetchParams.offset}`).then((request) => {
          const newDex = request.data.results.map((pokemon, index) => { return { name: pokemon.name, url: pokemon.url, index } });
          setPokeDex(newDex);
          setPokemonToDisply(newDex.slice(gameStart, (gameDiff + gameStart) - 1));
        });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        console.log(error.config);
      }
    }
    fetchPokedex();
    console.log(pokeDex);

  }, [fetchParams.limit, fetchParams.offset]);

  function gameOver(newScore) {
    // Check if score is higher than old HS
    // if (newScore > highScore) { setHS(newScore) } //Set HS to new score
    if (newScore > highScore) {
      setHighScore(newScore);
    }
    // reset score
    setScore(0);
  }

  function resetGame() {
    const resetDex = pokeDex.map((pokemon) => {
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
          <Col className="justify-content-end">
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
        </Navbar >
      </Container>
      <Container pb={4} fluid>

        {pokemonToDisplay &&
          <Row>
            {
              pokemonToDisplay.slice(0, (pokemonToDisplay.length / 2) - 1).map((pokemon, index) => (
                <GameCard
                  key={index}
                  tokenName={pokemon.name}
                  tokenURL={pokemon.url}
                  handleClick={handleClick}
                />
              ))
            }
            {pokemonToDisplay.slice((pokemonToDisplay.length / 2), pokemonToDisplay.length - 1).map((pokemon, index) => (
              <GameCard
                key={index}
                tokenName={pokemon.name}
                tokenURL={pokemon.url}
                handleClick={handleClick}
              />

            ))}
          </Row>
        }
      </Container >
    </>
  );
}
export default App;
