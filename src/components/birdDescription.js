import React from 'react';
import mesange from '../assets/mesange-bleue.jpg';

export class BirdDescription extends React.Component {
    state = {
        data: [],
        bird: '',
        loading: true,
    };

    componentDidMount() {
        const encyclopedie = this.props.location.state;
        this.setState({bird: encyclopedie});
        const isLoading = false;
        this.setState({loading: isLoading})
    }

    render() {
        if (this.state.loading === false) {
            return (
                <React.Fragment>
                    <div className="title">
                        {this.state.bird.encyclopedie.nom}
                    </div>
                    <img className="heading-image" src={mesange} alt=" "/>
                    <h2>{this.state.bird.encyclopedie.latin}</h2>
                    <p className="small">Famille: {this.state.bird.encyclopedie.famille}</p>
                    <p className="small">Taille: {this.state.bird.encyclopedie.taille}</p>
                    <p className="small">Envergure: {this.state.bird.encyclopedie.envergure}</p>
                    <p className="small">Poids: {this.state.bird.encyclopedie.poids}</p>
                    <p className="small">Longévité: {this.state.bird.encyclopedie.longevite}</p>
                    <p className="small">Alimentation: {this.state.bird.encyclopedie.alimentation}</p>
                    <p className="big">Nidification: {this.state.bird.encyclopedie.nidification}</p>
                    <p className="big">Habitat: {this.state.bird.encyclopedie.habitat}</p>
                    <p className="big">Comportement: {this.state.bird.encyclopedie.comportement}</p>
                    <p className="big">Distribution: {this.state.bird.encyclopedie.distribution}</p>
                    <p className="big">Description: {this.state.bird.encyclopedie.description}</p>
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