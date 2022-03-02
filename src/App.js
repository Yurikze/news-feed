import { useEffect, useState } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import PostPage from './pages/PostPage';
import api from './utils/api';
import { useDispatch } from 'react-redux';
import { loadingActions } from './store/loadingSlice';

function App() {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(loadingActions.setLoading(true))
        const items = await api.getItems();
        const res = [];
        for (let item of items) {
          const fetchedPost = await api.getItem(item);
          res.push(fetchedPost);
        }
        setPosts(res);
      } catch(err) {
        console.log(err)
      } finally {
        dispatch(loadingActions.setLoading(false))
      }
      
    };

    fetchItems()
    
  }, []);

  return (
    <Switch>
      <Route path="/:postId">
        <PostPage posts={posts} />
      </Route>
      <Route exact path="/">
        <FrontPage posts={posts} />
      </Route>
    </Switch>
  );
}

export default App;
