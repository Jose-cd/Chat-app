import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from './views/Home'
import ApolloClientProvider from './clients/ApolloClientProvider'

function App() {
  return (
    <ApolloClientProvider>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </ApolloClientProvider>
  )
}

export default App
