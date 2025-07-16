import { BrowserRouter } from 'react-router-dom'
import Router from "./routes/Router"
import Layout from './components/Layout'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
