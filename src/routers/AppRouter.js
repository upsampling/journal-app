import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch, 
    HashRouter
  } from "react-router-dom";
import {firebase} from '../firebase/firebaseConfig'  
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user)=>{
            
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                
                dispatch(startLoadingNotes(user.uid));

            }else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch]);

    if(checking){
        return(
            <h1>
                espere por favor...
            </h1>
        )
    }

    return (
        <HashRouter basename="/">
            <Router>
                <div>
                    <Switch>
                        <PublicRoute
                            isAuthenticated={isLoggedIn}
                            path="/auth" 
                            component={AuthRouter} 
                        />
                        
                        <PrivateRoute  
                            exact
                            isAuthenticated={isLoggedIn}
                            path="/" 
                            component={JournalScreen} 
                        />
                        
                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            </Router>
        </HashRouter>
    )
}
