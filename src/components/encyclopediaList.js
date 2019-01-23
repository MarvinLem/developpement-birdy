import React from 'react';
import { Link } from 'react-router-dom';
import search from '../assets/search.svg';
import firebase from 'firebase';

export class EncyclopediaList extends React.Component {
    state = {
        data: [],
    };

    componentDidMount() {
        const encyclopedie = firebase.database().ref('encyclopedie');
        encyclopedie.on('value', (encyclopedie) => {
            this.setState({data: encyclopedie.val()});
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
                    {data.map((encyclopedie, index) => <li key={index}><Link to={{ pathname: '/bird', state: { encyclopedie : encyclopedie}}}>{encyclopedie.nom}</Link></li>)}
                </ul>
            </React.Fragment>
        )
    }
}