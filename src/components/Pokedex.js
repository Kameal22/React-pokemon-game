import "../styles/Pokedex.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { OwnedPokemonContext } from "../contexts/OwnedPokemon";
import { PokemonContext } from "../contexts/CurrentPokemonContext";

function Pokedex(props) {
  const location = useLocation();
  const { pokemons } = location.state; //This is how You pass anything between components in Router, so fucking cool and easy.

  const { ownedPokemon, discoverPokemon } = useContext(OwnedPokemonContext);

  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <div className="pokedex">
        <h2 className="pokedexHeading">Your Pokedex</h2>
        <div className="pokedexPokemons">
          {pokemons.map((pokemon) => {
            return (
              <img
                style={{ cursor: "pointer" }}
                src={pokemon.img}
                onClick={() => discoverPokemon(pokemon)}
              ></img>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Pokedex;
