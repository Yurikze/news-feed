import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments/Comments';
import Page from '../components/Page/Page';
import { timeConverter } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { loadingActions } from '../store/loadingSlice';
import api from '../utils/api';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';

const PostPage = () => {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState({});
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await api.getItem(postId);
      setCurrentPost(post);
    };
    try {
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  useEffect(() => {
    const fetchComments = async (post) => {
      if (post.hasOwnProperty('kids')) {
        const fetchedComments = await Promise.all(
          post.kids.map(async (commentId) => {
            const fetchedComment = await api.getItem(commentId);
            if (fetchedComment.hasOwnProperty('dead')) return false;
            if (fetchedComment.hasOwnProperty('kids')) {
              fetchedComment.kids = await fetchComments(fetchedComment);
            }
            return fetchedComment;
          })
        );
        return fetchedComments;
      }
    };

    if (currentPost.hasOwnProperty('id')) {
      dispatch(loadingActions.setLoading(true));
      fetchComments(currentPost)
        .then((posts) => setComments(posts.filter((post) => post && true)))
        .catch((err) => console.log(err))
        .finally(() => dispatch(loadingActions.setLoading(false)));
    }
  }, [currentPost, dispatch]);

  return (
    <Page>
      {currentPost ? (
        <Container>
          <Row className="justify-content-md-center">
            <Col md={7}>
              <GoBackBtn />
              <h1 onClick={() => dispatch(loadingActions.setLoading(true))}>
                {currentPost.title}
              </h1>
              <p className="text-muted">
                {timeConverter(currentPost.time)} by {currentPost.by} |
                Comments: {comments.length ? comments.length : 0}
              </p>
              <Comments comments={comments} />
            </Col>
          </Row>
        </Container>
      ) : null}
    </Page>
  );
};

export default PostPage;
