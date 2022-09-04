import React, {FC, useState} from 'react';
import {Button, FloatingLabel, FormControl, FormGroup, Spinner} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Feedback from 'react-bootstrap/Feedback';
import {Link, useNavigate} from 'react-router-dom';

import UserService from "../../service/UserService";
import Credentials from '../../type/Credentials';
import CredentialSchema from '../../validation/CredentialSchema'
import { toast } from 'react-toastify';

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
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState()
    const navigate = useNavigate()

    const onSubmit = async (credentials: Credentials) => {
        console.log(credentials)
        setIsLoading(true)
        await UserService.register(credentials)
            .then(response => {
                navigate('/signin', {replace: true})
                toast.success('You have been successfully sign up')
            })
            .catch((er) => {
                if(er.response) {
                    toast.error(er.response.data.message)
                }
            })
        setIsLoading(false);
    };

    return (
        <div className={'registration-page'}>
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
                            {isLoading ? ' Loading... ' : ' Sing Up '}
                        </Button>
                    </div>



                </form>
            </div>
        </div>

    );
}

export default RegistrationPage;