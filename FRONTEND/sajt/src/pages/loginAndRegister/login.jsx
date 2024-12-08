import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import { useStateContext } from "../../context/stateContext";
import "./loginAndRegister.css"
import Navigation from "../../components/Navigation/Navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormData = {
    username: "",
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
            
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }) 
            const json = await res.json();
            toast.success("Uspesno logovanje na esDnevnik");
            if(!res.ok) throw new Error(json.message);
            setTimeout(() => {
                navigate("/profile")
            }, 1000)

        }
        catch(error){
        }
    }
    return(
        <>
            <div className="formBg">
                <form onSubmit={handleSubmit} action="" id="login">
                    <div className="title">Prijavite se</div>
                    <div className="subtitle">Koristite nalog sa esdnevnika</div>
                    <div className="inputContainer">
                        <input id="username" name="username" value={formData.email} className="input" type="text"
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
            <ToastContainer />
        </>

    );
}

export default Login;