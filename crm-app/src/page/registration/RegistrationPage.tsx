import React, { FC } from 'react';
import {Button, FloatingLabel, FormControl, FormGroup} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Feedback from 'react-bootstrap/Feedback';
import {Link} from 'react-router-dom';

import Credentials from '../../type/Credentials';
import CredentialSchema from '../../validation/CredentialSchema'

import './RegistrationPage.scss'

interface RegistrationPageProps {

}

const RegistrationPage: FC<RegistrationPageProps> = ({}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValidating }
    } = useForm<Credentials>({
        resolver: yupResolver(CredentialSchema),
        mode: 'all'
    });

    const onSubmit = (data: Credentials) => {
        console.log(JSON.stringify(data, null, 2));
    };

    return (
            <div className={'registration-form'}>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className={'form-title'}>
                        <h2>Sign Up</h2>
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
                        <div className={'already-have-account'}>
                            <Link to={'/signin'}><a> Already have an account? Sign in </a></Link>
                        </div>
                    </FormGroup>
                    <div className={'footer'}>
                        <Button className={'submit-button'} type='submit' variant='outline-dark'>Sing Up</Button>
                    </div>

                </form>
            </div>
    );
}

export default RegistrationPage;