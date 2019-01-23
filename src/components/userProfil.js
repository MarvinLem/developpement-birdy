import React from 'react';
import firebase from "firebase";

export class UserProfil extends React.Component {
    state = {
        data: [],
        user: '',
        loading: true,
    };

    componentDidMount() {
        const captures = firebase.database().ref('captures');
        captures.on('value', (captures) => {
            this.setState({data: captures.val()});
        });

        const users = this.props.location.state;
        this.setState({user: users});
        const isLoading = false;
        this.setState({loading: isLoading})
    }

    render() {
        const {data} = this.state;
        if (this.state.loading === false) {
            return (
                <React.Fragment>
                    <div className="title">
                        Vos baguages
                    </div>
                    <ul className="encyclopedia users">
                        {data.map((captures, index) => <li key={index}>{captures.nom}</li>)}
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