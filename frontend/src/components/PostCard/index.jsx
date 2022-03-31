import React from 'react'

// styles and images
import './PostCard.scss'
import comment from '../../assets/comment.svg'
import like from '../../assets/like.svg'
import likeFill from '../../assets/like-fill.svg'
import more from '../../assets/more.svg'
import send from '../../assets/send.svg'
import { getApi } from '../../services/api'
import { useState } from 'react'


function PostCard({ post }) {
    const [currentPost, setCurrentPost] = useState(post)

    async function handleLike(post_id) {
        const token = localStorage.getItem('token')
        // const routePrefix = token.startsWith('JWT') ? '' : 'oauth-'
        const routePrefix = ''
        const { data } = await getApi(`instarocket/${  routePrefix }posts/${ post_id }/like`, token)
        const likes = data.liked ? currentPost.likes + 1 : currentPost.likes - 1
        const liked_by_user = data.liked ? true : false
        setCurrentPost({...currentPost, likes, liked_by_user })
    }

    return (
        <li className="post" key={ currentPost.id }>
            <header>
                <div className="author-info">
                    <span className="author">{ currentPost.author }</span>
                    <span className="place">{ currentPost.place }</span>
                </div>

                <img className="icon" src={ more } alt="More"/>
            </header>

            <img className="post-img" src={ currentPost.image } alt={ `${ currentPost.author } post` }/>

            <div className="buttons">
                <button onClick={ () => handleLike(currentPost.id) }>
                    { currentPost.liked_by_user ? (
                        <img className="icon" src={ likeFill } alt="Like"/>
                        ) : (
                        <img className="icon" src={ like } alt="Like"/>
                    )}
                </button>

                <button onClick={() => {}}>
                    <img className="icon" src={ comment } alt="Comment"/>
                </button>

                <button onClick={() => {}}>
                    <img className="icon" src={ send } alt="Send"/>
                </button>
            </div>

            <footer>
                <p className="likes-count">{ currentPost.likes } like{ currentPost.likes > 1 ? 's' : '' }</p>
                <p className="description">{ currentPost.description }</p>
                <p className="hashtags">{ currentPost.hashtags }</p>
            </footer>
        </li>

    )
}

export default PostCard