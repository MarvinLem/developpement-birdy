import React from 'react';
import { Link } from 'react-router-dom';
import search from '../assets/search.svg';
import firebase from 'firebase';

export class EncyclopediaList extends React.Component {
    state = {
        data: [],
        search: '',
    };

    componentDidMount() {
        const encyclopedie = firebase.database().ref('encyclopedie');
        encyclopedie.on('value', (encyclopedie) => {
            this.setState({data: encyclopedie.val()});
        });

        const image = firebase.storage().ref().child('images/mesange-bleue.jpg');
        console.log(image.name);
    }

    handleSearchInput = ({currentTarget: input}) => {
        const searchInput = input.value;
        this.setState({search: searchInput});
    };

    render() {
        const {data} = this.state;
        return (
            <React.Fragment>
                <form className="search">
                    <img src={search} alt=" "/>
                    <input onChange={this.handleSearchInput} type="text" placeholder="Rechercher"/>
                </form>
                <ul className="encyclopedia">
                    {data.map((encyclopedie, index) => { if(encyclopedie.nom.toLowerCase().includes(this.state.search.toLowerCase())){return <li key={index}><Link to={{ pathname: '/bird', state: { encyclopedie : encyclopedie}}}>{encyclopedie.nom}</Link></li>}})}
                </ul>
            </React.Fragment>
        )
    }
}