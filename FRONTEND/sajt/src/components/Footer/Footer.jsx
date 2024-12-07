import React from 'react';
import "./Footer.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Footer() {
    return (
        <footer id="contact-us">
            <div className="container">
                <div className="footer-content">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="contact-form">
                                <form id="contact" action="" method="post">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <fieldset>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    id="name"
                                                    placeholder="Ime"
                                                    required=""
                                                    style={{ backgroundColor: 'rgba(250, 250, 250, 0.3)' }}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <fieldset>
                                                <input
                                                    name="email"
                                                    type="text"
                                                    id="email"
                                                    placeholder="E-Mail Adresa"
                                                    required=""
                                                    style={{backgroundColor: 'rgba(250, 250, 250, 0.3)'}}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="col-lg-12">
                                            <fieldset>
                        <textarea
                            name="message"
                            rows="6"
                            id="message"
                            placeholder="Vasa poruka"
                            required=""
                            style={{ backgroundColor: 'rgba(250, 250, 250, 0.3)' }}
                        ></textarea>
                                            </fieldset>
                                        </div>
                                        <div className="col-lg-12">
                                            <fieldset>
                                                <button
                                                    type="submit"
                                                    id="form-submit"
                                                    className="main-button"
                                                >
                                                    Posalji poruku
                                                </button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="right-content col-lg-6 col-md-12 col-sm-12">
                            <h2>Saznaj vise o <em>Moj osnovac</em></h2>
                            <p>
                                Lakse upravljajte vasim obrazovanjem.
                                <a
                                    rel="nofollow"
                                    href="https://lukavukovic.com"
                                    target="_parent"
                                >Kontaktirajte nas</a
                                >
                            </p>
                            <ul className="social">
                                <li>
                                    <a href="https://lukavukovic.com"
                                    ><FontAwesomeIcon icon="fa-brands fa-facebook" /></a>
                                </li>
                                <li>
                                    <a href="#"><FontAwesomeIcon icon="fa-brands fa-twitter" /></a>
                                </li>
                                <li>
                                    <a href="#"><FontAwesomeIcon icon="fa-brands fa-linkedin" /></a>
                                </li>
                                <li>
                                    <a href="#"><FontAwesomeIcon icon="fa-solid fa-rss" /></a>
                                </li>
                                <li>
                                    <a href="#"><FontAwesomeIcon icon="fa-brands fa-dribbble" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="sub-footer">
                            <p>
                                Copyright &copy; 2024 Tvoja Skola | Designed by
                                <a rel="nofollow" href="https://lukavukovic.com">Tvoja skola</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;