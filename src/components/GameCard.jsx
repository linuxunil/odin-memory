import axios from "../axios.js";
import { useState, useEffect } from "react";
import Image from "./Image";

//Display picture of pokemon
//Display pokemon name
// TODO: Flip cards on click.
export default function GameCard(props) {
  const [imageURL, setURL] = useState(null); // URL for image from API
  const [name, setName] = useState(props.tokenName); // Name of pokemon

  useEffect(() => {
    // Get image to display on card
    axios
      .get(props.tokenURL)
      .then((request) =>
        setURL(request.data.sprites.other["official-artwork"].front_default),
      )
      .catch((error) => confirm.error(error));
  }, [props.tokenName, props.tokenURL]);

  return (
    <div className="column">
      <div className="card">
        <img
          src={imageURL}
          onClick={(e) => props.handleClick(e, props.tokenName)}
        />
        <div className="container">
          <h4>
            <b>{props.tokenName}</b>
          </h4>
        </div>
      </div>
    </div>
  );
}
