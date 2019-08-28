import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import search from '../assets/search.svg';
import firebase from "firebase";

export class SiteList extends React.Component {
    state = {
        data: [],
        search: '',
    };

    componentDidMount() {
        const sites = firebase.database().ref('sites');
        sites.on('value', (sites) => {
            this.setState({data: sites.val()});
        });
    };

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
                    {data.map((sites, index) => { if(sites.nom.toLowerCase().includes(this.state.search.toLowerCase())){ return <li className="site" key={index}><Link to={{ pathname: '/editsite', state: { sites : sites, index : index}}}>{sites.nom} - {sites.longitude} - {sites.latitude} - {sites.superficie}km²</Link></li>}})}
                </ul>
            </React.Fragment>
        )
    }
}