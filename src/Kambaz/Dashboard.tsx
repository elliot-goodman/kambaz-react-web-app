import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/reactjs.jpg" width={200} />{" "}
            {/* Dashboard Title */}
            <div>
              {" "}
              {/* Published Courses */}
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3000/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/algorithm.jpg" width={200} />{" "}
            {/* Dashboard Title */}
            <div>
              {" "}
              {/* Published Courses */}
              <h5> CS3000 Algorithms </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/2341/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/computer.jpg" width={200} />{" "}
            {/* Dashboard Title */}
            <div>
              {" "}
              {/* Published Courses */}
              <h5> CS2341 Computers </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/4375/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/sports.jpg" width={200} /> {/* Dashboard Title */}
            <div>
              {" "}
              {/* Published Courses */}
              <h5> PSYC4375 Sports Psych </h5>
              <p className="wd-dashboard-course-title">Psychologist </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1000/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/101.jpg" width={200} /> {/* Dashboard Title */}
            <div>
              {" "}
              {/* Published Courses */}
              <h5> PSYC1000 Fundamentals </h5>
              <p className="wd-dashboard-course-title">Psychologist </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/2000/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/develop.jpg" width={200} />{" "}
            {/* Dashboard Title */}
            <div>
              {" "}
              {/* Published Courses */}
              <h5> PSYC2000 Developmental </h5>
              <p className="wd-dashboard-course-title">Psychologist </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1800/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/ancient.jpg" width={200} />{" "}
            {/* Dashboard Title */}
            <div>
              {" "}
              {/* Published Courses */}
              <h5> PHIL1800 Ancient </h5>
              <p className="wd-dashboard-course-title">Philosopher </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
