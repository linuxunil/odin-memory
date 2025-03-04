import { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import axios from "../axios";

//Display picture of pokemon
//Display pokemon name
export default function GameCard(props) {
  const [sprite, setSprite] = useState([]);
  const [isLoading, setLoading] = useState(null);
  const [name, setName] = useState(props.name);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(name);
        setSprite(response.data.sprites.other["official-artwork"]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

    setLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <Col>
        <Card
          style={{ width: "12rem" }}
          onClick={() => {
            props.handleClick(props.id);
          }}
        >
          <Card.Img variant="top" src={sprite.front_default} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
