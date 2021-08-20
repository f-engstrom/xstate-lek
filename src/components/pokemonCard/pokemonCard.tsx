import unknown from "../../../public/outline.png";
import {Ability} from "../../models/pokemon";





export const PokemonCard = ({name="???",abilities=[],image=""}:{name:string,abilities:Ability[],image:string}) => {



    let abilitiesSection = abilities.map((ability: Ability) => {
        console.log("abil", ability)
        const {name} = ability.ability;
        return (
            <div>
                <h2 className="mx-auto">{name}</h2>
            </div>)
    })


    return(

        <div className="border-8 border-yellow-400 w-96 h-96">
            <div>
                <h1>{name}</h1>
                <img className="border-2 border-yellow-500 mx-auto" src={image ==""? "/outline.png" :image}/>

            </div>
            <div className="divide-y divide-black ">
                {abilitiesSection}
            </div>


        </div>
    )

}