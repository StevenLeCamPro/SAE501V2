import { useState } from "react";
import TestApiGet from "./TestApiGet";
import TestApiPut from "./TestApiPut";
import TestApiPost from "./TestApiPost";
import Menu from "../components/Menu";

function DashboardMed () {
    const [select, setSelect] = useState("list")

    const optionSelected = () => {
        if(select === "post") {
            return <TestApiPost />
        } else if (select === "put") {
            return <TestApiPut />
        } else {
            return <TestApiGet />
        }
    }

    return(
        <>
        <Menu/>
        <div className="bg-orange-100 pt-4 text-center">
            <select 
                name="select" 
                id="select" 
                onChange={(e) => {setSelect(e.target.value)}}
                className="font-bold text-xl md:text-2xl lg:text-xl xl:text-lg p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="list">Liste des utilisateurs</option>
                <option value="post">Créer un utilisateur</option>
                <option value="put">Modifier un utilisateur</option>
            </select>
            <div className="mt-4">
                {optionSelected()}
            </div>
            </div>
        </>
    )
}

export default DashboardMed