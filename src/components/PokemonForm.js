import React, {useState} from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({onAddPokemon}) {
  const [newPokemon, setNewPokemon]= useState({
    "name": "",
    "hp": "",
    "frontUrl": "",
    "backUrl": "",    
  })

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const inputData = {...newPokemon, [key]:value}
    setNewPokemon(inputData)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({
        "name": newPokemon.name,
        "hp": newPokemon.hp,
        "sprites": {
          "front": newPokemon.frontUrl,
          "back": newPokemon.backUrl,
        }
      })
    })
    .then((res)=> res.json())
    .then((addedPokemon)=>onAddPokemon(addedPokemon))
    
  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form onSubmit={(e) => handleSubmit(e)} >
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={handleInput}/>
          <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={handleInput} />
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            onChange={handleInput}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
