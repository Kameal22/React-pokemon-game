import "../styles/Pokedex.css";
import { Link } from "react-router-dom";

function Pokedex() {
  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
        <Link to="/Equipment">Equipment</Link>
        <Link to="/Character">Character</Link>
        <Link to="/Fight">Fight</Link>
      </div>
      <div className="pokedex">
        <h2 className="pokedexHeading">Your Pokedex</h2>
        <div className="pokedexPokemons"></div>
      </div>
    </div>
  );
}
export default Pokedex;
