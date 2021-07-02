import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';


const Signup = () => {
    const history = useHistory();
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const UploadSignupData = () => {
        fetch("/signup",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.trim(),
                phone: phone.trim(),
                email: email.trim().toLowerCase(),
                password: password,
                pic: undefined
            })
        }).then(res=>res.json())
        .then((data)=>{
            // console.log(data);
            if(data.error){
                M.toast({html: data.error, classes: "#f44336 red"});
            }else{
                M.toast({html: data.message, classes: "#ab47bc purple lighten-1"});
                history.push('/signin');
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    const PostData = () => {
        UploadSignupData();
    };
    return (
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h2>Sign Up</h2>
                <input 
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <input 
                    type='text'
                    placeholder='Phone'
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                />
                <input 
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button 
                    className="btn waves-effect waves-light #5e35b1 deep-purple darken-1"
                    onClick={()=>PostData()}
                >
                    Signup
                </button>
                <h6 className='sign-link'><Link to='/signin'>Already have an account ?</Link></h6>
            </div>
        </div>
    );
}

export default Signup;