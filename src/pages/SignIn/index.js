import React, { useEffect, useState, useContext } from 'react'
import Modal from 'react-modal';
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../components/Context/AuthContext'
import { useParams } from "react-router-dom";
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
    let { mail, time, token } = useParams();
    const { signIn } = useContext(AuthContext)
    const [ modal, setModal ] = useState(false);
    const [ modalRecovery, setModalRecovery ] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)

    const [disabled, setDisabled] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        console.log(mail, time, token)
        if (mail!=null && time!=null && token!=null) {
            setEmail(mail);
            validateLink();
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault() // Para que o formulário não seja enviado sem querer
        setDisabled(true)
        setError('')

        await signIn(email.trim(), password.trim())

        setDisabled(false)
    }

    const sendEmail = async () => {
        setSuccess('');
        setError('');
        const request = await api.sendEmalRecovery(email);
        request?.status === 200 ? setSuccess("E-mail enviado com sucesso!") : setError("E-mail não localizado!");
        setModal(false);
    }

    const validateLink = async () => {
        setSuccess('');
        setError('');
        const request = await api.validateLink(mail, time, token);
        if(request?.status === 200 ) {
            setSuccess("Link de redefinição válido!");
                setModalRecovery(true);
        } else {
            setError("Link de redefinição de senha inválido ou expirado!");
        }
    }

    const setNewPassword = async () => {
        setSuccess('');
        setError('');
        if(password === confirmPassword){
            const request = await api.setNewPassword(mail, time, token, password);
            if(request?.status === 200 ) {
                setSuccess("Senha alterada com sucesso!");
            } else {
                setError("Link de redefinição de senha inválido ou expirado!");
            }
            setModalRecovery(false);
        } else {
            setError("A senha e confirmação de senha não são iguais");
        }
        
    }


    return (
        <Area>
            <Modal // Envio de e-mail de recuperaão de senha
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

            <Modal // Alteração de senha
                isOpen={modalRecovery}
                style={customStyles}
            >
                <div class="modal-body">
                    <h3 class="alert alert-warning center">Redefinição de senha para <br/>{email}</h3>
                    {
                        success && <SuccessMessage>{success}</SuccessMessage>
                    }{
                        error && <ErrorMessage>{error}</ErrorMessage>
                    }
                    
                    <p class="alert-dark">Digite uma nova senha:
                        <input type="password" class="form-control dark" value={password} onChange={e => setPassword(e.target.value)}/>
                    </p>
                    <p class="alert-dark">Confirme sua nova senha:
                        <input type="password" class="form-control dark" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    </p> 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setNewPassword()}>Redefinir Minha Senha</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {setModalRecovery(false)}}>Cancelar</button>
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