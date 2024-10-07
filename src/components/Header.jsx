/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import {signInWithGoogle} from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import{ setUser } from '../features/user/userSlice';


const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 10px;
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px

    ${'' /* esto es para que funcione el @media, necesita una linea de código antes*/}
    h6 {};

    @media (max-width: 768px) {
    display: none;
    }

    a {
        align-items: center;
        display: flex;
        padding: 0 10px; 

        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }
            
        span {
            color: rgb(249,249,249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &:before {
                background-color: #f9f9f9;
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: "";
                height: 2px;
                left: 0px;
                opacity: 0;
                position: absolute;
                right: 0px;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
                width: auto;

            }
        }

        &:hover {
            span:before {
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }
    }

`;

const Sign = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
        cursor: pointer;
    }
`;

const UserImg = styled.img`
    height: 100%;
`;

//declarando DropDown y SignOut con styled components.
const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    ${UserImg} {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;

const Header = ({ onSignIn }) => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const user = useSelector((state) => state.user);
    const [isSignedIn, setIsSignedIn] = useState(false);
  
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsSignedIn(user.name !== '');
            dispatch(setUser  (JSON.parse(user)));
        }
    }, []);
      
    // Cuando se inicia sesión
    const handleSignIn = async () => {
        const user = await signInWithGoogle();
        if (user) {
          const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          };
          dispatch(setUser  (userData));
          localStorage.setItem('user', JSON.stringify(userData));
          setIsSignedIn(true);
          history('/home', { replace: true });
        }
    };
      
    // Cuando se cierra sesión
    const handleSignOut = () => {
        dispatch(setUser  ({ name: '', email: '', photo: '' }));
        localStorage.removeItem('user');
        setIsSignedIn(false);
        history('/', { replace: true });
    };

    return (
        <Nav className="header">
        
            <Logo>
                <img src='/images/background-video.png' alt='video'/>
            </Logo>

          {!isSignedIn ? (
                <Sign onClick={handleSignIn}>Login</Sign>) : 
                (<>

                <NavMenu>
                    <a href="/home">
                        <img src="/images/home-icon.svg" alt="home"/>
                        <span>HOME</span>
                    </a>
                    <a href="/home">
                        <img src="/images/search-icon.svg" alt="search"/>
                        <span>SEARCH</span>
                    </a>
                    <a href="/home">
                        <img src="/images/watchlist-icon.svg" alt="watchlist"/>
                        <span>WATCHLIST</span>
                    </a>
                    <a href="/home">
                        <img src="/images/original-icon.svg" alt="originals"/>
                        <span>ORIGINALS</span>
                    </a>
                    <a href="/home">
                        <img src="/images/movie-icon.svg" alt="movies"/>
                        <span>MOVIES</span>
                    </a>
                    <a href="/home">
                        <img src="/images/series-icon.svg" alt="series"/>
                        <span>SERIES</span>
                    </a>
                    
                </NavMenu>
                <SignOut>
                <UserImg src={user.photo} alt={user.name}/>
                <DropDown>
                    <span onClick={handleSignOut}>Cerrar sesión</span>
                </DropDown>
                </SignOut>
            </>)}

        </Nav>
    );
};

export default Header;