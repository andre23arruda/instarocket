import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

// utils
import { postApi } from '../../services/api'
import { title } from '../../utils'

// components
import InputPassword from '../../components/InputPassword'
import Footer from '../../components/Footer'

// styles and images
import './Signup.scss'
import logo from '../../assets/logo.svg'


function Signup() {
    title('Cadastrar')
    const history = useHistory()

    const [first_name, setFirst_name] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    async function formSignup(event) {
        event.preventDefault()
        const data = {
            username,
            first_name,
            password,
        }
        postApi(`signup/`, data)
        .then(({response_status}) => {
            if (response_status >= 400) {
                alert(`Erro no cadastro. Tente novamente`)
            } else if (200 < response_status < 300) {
                alert(`Usuário cadastrado com sucesso!!`)
                history.push('/login')
            }
        })
    }

    function validateForm() {
        return username && password
    }

    return (
        <div className="signup-page">
            <form onSubmit={ formSignup }>
                <img
                    className="logo"
                    src={ logo }
                    alt="Instarocket"
                />

                <input
                    type="text"
                    placeholder="Your name"
                    value={ first_name }
                    onChange={ e => setFirst_name(e.target.value) }
                />

                <input
                    type="text"
                    placeholder="Username"
                    value={ username }
                    onChange={ e => setUsername(e.target.value) }
                />

                <InputPassword
                    password={ password }
                    setPassword={ setPassword }
                    showPassword={ showPassword }
                    setShowPassword={ setShowPassword }
                />

                <button
                    type="submit"
                    disabled={ !validateForm() }
                >
                    Cadastrar
                </button>

                <Link className="link" to="/login">
                    Voltar
                </Link>
            </form>

            <Footer />
        </div>
    )
}

export default Signup
