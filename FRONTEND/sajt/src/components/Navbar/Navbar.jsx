import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Navbar.css';
import logo from '../../images/logo.png'
import {IonIcon} from '@ionic/react'
import { homeOutline,person,logOutOutline} from 'ionicons/icons'
import { useStateContext } from '../../context/stateContext';
import { useNavigate } from 'react-router-dom';
import Home from "../../pages/Home/Home";

function Navbar({menuVisible,setMenuVisible}){
    const {user,setUser} = useStateContext();
    const navigate = useNavigate();
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const SCROLL_TRIGGER_PX = 0;
    useEffect(() => {
        function check() {
            setScrolled(window.scrollY > SCROLL_TRIGGER_PX);
        }
        console.log(window.location.pathname)
        if(window.location.pathname !== "/"){
            setScrolled(true);
        }else{
            setScrolled(false);

            window.addEventListener("scroll", check)
            return () => {
                window.removeEventListener("scroll", check);
            }
        }
    },[window.location.href])
    async function logout(){
        const res = await fetch('/api/users/logout',{
            method: 'POST'

        });
        const data = await res.json();
        if(!data.ok) throw new Error(data.message);
        setUser(null);
        navigate('/login')
    }
    return(
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "scrolled" : ""}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={"./img/hakatonlogo2.svg"} alt="Logo" width="70" height="70"
                         className="d-inline-block align-text-top"/>
                </a>
                <button className="navbar-toggler" type="button" onClick={() => setMenuVisible((value) =>!value)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/">Pocetna</Link>
                        <HashLink className="nav-link" to="/#about">O nama</HashLink>
                        <Link className="nav-link" to="/login">Korisnicki servis</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;