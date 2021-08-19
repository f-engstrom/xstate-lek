import {assign, createMachine, send, sendParent, spawn} from 'xstate';

interface pokemonSelectEvent {

    type: string,
    name: string

}

// @ts-ignore
export const pokemonMachine = createMachine({
        id: 'pokemon',
        initial: 'init',
        context: {
            pokemons: {},
            pokemon: null,
            pokemonSaverSideBar: null
        },

        states: {

            init: {
                entry: assign((context,event)=>{

                    let pokemonSaverSideBar = spawn(pokemonSaverSideBarMachine, 'pokemonSaverSideBar');

                    console.log("entry");
                    // @ts-ignore
                    return {...context,pokemonSaverSideBar};

                }), always:{target:'idle'}
                ,
            },
            idle: {},
            selected: {}
        },
    // @ts-ignore
    on: {
            SELECT: {
                target: '.selected',
                actions: assign((context, event: pokemonSelectEvent) => {

                    console.log("eveeent",event);

                    // @ts-ignore
                    let pokemon = context.pokemons[event.name];

                    if (pokemon) {
                        // @ts-ignore
                        return {...context, pokemon};

                    }

                    // @ts-ignore
                    pokemon = spawn(createPokemonMachine(event.name,context.pokemonSaverSideBar));

                    return {
                        // @ts-ignore
                        pokemons: {...context.pokemons, [event.name]: pokemon},
                        pokemon
                    }

                })
            }
        }
    }
)


export const pokemonSaverSideBarMachine = createMachine({

    id:'pokemonSaverSideBar',
    initial: 'empty',
    context:{
        pokemons:[]
    },

    states:{
        empty:{},
        clicked:{

        }
    },
    // @ts-ignore

    on:{
        SAVE:{
            target:'clicked',
            actions: assign( (context:any,event:any) => {


                let pokemons =[...context.pokemons];

                let pokemon = pokemons.indexOf(event.pokemon);


                if(pokemon != -1){

                    return {...context};
                }

                pokemons.push(event.pokemon);


                return{
                    ...context,pokemons:pokemons
                }


            })
        },
        SELECT:{

            actions: sendParent((context, event) => {

                console.log("selected!!!",event)
                // @ts-ignore

                return ({ type: 'SELECT',name:event.name})
            })
        }

    }


});


export const createPokemonMachine = (pokemon: string,pokemonSaverSideBar:any) => {



    // @ts-ignore
    return createMachine({
        id: "pokemon",
        initial: "loading",
        context: {
            pokemon,
            data: null,
            pokemonSaverSideBar:pokemonSaverSideBar
        },
        states: {
            loading: {
                // @ts-ignore
                invoke: {
                    id: 'fetch-pokemon',
                    src: invokeFetchPokemon,
                    onDone: {
                        target: 'loaded',
                        actions: [
                            assign({
                                // @ts-ignore
                                data: (_, event) => event.data,
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
            SAVE:{
                target:'loaded',
                actions: // @ts-ignore

                    send((context, event) => ({...context, type: 'SAVE'}), {
                        // @ts-ignore
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