import React from 'react';
import { Link } from 'react-router-dom';
import search from '../assets/search.svg';
import firebase from 'firebase';

export class UsersList extends React.Component {
    state = {
        data: [],
    };

    componentDidMount() {
        const users = firebase.database().ref('users');
        users.on('value', (users) => {
            this.setState({data: users.val()});
        });
    }

    render() {
        const {data} = this.state;
        return (
            <React.Fragment>
                <form className="search">
                    <img src={search} alt=" "/>
                    <input type="text" placeholder="Rechercher"/>
                </form>
                <ul className="encyclopedia">
                    {data.map((users, index) => <li key={index}><Link to={{ pathname: '/profil', state: { users : users}}}>{users.nom}</Link></li>)}
                </ul>
            </React.Fragment>
        )
    }
}