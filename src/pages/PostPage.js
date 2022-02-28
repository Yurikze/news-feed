import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const PostPage = ({ posts }) => {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const post = posts.find((post) => {
      return post.id === parseInt(postId);
    });
    setCurrentPost(post);
  }, [postId, posts]);

  return currentPost ? (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={7}>
          <h1 className="heading">{currentPost.title}</h1>
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default PostPage;
