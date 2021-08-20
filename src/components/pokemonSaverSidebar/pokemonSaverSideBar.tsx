import {useActor} from "@xstate/react";


export const PokemonSaverSideBar = ({actor}: { actor: any }) => {

    const [current, send] = useActor(actor);


    let pokemonList = <ul>{current.context.pokemons.map((pokemon:string) => {


        return (

            <li onClick={() => send({ type: 'SELECT',name:pokemon})}>{pokemon}
            </li>
        )


    })}</ul>
    // @ts-ignore

    console.log("sidebarcurrent", current.context);

    return (
        <div className="border-2 border-blue-400 mr-5 min-w-100">
            {
                // @ts-ignore
                current.matches('empty') ? 'empty' : pokemonList
            }

        </div>)

}