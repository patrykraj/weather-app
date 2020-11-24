import './App.css';
import Home from './pages/Home'
import Week from './pages/Week'
import Month from './pages/Month'

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/week/:id" component={Week} />
          <Route path="/month/:id" component={Month} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;