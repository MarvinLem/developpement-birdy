import React from 'react';
import { Link } from 'react-router-dom';

export class ConnexionForm extends React.Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <form className="auth">
                    <h1>Birdy</h1>
                    <label htmlFor="username">ID / Nom de compte</label>
                    <input name="username" type="text"/>
                    <label htmlFor="pass">Mot de passe</label>
                    <input name="pass" type="password"/>
                </form>
                <button className="main-button"><Link to='/home'>Se connecter</Link></button>
                <button className="secondary-button"><Link to='/subscribe'>S'inscrire</Link></button>
            </React.Fragment>
        )
    }
}