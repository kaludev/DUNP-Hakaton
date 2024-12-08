import React from 'react';
import "./About.css"
import {Link} from "react-router-dom";
const About = () => {
    return (
        <section className="about" id="about">
            <h1>O nama</h1>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="custom-card content-left">
                            <h1>Edukacija</h1>
                            <p style={{marginBottom: "11%"}}>Na nasem sajtu mozete preuzimati sve materijale koje
                                nastavnik okaci za svoje ucenike i biti obavesteni o novijim informacijama</p>
                            <img src="img/elogo.svg"/>
                            <Link to="/boravak">Saznaj vise</Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="custom-card content-center">
                            <h5>Boravak</h5>
                            <p style={{marginBottom: "17%"}}>Pre ili nakon nastave, zakazite vreme u boravku za svoje
                                djake, koji ce se zajedno sa ostalom decom druziti i uciti uz svoje nastavnike.</p>
                            <img src="img/rest.svg"/>
                            <Link to="/boravak">Saznaj vise</Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="custom-card content-right">
                            <h1>Vannastavne aktivnosti</h1>
                            <p style={{marginBottom: "11%"}}>U slucaju slobodnog vremena opisite sta Vas osnovac najvise
                                voli nakon skole i selktujte kojoj aktivnosti van nastave bi se najbolje uklopio.</p>
                            <img src="img/enjoy.svg"/>
                            <Link to="/boravak">Saznaj vise</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About