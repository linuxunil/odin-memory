import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Col, Placeholder } from "react-bootstrap";

//Display picture of pokemon
//Display pokemon name
// TODO: Flip cards on click.
export default function PokeCard(props) {
  const [imageURL, setURL] = useState(null); // URL for image from API
  const [name, setName] = useState(props.tokenName); // Name of pokemon

  useEffect(() => {
    // Get image to display on card
    axios.get(props.tokenURL).then((request) =>
      setURL(request.data.sprites.other['official-artwork'].front_default)).catch((error) =>
        confirm.error(error));
    setName(props.tokenName);
    console.debug(`Set ${props.tokenName} url to ${props.tokenURL}`)
  }, [props.tokenName, props.tokenURL]);

  return (
    <Col xs={4} md={3}>
      <Image src={imageURL} fluid onClick={() => { props.handleClick(name) }} />
      <p>{name}</p>
    </Col>
  );
}
