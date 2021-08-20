import unknown from '../../../public/outline.png'
import {PokemonCard} from "../pokemonCard/pokemonCard";
import {Ability} from "../../models/pokemon";


export const UnknownPokemon = () => {

    const unknownAbilities: Ability[] = [
        {ability: {name: "???", url: ""}, is_hidden: false, slot: 1},
        {ability: {name: "???", url: ""}, is_hidden: false, slot: 1}
    ]


    return (
        <PokemonCard name={"???"} abilities={unknownAbilities} image={""}/>
    )

}