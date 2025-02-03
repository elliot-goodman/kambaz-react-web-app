import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col
            xs={4}
            md={3}
            lg={2}
            xl={1}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/reactjs.jpg"
                  width={200}
                  height={160}
                />{" "}
                {/* Dashboard Title */}
                <Card.Body>
                  {" "}
                  {/* Published Courses */}
                  <Card.Title> CS1234 React JS </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Full Stack software developer{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col
            xs={4}
            md={3}
            lg={2}
            xl={1}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                to="/Kambaz/Courses/3000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/algorithm.jpg"
                  width={200}
                  height={160}
                />{" "}
                {/* Dashboard Title */}
                <Card.Body>
                  {" "}
                  {/* Published Courses */}
                  <Card.Title> CS3000 Algorithms </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Full Stack software developer{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col
            xs={4}
            md={3}
            lg={2}
            xl={1}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                to="/Kambaz/Courses/2341/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/computer.jpg"
                  width={200}
                  height={160}
                />{" "}
                {/* Dashboard Title */}
                <Card.Body>
                  {" "}
                  {/* Published Courses */}
                  <Card.Title> CS2341 Computers </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Full Stack software developer{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col
            xs={4}
            md={3}
            lg={2}
            xl={1}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                to="/Kambaz/Courses/4375/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/sports.jpg"
                  width={200}
                  height={160}
                />{" "}
                {/* Dashboard Title */}
                <Card.Body>
                  {" "}
                  {/* Published Courses */}
                  <Card.Title> PSYC4375 Sports Psych </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Psychologist{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col
            xs={4}
            md={3}
            lg={2}
            xl={1}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                to="/Kambaz/Courses/1000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/101.jpg"
                  width={200}
                  height={160}
                />{" "}
                {/* Dashboard Title */}
                <Card.Body>
                  {" "}
                  {/* Published Courses */}
                  <Card.Title> PSYC1000 Fundamentals </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Psychologist{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col
            xs={4}
            md={3}
            lg={2}
            xl={1}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                to="/Kambaz/Courses/2000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/develop.jpg"
                  width={200}
                  height={160}
                />{" "}
                {/* Dashboard Title */}
                <Card.Body>
                  {" "}
                  {/* Published Courses */}
                  <Card.Title> PSYC2000 Developmental </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Psychologist{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col
            xs={4}
            md={3}
            lg={2}
            xl={1}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                to="/Kambaz/Courses/1800/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/ancient.jpg"
                  width={200}
                  height={160}
                />{" "}
                {/* Dashboard Title */}
                <Card.Body>
                  {" "}
                  {/* Published Courses */}
                  <Card.Title> PHIL1800 Ancient </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Philosopher{" "}
                  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
