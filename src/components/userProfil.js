import React from 'react';
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
        this.setState({loading: isLoading})
    }

    render() {
        const {dataCaptures,dataReprises} = this.state;
        if (this.state.loading === false) {
            return (
                <React.Fragment>
                    <div className="title">
                        Vos baguages
                    </div>
                    <ul className="encyclopedia birds">
                        {dataCaptures.map((captures, index) => <li key={index}>Capture: #{captures.numero} - {captures.nom}</li>)}
                        {dataReprises.map((reprises, index) => <li key={index}>Reprise: #{reprises.numero} - {reprises.nom}</li>)}
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