import { FC } from 'react';
import './Navbar.css';

const Navbar: FC = () => {
    return (
        <div className="navbar">
          <div className="row-left">
            <a href="/" className="col-left">BMS Visitor Tracker</a>
          </div>
          <div className="row-right">
            <a href="/dashboard" className="col-right">Dashboard</a>
            <a href="/about" className="col-right">About</a>
            <a href="/dashboard" className="col-right">Contact Us</a>
          </div>
        </div>
    );
}

export default Navbar;