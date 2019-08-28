import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase';

export class EditCapture extends React.Component {
    state = {
        editDone: false,
        capturesList: [],
        reprisesList: [],
        loading: true,
        capture: '',
        type: '',
        date: '',
        lieu: '',
        nom: '',
        numero: '',
        longueur: '',
        poids: '',
        adiposite: '',
        sexe: '',
        age: '',
        user: '',
        captureError: false,
        numeroError: false,
        adipositeError: false,
        baguageError: false,
        feedback: true,
    };

    componentDidMount() {
        const birds = firebase.database().ref('captures');
        birds.on('value', (birds) => {
            this.setState({capturesList: birds.val()});
        });
        const baguageNumber = firebase.database().ref('reprises');
        baguageNumber.on('value', (birds) => {
            this.setState({reprisesList: birds.val()});
        });
        const captures = this.props.location.state.captures;
        this.setState({capture: captures});
        const index = this.props.location.state.index;
        this.setState({index: index});
        const type = this.props.location.state.captures.type;
        this.setState({type: type});
        const date = this.props.location.state.captures.date;
        this.setState({date: date});
        const lieu = this.props.location.state.captures.lieu;
        this.setState({lieu: lieu});
        const nom = this.props.location.state.captures.nom;
        this.setState({nom: nom});
        const numero = this.props.location.state.captures.numero;
        this.setState({numero: numero});
        const longueur = this.props.location.state.captures.longueur;
        this.setState({longueur: longueur});
        const poids = this.props.location.state.captures.poids;
        this.setState({poids: poids});
        const adiposite = this.props.location.state.captures.adiposite;
        this.setState({adiposite: adiposite});
        const sexe = this.props.location.state.captures.sexe;
        this.setState({sexe: sexe});
        const age = this.props.location.state.captures.age;
        this.setState({age: age});
        const user = localStorage.getItem('user');
        this.setState({user: user});
        const isLoading = false;
        this.setState({loading: isLoading});
    }

    editBird = (e) => {
        e.preventDefault();
        let id = this.state.index;
        let type = this.state.type;
        let date = this.state.date;
        let lieu = this.state.lieu;
        let nom = this.state.nom;
        let numero = this.state.numero;
        let longueur = this.state.longueur;
        let poids = this.state.poids;
        let adiposite = this.state.adiposite;
        let sexe = this.state.sexe;
        let age = this.state.age;
        let user = this.state.user;
        let numeroRegex = RegExp('^[0-9]{4}$');
        let adipositeRegex = RegExp('^[1-9][0-9]?$|^100$');
        let numeroError = this.state.numeroError;
        let adipositeError = this.state.adipositeError;
        let baguageError = this.state.baguageError;
        if (type !== '' && date !== '' && lieu !== '' && nom !== '' && numero !== '' && longueur !== '' && poids !== '' && adiposite !== '' && sexe !== '' && age !== '') {

            this.setState({captureError: false});

            if (!numeroRegex.test(this.state.numero)) {
                this.setState({numeroError: true});
                numeroError = true;
            } else {
                this.setState({numeroError: false});
                numeroError = false;
            }

            if (!adipositeRegex.test(this.state.adiposite)) {
                this.setState({adipositeError: true});
                adipositeError = true;
            } else {
                this.setState({adipositeError: false});
                adipositeError = false;
            }

            for (let i = 0; i < this.state.capturesList.length; i++) {
                if (this.state.capturesList[i].numero !== numero) {
                    for (let c = 0; c < this.state.reprisesList.length; c++) {
                        if (this.state.reprisesList[c].numero !== numero) {
                            this.setState({baguageError: false});
                            baguageError = false;
                        }
                    }
                } else {
                    this.setState({baguageError: true});
                    baguageError = true;
                    i = this.state.capturesList.length;
                }
            }

            if(this.state.numero === numero) {
                this.setState({baguageError: false});
                baguageError = false;
            }

            if (numeroError === false && adipositeError === false && baguageError === false) {
                firebase.database().ref('captures/' + id).update({
                    type: type,
                    date: date,
                    lieu: lieu,
                    nom: nom,
                    numero: numero,
                    longueur: longueur,
                    poids: poids,
                    adiposite: adiposite,
                    sexe: sexe,
                    age: age,
                    user: user,
                });
                this.setState({editDone: true});
            }
        } else {
            this.setState({captureError: true});
        }
    };

    handleTypeAdd = ({currentTarget: input}) => {
        const newType = input.value;
        this.setState({type: newType});
    };

    handleDateAdd = ({currentTarget: input}) => {
        const newDate = input.value;
        this.setState({date: newDate});
    };

    handleLieuAdd = ({currentTarget: input}) => {
        const newLieu = input.value;
        this.setState({lieu: newLieu});
    };

