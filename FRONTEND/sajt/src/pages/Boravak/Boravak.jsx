import React from 'react';
import { useEffect, useState } from "react";
import "./Boravak.css"
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";


const Boravak = () => {
    const [yourLocation, setYourLocation] = useState({lat: 43.138106, lng: 20.521078});
    return (
        <div className="main container row justify-content-center d-flex">
            <div className="col-6">
                <h1 className="heading">Boravci</h1>
                <h2 className="subheading">Ukoliko ste zadrzani na poslu ili niste u mogucnosti da odmah pokupite svog
                    osnovca, kod nas mozete resiti taj problem. Na mapi su prikazani svi boravci u blizni, kao i kontakt
                    informacije poput naziva, telefona i sajta. Za odabir boravka je dovoljno da iskoristite vec poznate
                    informacije o njima.</h2>
            </div>
            <div className="col-6">
                <MapContainer center={[yourLocation.lat, yourLocation.lng]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[yourLocation.lat, yourLocation.lng]}>
                        <Popup>
                            Vaša lokacija
                        </Popup>
                    </Marker>
                    <Marker position={[44.79453655063028, 20.494931847131586]}>
                        <Popup>
                            <p>Produženi boravak Naša Bajka</p>
                            <p>Br.Tel: <a href="tel:0112406309">0112406309</a></p>
                            <p>web-sajt: <a href="https://www.boravaknasabajka.co.rs/">sajt </a></p>

                        </Popup>
                    </Marker>
                    <Marker position={[44.79449764309369, 20.500779471206567]}>
                        <Popup>
                            <p>Produzeni boravak Zvezdarac</p>
                            <p>Br.tel:<a href="tel:0616601082">0616601082</a></p>
                            <p>web-sajt: <a href="http://www.zvezdarac.rs/">sajt </a></p>
                        </Popup>
                    </Marker>
                    <Marker position={[44.79437206926728, 20.475788504474128]}>
                        <Popup>
                            <p>Produženi boravak Slonce</p>
                            <p>Br.tel:<a href="tel:0616601082">0616601082</a></p>
                            <p>web-sajt: <a href="http://www.zvezdarac.rs/">sajt </a></p>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

        </div>
    );
};

export default Boravak;