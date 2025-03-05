import { Card, Col, Placeholder } from "react-bootstrap";
// import axios from "../axios";

//Display picture of pokemon
//Display pokemon name
export default function GameCard(props) {

    return (
      <Col md={"auto"}>
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
        </Card>
      </Col>
    );
}
