import {useActor} from "@xstate/react";
import {PokemonCard} from "../pokemonCard/pokemonCard";
import {Pokemon} from "../../models/pokemon";

export const KnownPokemon = ({actor}: { actor: any }) => {



    const [current, send] = useActor(actor);



    // @ts-ignore
    const pokemon:Pokemon = current.context?.pokemonData;
    const image = pokemon?.sprites?.front_default;
    const name = pokemon?.name;
    const abilities = pokemon?.abilities;
    // @ts-ignore

    console.log("context",current.context)



    return (

        <div>
            <PokemonCard name={name} abilities={abilities} image={image}/>
            <div>
                <button
                    className="w-1/2 flex items-center justify-center bg-lime-300 text-black border border-black shadow-offset-black"
                    onClick={
                        () => {
                            send({type: 'SAVE'})
                        }
                    }
                >Select
                </button>
            </div>

        </div>


    );

}