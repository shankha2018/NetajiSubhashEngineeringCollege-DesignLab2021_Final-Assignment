import React, {useEffect, useState, useContext, useRef} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import ReactTooltip from "react-tooltip";

import {UserContext} from '../../App';

const Profile = () => {
    const editNameModal = useRef(null);
    const editPhoneModal =useRef(null);
    const changePasswordModal = useRef(null);
    const profileDropdown = useRef(null);
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);
    const [url,setUrl] = useState(undefined);
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [prevPassword,setPrevPassword] = useState("");
    useEffect(()=>{
        M.Modal.init(editNameModal.current);
        M.Modal.init(editPhoneModal.current);
        M.Modal.init(changePasswordModal.current);
        M.Dropdown.init(profileDropdown.current,{inDuration: 300, outDuration: 225});
    },[]);
    useEffect(()=>{
        if(url){
            // Update Request to Backend
            fetch('/updatepic',{
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    pic: url
                })
            }).then(res=>res.json())
            .then(result=>{
                if(result.error){
                    M.toast({html: result.error, classes: "#f44336 red"});
                }else{
                    localStorage.setItem("user", JSON.stringify({...state, pic: result.pic}));
                    dispatch({type:"UPDATEPIC", payload:{pic: result.pic}});
                    M.toast({html: "Profile pic updated!", classes: "#ab47bc purple lighten-1"});
                }
            })
        }
    },[url]);
    const updatePhoto = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setUrl(reader.result);
        }
    }
    const updateName = () => {
        fetch('/updatename',{
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                name: name.trim()
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                M.toast({html: result.error, classes: "#f44336 red"});
            }else{
                localStorage.setItem("user", JSON.stringify({...state, name: result.name}));
                dispatch({type:"UPDATENAME", payload:{name: result.name}});
                M.toast({html: "Profile name updated!", classes: "#1a237e indigo darken-4"});
            }
        })
    }
    const updatePhone = () => {
        fetch('/updatephone',{
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                phone: phone.trim()
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                M.toast({html: result.error, classes: "#f44336 red"});
            }else{
                localStorage.setItem("user", JSON.stringify({...state, phone: result.phone}));
                dispatch({type:"UPDATEPHONE", payload:{phone: result.phone}});
                M.toast({html: "Phone no  name updated!", classes: "#1a237e indigo darken-4"});
            }
        })
    }
    const changePassword = () => {
        fetch('/changepassword',{
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                prev: prevPassword,
                password
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                M.toast({html: result.error, classes: "#f44336 red"});
            }else{
                M.toast({html: result.message, classes: "#1a237e indigo darken-4"});
            }
        })
    }

    return (
        <div className="profile">
            <div className="profile-card" style={{borderBottom:"2px solid #0d47a1"}}>
                <div className="profile-card-plate">
                    <div className="profile-pic-plate">
                        <img className="profile-pic" src={state? state.pic: "loading.."} alt="profile-pic"/>
                        <div className="file-upload file-field input-field update-pic" style={{margin: "10px"}}>
                            <div className="btn-floating #0d47a1 blue darken-4 upload-pic-button">
                                <i className="material-icons">photo_camera</i>
                                <input type="file" accept='image/*' onChange={(e)=>updatePhoto(e.target.files[0])} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="profile-info">
                        <h5 className="profile-info-profilename">
                            {state? state.name : "loading..."}
                            <i  
                                ref={profileDropdown}
                                data-target='profile-dropdown'
                                className="material-icons dropdown-trigger profile-setting-tag"
                                data-tip="More" data-background-color="#0d47a1"
                            >more_vert</i>
                            <ReactTooltip />
                        </h5>
                        <h5 style={{color:'#0d47a1'}} className="profile-info-profilephone">
                        <i className ="material-icons">call</i>
                            &nbsp;&nbsp;  {state? state.phone : "loading..."}
                        </h5>
                        <h6 style={{color:'#0d47a1'}}>{state? state.email : "loading..."}</h6>
                        
                        

                    </div>
                </div>
            </div>
            <div id="edit-name-modal" className="modal" ref={editNameModal} style={{color: "#5e35b1"}}>
                <div className="modal-content">
                    <h4>Update Profile Name</h4>
                    <input 
                        type='text'
                        placeholder={state? state.name : "loading..."}
                        value={name ? name : ""}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" 
                        onClick={()=>{
                            setName("");
                        }}
                    >Close</button>
                   <button className="waves-effect waves-green btn-flat" 
                    onClick={()=>{
                        updateName();
                        M.Modal.getInstance(editNameModal.current).close();
                        setName("");
                    }}
                   >Update</button>
                </div>
            </div>
            <div id="edit-phone-modal" className="modal" ref={editPhoneModal} style={{color: "#5e35b1"}}>
                <div className="modal-content">
                    <h4>Update Phone No</h4>
                    <input 
                        type='text'
                        placeholder={state? state.phone : "loading..."}
                        value={phone ? phone : ""}
                        onChange={(e)=>setPhone(e.target.value)}
                    />
            </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" 
                        onClick={()=>{
                            setPhone("");
                        }}
                    >Close</button>
                   <button className="waves-effect waves-green btn-flat" 
                    onClick={()=>{
                        updatePhone();
                        M.Modal.getInstance(editPhoneModal.current).close();
                        setPhone("");
                    }}
                   >Update</button>
                </div>
            </div>

            <div id="change-password-modal" className="modal" ref={changePasswordModal} style={{color: "#5e35b1"}}>
                <div className="modal-content">
                    <h4>Change Password</h4>
                    <input 
                        type='text'
                        placeholder="Enter your previous password"
                        value={prevPassword}
                        onChange={(e)=>setPrevPassword(e.target.value)}
                    />
                    <input 
                        type='text'
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" 
                        onClick={()=>{
                            setPassword("");
                            setPrevPassword("");
                        }}
                    >Close</button>
                   <button className="waves-effect waves-green btn-flat" 
                    onClick={()=>{
                        changePassword();
                        M.Modal.getInstance(changePasswordModal.current).close();
                        setPassword("");
                        setPrevPassword("");
                    }}
                   >Change Password</button>
                </div>
            </div>
            <div>
                <ul id='profile-dropdown' className='dropdown-content'>
                    <li key="2">
                        <span 
                            data-target="edit-name-modal" 
                            className="modal-trigger"
                        >Change Profile Name</span>
                    </li>
                    <li key="3">
                        <span 
                            data-target="edit-phone-modal" 
                            className="modal-trigger"
                        >Change Phone No</span>
                    </li>
                    <li key="4">
                        <span 
                            data-target="change-password-modal" 
                            className="modal-trigger"
                        >Change Password</span>
                    </li>
                    <li 
                        key="5"
                        onClick={()=>{
                            localStorage.clear();
                            dispatch({type: "CLEAR"});
                            M.toast({html: "Successfully logged out.", classes: "#e57373 red lighten-2"});
                            history.push('/signin');
                        }}
                    >
                        <Link to='/signin'><i className="material-icons">exit_to_app</i>Log Out</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;