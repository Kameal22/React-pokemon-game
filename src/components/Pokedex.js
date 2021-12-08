import "../styles/Pokedex.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";

function Pokedex() {
  const { pokemonList } = useContext(PokemonListContext);

  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <div className="pokedex">
        <h2 className="pokedexHeading">Your Pokedex</h2>
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
