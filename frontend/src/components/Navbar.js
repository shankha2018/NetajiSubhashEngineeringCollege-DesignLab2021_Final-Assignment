import React, {useContext, useRef, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
import '../App.css';

import {UserContext} from '../App';

const NavBar = () => {
    const searchModal = useRef(null);

    const {state, dispatch} = useContext(UserContext);
 
    const history = useHistory();
    let sidenav = document.querySelector('.sidenav');
    M.Sidenav.init(sidenav, {});
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])
    const renderList = () => {
        if(state){
            return [
               
        
                <li key="3"><Link to="/profile">Profile</Link></li>,
                <li key="5">
                    <button className="btn waves-effect waves-light #0d47a1 blue darken-4 logout-button"
                        onClick={()=>{
                            localStorage.clear();
                            dispatch({type: "CLEAR"});
                            M.toast({html: "Successfully logged out.", classes: "#e57373 red lighten-2"});
                            history.push('/signin');
                        }}
                    >
                        Logout
                    </button>
                </li>
            ];
        }else{
            return [
                <li key="6"><Link to="/signin">Sign in</Link></li>,
                <li key="7"><Link to="/signup">Sign up</Link></li>
            ];
        }
    }

    return (
        <nav className="#b3e5fc light-blue lighten-4 mynavbar">
            <div className="nav-wrapper container">
            <Link to={state ? "/":"/signin"} className="brand-logo left my-logos">

                Profile App
            </Link>
            {
                user ? 
                <Link className="sidenav-trigger right" data-target="mobile-menu">
                    <i className="material-icons">menu</i>
                </Link> : ""
            }
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {renderList()}
            </ul>
            <ul className="sidenav #b3e5fc light-blue lighten-4" id="mobile-menu">
                <li>
                    <div className="user-view">
                        { user ?
                        <>
                            <div>
                            <Link to="/profile"><img className="circle" src={user.pic} alt={user.name} /></Link>
                            <Link to="/profile"><span className="sidenav-info name">{user.name}</span></Link>
                                <span className="sidenav-info email">{user.email}</span><hr/>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <span className="sidenav-info name"><b>Profile App</b></span>
                                <hr/>
                            </div>
                        </>
                        }
                    </div>
                </li>
                {renderList()}
            </ul>
            </div>
        </nav>
    );
}

export default NavBar;