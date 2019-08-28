import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import search from '../assets/search.svg';
import firebase from 'firebase';

export class EncyclopediaList extends React.Component {
    state = {
        data: [],
        search: '',
        loading: true,
    };

    componentDidMount() {
        const encyclopedie = firebase.database().ref('encyclopedie');
        encyclopedie.on('value', (encyclopedie) => {
            this.setState({data: encyclopedie.val()});
        });
        const isLoading = false;
        this.setState({loading: isLoading});
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

        if (this.state.loading === false) {

            return (
                <React.Fragment>
                    <form className="search">
                        <img src={search} alt=" "/>
                        <input onChange={this.handleSearchInput} type="text" placeholder="Rechercher"/>
                    </form>
                    <ul className="encyclopedia">
                        {data.map((encyclopedie, index) => {
                            firebase.storage().ref().child('images/' + encyclopedie.nom + '-circle.png').getDownloadURL().then(url => {
                                document.getElementById(index).src = url;
                            });

                            if (encyclopedie.nom.toLowerCase().includes(this.state.search.toLowerCase())) {
                                return <li key={index}><img id={index} src=''/><Link to={{
                                    pathname: '/bird',
                                    state: {encyclopedie: encyclopedie}
                                }}>{encyclopedie.nom}</Link></li>
                            }
                        })}
                    </ul>
                </React.Fragment>
            )
        } else if(this.state.loading === true){
                return(
                    <React.Fragment>
                        <div className="title">
                            Chargement...
                        </div>
                    </React.Fragment>
                )}
        }
    }