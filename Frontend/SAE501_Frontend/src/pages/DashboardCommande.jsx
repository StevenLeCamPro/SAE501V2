import { useState } from "react";

import CommandeUpload from "../components/CommandeUpload";
import CommandeGetAll from "../components/CommandeGetAll";
import Menu from "../components/Menu";


function DashboardCommande () {
    const [select, setSelect] = useState("list")

    const optionSelected = () => {
        if(select === "post") {
            return <CommandeUpload />
        } else {
            return <CommandeGetAll />
        }
    }

    return(
        <>
        <Menu />
        <div className="bg-orange-100 pt-4 text-center">
            <select 
                name="select" 
                id="select" 
                onChange={(e) => {setSelect(e.target.value)}}
                className="font-bold text-xl md:text-2xl lg:text-xl xl:text-lg p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="list">Liste des commandes</option>
                <option value="post">Créer une commande</option>
            </select>
            <div className="mt-4">
                {optionSelected()}
            </div>
            </div>
        </>
    )
}

export default DashboardCommande