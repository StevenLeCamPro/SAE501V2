import { useState } from "react";
import MedList from "../components/MedList";
import PostMedForm from "../components/PostMedForm";
import UpdateProduit from "../components/PutMedForm";
import Menu from "../components/Menu";

function DashboardMed () {
    const [select, setSelect] = useState("list")

    const optionSelected = () => {
        if(select === "post") {
            return <PostMedForm />
        } else if (select === "put") {
            return <UpdateProduit />
        } else {
            return <MedList />
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
                <option value="list">Liste des médicaments</option>
                <option value="post">Créer un médicament</option>
                <option value="put">Modifier un médicament</option>
            </select>
            <div className="mt-4">
                {optionSelected()}
            </div>
            </div>
        </>
    )
}

export default DashboardMed