
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import PostPage from './pages/PostPage';


function App() {
  

  return (
    <Switch>
      <Route path="/:postId">
        <PostPage/>
      </Route>
      <Route exact path="/">
        <FrontPage />
      </Route>
    </Switch>
  );
}

export default App;
