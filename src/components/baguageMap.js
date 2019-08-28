import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export class BaguageMap extends React.Component {
    state = {
        feedback: false,
        feedbackEdit: false,
    };

    componentDidMount() {
        if(this.props.location.state) {
            const createFeedback = this.props.location.state.feedback;
            this.setState({feedback: createFeedback});
            const createFeedbackEdit = this.props.location.state.feedbackEdit;
            this.setState({feedbackEdit: createFeedbackEdit});
        }
    }

    render() {

        if (!localStorage.getItem('user')) {
            return <Redirect to={{ pathname: '/'}} />
        }

        return (
            <React.Fragment>
                <div className="title">
                    Carte de la région
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27444.905138428367!2d5.495610000159183!3d50.58605951434154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0f8fef7de954d%3A0x40099ab2f4d7010!2sSeraing!5e0!3m2!1sfr!2sbe!4v1548973794900" width="600" height="450" frameBorder="0" allowFullScreen/>
                <div>
                    {this.state.feedback === true &&
                    <p className="feedback">
                        *Votre site a bien été crée !
                    </p>
                    }
                </div>
                <div>
                    {this.state.feedbackEdit === true &&
                    <p className="feedback">
                        *Votre site a bien été modifié !
                    </p>
                    }
                </div>
                <button className="main-button map"><Link to='/site'>Ajouter un site</Link></button>
                <button className="main-button maplist"><Link to='/sitelist'>Voir les sites de baguage</Link></button>
            </React.Fragment>
        )
    }
}