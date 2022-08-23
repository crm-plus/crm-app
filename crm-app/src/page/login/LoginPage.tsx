import React, {FC, useState} from 'react';
import {Button, FloatingLabel, FormControl, FormGroup, Spinner} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Feedback from 'react-bootstrap/Feedback';
import {Link, useNavigate} from 'react-router-dom';

import AuthService from '../../service/AuthService'
import Credentials from '../../type/Credentials';
import CredentialSchema from '../../validation/CredentialSchema'

interface LoginPageProps {
    setIsAuthenticate: (isAuthenticated: true) => void
}

const LoginPage: FC<LoginPageProps> = ({}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValidating }
    } = useForm<Credentials>({
        resolver: yupResolver(CredentialSchema),
        mode: 'all'
    });
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const onSubmit = async (credentials: Credentials) => {
        AuthService.authenticate(credentials)
            .then(response => {
                console.log(response)
            })
            .catch((er) => console.log(er))
    };

    return (
        <div className={'registration-form'}>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className={'form-title'}>
                    <h2>Sign In</h2>
                </div>
                <FormGroup className={'registration-input'}>
                    <FloatingLabel label={'Email address'}>
                        <FormControl
                            className={errors.email ? 'is-invalid' : ''}
                            {...register('email')}
                            type='text'
                            placeholder='name@example.com'
                        />
                        <Feedback type='invalid'>
                            {errors.email?.message}
                        </Feedback>
                    </FloatingLabel>
                </FormGroup>

                <FormGroup className={'registration-input'}>
                    <FloatingLabel label={'Password'}>
                        <FormControl
                            className={errors.password ? 'is-invalid' : ''}
                            {...register('password')}
                            type='password'
                            placeholder='Type password...'
                        />
                        <Feedback type='invalid'>
                            {errors.password?.message}
                        </Feedback>
                    </FloatingLabel>
                </FormGroup>
                <div className={'footer'}>
                    <Button
                        variant='outline-dark'
                        className={'submit-button'}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner
                            as="span"
                            variant='dark'
                            animation="border"
                            size='sm'
                            role="status"
                            aria-hidden="true"
                        /> : null}
                        {isLoading ? ' Loading... ' : ' Sing In '}
                    </Button>
                </div>



            </form>
        </div>
    );
}

export default LoginPage;