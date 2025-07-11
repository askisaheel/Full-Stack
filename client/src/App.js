import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/register' replace />} />

        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/products' element={<ProductPage />} />
      </Routes>
    </Router>
  )
}

export default App
