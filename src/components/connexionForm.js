import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase';

export class ConnexionForm extends React.Component {
    state = {
        usersList: [],
        username: '',
        password: '',
        authDone: false,
        authError: false,
    };

    componentDidMount() {
        const users = firebase.database().ref('users');
        users.on('value', (users) => {
            this.setState({usersList: users.val()});
        });
    }

    handleUsername = ({currentTarget: input}) => {
        const username = input.value;
        this.setState({username: username});
    };

    handlePassword = ({currentTarget: input}) => {
        const password = input.value;
        this.setState({password: password});
    };

    checkAuth = () => {
        let usersList = this.state.usersList;
        usersList.forEach((user) => {
            if(user.nom === this.state.username && user.pass === this.state.password){
                this.setState({authDone: true});
            } else {
                this.setState({authError: true});
            }
        });
    };

    render() {

        if(this.state.authDone === true){
            return <Redirect to='/home' />
        }

        return (
            <React.Fragment>
                <form className="auth">
                    <h1>Birdy</h1>
                    <label htmlFor="username">Nom de compte</label>
                    <input onChange={this.handleUsername} name="username" type="text"/>
                    <label htmlFor="pass">Mot de passe</label>
                    <input onChange={this.handlePassword} name="pass" type="password"/>
                    <div>
                        {this.state.authError === true &&
                        <p className="error">
                            *Nom de compte ou mot de passe incorrrect !
                        </p>
                        }
                    </div>
                </form>
                <button className="main-button" onClick={this.checkAuth}>Se connecter</button>
                <button className="secondary-button"><Link to='/subscribe'>S'inscrire</Link></button>
            </React.Fragment>
        )
    }
}