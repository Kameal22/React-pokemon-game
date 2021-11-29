import "../styles/Fight.css";
import { Link } from "react-router-dom";

function Fight() {
  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
        <Link to="/Equipment">Equipment</Link>
        <Link to="/Character">Character</Link>
        <Link to="/Fight">Fight</Link>
      </div>
      <h2 className="fightHeading">Fight</h2>
    </div>
  );
}
export default Fight;
