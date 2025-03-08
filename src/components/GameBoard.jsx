import { useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import PokeCard from "./PokeCard";
import Navigation from "./Navigation";

function GameBoard(props) {
    const [displayTokens,] = useState(props.setDisplayTokens);

    return (
        <Container pb={4} fluid>
            <Row>
                {displayTokens.slice(0, (displayTokens.length / 2) - 1).map((pokemon, index) => (
                    <PokeCard
                        key={index}
                        tokenName={pokemon.name}
                        tokenURL={pokemon.url}
                        handleClick={props.handleClick} />
                ))}
                {displayTokens.slice((displayTokens.length / 2), displayTokens.length - 1).map((pokemon, index) => (
                    <PokeCard
                        key={index}
                        tokenName={pokemon.name}
                        tokenURL={pokemon.url}
                        handleClick={props.handleClick} />

                ))}
            </Row>
        </Container >
    );
}

export default GameBoard;