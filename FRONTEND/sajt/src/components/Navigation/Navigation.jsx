import React from 'react';
import Nav from "../Navbar/Navbar";
import SideNav from "../Sidenav/Sidenav";
import { useEffect, useState } from "react"
import {useParams} from "react-router-dom";

const Navigation = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    useEffect(() => {setMenuVisible(false)},[window.location.href]);
    return (
        <div>
            <Nav setMenuVisible={setMenuVisible} />
            <SideNav menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </div>

    )
}

export default Navigation