import React, { useState, useContext } from 'react'
import Modal from 'react-modal';
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../components/Context/AuthContext'

import { ErrorMessage, SuccessMessage } from '../../components/MainStyles'

import { Area } from './styles'

import api from '../../services/api'

const SignIn = () => {

    const customStyles = {
        content : {
          top                   : '30%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
    };

    const { signIn } = useContext(AuthContext)
    const [ modal, setModal ] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)

    const [disabled, setDisabled] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault() // Para que o formulário não seja enviado sem querer
        setDisabled(true)
        setError('')

        await signIn(email.trim(), password.trim())

        setDisabled(false)
    }

    const sendEmail = async () => {
        const request = await api.sendEmal(email);
        request?.status === 200 ? setSuccess("E-mail enviado com sucesso!") : setError("E-mail não localizado!");
        setModal(false);
    }

    return (
        <Area>
            <Modal 
                isOpen={modal}
                style={customStyles}
            >
                <div class="modal-body">
                    <p class="alert alert-dark">Digite seu e-mail para redefinir sua Senha.</p>
                    <input type="email" class="form-control dark" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => sendEmail()}>Enviar e-mail de recuperaão</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {setModal(false)}}>Cancelar</button>
                </div>
            </Modal>
            {
                success && <SuccessMessage>{success}</SuccessMessage>
            }{
                error && <ErrorMessage>{error}</ErrorMessage>
            }
            
            <div className='area--logo'>
                <img src={logo} alt='' />
            </div>
            <div className='title' alt=''>producer point</div>
                Realize sua autenticação
            <form onSubmit={handleSubmit}>
                <label className='area'>
                    <div className='area--title'>E-mail:</div>
                    <div className='area--input'>
                        <input
                            type='email'
                            placeholder='Digite seu e-mail'
                            disabled={disabled}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </label>

                <label className='area'>
                    <div className='area--title'>Senha:</div>
                    <div className='area--input'>
                        <input
                            type='password'
                            placeholder='Digite sua senha'
                            disabled={disabled}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </label>

                <label className='area'>
                    <div className='area--title'></div>
                    <div className='area--input'>
                        <button disabled={disabled}>Entrar</button>
                    </div>
                    <div className='area--input'>
                        <a href="#" onClick={() => setModal(true)}>Esqueci minha Senha</a>
                    </div>
                </label>
            </form>
        </Area>
    );
}

export default SignIn