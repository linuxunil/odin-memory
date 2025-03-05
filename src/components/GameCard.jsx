import { useEffect, useState } from "react";
import { Image, Col, Placeholder } from "react-bootstrap";
import axios from "../axios";

//Display picture of pokemon
//Display pokemon name
// TODO: Flip cards on click.
export default function GameCard(props) {
  const [imageURL, setURL] = useState(null); // URL for image from API
  const [name, setName] = useState(props.pokemon.name); // Name of pokemon

  useEffect(() => {
    // Get image to display on card
    async function getImageURL() {
      // We have to split the response due to 'official-artwork' hyphen
      let response; // First part of response
      let sprites; // second part of response
      try {
        // get json from api. baseURL in axios.js + pokemon name
        response = await axios.get(props.pokemon.name);
        // get first half listing sprites
        sprites = response.data.sprites.other["official-artwork"];
        //set url to the default artwork
        setURL(sprites.front_default);
        // set the name.
        setName(props.pokemon.name);
      } catch (error) {
        console.error(error);
      }
    }
    getImageURL();
  }, [imageURL, props.pokemon.name]);

  return (
    <Col xs={4} md={3}>
      <Image src={imageURL} fluid onClick={() => { props.handleClick(name) }} />
      <p>{name}</p>
    </Col>
    // <Col key={props.index}>
    //   <Card onClick={() => { props.handleClick(name); }} style={{
    //     fontSize: "5vw"
    //   }}>
    //     <Card.Img variant="top" src={imageURL} />
    //     <Card.Body>
    //       <Card.Text>{name}</Card.Text>
    //     </Card.Body >
    //   </Card >
    // </Col>
  );
}
