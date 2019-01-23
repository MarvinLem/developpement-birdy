import React from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <nav>
                    <button className="nav-button"><Link to='/encyclopedie'>Encyclopédie</Link></button>
                    <button className="nav-button"><Link to='/carte'>Carte</Link></button>
                    <button className="nav-button"><Link to='/capture'>Baguage</Link></button>
                    <button className="nav-button"><Link to='/listes'>Listes</Link></button>
                </nav>
            </React.Fragment>
        )
    }
}