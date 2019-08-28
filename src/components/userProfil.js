import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from "firebase";

export class UserProfil extends React.Component {
    state = {
        dataCaptures: [],
        dataReprises: [],
        user: '',
        loading: true,
    };

    componentDidMount() {
        const captures = firebase.database().ref('captures');
        captures.on('value', (captures) => {
            this.setState({dataCaptures: captures.val()});
        });

        const reprises = firebase.database().ref('reprises');
        reprises.on('value', (reprises) => {
            this.setState({dataReprises: reprises.val()});
        });


        const users = this.props.location.state;
        this.setState({user: users});

        const isLoading = false;
        this.setState({loading: isLoading});
    }

    render() {
        const {dataCaptures,dataReprises} = this.state;

        if (!localStorage.getItem('user')) {
            return <Redirect to={{ pathname: '/'}} />
        }

        if (this.state.loading === false) {
            return (
                <React.Fragment>
                    <div className="title">
                        Vos baguages
                    </div>
                    <ul className="encyclopedia birds">
                        {dataCaptures.map((captures, index) => <li className="site" key={index}><Link to={{ pathname: '/editCapture', state: { captures : captures, index : index}}}>Capture: #{captures.numero} - {captures.nom}</Link></li>)}
                        {dataReprises.map((reprises, index) => <li className="site" key={index}><Link to={{ pathname: '/editReprise', state: { reprises : reprises, index : index}}}>Reprise: #{reprises.numero} - {reprises.nom}</Link></li>)}
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