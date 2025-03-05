import { useState, useReducer } from "react";
import GameCard from "./components/GameCard";
import "./App.css";
import { Col, Row, Container } from "react-bootstrap";

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
  // const [pokimonToPlay, setPokimonToPlay] = useState();
  const [pokemonToDisplay, setPokemonToDisply] = useState(defaultPokedex);

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
    <Container>
      <div>
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>
      <Row md={4}>
        {pokemonToDisplay.map((pokemon, index) => (
          <GameCard
            key={index}
            name={pokemon.name}
            handleClick={handleClick}
            id={pokemon.id}
          />
        ))}
      </Row>
    </Container>
  );
}
export default App;
