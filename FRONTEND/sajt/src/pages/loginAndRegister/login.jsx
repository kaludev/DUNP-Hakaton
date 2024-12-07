import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import { useStateContext } from "../../context/stateContext";
import "./loginAndRegister.css"
import Navigation from "../../components/Navigation/Navigation";

const initialFormData = {
    email: "",
    password: ""
}
function Login(){
    const [formData,setFormData] = useState(initialFormData);
    const navigate = useNavigate();
    const {setUser} = useStateContext();
    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    

    async function handleSubmit(e){
        e.preventDefault();
        try{
            
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }) 
            const json = await res.json();
            if(!json.ok) throw new Error(json.message);
            setUser(json.user);
            navigate("/")
        }
        catch(error){
            alert(error);
        }
    }
    return(
        <>
            <Navigation/>
            <div className="formBg">
                <form onSubmit={handleSubmit} action="" id="login">
                    <div className="title">Prijavite se</div>
                    <div className="subtitle">Koristite nalog sa esdnevnika</div>
                    <div className="inputContainer">
                        <input id="username" name="email" value={formData.email} className="input" type="text"
                               placeholder="" onChange={handleChange}/>
                        <div className="cut"></div>
                        <label htmlFor="username" className="placeholder">Email</label>
                    </div>
                    <div className="inputContainer">
                        <input id="password" className="input" name="password" value={formData.password} type="password"
                               placeholder="" onChange={handleChange}/>
                        <div className="cut"></div>
                        <label htmlFor="password" className="placeholder">Password</label>
                    </div>
                    <div className="btn">
                        <button type="submit" className="submit">Prijavite se</button>
                    </div>
                </form>
                <div className="formImg">
                </div>
            </div>
        </>

    );
}

export default Login;