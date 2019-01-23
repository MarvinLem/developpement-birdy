import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home.svg';

export class Heading extends React.Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <div className="background"></div>
                <Link to='/home'><img id="home" src={home} alt=" "/></Link>
                <div className="logo"></div>
            </React.Fragment>
        )
    }
}