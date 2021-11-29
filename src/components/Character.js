import "../styles/Character.css";
import { Link } from "react-router-dom";

function Character() {
  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
        <Link to="/Equipment">Equipment</Link>
        <Link to="/Character">Character</Link>
        <Link to="/Fight">Fight</Link>
      </div>
      <h2 className="characterHeading">Character</h2>
    </div>
  );
}
export default Character;
