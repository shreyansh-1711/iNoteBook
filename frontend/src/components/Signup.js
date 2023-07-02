import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"; 

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    let navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const {name, email, password}= credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}),
          });
          const json=await response.json();
          console.log(json)
          if(json.success){
              //Save authtoken and redirect
              localStorage.setItem('token', json.authtoken)
              navigate("/")
              props.showAlert("Account created successfully!", "success")
          }else{
            props.showAlert("Invalid details", "danger")
          }
          
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container mt-3'>
            <h2>Signup to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" placeholder="Enter name" onChange={onChange} />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={onChange} required minLength={5} />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Confirm Password" onChange={onChange} required minLength={5} />
                </div>
                
                <button type="submit" className="btn btn-dark my-2">Submit</button>
            </form>
        </div>
    )
}

export default Signup
