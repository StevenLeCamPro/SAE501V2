import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetCookieInfo from './ReadCookie';
import { useFlashMessage } from '../context/FlashMessageContext';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { message, addFlashMessage } = useFlashMessage();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = JSON.stringify({ email, password });

        try {
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: loginData,
            });

            const data = await response.json();

            if (response.ok) {
                Cookies.set('pharminnov_login', JSON.stringify({
                    user_id: data.user_id,
                    role: data.role,
                    date: data.date,
                    token: data.token,
                }), { secure: true, sameSite: 'strict', expires: 1 });

                console.log('Login successful!');
                GetCookieInfo();

                addFlashMessage("Connexion réussie !");
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setErrorMessage(data.error || "Connexion échouée. Veuillez réessayer.");
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
            console.error('An error occurred:', error);
        }
    };

    return (
        
        <div className="bg-orange-100 flex flex-col items-center justify-center">
             {message && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white text-green-600 text-center p-5 font-semibold shadow-lg rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
      {message}
      </div>
            </div>
                )}
             
            <div className="bg-cover bg-center h-70 lg:py-14 relative w-full" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
            
                <div className="absolute inset-0 bg-black opacity-65"></div>
               
                <div className="relative mx-auto my-20 w-full max-w-sm bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-xl sm:px-10">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900">Connexion</h1>
                        <p className="mt-2 text-gray-500">Entrez vos informations pour accéder à votre compte</p>
                    </div>
                    <form onSubmit={handleLogin} className="mt-5">
                        {errorMessage && (
                            <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
                        )}
                        <div className="relative mt-6">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                            />
                            <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email</label>
                        </div>
                        <div className="relative mt-6">
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                            />
                            <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Mot de passe</label>
                        </div>
                        <div className="col-span-2 my-6 text-center">
                            <button type="submit" className="w-1/2 rounded-md bg-emerald-600 px-3 py-4 text-white hover:bg-emerald-700">Se connecter</button>
                        </div>
                        <p className="text-center text-sm text-gray-500">
                            Pas de compte ? <a href="/register" className="text-emerald-600 hover:underline">S'inscrire</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
