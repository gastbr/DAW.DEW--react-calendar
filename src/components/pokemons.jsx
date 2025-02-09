import { capitalize } from "@mui/material";
import { useFetch } from "../utils/helpers";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Lotties from "./lotties";

export const Pokemons = () => {
    const { data, loading, error } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=10");

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <aside>
            <Carousel className="carousel">
                {data.results.map((pokemon, index) => (
                    <div key={pokemon.name}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
                        <p className="legend">{capitalize(pokemon.name)}</p>
                    </div>
                ))}
            </Carousel>
            <Lotties />
        </aside>
    );
};