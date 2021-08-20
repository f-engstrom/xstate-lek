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
                    className="w-1/2 flex items-center justify-center bg-lime-300 text-black border border-black shadow-offset-black"
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