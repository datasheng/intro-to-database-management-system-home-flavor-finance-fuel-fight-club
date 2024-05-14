import './Class.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import "./home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
function Class() {
  const navigate = useNavigate();

  return (
    <div className="home-header">
      <header className="navbarContainer home-navbar-interactive">
        <span className="logo">Life Balance</span>
        <div className="home-desktop-menu">
          <nav className="home-links">
            <span className="home-nav" onClick={() => navigate('/')}>Home</span>
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                Services
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/FurssanFC')}>Furssan FC</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/HomeFlavors')}>Home Flavors</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/FinanceFuel')}>Finance Fuel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <span className="home-nav" onClick={() => navigate('/schedule')}>Book Appointment</span>
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer"  style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="home-nav">Contact Us</span>
            </a>
          </nav>
          <button className="home-login buttonFlat" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </header>
    <div className="Schedule">
    <form>
      <h1>Class Form</h1>
        <div class="container">
          <button type="submit" onClick={() => navigate('/Provider')}>Create Your Class</button>
      </div>
      </form>
    </div>
    </div>
  );
}

export default Class;
