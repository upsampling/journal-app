import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui);


    const [formValues, handleInputChange] = useForm({
        name: 'erasmo',
        email: 'erasmo@hotmail.com',
        password: '1234',
        password2: '1234'
    })

    const {name, email, password, password2} = formValues;

    const handleRegister =(e)=>{
        e.preventDefault();

        if(isFormValid()){
            dispatch( startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = ()=>{
        if(name.trim().length === 0){
            dispatch(setError('name is requeried'));
            
            return false;
        }else if( !validator.isEmail(email)){
            dispatch(setError('email is no valid'));
            
            return false;
        }else if(password !== password2 || password.length < 5){
            dispatch(setError('password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form 
                onSubmit={handleRegister}
                className='animate__animated animate__fadeIn animate__faster'
            >
                {
                    msgError &&
                    (
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                    )
                    
                }
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    values={name}
                    onChange={handleInputChange}
                    // required
                />
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    values={email}
                    onChange={handleInputChange}
                    // required
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    values={password}
                    onChange={handleInputChange}
                    // required
                />
                <input
                    type="password"
                    placeholder="Confimr Password"
                    name="password2"
                    className="auth__input"
                    values={password2}
                    onChange={handleInputChange}
                    // required
                />
                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                    // disabled={true}
                >
                    Register
                </button>
                
                <Link  
                    className="link"
                    to="/auth/login"
                >
                    Already registered?
                </Link>

            </form>
        </>

    )
}
