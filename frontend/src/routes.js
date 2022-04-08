import React from 'react'
import { BrowserRouter,  Route, Switch } from 'react-router-dom'

// pages
import Feed from './pages/Feed'
import Login from './pages/Login'
import NewPost from './pages/NewPost'
import Page404 from './pages/Page404'
import Signup from './pages/Signup'


function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ Feed } />
                <Route exact path='/login' component={ Login } />
                <Route exact path='/signup' component={ Signup } />
                <Route exact path='/new' component={ NewPost } />

                <Route component={ Page404 } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
