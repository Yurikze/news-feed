import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Page from '../components/Page/Page';
import { timeConverter } from '../utils/utils';
import api from '../utils/api';

const PostPage = ({ posts }) => {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await api.getItem(8863);
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
            if (fetchedComment.hasOwnProperty('dead')) return false
            if (fetchedComment.hasOwnProperty('kids')) {
              fetchedComment.kids = await fetchComments(fetchedComment);
            }
            return fetchedComment;
          })
        );
        return fetchedComments;
      }
    };

    try {
      if (currentPost.hasOwnProperty('id')) {
        fetchComments(currentPost).then((posts) => setComments(posts.filter(post => post && true)));
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPost]);


  let commetsContent = (
    <ul>
      {comments.map(comment => {
        if (comment) {

          if (comment.hasOwnProperty('kids')) {
            
          }

          return <li key={comment.id}>{comment.text}</li>
        }
      })}
    </ul>
  )

  return (
    <Page>
      {currentPost ? (
        <Container>
          <Row className="justify-content-md-center">
            <Col md={7}>
              <h1>{currentPost.title}</h1>
              <p className="text-muted">
                {timeConverter(currentPost.time)} by {currentPost.by} |
                Comments: {comments.length ? comments.length : 0}
              </p>
              {commetsContent}
            </Col>
          </Row>
        </Container>
      ) : null}
    </Page>
  );
};

export default PostPage;
