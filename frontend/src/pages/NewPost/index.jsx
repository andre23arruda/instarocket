import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// components
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import LogoutButton from '../../components/LogoutButton'

// utils
import { postFormDataApi } from '../../services/api'

// styles and images
import './NewPost.scss'
import close from '../../assets/close.svg'
import logo from '../../assets/logo.svg'


function NewPost() {
    const history = useHistory()

    const [author, setAuthor] = useState('')
    const [place, setPlace] = useState('')
    const [description, setDescription] = useState('')
    const [hashtags, setHashtags] = useState('')
    const [image, setImage] = useState(null)

    function handleSetImage(event) {
		if (!event.target.files) return
		setImage(event.target.files[0])
	}

    async function handleSubmit(event) {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const data = {
            author,
            place,
            description,
            hashtags,
            image,
        }
        postFormDataApi('instarocket/posts/', data, token)
        .then(({ response_status }) => {
            if (response_status >= 400) {
                alert(`Erro ao publicar. Nenhum campo deve estar em branco!`)
            } else if (200 < response_status < 300) {
                history.push('/')
            }
        })
    }

    useEffect(() => {
        async function getToken() {
            const token = localStorage.getItem('token')
            if (!token){
                history.push('/login')
                return
            }
        }
        getToken()
    }, [history])

    return (
        <>
        <Header>
            <img className="logo" src={ logo } alt="Instarocket" />

            <Link to="/">
                <img className="icon" src={ close } alt="Close" />
            </Link>
        </Header>

        <div className="new-post-container">
            <form
                className="new-post"
                onSubmit={ event => handleSubmit(event) }
            >
                <input
                    type="file"
                    name="postImage"
                    onChange={ e => handleSetImage(e)}
                />

                <input
                    placeholder="Autor do post"
                    type="text"
                    name="postAuthor"
                    onChange={ e => setAuthor(e.target.value) }
                    />

                <input
                    placeholder="Local do post"
                    type="text"
                    name="postPlace"
                    onChange={ e => setPlace(e.target.value) }
                    />

                <input
                    placeholder="Descrição do post"
                    type="text"
                    name="postDescription"
                    onChange={ e => setDescription(e.target.value) }
                    />

                <input
                    placeholder="Hashtags"
                    type="text"
                    name="postHashtags"
                    onChange={ e => setHashtags(e.target.value) }
                />

                <button>Enviar</button>

            </form>

            <LogoutButton />

            <Footer />
        </div>
        </>
    )
}

export default NewPost
