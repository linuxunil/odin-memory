import { Grid2 } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

//Display picture of pokemon
//Display pokemon name
// TODO: Flip cards on click.
export default function GameCard(props) {
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
    <Grid2 size={6}>
      <p>{name}</p>
    </Grid2>
  );
}
