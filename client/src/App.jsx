import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // Importar react-dom
import Dashboard from './Components/dashboard/src/Appp'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Mision from './Components/dashboard/src/Components/Mision'
import Formulario from './components/dashboard/src/Components/Formulario/Formulario'
import SecondPage from './components/dashboard/src/Components/Formulario/SecondPage'
import ThirdPage from './components/dashboard/src/Components/Formulario/ThirdPage'
import FourPage from './components/dashboard/src/Components/Formulario/FourPage'
import FivePage from './components/dashboard/src/Components/Formulario/FivePage'
import SixthPage from './components/dashboard/src/Components/Formulario/SixthPage'
import SevenPage from  './components/dashboard/src/Components/Formulario/SevenPage'
import EighthPage from './components/dashboard/src/Components/Formulario/EighthPage'
import NinePage from './components/dashboard/src/Components/Formulario/NinePage'
import TenthPage from './components/dashboard/src/Components/Formulario/TenthPage'
import EleventhPage from './components/dashboard/src/Components/Formulario/EleventhPage'
import TwelfthPage from './components/dashboard/src/Components/Formulario/TwelfthPage'
import ThirteenthPage from './components/dashboard/src/Components/Formulario/ThirteenthPage'
import FourteenPage from './components/dashboard/src/Components/Formulario/FourteenPage'
import FiveteenPage from  './components/dashboard/src/Components/Formulario/FiveteenPage'
import Olvido from './components/Login/Olvido'
import DetailsPage from './components/dashboard/src/Components/Body Section/Registros/MisRegistros'
import EditPage from './components/dashboard/src/Components/Body Section/Registros/EdithPage'

//Crear rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path: '/mision',
    element: <div><Mision/></div>
  },
  {
    path: '/form',
    element: <div><Formulario/></div>
  },
  {
    path: '/form2',
    element: <div><SecondPage/></div>
  },
  {
    path: '/form3',
    element: <div><ThirdPage/></div>
  },
  {
    path: '/form4',
    element: <div><FourPage/></div>
  },
  {
    path: '/form5',
    element: <div><FivePage/></div>
  },
  {
    path: '/form6',
    element: <div><SixthPage/></div>
  },
  {
    path: '/form7',
    element: <div><SevenPage/></div>
  },
  {
    path: '/form8',
    element: <div><EighthPage/></div>
  },
  {
    path: '/form9',
    element: <div><NinePage/></div>
  },
  {
    path: '/form10',
    element: <div><TenthPage/></div>
  },
  {
    path: '/form11',
    element: <div><EleventhPage/></div>
  },
  {
    path:'/form12',
    element: <div><TwelfthPage/></div>
  },
  {
    path:'/form13',
    element: <div><ThirteenthPage/></div>
  },
  {
    path:'/form14',
    element: <div><FourteenPage/></div>
  },
  {
    path:'/form15',
    element: <div><FiveteenPage/></div>
  },
  {
    path:'/resetpass',
    element: <div><Olvido/></div>
  },
  {
    path:'/misregistros',
    element: <div><DetailsPage/></div>
  },
  {
    path:'/misregistros-edit/:id',
    element: <div><EditPage/></div>
  },

])

function App() {
  return (
    <div>
      <RouterProvider router ={router} />
    </div>
  )
}

export default App
