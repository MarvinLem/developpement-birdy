import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

export class ParametersPage extends React.Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <div className="title">
                    Paramètres
                </div>
                <div className="settings">
                    <p className="setting">Connexion automatique</p>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="settings">
                    <p className="setting">Activer la géocalisation</p>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
            </React.Fragment>
        )
    }
}