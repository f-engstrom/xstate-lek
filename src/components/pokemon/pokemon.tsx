import {useActor} from "@xstate/react";


export const Pokemon = ({actor}: { actor: any }) => {


    // const pokemonMachine = useMemo(() => {
    //     return createPokemonMachine(pokemonName);
    // }, [pokemonName]);

    //  const [current, send] = useMachine(pokemonMachine);

    const [current, send] = useActor(actor);

    // @ts-ignore
    const pokemon = current.context?.data;
    const image = pokemon?.sprites?.front_default;

    // @ts-ignore
    console.log("pokemoncurrent", current.context.pokemonSaverSideBar);
    // @ts-ignore

    return (

        <div>
            <img src={image}/>
            <button
                className="w-1/2 flex items-center justify-center bg-lime-300 text-black border border-black shadow-offset-black"
                onClick={
                () => {
                    console.log("Click")
                    // @ts-ignore
                    send({type: 'SAVE'},{data:'hej'})
                }
            }
            >Tryck</button>
        </div>

    );

}