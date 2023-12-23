import React, { useEffect, useState } from "react";
import summer from"./images/summer.jpg"
import winter from "./images/winter.jpg"
import "./App.css"



const App=()=>{
    const[longitude,setLongitude]=useState(0);
    const[latitude,setLatitude]=useState(0);
    const[hemisphere,setHemisphere]=useState(0);
    const[month,setMonth]=useState(()=>{
        return new Date().getMonth()+1
    })

    // this will call fetch function only once when the page is loaded
    useEffect(()=>{
        fetchLocation();
    },[])

    function fetchLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude);


                    if(position.coords.longitude>0){
                        setHemisphere("Northen Hemisphere")
                    }
                    else if(position.coords.longitude<0){
                        setHemisphere("Southern Hemisphere")
                    }
                    else{
                        setHemisphere("Equator")
                    }
                }
            )
        }
        else{
            alert("Geolocation not Found")
        }
    }


    return(
        <div id="main">
            {/* <button onClick={fetchLocation}>Fetch Location</button> */}
            <h1>Latitude : {latitude}</h1>
            <h1>Longitude : {longitude}</h1>
            <h1>Hemisphere : {hemisphere}</h1>
            <h1>Month: {month}</h1>
            {
                hemisphere&&((hemisphere==="Northen Hemisphere"&&month>=4&&month<=10)||
                (hemisphere==="Southern Hemisphere"&&(month<4||month>10)))&&(
                    <div>
                        <h1>Summer Season</h1>
                        <img src={summer} alt="summer"/>
                    </div>
                )
            }
            {
                hemisphere&&((hemisphere==="Northen Hemisphere"&&(month<4||month>10))||
                (hemisphere==="Southern Hemisphere"&&month>=4&&month<=10))&&(
                    <div>
                        <h1>Winter Season</h1>
                        <img src={winter} alt="winter "/>
                    </div>
                )
            }

        </div>
    )
}

export default App