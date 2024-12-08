import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import {useStateContext} from "../../context/stateContext";
function Home() {
    const navigate = useNavigate();
    
    const {user} = useStateContext();
    return(
        <>

            <main>
                <Hero/>
                <About/>
            </main>
        </>
    )
}

export default Home;