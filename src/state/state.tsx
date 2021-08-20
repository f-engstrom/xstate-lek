import {assign, createMachine, send, sendParent, spawn} from 'xstate';
import {Pokemon} from "../models/pokemon";

interface Obj {
    [key: string]: any;
}

type PokemonMachineEventType = { type: 'SELECT' ;name:string };
type PokemonMachineContextType = { pokemons: Obj,pokemon:any,pokemonSaverSideBar:any };
interface PokemonMachineStateType {
    states: {
        init: {};
        idle: {};
        selected: {};
    };
}

export const pokemonMachine = createMachine<PokemonMachineContextType,PokemonMachineEventType>({
        id: 'pokemon',
        initial: 'init',
        context: {
            pokemons: {},
            pokemon: null,
            pokemonSaverSideBar: null
        },

        states: {

            init: {
                entry: assign((context, event) => {

                    let pokemonSaverSideBar = spawn(pokemonSaverSideBarMachine, 'pokemonSaverSideBar');

                    console.log("entry");
                    return {...context, pokemonSaverSideBar};

                }), always: {target: 'idle'}
                ,
            },
            idle: {},
            selected: {}
        },
        on: {
            SELECT: {
                target: '.selected',
                actions: assign((context, event) => {

                    console.log("eveeent", event);

                    let pokemon = context.pokemons[event.name];

                    if (pokemon) {
                        return {...context, pokemon};

                    }

                    pokemon = spawn(createPokemonMachine(event.name, context.pokemonSaverSideBar));

                    return {
                        pokemons: {...context.pokemons, [event.name]: pokemon},
                        pokemon
                    }

                })
            }
        }
    }
)


type pokemonSaverSideBarMachineContextType = { pokemons: string[] };
type pokemonSaverSideBarMachineEventType = { type: 'SAVE' ;pokemonName:string }|{ type: 'SELECT' ;pokemonName:string };


export const pokemonSaverSideBarMachine = createMachine<pokemonSaverSideBarMachineContextType,pokemonSaverSideBarMachineEventType>({

    id: 'pokemonSaverSideBar',
    initial: 'empty',
    context: {
        pokemons: []
    },

    states: {
        empty: {},
        clicked: {}
    },

    on: {
        SAVE: {
            target: 'clicked',
            actions: assign((context, event) => {


                let pokemons = [...context.pokemons];

                let pokemon = pokemons.indexOf(event.pokemonName);


                if (pokemon != -1) {

                    return {...context};
                }

                pokemons.push(event.pokemonName);


                return {
                    ...context, pokemons: pokemons
                }


            })
        },
        SELECT: {

            actions: sendParent((context, event) => {


                return ({type: 'SELECT', name: event.pokemonName})
            })
        }

    }


});


export const createPokemonMachine = (pokemon: string, pokemonSaverSideBar: any) => {



    type pokemonCardActorMachineContextType = {pokemon:string, pokemonData?: any,pokemonSaverSideBar:any };
    type pokemonCardActorMachineEventType = { type: 'REFRESH' }|{ type: 'SAVE' ;pokemonName:string }|{type:'RETRY'};

    return createMachine<pokemonCardActorMachineContextType,pokemonCardActorMachineEventType>({
        id: "pokemon",
        initial: "loading",
        context: {
            pokemon,
            pokemonData: undefined,
            pokemonSaverSideBar: pokemonSaverSideBar
        },
        states: {
            loading: {
                invoke: {
                    id: 'fetch-knownPokemon',
                    src: invokeFetchPokemon,
                    onDone: {
                        target: 'loaded',
                        actions: [
                            assign({

                                pokemonData: (_, event) => {

                                    console.log("event",event.data);
                                return event.data
                                },
                            }),

                        ],

                    },
                    onError: 'failure'
                }
            },
            loaded: {
                on: {
                    REFRESH: 'loading'
                }
            },
            failure: {
                on: {RETRY: 'loading'}
            },
        },
        on: {
            SAVE: {
                target: 'loaded',
                actions:

                    send((context, event) => ({...context, type: 'SAVE'}), {
                        to: (context) => context.pokemonSaverSideBar
                    })

            }
        }
    });
};

function invokeFetchPokemon(context: any) {

    console.log("fetch", context);
    const {pokemon} = context;

    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => response.json());
}