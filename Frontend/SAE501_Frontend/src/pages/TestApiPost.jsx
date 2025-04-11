import { useState } from "react";
import Api from "../components/Api";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../context/FlashMessageContext";

function TestApiPost() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const {message, addFlashMessage } = useFlashMessage();

    const navigate = useNavigate();

    const validateBirthDate = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);

        
    
        if (birth > today) {
            return "La date de naissance ne peut pas être dans le futur";
        }
    
        let age = today.getFullYear() - birth.getFullYear();
        console.log(age);
    
        // Vérification si l'anniversaire est déjà passé cette année
        if (
            today.getMonth() < birth.getMonth() ||
            (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
        ) {
            age--; // Soustraire 1 si l'anniversaire n'est pas encore passé cette année
        }
    
        console.log(age);
        if (age < 16) {
            return "Vous devez être âgé d'au moins 16 ans pour vous inscrire";
        }
    
        return null; // Retourne null si tout est valide
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^(?:\+33|0)[67]\d{8}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            addFlashMessage("Veuillez entrer votre nom");
            return;
        }
        if (!email.trim()) {
            addFlashMessage("Veuillez entrer votre email");
            return
        }
        if (!password.trim()) {
            addFlashMessage("Veuillez entrer votre mot de passe");
            return
        }
        if (password.length < 6) {
            addFlashMessage("Password must be at least 6 characters")
            return
        }
        if (password != confirmPassword) {
            addFlashMessage("Le mot de passe et la confirmation de mot de passe ne correspondent pas.")
            return
        }
        if (!firstName.trim()) {
            addFlashMessage("Veuillez entrer votre prénom");
            return
        }
        if (!phone.trim()) {
            addFlashMessage("Veuillez entrer votre numéro de téléphone");
            return
        }
         if (!validatePhoneNumber(phone)) {
            addFlashMessage("Numéro de téléphone invalide. Veuillez entrer un numéro correct.");
            return;
        }
        if (!address.trim()) {
            addFlashMessage("Veuillez entrer votre adresse");
            return
        }
        if (!birthDate.trim()) {
            addFlashMessage("Veuillez entrer votre date de naissance");
            return
        }

        const birthDateError = validateBirthDate(birthDate);
    if (birthDateError) {
        addFlashMessage(birthDateError);
        return;
    }
        const data = { name, email, password, confirmPassword, firstName, phone, address, birthDate };

        console.log(data)

        

        try {
            const result = await Api("user", "post", null, data);
            console.log("API Response:", result);

            if(result.email){
                addFlashMessage(result.email || "Cette adresse email est déjà utilisée", "error");
                return;
            }else{
                addFlashMessage("Votre compte a bien été créé", "success");
            }
            setTimeout(() => {
                navigate("/login");
            }, 2000);
            
        } catch (error) {
            console.error("Erreur pendant la création de votre compte :", error);
            addFlashMessage(error || "Erreur pendant la création de votre compte", "error");
        }


    };

    return (
        <>
         <div className="bg-orange-10 flex flex-col">
         {message && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white text-green-600 text-center p-5 font-semibold shadow-lg rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
      {message}
      </div>
            </div>
                )}
                <div className="bg-cover bg-center h-70 lg:py-14 relative" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-65"></div>
            <div className="relative mx-auto my-20 w-5/6 max-w-3xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-xl sm:px-10">
                <div className="w-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900">Inscrivez-vous</h1>
                        <p className="mt-2 text-gray-500">Remplissez le formulaire ci-dessous pour créer votre compte</p>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                            <div className="relative mt-6">
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label htmlFor="name" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Nom</label>
                            </div>
                          
                            <div className="relative mt-6">
                                <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label htmlFor="firstName" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Prénom</label>
                            </div>
                            <div className="relative mt-6">
                                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label htmlFor="address" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Adresse</label>
                            </div>
                            <div className="relative mt-6">
                                <input type="date" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="Date de naissance" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label htmlFor="birthDate" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Date de naissance</label>
                            </div>
                            <div className="relative mt-6">
                                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email</label>
                            </div>
                            <div className="relative mt-6">
                                <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Téléphone" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label htmlFor="phone" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Téléphone</label>
                            </div>
                            
                            <div className="relative mt-6">
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Mot de passe</label>
                            </div>
                           
                            <div className="relative mt-6">
                                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmer le mot de passe" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label htmlFor="confirmPassword" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Confirmer le mot de passe</label>
                            </div>
                            <div className="col-span-2 my-6 text-center">
                                <button type="submit" className="w-1/2 rounded-md bg-emerald-600 px-3 py-4 text-white" >Créer un compte</button>
                                <p className="text-center text-sm text-gray-500">
                                    Déjà un compte ? <a href="/login" className="text-emerald-600 hover:underline">Se connecter</a>
                                </p>                            
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            </div>
            </div>


        </>
    )
}

export default TestApiPost