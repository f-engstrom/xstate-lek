import './App.css';
import {pokemonMachine} from './state/state';
import {useMachine} from '@xstate/react';
import {Pokemon} from "./components/pokemon/pokemon";
import {PokemonSaverSideBar} from "./components/pokemonSaverSidebar/pokemonSaverSideBar";


const pokemonList = ['charizard', 'ditto']

function App() {
    const [current, send] = useMachine(pokemonMachine);

    // @ts-ignore
    let {pokemon, pokemonSaverSideBar} = current.context;

    console.log("state", current.context);

    return (
        <div className="App">
            <select
                onChange={(e) => {
                    send("SELECT", {name: e.target.value});
                }}
            >
                {pokemonList.map((pokemon) => {
                    return <option key={pokemon}>{pokemon}</option>;
                })}
            </select>

            {pokemon && <Pokemon actor={pokemon}/>}
            <PokemonSaverSideBar actor={pokemonSaverSideBar}/>

        </div>
    );
}

export default App;
