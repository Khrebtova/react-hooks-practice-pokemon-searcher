import React, {useState, useEffect} from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsToDisplay, setPokemonsToDisplay] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/pokemon")
    .then((res)=>res.json())
    .then(data=> {
      setPokemons(data)
      setPokemonsToDisplay(data)
    })
  }, [])

  const findPokemons=(search)=>{
    console.log("filter by: " , search)
    if (search) {
      const filteredArray = pokemonsToDisplay.filter((pokemon)=> pokemon.name.includes(search))
      setPokemonsToDisplay(filteredArray)
    }else{
      setPokemonsToDisplay(pokemons)
    }
  }

  const addPokemon = (newPokemon)=>{
    setPokemonsToDisplay([...pokemonsToDisplay, newPokemon])
    console.log("add new pokemon", newPokemon)
  }

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onAddPokemon={addPokemon}/>
      <br />
      <Search onSearch={findPokemons}/>
      <br />
      <PokemonCollection pokemons={pokemonsToDisplay}/>
    </Container>
  );
}

export default PokemonPage;
