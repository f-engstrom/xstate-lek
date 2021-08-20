import unknown from '../../../public/outline.png'
import {ability, PokemonCard} from "../pokemonCard/pokemonCard";




export const UnknownPokemon = () => {

    const unknownAbilities:ability[] = [{name:"???",url:"",is_hidden:false,slot:1},{name:"???",url:"",is_hidden:false,slot:1}]

    return (
        <PokemonCard name={"???"} abilities={unknownAbilities} image={""}/>
    )

}