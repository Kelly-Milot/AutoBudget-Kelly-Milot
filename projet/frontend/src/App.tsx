import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import List from './routes/List'
import Add from './routes/Add'
import NotFound from './routes/NotFound'

function App() {
  return (
    <>
      <header>
        <h1>Best budget</h1>
      </header>

      <nav>
        <ul>
          <li>
            <Link to="/2023/12">Dashboard 2023-12</Link>
          </li>
          <li>
            <Link to="/list">Liste des mouvements</Link>
          </li>
          <li>
            <Link to="/add">Ajouter un mouvement</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/:year/:month" element={<Dashboard />} />
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
