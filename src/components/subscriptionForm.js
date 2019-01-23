import React from 'react';
import { Link } from 'react-router-dom';

export class SubscriptionForm extends React.Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <form className="auth">
                    <h1>Birdy</h1>
                    <label htmlFor="id">ID</label>
                    <input name="id" type="text"/>
                    <label htmlFor="username">Nom de compte</label>
                    <input name="username" type="text"/>
                    <label htmlFor="pass">Mot de passe</label>
                    <input name="pass" type="password"/>
                    <label htmlFor="pass">Confirmer le MDP</label>
                    <input name="pass" type="password"/>
                </form>
                <button className="main-button">S'inscrire</button>
                <button className="secondary-button"><Link to='/'>Se connecter</Link></button>
            </React.Fragment>
        )
    }
}