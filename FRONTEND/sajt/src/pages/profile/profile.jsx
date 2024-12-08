import React, {useEffect, useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import "./profileStyle.css"
import Navbar from "../../components/Navbar/Navbar";
import {IonIcon} from '@ionic/react'
import {cloudUploadOutline} from 'ionicons/icons'
import {useStateContext} from "../../context/stateContext";
function Profiles(){
    const {user} = useStateContext()
    const [checked,setChecked] = useState(-1);
    const [data, setData] = useState({})
    const preferences = ['fudbal', 'kosarka', 'odbojka', 'balet','frula'];
    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:5000/api/users/profile',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                })
            const data = await response.json()
            console.log(data)
            setData(data)
        })()
    },[])
    const handlePreferenceClick = (e) => {
        console.log(e.target.id)
        setChecked(preferences.indexOf(e.target.id));
        console.log(checked)
    }
    return (
        <div>
            data?.user?.ime&&<div className="profile">
                <h2>Ime učenika: {data?.user?.ime}</h2>
                {data?.grades?.map((grade,index) => (
                    <div className={"grade"} key={index}>
                        <h5>{grade.naziv}</h5>
                        <h5>{Math.round(grade.ocena*100)/100}</h5>
                    </div>
                ))}


            </div>
            <div className="profile">
                <div id="fudbal" onClick={handlePreferenceClick} className={`grade ${checked==0 ?"clicked":""}`}><h5>Fudbal</h5></div>
                <div id="kosarka" onClick={handlePreferenceClick} className={`grade ${checked==1? "clicked":""}`}><h5>Kosarka</h5></div>
                <div id="odbojka" onClick={handlePreferenceClick} className={`grade ${checked==2 ? "clicked":""}`}><h5>Odbojka</h5></div>
                <div id="balet" onClick={handlePreferenceClick} className={`grade ${checked==3 ? "clicked":""}`}><h5>Balet</h5></div>
                <div id="frula" onClick={handlePreferenceClick} className={`grade ${checked==4 ? "clicked":""}`}><h5>Frula</h5></div>
            </div>
        </div>
        )
}


export default Profiles;