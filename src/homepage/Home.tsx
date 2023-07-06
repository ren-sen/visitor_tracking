import { FC } from 'react';
import Navbar from '../navbar/Navbar';
import logo from '../assets/buffalo-museum-regular.png';
import './Home.css';

const Home: FC = () => {
    return (
      <div className="home-container">
        <Navbar />
        <div className="home-body">
          <img src={logo} className="logo" />
          <button type="submit">
            Click here to go to the dashboard
          </button>
        </div>
      </div>
    );
  }
  
  export default Home;