import { useEffect, useState } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import PostPage from './pages/PostPage';
import api from './utils/api';


function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const items = await api.getItems()
      const res = []
      for (let item of items) {
        const fetchedPost = await api.getItem(item)
        res.push(fetchedPost)
      }
      setPosts(res)
    }

    try {
      fetchItems()
    } catch (error) {
      console.log(error)
    }
  }, [])

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
