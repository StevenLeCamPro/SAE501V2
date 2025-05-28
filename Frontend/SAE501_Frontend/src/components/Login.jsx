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

    const [showPassword, setShowPassword] = useState(false);

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
                        <h1 className="text-3xl font-bold text-emerald-600">Connexion</h1>
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
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none pr-10"
                            />
                            <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Mot de passe</label>
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                tabIndex={-1}
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.72 11.72 0 012.99-4.36m2.13-2.13A9.956 9.956 0 0112 5c5 0 9.27 3.11 11 7.5a11.72 11.72 0 01-4.06 5.19M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="col-span-2 mt-6 text-center">
                            <button type="submit" className="w-3/4 rounded-full bg-emerald-600 px-3 py-4 text-white hover:bg-emerald-700">Se connecter</button>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-2">
                            Pas de compte ? <a href="/register" className="text-emerald-600 hover:underline">S'inscrire</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
