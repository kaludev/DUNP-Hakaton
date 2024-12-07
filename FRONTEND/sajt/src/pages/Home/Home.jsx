import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useStateContext} from "../../context/stateContext"
import './Home.css';
import Hero from "../../components/Hero/Hero";
import Navigation from "../../components/Navigation/Navigation";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
function Home() {
    const navigate = useNavigate();
    
    const {user} = useStateContext();
    return(
        <>
            <Navigation />
            <main>
                <Hero/>
                <About/>
            </main>
            <Footer/>
        </>
    )
}

export default Home;