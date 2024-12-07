import React from 'react';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./Hero.css"

const Hero = () => {
    return (
        <Carousel className={"carousel"} infiniteLoop={true} showThumbs={false} dynamicHeight={true} interval={1500} autoPlay={true} showStatus={false} showIndicators={false} showArrows={false}>
            <div className=" carousel img1">
            </div>
            <div className=" carousel img2">
            </div>
            <div className=" carousel img3">
            </div>
        </Carousel>
    )
}

export default Hero