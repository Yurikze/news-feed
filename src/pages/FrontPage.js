import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Page from '../components/Page/Page';

const FrontPage = () => {
  return (
    <Page>
      <Container>
        <Row>
          <Col md={7}>
            <Card>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Score
                </Card.Subtitle>
                <Card.Text>
                  Author
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">Card Date</Card.Footer>
            </Card>
          </Col>
          <Col md={7}>
            <Card>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Score
                </Card.Subtitle>
                <Card.Text>
                  Author
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">Card Date</Card.Footer>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </Page>
  );
};

export default FrontPage;