    handleNomAdd = ({currentTarget: input}) => {
        const newNom = input.value;
        this.setState({nom: newNom});
    };

    handleNumeroAdd = ({currentTarget: input}) => {
        const newNumero = input.value;
        this.setState({numero: newNumero});
    };

    handleLongueurAdd = ({currentTarget: input}) => {
        const newLongueur = input.value;
        this.setState({longueur: newLongueur});
    };

    handlePoidsAdd = ({currentTarget: input}) => {
        const newPoids = input.value;
        this.setState({poids: newPoids});
    };

    handleAdipositeAdd = ({currentTarget: input}) => {
        const newAdiposite = input.value;
        this.setState({adiposite: newAdiposite});
    };

    handleSexeAdd = ({currentTarget: input}) => {
        const newSexe = input.value;
        this.setState({sexe: newSexe});
    };

    handleAgeAdd = ({currentTarget: input}) => {
        const newAge = input.value;
        this.setState({age: newAge});
    };

    render() {
        if (this.state.loading === false) {

            if (this.state.editDone === true) {
                return <Redirect to={{pathname: '/home', state: {feedbackEdit: this.state.feedback}}}/>
            }

            if (!localStorage.getItem('user')) {
                return <Redirect to={{ pathname: '/'}} />
            }

            return (
                <React.Fragment>
                    <div className="title">
                        Modifier la capture
                    </div>
                    <form className="add">
                        <label htmlFor="type">Type de capture</label>
                        <select onChange={this.handleTypeAdd} name="type" defaultValue={this.state.capture.type}>
                            <option defaultValue="Filet">Filet</option>
                            <option defaultValue="Nid">Nid</option>
                            <option defaultValue="Autre">Autre</option>
                        </select>
                        <label htmlFor="date">Date de capture</label>
                        <input onChange={this.handleDateAdd} name="date" type="date" defaultValue={this.state.capture.date}/>
                        <label htmlFor="lieu">Lieu de capture</label>
                        <input onChange={this.handleLieuAdd} name="lieu" type="text" defaultValue={this.state.capture.lieu}/>
                        <hr></hr>
                        <label htmlFor="name">Nom de l'oiseau</label>
                        <input onChange={this.handleNomAdd} name="name" type="text" defaultValue={this.state.capture.nom}/>
                        <label htmlFor="number">Numéro de bague <span>(0 à 9999)</span></label>
                        <input onChange={this.handleNumeroAdd} name="number" type="text" defaultValue={this.state.capture.numero}/>
                        <div>
                            {this.state.numeroError === true &&
                            <p className="error">
                                *Le numéro de baguage n'est pas correct !
                            </p>
                            }
                        </div>
                        <div>
                            {this.state.baguageError === true &&
                            <p className="error">
                                *Le numéro de baguage est déja dans notre base de donnée, vous devez faire une reprise
                                et non une capture !
                            </p>
                            }
                        </div>
                        <label htmlFor="longueur">Longueur allaire <span>(en cm)</span></label>
                        <input onChange={this.handleLongueurAdd} name="longueur" type="number"
                               defaultValue={this.state.capture.longueur}/>
                        <label htmlFor="poids">Poids <span>(en gramme)</span></label>
                        <input onChange={this.handlePoidsAdd} name="poids" type="number" defaultValue={this.state.capture.poids}/>
                        <label htmlFor="adiposite">Adiposité <span>(en %)</span></label>
                        <input onChange={this.handleAdipositeAdd} name="adiposite" type="number"
                               defaultValue={this.state.capture.adiposite}/>
                        <div>
                            {this.state.adipositeError === true &&
                            <p className="error">
                                *Le taux d'adiposité doit se faire en % (0 à 100) !
                            </p>
                            }
                        </div>
                        <label htmlFor="sexe">Sexe</label>
                        <select onChange={this.handleSexeAdd} name="sexe" defaultValue={this.state.capture.sexe}>
                            <option defaultValue="Male">Male</option>
                            <option defaultValue="Femelle">Femelle</option>
                        </select>
                        <label htmlFor="age">Age <span>(en mois)</span></label>
                        <input onChange={this.handleAgeAdd} name="age" type="number" defaultValue={this.state.capture.age}/>
                        <div>
                            {this.state.captureError === true &&
                            <p className="error">
                                *Certains de vos champs ne sont pas remplis !
                            </p>
                            }
                        </div>
                    </form>
                    <button className="main-button edit" onClick={this.editBird}>Sauvegarder les changements</button>
                </React.Fragment>
            )

        } else if (this.state.loading === true) {
            return (
                <React.Fragment>
                    <div className="title">
                        Chargement...
                    </div>
                </React.Fragment>
            )
        }
    }
}