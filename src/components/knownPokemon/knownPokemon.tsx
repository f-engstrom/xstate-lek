import {useActor} from "@xstate/react";
import {PokemonCard} from "../pokemonCard/pokemonCard";
import {Pokemon} from "../../models/pokemon";
import {ActorRefFrom} from "xstate";
import {createPokemonMachine} from "../../state/state";

export const KnownPokemon = ({actor}: { actor:     ActorRefFrom<ReturnType<typeof createPokemonMachine>> }) => {


    const [current, send] = useActor(actor);



    const pokemon:Pokemon = current.context?.pokemonData;
    const image = pokemon?.sprites?.front_default;
    const name = pokemon?.name;
    const abilities = pokemon?.abilities;

    console.log("context",current.context)



    return (

        <div>
            <PokemonCard name={name} abilities={abilities} image={image}/>
            <div>
                <button
                    className="bg-red-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer"
                    onClick={
                        () => {
                            send({type: 'SAVE',pokemonName:name})
                        }
                    }
                >Select
                </button>
            </div>

        </div>


    );

}