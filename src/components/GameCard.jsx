import { useState, useEffect } from "react";
import { Card, Col, Placeholder } from "react-bootstrap";
// import axios from "../axios";

//Display picture of pokemon
//Display pokemon name
export default function GameCard(props) {
  const [sprite, setSprite] = useState([]);
  const [isLoading, setLoading] = useState(null);
  
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(props.name);
  //       setSprite(response.data.sprites.other["official-artwork"]);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();

  //   setLoading(false);
  // }, [props.name]);

  if (props.isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <Col md={"auto"}>
      {props.isLoading ? (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </Card.Body>
        </Card> ) : ( 
          <Card style={{ width: "14rem", height: "15rem" }}
          onClick={() => {
            props.handleClick(props.id);
          }}
        >
          {console.log(props.images[props.name])}
          <Card.Img variant="top" src={props.images[props.name]} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
          </Card.Body>
        </Card>)}
      </Col>
    );
  }
}
