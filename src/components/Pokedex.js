import "../styles/Pokedex.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { OwnedPokemonContext } from "../contexts/OwnedPokemon";
import { PokemonListContext } from "../contexts/PokemonListContext";

function Pokedex() {
  const { pokemonList, discoverPokemon, setDiscoveredPokemon } =
    useContext(PokemonListContext);

  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <div className="pokedex">
        <h2 onClick={() => console.log(pokemonList)} className="pokedexHeading">
          Your Pokedex
        </h2>
        <div className="pokedexPokemons">
          {pokemonList.map((pokemon) => {
            return (
              <img
                style={
                  pokemon.discovered
                    ? { filter: "brightness(1)" }
                    : { filter: "brightness(0)" }
                }
                src={pokemon.img}
                alt={pokemon.name}
                // onClick={() => discoverPokemon(pokemon)}
              ></img>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Pokedex;
