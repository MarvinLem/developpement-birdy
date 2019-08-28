import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import search from '../assets/search.svg';
import firebase from 'firebase';
import profil from '../assets/profil.png';

export class UsersList extends React.Component {
    state = {
        data: [],
        search: '',
    };

    componentDidMount() {
        const users = firebase.database().ref('users');
        users.on('value', (users) => {
            this.setState({data: users.val()});
        });
    }

    handleSearchInput = ({currentTarget: input}) => {
        const searchInput = input.value;
        this.setState({search: searchInput});
    };

    render() {
        const {data} = this.state;

        if (!localStorage.getItem('user')) {
            return <Redirect to={{ pathname: '/'}} />
        }

        return (
            <React.Fragment>
                <form className="search">
                    <img src={search} alt=" "/>
                    <input onChange={this.handleSearchInput} type="text" placeholder="Rechercher"/>
                </form>
                <ul className="encyclopedia">
                    {data.map((users, index) => { if(users.nom.toLowerCase().includes(this.state.search.toLowerCase())){ return <li key={index}><img src={profil}/><Link to={{ pathname: '/profil', state: { users : users}}}>#{users.id} - {users.nom}</Link></li>}})}
                </ul>
            </React.Fragment>
        )
    }
}