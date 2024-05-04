import './Class.css';
import { useNavigate } from 'react-router-dom';
function Class() {
  const navigate = useNavigate();

  return (
    <div className="Schedule">
    <form>
      <h1>Class Form</h1>
        <div class="container">
          <button type="submit" onClick={() => navigate('/Provider')}>Create Your Class</button>
      </div>
      </form>
    </div>
  );
}

export default Class;
