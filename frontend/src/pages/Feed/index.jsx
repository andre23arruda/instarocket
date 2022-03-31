import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

// components
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import LogoutButton from '../../components/LogoutButton'
import PostCard from '../../components/PostCard'

// utils
import { getApi } from '../../services/api'
import { title } from '../../utils'

// styles and images
import './Feed.scss'
import camera from '../../assets/camera.svg'
import logo from '../../assets/logo.svg'


function Feed() {
    title('Feed')
    const history = useHistory()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function loadPostsList() {
            const token = localStorage.getItem('token')
            if (!token){
                history.push('/login')
                return
            }
            // const routePrefix = token.startsWith('JWT') ? '' : 'oauth-'
            const routePrefix = ''
            const { data, response_status } = await getApi(`instarocket/${ routePrefix }posts/`, token)
            if (response_status >= 400) {
                history.push('/login')
                return
            }
            setPosts(data)
        }
        loadPostsList()
    }, [history])

    return (
        <>
        <Header>
            <img className="logo" src={ logo } alt="Instarocket" />

            <Link to="/new">
                <img className="icon" src={ camera } alt="Camera" />
            </Link>
        </Header>

        <div className="feed-container">
            <ul className="posts-list">
                { posts.map(post => (
                    <PostCard key={ post.id } post={ post } />
                ))}
            </ul>

            <LogoutButton />

            <Footer />
        </div>
        </>
    )
}

export default Feed
