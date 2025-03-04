import { Col, Container, Row } from "react-bootstrap";
import GameCard from "./GameCard";

export default function MemoryBoard(pokedex, handleClick) {
    return (
        <Container>
            <Row>
                {pokedex.map((pokemon) => <GameCard key={pokemon.id} pokemon={pokemon} handleClick={handleClick}/> )}
            </Row>
        </Container>
    );
}