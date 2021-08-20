import './App.css';
import {pokemonMachine} from './state/state';
import {useMachine} from '@xstate/react';
import {KnownPokemon} from "./components/knownPokemon/knownPokemon";
import {PokemonSaverSideBar} from "./components/pokemonSaverSidebar/pokemonSaverSideBar";
import {UnknownPokemon} from "./components/unknownPokemon/unkownPokemon";


const pokemonList = ['???','charizard', 'ditto']

function App() {

    const [current, send] = useMachine(pokemonMachine);

    let {pokemon, pokemonSaverSideBar} = current.context;

    console.log("state", current.context);

    return (
        <div className="container flex justify-center mx-auto bg-yellow-300  ">
            <div className="grid grid-flow-row auto-rows-max border-8 border-red-600">
                <div className="mx-auto border-2 border-blue-400">

                    <select
                        onChange={(e) => {
                            send("SELECT", {name: e.target.value});
                        }}
                    >
                        {pokemonList.map((pokemon) => {
                            return <option key={pokemon}>{pokemon}</option>;
                        })}
                    </select>
                </div>


                <div className="grid grid-flow-col auto-cols-max">
                    <PokemonSaverSideBar actor={pokemonSaverSideBar}/>

                    {pokemon ? <KnownPokemon actor={pokemon}/>:<UnknownPokemon/>}
                </div>
            </div>
        </div>
    );
}

export default App;
