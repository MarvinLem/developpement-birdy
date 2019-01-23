import React from 'react';
import { Link } from 'react-router-dom';
import carte from '../assets/map.png';

export class BaguageMap extends React.Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <div className="title">
                    Carte de la région
                </div>
                <img className="heading-image" src={carte} alt=" "/>
                <button className="main-button map"><Link to='/site'>Ajouter un site</Link></button>
            </React.Fragment>
        )
    }
}