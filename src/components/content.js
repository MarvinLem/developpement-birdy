import React from 'react';
import {Switch, Route} from "react-router-dom";
import {ConnexionForm} from "./connexionForm";
import {SubscriptionForm} from "./subscriptionForm";
import {HomePage} from "./homepage";
import {EncyclopediaList} from "./encyclopediaList";
import {BirdDescription} from "./birdDescription";
import {BaguageMap} from "./baguageMap";
import {CreateSite} from "./createSite";
import {BaguageCapture} from "./baguageCapture";
import {BaguageReprise} from "./baguageReprise";
import {UsersList} from "./usersList";
import {UserProfil} from "./userProfil";

export class Content extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={ConnexionForm}/>
                    <Route path='/subscribe' component={SubscriptionForm}/>
                    <Route path='/home' component={HomePage}/>
                    <Route path='/encyclopedie' component={EncyclopediaList}/>
                    <Route path='/bird' component={BirdDescription}/>
                    <Route path='/carte' component={BaguageMap}/>
                    <Route path='/site' component={CreateSite}/>
                    <Route path='/capture' component={BaguageCapture}/>
                    <Route path='/reprise' component={BaguageReprise}/>
                    <Route path='/listes' component={UsersList}/>
                    <Route path='/profil' component={UserProfil}/>
                </Switch>
            </div>
        )

    }
}