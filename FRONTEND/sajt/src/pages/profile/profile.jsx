import React, {useEffect, useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import "./profileStyle.css"
import Navbar from "../../components/Navbar/Navbar";
import {IonIcon} from '@ionic/react'
import {cloudUploadOutline} from 'ionicons/icons'
import {useStateContext} from "../../context/stateContext";
function Profiles(){
    const {user} = useStateContext()
    const [data, setData] = useState({})
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
    return (
        data?.user?.ime?<>
            <h2>Ime učenika: {data.user.ime}</h2>


        </>:<></>
    )
}


export default Profiles;