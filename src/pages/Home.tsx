import logo from './logo.svg';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          Edit <code>src/Home.tsx</code> and save to reload.
        </p>
        <Link
          to="./weekly-timetable"
          className="Home-link"
          rel="noopener noreferrer"
        >
          Weekly Timetable
        </Link>
      </header>
    </div>
  );
}

export default Home;
