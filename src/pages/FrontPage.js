import { useEffect, useState } from 'react';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { loadingActions } from '../store/loadingSlice';

import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Page from '../components/Page/Page';
import Post from '../components/Post/Post';
import {useSelector} from 'react-redux'
import Spinner from '../components/Spinner/Spinner'

const FrontPage = () => {

  const {isLoading} = useSelector(state => state.loading)

  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(loadingActions.setLoading(true))
        const items = await api.getItems();
        const posts = await Promise.all(items.map(item => {
          return api.getItem(item)
        }))
        setPosts(posts);
      } catch(err) {
        console.log(err)
      } finally {
        dispatch(loadingActions.setLoading(false))
      }
      
    };

    fetchItems()
    
  }, []);


  const postsContent = isLoading ? <Spinner /> : (
    posts.map((post) => (
      <Post
        key={post.id}
        title={post.title}
        author={post.by}
        score={post.score}
        time={post.time}
        id={post.id}
      />
    ))
  )

  return (
    <Page>
      <Container>
        <Row className="justify-content-md-center">
          <Col className="mb-3" md={7}>
            <h1>Newest posts</h1>
          </Col>
          {postsContent}
        </Row>
      </Container>
    </Page>
  );
};

export default FrontPage;
