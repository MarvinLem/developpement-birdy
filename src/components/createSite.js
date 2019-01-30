import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from "firebase";

export class CreateSite extends React.Component {
    state = {
        createDone: false,
        sitesList: [],
        longitude: '',
        latitude: '',
        superficie: '',
        name: '',
        siteError: false,
    };

    componentDidMount() {
        const sites = firebase.database().ref('sites');
        sites.on('value', (sites) => {
            this.setState({sitesList: sites.val()});
        });
    }

    addSite = (e) => {
        e.preventDefault();
        let id = this.state.sitesList.length;
        let longitude = this.state.longitude;
        let latitude = this.state.latitude;
        let superficie = this.state.superficie;
        let nom = this.state.name;
        if(longitude !== '' && latitude !== '' && superficie !== '' && nom !== '') {
            firebase.database().ref('sites/' + id).update({
                longitude: longitude,
                latitude: latitude,
                superficie: superficie,
                nom: nom,
            });
            this.setState({createDone: true});
        } else {
    this.setState({siteError: true});
        }
    };

    handleLongitude = ({currentTarget: input}) => {
        const longitude = input.value;
        this.setState({longitude: longitude});
    };

    handleLatitude = ({currentTarget: input}) => {
        const latitude = input.value;
        this.setState({latitude: latitude});
    };

    handleSuperficie = ({currentTarget: input}) => {
        const superficie = input.value;
        this.setState({superficie: superficie});
    };

    handleName = ({currentTarget: input}) => {
        const name = input.value;
        this.setState({name: name});
    };

    render() {
        if (this.state.createDone === true) {
            return <Redirect to='/home' />
        }

        return (
            <React.Fragment>
                <div className="title">
                    Créer un site
                </div>
                <form className="add">
                    <label htmlFor="longitude">Longitude</label>
                    <input onChange={this.handleLongitude} name="longitude" type="text"/>
                    <label htmlFor="latitude">Latitude</label>
                    <input onChange={this.handleLatitude} name="latitude" type="text"/>
                    <label htmlFor="superficie">Superficie</label>
                    <input onChange={this.handleSuperficie} name="superficie" type="text"/>
                    <label htmlFor="name">Nom du site</label>
                    <input onChange={this.handleName} name="name" type="text"/>
                    <div>
                        {this.state.siteError === true &&
                        <p className="error">
                            *Certains de vos champs ne sont pas remplis !
                        </p>
                        }
                    </div>
                </form>
                <button className="main-button create" onClick={this.addSite}>Ajouter</button>
            </React.Fragment>
        )
    }
}