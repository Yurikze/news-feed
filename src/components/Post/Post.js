import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { timeConverter } from '../../utils/utils';
import { Link } from 'react-router-dom';
import style from './Post.module.scss';

const Post = ({ title, score, author, time, id }) => {
  return (
    <Col className="mb-4" md={7}>
      <Link className={style.post__link} to={`/${id}`}>
        <Card>
          <Card.Body>
            <Card.Title className='mb-3'>{title}</Card.Title>
            <Card.Subtitle className="text-muted">
              Score: {score}
            </Card.Subtitle>
          </Card.Body>
          <Card.Footer className="text-muted">
            {timeConverter(time)} by {author}
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  );
};

export default Post;
