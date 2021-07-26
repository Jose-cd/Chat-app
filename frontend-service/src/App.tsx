import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from './views/Home'
import ApolloClientProvider from './clients/ApolloClientProvider'
import { Login } from './views/Login'

function App() {
  return (
    <ApolloClientProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Router>
    </ApolloClientProvider>
  )
}

export default App
