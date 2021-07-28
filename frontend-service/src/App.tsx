import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './views/Home'
import ApolloClientProvider from './clients/ApolloClientProvider'
import { Login } from './views/Login'
import { Register } from './views/Register'

function App() {
  return (
    <ApolloClientProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </ApolloClientProvider>
  )
}

export default App
