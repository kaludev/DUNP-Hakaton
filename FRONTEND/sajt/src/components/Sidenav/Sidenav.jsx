import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';
import { useStateContext } from '../../context/stateContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Sidenav({menuVisible,setMenuVisible}){
    const {user,setUser} = useStateContext();
    const navigate = useNavigate();
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if(windowSize.width > 1024) setMenuVisible(false)
    }, [windowSize.width])

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
        <div className={`sidebar ${menuVisible ? "sidebarvisible" : ""}`}>
            <div className={`sidebarlinks`}>
                <div className={`menuiconclose ${menuVisible ? "showx": ""}`}
                     onClick={() => setMenuVisible(false)}>
                    <FontAwesomeIcon icon="times" />
                </div>
                <div className="sidenav">
                    <ul>
                        <li>
                            <Link className="sidenavlink" to="/about">O Nama</Link>
                        </li>
                        <li>
                            <Link className="sidenavlink" to="/arena">Arena</Link>
                        </li>
                        <li>
                            <Link className="sidenavlink" to="/ranglist">Rang Lista</Link>
                        </li>
                        <li>
                            <Link className="sidenavlink" to="/activities">Moje aktivnosti</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidenav;