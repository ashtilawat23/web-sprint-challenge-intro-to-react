// Write your Character component here
import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";


const StyledCharacter = styled.div`
  box-sizing: border-box;
  width: 49%;
  margin-bottom: 2.5%;
  padding: 2%;
  border: 1px solid ${props => props.theme.headTextColor};
  border-radius: 1rem;
  background-color: ${props => props.theme.backgroundColorTrsp};
  transition: background-color 0.25s;
  :hover{
    background-color: ${props => props.theme.backgroundColor};
    border-color: ${props => props.theme.highlightColor};
  }
  h2{
    margin: 0;
    padding: 0;
    font-size: 2.4rem;
    text-align: center;
    color: ${props => props.theme.headTextColor};
  }
  :hover h2{
    color: ${props => props.theme.highlightColor};
  }
  .divBox{
    margin-top: 2.5%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
`;

const ColorNode = styled.span`
    color: ${props => props.theme.nodeColors[props.color] || props.theme.mainTextColor};
`;

const Character = (props) => {
    const {character} = props;

    const [species, setSpecies] = useState("");
    const [homeworld, setHomeworld] = useState("");

    useEffect(() => {
        if(character.homeworld !== ""){
            axios.get(character.homeworld)
            .then(result => setHomeworld(result.data.name)) // store the name of the planet
            .catch(error => console.log(error))
        }
        if(character.species.length > 0){
            axios.get(character.species[0]) // species is a list of calls; don't ask me why
            .then(result => setSpecies(result.data.name)) // store the name of the species
            .catch(error => console.log(error))
        }
        else{ 
            setSpecies("human");
        }
    }, []); 

    return(
        <StyledCharacter>
            <h2>{character.name}</h2>
            <div className = "divBox">
                {
                character.gender !== "n/a" ? // if this character has a gender...
                <div>{character.gender.toLowerCase()} {species}</div> : // print it and their species
                <div>{species}</div> // otherwise, just species
                }
                <div>Born: {character.birth_year}, {homeworld}</div>
            </div><div className = "divBox">
                <div>Height: {character.height} cm</div>
                <div>Weight: {character.mass} kg</div>
            </div><div className = "divBox">
                <div>Skin: <ColorNode color={character.skin_color}>{character.skin_color}</ColorNode></div>
                {
                character.hair_color !== "n/a" &&
                <div>Hair: <ColorNode color={character.hair_color}>{character.hair_color}</ColorNode></div>
                }
                <div>Eyes: <ColorNode color={character.eye_color}>{character.eye_color}</ColorNode></div>
            </div>
        </StyledCharacter>
    );
};

export default Character;
