import React from 'react';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Hero.css"

const Hero = () => {
    return (
        <container>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="img/p1.jpg" className="d-block w-100" alt="..." style={{filter: "brightness(50%)"}}/>
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Moj osnovac</h1>
                            <p>Platforma na kojoj mozete saznati sve aktivnosti o vaseg deteta.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="img/p2.jpg" className="d-block w-100" alt="..." style={{filter: "brightness(50%)"}}/>
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Ocenjivanje djaka</h1>
                            <p>Imate povezan elektronski dnevnik koji automatski analizira ocene.</p>
                            <p>U slucaju privatne nastave, kontaktirajte nastavnika.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="img/p3.jpg" className="d-block w-100" alt="..." style={{filter: "brightness(50%)"}}/>
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Nauci nesto novo</h1>
                            <p>U odeljku "Edukacija" pruzite vasem detetu nova znanja i olaksajte ucenje.</p>
                        </div>
                    </div>
                </div>
            </div>
        </container>
    )
}

export default Hero