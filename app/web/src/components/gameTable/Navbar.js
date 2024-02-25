import React ,{ useState, useEffect }  from "react";
import './Navbar.css';
import { Link } from "react-router-dom";



function Navbar(){

    const Chips = 99999;
    {/*
    const Chips = () => {
        const [number, setNumber] = useState(null); 
        useEffect(() => {
          fetch('your_api_endpoint_here')
            .then(response => response.json())
            .then(data => setNumber(data.number))
            .catch(error => console.error('Error fetching number:', error));
        }, []); 
    }; */}
 
    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <div className="profile-panel">
                    <Link to="">
                        <img src="images/icons/profile-icon-black.png" alt="Icon" className="icon"/>
                        <span>Profile</span>  
                    </Link>
                </div>
            </div>
            
            <div className="current-chips-panel">
                {Chips}
            </div>

        </nav>
        
        </>
    )

}

export default Navbar;
