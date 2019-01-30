import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from "firebase";

export class SubscriptionForm extends React.Component {
    state = {
        usersList: [],
        id: '',
        username: '',
        password: '',
        confirm: '',
        authDone: false,
        authFieldError: false,
        authPasswordError: false,
    };

    createAccount = (e) => {
        e.preventDefault();
        let length = this.state.usersList.length;
        let id = this.state.id;
        let username = this.state.username;
        let password = this.state.password;
        let confirm = this.state.confirm;
        if(username !== '' && id !== '' && password !== '' && confirm !== '') {
            if (password === confirm) {
            firebase.database().ref('users/' + length).update({
                id: id,
                nom: username,
                pass: password,
            });
            this.setState({createDone: true});
            } else {
                this.setState({authPasswordError: true})
            }
        } else {
            this.setState({authFieldError: true});
        }
    };

    componentDidMount() {
        const users = firebase.database().ref('users');
        users.on('value', (users) => {
            this.setState({usersList: users.val()});
        });
    }

    handleId = ({currentTarget: input}) => {
        const id = input.value;
        this.setState({id: id});
    };

    handleUsername = ({currentTarget: input}) => {
        const username = input.value;
        this.setState({username: username});
    };

    handlePassword = ({currentTarget: input}) => {
        const password = input.value;
        this.setState({password: password});
    };

    handleConfirmPassword = ({currentTarget: input}) => {
        const confirm = input.value;
        this.setState({confirm: confirm});
    };

    render() {

        if(this.state.createDone === true){
            return <Redirect to='/home' />
        }

        return (
            <React.Fragment>
                <form className="auth">
                    <h1>Birdy</h1>
                    <label htmlFor="id">ID</label>
                    <input onChange={this.handleId} name="id" type="text"/>
                    <label htmlFor="username">Nom de compte</label>
                    <input onChange={this.handleUsername} name="username" type="text"/>
                    <label htmlFor="pass">Mot de passe</label>
                    <input onChange={this.handlePassword} name="pass" type="password"/>
                    <label htmlFor="pass">Confirmer le MDP</label>
                    <input onChange={this.handleConfirmPassword} name="pass" type="password"/>
                    <div>
                        {this.state.authFieldError === true &&
                        <p className="error">
                            *Il faut remplir vos champs !
                        </p>
                        }
                    </div>
                    <div>
                        {this.state.authPasswordError === true && this.state.authFieldError === false &&
                        <p className="error">
                            *Vos mots de passe ne correspondent pas !
                        </p>
                        }
                    </div>
                </form>
                <button className="main-button" onClick={this.createAccount}>S'inscrire</button>
                <button className="secondary-button"><Link to='/'>Se connecter</Link></button>
            </React.Fragment>
        )
    }
}