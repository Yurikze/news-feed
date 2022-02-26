
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import FrontPage from './pages/FrontPage';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <FrontPage />
      </Route>
    </Switch>
  );
}

export default App;
