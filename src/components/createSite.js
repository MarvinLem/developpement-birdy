import React from 'react';
import { Link } from 'react-router-dom';

export class CreateSite extends React.Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <div className="title">
                    Créer un site
                </div>
                <form className="add">
                    <label htmlFor="longitude">Longitude</label>
                    <input name="longitude" type="text"/>
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude" type="text"/>
                    <label htmlFor="superficie">Superficie</label>
                    <input name="superficie" type="text"/>
                    <label htmlFor="name">Nom du site</label>
                    <input name="name" type="text"/>
                </form>
                <button className="main-button create"><Link to='/home'>Ajouter</Link></button>
            </React.Fragment>
        )
    }
}