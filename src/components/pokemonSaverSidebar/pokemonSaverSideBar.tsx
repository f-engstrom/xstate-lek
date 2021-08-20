import {useActor} from "@xstate/react";
import {ActorRefFrom} from "xstate";
import {pokemonSaverSideBarMachine} from "../../state/state";


export const PokemonSaverSideBar = ({actor}: { actor: ActorRefFrom<typeof pokemonSaverSideBarMachine > }) => {

    const [current, send] = useActor(actor);


    let pokemonList = <ul>{

        current.context.pokemons.map((pokemon:string) => {


        return (

            <li onClick={() => send({ type: 'SELECT',pokemonName:pokemon})}>{pokemon}
            </li>
        )


    })}</ul>

    console.log("sidebarcurrent", current.context);

    return (
        <div className="border-2 border-blue-400 mr-5 min-w-100">
            {
                // @ts-ignore
                current.matches('empty') ? 'empty' : pokemonList
            }

        </div>)

}