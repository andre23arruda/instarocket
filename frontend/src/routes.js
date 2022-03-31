import React from 'react'
import { BrowserRouter,  Route } from 'react-router-dom'

// pages
import Feed from './pages/Feed'
import Login from './pages/Login'
import NewPost from './pages/NewPost'
import Signup from './pages/Signup'


function Routes(){
    return (
        <BrowserRouter>
            <Route exact path='/' component={ Feed } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/signup' component={ Signup } />
            <Route exact path='/new' component={ NewPost } />
        </BrowserRouter>
    )
}

export default Routes
