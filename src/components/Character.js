import "../styles/Character.css";
import { Link } from "react-router-dom";

function Character() {
  return (
    <div className="pokedexDiv">
      <div className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/Equipment">Equipment</Link>
        <Link to="/Character">Character</Link>
        <Link to="/Fight">Fight</Link>
      </div>
      <h1>Character</h1>
    </div>
  );
}
export default Character;
