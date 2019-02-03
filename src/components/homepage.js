import React from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {
    state = {
        feedback: false,
    };

    componentDidMount() {
        if(this.props.location.state) {
            const createFeedback = this.props.location.state.feedback;
            this.setState({feedback: createFeedback});
        }
    }

    render() {
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
                    <button className="nav-button"><Link to='/listes'>Listes</Link></button>
                </nav>
            </React.Fragment>
        )
    }
}