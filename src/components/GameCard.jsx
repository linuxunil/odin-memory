import { useEffect, useState } from "react";
import { Card, Col, Placeholder } from "react-bootstrap";
import axios from "../axios";

//Display picture of pokemon
//Display pokemon name
// TODO: Flip cards on click.

export default function GameCard(props) {
  const [imageURL, setURL] = useState(null)
  const [name, setName] = useState(props.name);

  useEffect(() => {
    async function getImageURL() {
      let response;
      let sprites;
      try {
          response = await axios.get(props.name);
          sprites = response.data.sprites.other["official-artwork"];
          setURL(sprites.front_default);
          setName(props.name);
      } catch(error) {
        console.error(error);
      }
    }
    getImageURL();
  }, [imageURL, props.name]);

    return (
      <Col md={"auto"}>
          <Card style={{ width: "14rem", height: "15rem" }}
          onClick={() => {
            props.handleClick(props.id);
          }}
        >
          <Card.Img variant="top" src={imageURL} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
}
