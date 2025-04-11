import { useEffect, useState } from "react";
import Api from "../components/Api";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCheckRole from "../components/ReadCookie";
import { useFlashMessage } from "../context/FlashMessageContext";

function TestApiPut() {
  const [searchParams] = useSearchParams();
  const medid = searchParams.get("id");

  const [id, setId] = useState(medid ?? null);
  const [name, setname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [databaseUser, setDatabaseUser] = useState([]);
  const { message, addFlashMessage } = useFlashMessage();

  const navigate = useNavigate();

  const fetchUserList = async () => {
    try {
      const user = await Api("user", "get", null, null);
      setDatabaseUser(user);
    } catch (error) {
      console.error(
        "Oups, il y a eu un problème lors de la récupération des utilisateurs:",
        error
      );
    }
  };

  const setUserData = () => {
    const user = databaseUser.find((user) => user.id == id);
    if (user) {
      setname(user.name);
      setFirstName(user.firstName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchUserList();

    const role = useCheckRole(2);
    if (role === 0) {
      navigate("/login");
    }else if (role === 1) {
      navigate("/");

    };
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (databaseUser.length > 0 && id) {
      setUserData();
    }
  }, [id, databaseUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addFlashMessage("Veuillez entrer votre nom");
      return;
    }
    if (!firstName.trim()) {
      addFlashMessage("Veuillez entrer votre prénom");
      return;
    }
    if (!address.trim()) {
      addFlashMessage("Veuillez entrer votre adresse");
      return;
    }
    if (!email.trim()) {
      addFlashMessage("Veuillez entrer votre email");
      return;
    }

    if (!phone.trim()) {
      addFlashMessage("Veuillez entrer votre numéro de téléphone");
      return;
    }

    const dataUser = { name, firstName, email, phone, address };

    console.log(dataUser);

    try {
      const result = await Api("user", "put", id, dataUser);
      console.log("API Response:", result);
      if (result.email){
        addFlashMessage(result.email || "Cet adresse email est déjà utilisée", result);

      }else{
        addFlashMessage("L'utilisateur a bien été modifié");
      }

      setTimeout(() => {
      navigate("/profil");
      }, 2000);
    } catch (error) {
      console.error("Erreur pendant la modification de l'utilisateur :", error);
      addFlashMessage(error.message);
    }
  };

  const selectAdmin = () => {
    const access = useCheckRole(2);
    if (access === 2) {
      return (
        <div>
          <form>
            <select
              name="choixUser"
              id="choixUser"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-4 w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Choisissez l'utilisateur à modifier</option>
              {databaseUser.map((user) => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name} {user.firstName}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
      );
    }
  };

  return (
    <>
      <div className="bg-orange-100 min-h-screen flex flex-col lg:flex-row items-center justify-center">
      {message && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white text-green-600 text-center p-5 font-semibold shadow-lg rounded-lg w-3/4 md:w-1/2 lg:w-1/3">
      {message}
      </div>
            </div>
                )}
        <div
          className="bg-cover bg-center h-54 lg:py-14 relative w-full"
          style={{ backgroundImage: "url('/arriereplan.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-65"></div>
          <div className="relative mx-auto my-20 w-5/6 lg:w-full max-w-3xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-xl sm:px-10">
            <div className="w-full">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">
                  Modification de l'utilisateur
                </h1>
                <p className="mt-2 text-gray-500">
                  Remplissez le formulaire ci-dessous pour modifier un
                  utilisateur
                </p>
              </div>
              {selectAdmin()}
              <div className="mt-5">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-2 gap-6"
                >
                  <div className="relative mt-6">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="name"
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Nom
                    </label>
                  </div>

                  <div className="relative mt-6">
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Prénom"
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="name"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Prénom
                    </label>
                  </div>
                  <div className="relative mt-6">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative mt-6">
                    <input
                      type="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="N° de téléphone"
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="phone"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      N° de téléphone
                    </label>
                  </div>
                  <div className="relative mt-6">
                    <input
                      type="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Adresse"
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="address"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Adresse
                    </label>
                  </div>
                  <div className="col-span-2 my-6 text-center">
                    <button
                      type="submit"
                      className="w-1/2 rounded-md bg-emerald-600 px-3 py-4 text-white"
                    >
                      Modifier l'utilisateur
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestApiPut;
