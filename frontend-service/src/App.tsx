import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from './views/Home'
import ProvideReactQuery from './clients/reactQueryClient'

function App() {
  return (
    <ProvideReactQuery>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </ProvideReactQuery>
  )
}

export default App
