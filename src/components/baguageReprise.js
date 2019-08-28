import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from "firebase";

export class BaguageReprise extends React.Component {
    state = {
        createDone: false,
        reprisesList: [],
        capturesList: [],
        type: 'Filet',
        date: '',
        lieu: '',
        nom: '',
        numero: '',
        longueur: '',
        poids: '',
        adiposite: '',
        sexe: 'Male',
        age: '',
        user: '',
        repriseError: false,
        numeroError: false,
        adipositeError: false,
        baguageError: false,
        feedback: true,
    };

    componentDidMount() {
        const birds = firebase.database().ref('reprises');
        birds.on('value', (birds) => {
            this.setState({reprisesList: birds.val()});
        });
        const baguageNumber = firebase.database().ref('captures');
        baguageNumber.on('value', (birds) => {
            this.setState({capturesList: birds.val()});
        });
        const user = localStorage.getItem('user');
        this.setState({user: user});
    }

    addBird = (e) => {
        e.preventDefault();
        let id = 0;
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
        console.log(this.state.capturesList);
        if(type !== '' && date !== '' && lieu !== '' && nom !== '' && numero !== '' && longueur !== '' && poids !== '' && adiposite !== '' && sexe !== '' && age !== '') {

            this.setState({repriseError: false});

            if(!numeroRegex.test(this.state.numero)){
                this.setState({numeroError: true});
                numeroError = true;
            } else {
                this.setState({numeroError: false});
                numeroError = false;
            }

            if(!adipositeRegex.test(this.state.adiposite)){
                this.setState({adipositeError: true});
                adipositeError = true;
            } else {
                this.setState({adipositeError: false});
                adipositeError = false;
            }

            for(let i=0;i<this.state.capturesList.length;i++){
                if(this.state.capturesList[i].numero === numero){
                    this.setState({baguageError: false});
                    baguageError = false;
                    i = this.state.capturesList.length;
                } else {
                    this.setState({baguageError: true});
                    baguageError = true;
                }
            }

            if (numeroError === false && adipositeError === false && baguageError === false) {
                firebase.database().ref('reprises/' + id).update({
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
                this.setState({createDone: true});
            }
        } else {
            this.setState({repriseError: true});
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
        if (this.state.createDone === true) {
            return <Redirect to={{ pathname: '/home', state: { feedback : this.state.feedback}}} />
        }

        if (!localStorage.getItem('user')) {
            return <Redirect to={{ pathname: '/'}} />
        }

        return (
            <React.Fragment>
                <div className="title">
                    <Link to='/capture'>Capture</Link>
                    <Link to='/reprise' className="underline">Reprise</Link>
                </div>
                <form className="add">
                    <label htmlFor="type">Type de capture</label>
                    <select onChange={this.handleTypeAdd} name="type" value={this.state.type}>
                        <option value="Filet">Filet</option>
                        <option value="Nid">Nid</option>
                        <option value="Autre">Autre</option>
                    </select>
                    <label htmlFor="date">Date de capture</label>
                    <input onChange={this.handleDateAdd} name="date" type="date" value={this.state.date}/>
                    <label htmlFor="lieu">Lieu de capture</label>
                    <input onChange={this.handleLieuAdd} name="lieu" type="text" value={this.state.lieu}/>
                    <hr></hr>
                    <label htmlFor="name">Nom de l'oiseau</label>
                    <input onChange={this.handleNomAdd} name="name" type="text" value={this.state.nom}/>
                    <label htmlFor="number">Numéro de bague <span>(0 à 9999)</span></label>
                    <input onChange={this.handleNumeroAdd} name="number" type="text" value={this.state.numero}/>
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
                            *Le numéro de baguage n'est pas dans notre base de donnée, vous devez faire une capture et non une reprise !
                        </p>
                        }
                    </div>
                    <label htmlFor="longueur">Longueur allaire <span>(en cm)</span></label>
                    <input onChange={this.handleLongueurAdd} name="longueur" type="number" value={this.state.longueur}/>
                    <label htmlFor="poids">Poids <span>(en gramme)</span></label>
                    <input onChange={this.handlePoidsAdd} name="poids" type="number" value={this.state.poids}/>
                    <label htmlFor="adiposite">Adiposité <span>(en %)</span></label>
                    <input onChange={this.handleAdipositeAdd} name="adiposite" type="number" value={this.state.adiposite}/>
                    <div>
                        {this.state.adipositeError === true &&
                        <p className="error">
                            *Le taux d'adiposité doit se faire en % (0 à 100) !
                        </p>
                        }
                    </div>
                    <label htmlFor="sexe">Sexe</label>
                    <select onChange={this.handleSexeAdd} name="sexe" value={this.state.sexe}>
                        <option value="Male">Male</option>
                        <option value="Femelle">Femelle</option>
                    </select>
                    <label htmlFor="age">Age <span>(en mois)</span></label>
                    <input onChange={this.handleAgeAdd} name="age" type="number" value={this.state.age}/>
                    <div>
                        {this.state.repriseError === true &&
                        <p className="error">
                            *Certains de vos champs ne sont pas remplis !
                        </p>
                        }
                    </div>
                </form>
                <button className="main-button create" onClick={this.addBird}>Ajouter</button>
            </React.Fragment>
        )
    }
}