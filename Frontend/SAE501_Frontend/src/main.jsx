import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Accueil from "./pages/Accueil.jsx"
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TestApiPost from './pages/TestApiPost.jsx'
import TestApiGet from './pages/TestApiGet.jsx'
import TestApiPut from './pages/TestApiPut.jsx'
import CGU from './pages/CGU.jsx'
import CGV from './pages/CGV.jsx'
import PDC from './pages/PDC.jsx'
import GetMeds from './components/GetMeds.jsx'
import MedsById from './components/MedsById.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PostMedForm from './components/PostMedForm.jsx'
import UpdateProduit from './components/PutMedForm.jsx'
import MedList from './components/MedList.jsx'
import Login from './components/Login.jsx'
import DashboardMed from './pages/DashboardMed.jsx'
import CommandeUpload from './components/CommandeUpload.jsx'
import CommandeGet from './components/CommandeGet.jsx'
import PostMedPdf from './components/PostMedPdf.jsx'
import DashboardUser from './pages/DashboardUser.jsx'
import Profile from './components/Profile.jsx'
import DashboardCommande from './pages/DashboardCommande.jsx'
import Visite from './pages/Visite.jsx'
import UserById from './components/UserById.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Accueil />
        },
        {
          path: "/register",
          element: <TestApiPost />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/update",
          element: <TestApiPut />
        },
        {
          path: "/cgu",
          element: <CGU />
        },
        {
          path: "/cgv",
          element: <CGV />
        },
        {
          path: "/pdc",
          element: <PDC />
        },
        {
          path: "/medicaments",
          element: <GetMeds />
        },
        {
          path: "/medsbyid",
          element: <MedsById />
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/dashboard/createMed",
          element: <PostMedForm />
        },
        {
          path: "/dashboard/updateMed",
          element: <UpdateProduit />
        },
        {
          path: "/dashboard/medList",
          element: <MedList />
        },
        {
          path: "/dashboard/med",
          element: <DashboardMed />
        },
        {
          path: "/commande/create",
          element: <CommandeUpload />
        },
        {
          path: "/commande/liste",
          element: <CommandeGet />
        },
        {
          path: "/dashboard/user",
          element: <DashboardUser />
        },
        {
          path: "/profil",
          element: <Profile />
        },
        {
          path: "/userById",
          element: <UserById />
        },
        {
          path: "/dashboard/commande",
          element: <DashboardCommande />
        },
        {
          path: "/visite",
          element: <Visite />
        }

      ]
    }
  ]

)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
