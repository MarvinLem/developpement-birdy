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
        authIdError: false,
        authUserError: false,
    };

    createAccount = (e) => {
        e.preventDefault();
        let length = this.state.usersList.length;
        let id = this.state.id;
        let username = this.state.username;
        let password = this.state.password;
        let confirm = this.state.confirm;
        let idRegex = RegExp('^[0-9]{4}$');
        let passwordError = false;
        let idError = false;
        let userError = false;

        if(username !== '' && id !== '' && password !== '' && confirm !== '') {
            this.setState({authFieldError: false});

            if (password !== confirm) {
                this.setState({authPasswordError: true});
                passwordError = true;
            } else {
                this.setState({authPasswordError: false});
                passwordError = false;
            }

            if (!idRegex.test(this.state.id)){
                this.setState({authIdError: true});
                idError = true;
            } else {
                this.setState({authIdError: false});
                idError = false;
            }

            for(let i=0;i<this.state.usersList.length;i++){
                if(this.state.usersList[i].nom !== username){
                    this.setState({authUserError: false});
                    userError = false;
                } else {
                    this.setState({authUserError: true});
                    userError = true;
                    i = this.state.usersList.length;
                }
            }

            if(passwordError === false && idError === false && userError === false) {
                firebase.database().ref('users/' + length).update({
                    id: id,
                    nom: username,
                    pass: password,
                });
                this.setState({createDone: true});
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
                    <label htmlFor="id">ID <span>(composed of 4 numbers)</span></label>
                    <input onChange={this.handleId} name="id" type="number"/>
                    <div>
                        {this.state.authIdError === true &&
                        <p className="error">
                            *L'ID doit être composé de 4 chiffres !
                        </p>
                        }
                    </div>
                    <label htmlFor="username">Nom de compte</label>
                    <input onChange={this.handleUsername} name="username" type="text"/>
                    <div>
                        {this.state.authUserError === true &&
                        <p className="error">
                            *Ce nom d'utilisateur est déjà utilisé !
                        </p>
                        }
                    </div>
                    <label htmlFor="pass">Mot de passe</label>
                    <input onChange={this.handlePassword} name="pass" type="password"/>
                    <label htmlFor="pass">Confirmer le MDP</label>
                    <input onChange={this.handleConfirmPassword} name="pass" type="password"/>
                    <div>
                        {this.state.authFieldError === true &&
                        <p className="error">
                            *Certains champs n'ont pas été completés !
                        </p>
                        }
                    </div>
                    <div>
                        {this.state.authPasswordError === true &&
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