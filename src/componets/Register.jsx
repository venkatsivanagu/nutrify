import React, { useState } from 'react'
import { Link } from 'react-router-dom'

 
const Register = () => {

    const [data,setdata]=useState({
        name:"",
        username:"",
        password:"",
        email:""
     })

     const [message,setmessage]=useState({
        type:"invisible-msg",
        text:""
     })
     function handleInput(e){
        setdata({...data,[e.target.name]:e.target.value})
        
    
     }
      function handleSubmit(e){
        e.preventDefault()
        console.log(data)
        setdata({name:"",username:"",password:"",email:""})

        fetch('http://localhost:4000/register',{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data);
            // alert(data.message);
            setmessage({type:"success",text:data.message});
            setTimeout(() => {
                setmessage({type:"invisible-msg",text:"dummy msg"})
            }, 3000);

        })
        .catch((err)=>{
           console.log(err);
        })
        
      }
    
  return (
    <section className='container register-page'>
        <form className='form' onSubmit={handleSubmit}>
            <h1 style={{color:"#6ff3c0" ,fontSize:"35px"}}>Start your fitness</h1>
            <input type='text' className='inp' required placeholder='Enter Name' name="name" value={data.name} onChange={handleInput} />
            <input type='text' className='inp' required placeholder='Enter Username' name="username" value={data.username} onChange={handleInput}/>
            <input type='password' className='inp' placeholder='Enter password' name="password" value={data.password} onChange={handleInput} />
            <input type='email' className='inp' placeholder='Enter email' name="email" value={data.email}  onChange={handleInput} />
            <button className='btn' >Register</button>
            <p>Already Registed ? <Link to='/login' >Login</Link></p>
            <p className={message.type}>{message.text}</p>
        </form>
    </section>
  )
}

export default Register
