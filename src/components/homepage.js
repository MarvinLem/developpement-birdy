import React from 'react';
import { Redirect, Link } from 'react-router-dom';

export class HomePage extends React.Component {
    state = {
        feedback: false,
        feedbackEdit: false,
        user: '',
        disconnectDone: false,
    };

    componentDidMount() {
        if(this.props.location.state) {
            const createFeedback = this.props.location.state.feedback;
            this.setState({feedback: createFeedback});
            const createFeedbackEdit = this.props.location.state.feedbackEdit;
            this.setState({feedbackEdit: createFeedbackEdit});
        }
        const user = localStorage.getItem('user');
        this.setState({user: user});
    }

    disconnectFromSession = () => {
        localStorage.removeItem('user');
        this.setState({disconnectDone: true});
    };

    render() {
        if (this.state.disconnectDone === true) {
            return <Redirect to={{ pathname: '/'}} />
        }

        if (!localStorage.getItem('user')) {
            return <Redirect to={{ pathname: '/'}} />
        }

        return (
            <React.Fragment>
                <nav>
                    <button className="nav-button"><Link to='/encyclopedie'>Encyclopédie</Link></button>
                    <button className="nav-button"><Link to='/carte'>Carte</Link></button>
                    <button className="nav-button"><Link to='/capture'>Baguage</Link></button>
                    <div>
                        {this.state.feedback === true &&
                        <p className="feedback">
                            *Votre baguage a bien été enregistré !
                        </p>
                        }
                    </div>
                    <div>
                        {this.state.feedbackEdit === true &&
                        <p className="feedback">
                            *Votre baguage a bien été modifié !
                        </p>
                        }
                    </div>
                    <button className="nav-button"><Link to='/listes'>Listes</Link></button>
                    <button className="nav-button nav-button--disconnect" onClick={this.disconnectFromSession}>Disconnect</button>
                </nav>
            </React.Fragment>
        )
    }
}