import React, { FC, useContext, useState } from 'react';
import { Button, FloatingLabel, FormControl, FormGroup, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Feedback from 'react-bootstrap/Feedback';
import { useNavigate } from 'react-router-dom';

import Credentials from '../../../type/Credentials';
import CredentialSchema from '../../../validation/CredentialSchema';
import { toast } from 'react-toastify';
import { Context } from '../../../index';
import { WebSocketClient } from '../../../websocket/WebSocketClient';

const LoginPage: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValidating }
    } = useForm<Credentials>({
        resolver: yupResolver(CredentialSchema),
        mode: 'all'
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { auth } = useContext(Context);

    const onSubmit = async (credentials: Credentials) => {
        setIsLoading(true);
        auth.login(credentials)
            .then((response) => {
                toast.success('You have been successfully log in');
                setIsLoading(false);
                navigate('/home/organizations', { replace: true });
                return;
            }).then(() => {
                WebSocketClient.getInstance();
            });
    };

    return (

        <div className={'registration-page'}>
            <div className={'registration-form'}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={'form-title'}>
                        <h2>Sign In</h2>
                    </div>
                    <FormGroup className={'registration-input'}>
                        <FloatingLabel label={'Email address'}>
                            <FormControl
                                className={errors.email ? 'is-invalid' : ''}
                                {...register('email')}
                                type="text"
                                placeholder="name@example.com"
                            />
                            <Feedback type="invalid">
                                {errors.email?.message}
                            </Feedback>
                        </FloatingLabel>
                    </FormGroup>

                    <FormGroup className={'registration-input'}>
                        <FloatingLabel label={'Password'}>
                            <FormControl
                                className={errors.password ? 'is-invalid' : ''}
                                {...register('password')}
                                type="password"
                                placeholder="Type password..."
                            />
                            <Feedback type="invalid">
                                {errors.password?.message}
                            </Feedback>
                        </FloatingLabel>
                    </FormGroup>
                    <div className={'footer'}>
                        <Button
                            variant="outline-dark"
                            className={'submit-button'}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner
                                as="span"
                                variant="dark"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : null}
                            {isLoading ? ' Loading... ' : ' Sing In '}
                        </Button>
                    </div>


                </form>
            </div>
        </div>

    );
};

export default LoginPage;