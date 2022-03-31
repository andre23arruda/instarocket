import React from 'react'

// styles and images
import './Header.scss'


function Header({ children }) {
    return (
        <div className="header">
            <div className="icons-container">
                { children }
            </div>
        </div>
    )
}

export default Header