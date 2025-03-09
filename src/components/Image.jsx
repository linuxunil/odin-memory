import { useState } from "react";
import axios from "../axios.js";

function Image(props) {
  const [source, setSource] = userState(props.source);
  const [altText, setAltText] = useState(props.altText);

  useEffect(() => {
    // Get image to display on card
    axios
      .get(props.tokenURL)
      .then((request) =>
        setSource(request.data.sprites.other["official-artwork"].front_default),
      )
      .catch((error) => confirm.error(error));
  }, [props.tokenName, props.tokenURL]);

  return <img src={source} alt={altText} onClick={props.handleClick} />;
}
export default Image;
