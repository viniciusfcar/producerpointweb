import React, { useState, useEffect, createContext } from 'react'
import Cookies from 'js-cookie'

import Api from '../../services/api'

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadStorage = () => {
            const storageUser = Cookies.get('@producerpoint:user')
            if (storageUser) {
                setUser(JSON.parse(storageUser))
            }
        }
        loadStorage()
    }, [])

    const signIn = async (email, password) => {

        if (email.length === 0 || password.length === 0) {
            return
        } else {
            const response = await Api.onSignIn(email, password)

            try {
                if (response.status === 200) {
                    const data = await response.json()
                    setUser(data)
                    storageUser(data)
                    window.location.href = '/home'
                    return
                } else {
                    alert('Deu ruim!')
                    return
                }
            }
            catch (erro) {
                alert('Error: ' + erro)
            }
        }
    }

    //Função para adicionar o usuário no Async Storage
    const storageUser = async (data) => {
        Cookies.set('@producerpoint:user', data, { expires: 999 })
    }

    return (

        <AuthContext.Provider value={{
            user, signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

