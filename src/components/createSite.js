import React from 'react';
import { Redirect } from 'react-router-dom';
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
        latitudeError: false,
        longitudeError: false,
        nameError: false,
        feedback: true,
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
        let latitudeRegex = RegExp('^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$');
        let longitudeRegex = RegExp('^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$');
        let latitudeError = false;
        let longitudeError = false;
        let nameError = false;
        if(longitude !== '' && latitude !== '' && superficie !== '' && nom !== '') {

            this.setState({siteError: false});

            if(!latitudeRegex.test(this.state.latitude)){
                this.setState({latitudeError: true});
                latitudeError = true;
            } else {
                this.setState({latitudeError: false});
                latitudeError = false;
            }

            if(!longitudeRegex.test(this.state.longitude)){
                this.setState({longitudeError: true});
                longitudeError = true;
            } else {
                this.setState({longitudeError: false});
                longitudeError = false;
            }

            for(let i=0;i<this.state.sitesList.length;i++){
                if(this.state.sitesList[i].nom !== nom){
                    this.setState({nameError: false});
                    nameError = false;
                } else {
                    this.setState({nameError: true});
                    nameError = true;
                    i = this.state.sitesList.length;
                }
            }

            if(longitudeError === false && latitudeError === false && nameError === false) {
                firebase.database().ref('sites/' + id).update({
                    longitude: longitude,
                    latitude: latitude,
                    superficie: superficie,
                    nom: nom,
                });
                this.setState({createDone: true});
            }

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
            return <Redirect to={{ pathname: '/carte', state: { feedback : this.state.feedback}}} />
        }

        if (!localStorage.getItem('user')) {
            return <Redirect to={{ pathname: '/'}} />
        }

        return (
            <React.Fragment>
                <div className="title">
                    Créer un site
                </div>
                <form className="add">
                    <label htmlFor="longitude">Longitude <span>(Ex: 41.40338)</span></label>
                    <input onChange={this.handleLongitude} name="longitude" type="text"/>
                    <div>
                        {this.state.longitudeError === true &&
                        <p className="error">
                            *Votre longitude n'est pas correcte !
                        </p>
                        }
                    </div>
                    <label htmlFor="latitude">Latitude <span>(Ex: 2.17403)</span></label>
                    <input onChange={this.handleLatitude} name="latitude" type="text"/>
                    <div>
                        {this.state.latitudeError === true &&
                        <p className="error">
                            *Votre lagitude n'est pas correcte !
                        </p>
                        }
                    </div>
                    <label htmlFor="superficie">Superficie <span>(Ex: 28)</span></label>
                    <input onChange={this.handleSuperficie} name="superficie" type="number"/>
                    <label htmlFor="name">Nom du site</label>
                    <input onChange={this.handleName} name="name" type="text"/>
                    <div>
                        {this.state.nameError === true &&
                        <p className="error">
                            *Ce nom de site de baguage est déjà utilisé !
                        </p>
                        }
                    </div>
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