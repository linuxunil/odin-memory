import { useState } from "react";
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
  const [score, setScore] = useState(0);
  const [highScore, setHS] = useState(0);
  const [pokedex, setPokidex] = useState(defaultPokedex);

  function isHighScore(newScore) {
    if (newScore > highScore) setHS(newScore);
  }

  const handleClick = (pokemonID) => {};

  return (
    <Container>
      <div>
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>
      <Row md={4}>
        {pokedex.map((pokemon, index) => (
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
