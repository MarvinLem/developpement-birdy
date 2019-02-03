import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import home from '../assets/home.svg';
import settings from '../assets/settings.svg';

class Heading extends React.Component {
    state = {};

    render() {

        if(this.props.location.pathname === '/' || this.props.location.pathname === '/subscribe') {
            return (
                <React.Fragment>
                    <div className="background"></div>
                    <div className="logo"></div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="background"></div>
                    <Link to='/home'><img id="home" src={home} alt=" "/></Link>
                    <Link to='/parameters'><img id="settings" src={settings} alt=" "/></Link>
                    <div className="logo"></div>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(Heading);