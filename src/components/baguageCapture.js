import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase';

export class BaguageCapture extends React.Component {
    state = {
        createDone: false,
        capturesList: [],
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
        captureError: false,
        feedback: true,
    };

    componentDidMount() {
        const birds = firebase.database().ref('captures');
        birds.on('value', (birds) => {
            this.setState({capturesList: birds.val()});
        });
    }

    addBird = (e) => {
        e.preventDefault();
        let id = this.state.capturesList.length;
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
        if(type !== '' && date !== '' && lieu !== '' && nom !== '' && numero !== '' && longueur !== '' && poids !== '' && adiposite !== '' && sexe !== '' && age !== '') {
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
            });
            this.setState({createDone: true});
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

        if (this.state.createDone === true) {
            return <Redirect to={{ pathname: '/home', state: { feedback : this.state.feedback}}} />
        }

        return (
            <React.Fragment>
                <div className="title">
                    <Link to='/capture' className="underline">Capture</Link>
                    <Link to='/reprise'>Reprise</Link>
                </div>
                <form className="add">
                    <label htmlFor="type">Type de capture</label>
                    <input onChange={this.handleTypeAdd} name="type" type="text" value={this.state.type}/>
                    <label htmlFor="date">Date de capture</label>
                    <input onChange={this.handleDateAdd} name="date" type="text" value={this.state.date}/>
                    <label htmlFor="lieu">Lieu de capture</label>
                    <input onChange={this.handleLieuAdd} name="lieu" type="text" value={this.state.lieu}/>
                    <hr></hr>
                    <label htmlFor="name">Nom de l'oiseau</label>
                    <input onChange={this.handleNomAdd} name="name" type="text" value={this.state.nom}/>
                    <label htmlFor="number">Numéro de bague</label>
                    <input onChange={this.handleNumeroAdd} name="number" type="text" value={this.state.numero}/>
                    <label htmlFor="longueur">Longueur allaire</label>
                    <input onChange={this.handleLongueurAdd} name="longueur" type="text" value={this.state.longueur}/>
                    <label htmlFor="poids">Poids</label>
                    <input onChange={this.handlePoidsAdd} name="poids" type="text" value={this.state.poids}/>
                    <label htmlFor="adiposite">Adiposité</label>
                    <input onChange={this.handleAdipositeAdd} name="adiposite" type="text" value={this.state.adiposite}/>
                    <label htmlFor="sexe">Sexe</label>
                    <input onChange={this.handleSexeAdd} name="sexe" type="text" value={this.state.sexe}/>
                    <label htmlFor="age">Age</label>
                    <input onChange={this.handleAgeAdd} name="age" type="text" value={this.state.age}/>
                    <div>
                        {this.state.captureError === true &&
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