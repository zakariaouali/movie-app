import { Link } from "react-router-dom";
import "../css/Navbar.css";
export default function NavBar(){
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/" ><img src="movielogo.png" alt="" width='70px' />Zak4movie</Link>
        </div>
        <div className="navbar-links">
            <Link className="nav-link" to="/" >Home</Link>
            <Link to="/favorites" className="nav-link" >Favorites</Link>
        </div>
    </nav>
}