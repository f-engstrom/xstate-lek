import {useActor} from "@xstate/react";


export const PokemonSaverSideBar = ({actor}: { actor: any }) => {

    const [current, send] = useActor(actor);


    // @ts-ignore
    let pokemonList = current.context.pokemons.map((pokemon: any) => {


        return (

            <li>{pokemon}
                <button onClick={() => send({ type: 'SELECT',name:pokemon})}>hej</button>
            </li>
        )


    })
    // @ts-ignore

    console.log("sidebarcurrent", current.context);

    return (
        <div>
            {
                // @ts-ignore

                current.matches('empty') ? 'empty' : pokemonList
            }

        </div>)

}