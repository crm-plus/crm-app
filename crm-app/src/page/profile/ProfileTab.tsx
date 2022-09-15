import React, {useEffect, useState} from 'react';
import {Button, FloatingLabel, Form, FormControl, FormGroup, Spinner} from "react-bootstrap";
import "./ProfilePage.scss"
import Feedback from "react-bootstrap/Feedback";
import {useFieldArray, useForm} from "react-hook-form";
import Organization from "../../type/Organization";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import OrganizationSchema from "../../validation/OrganizationSchema";
import OrganizationService from "../../service/OrganizationService";
import UserSchema from "../../validation/UserSchema";
import User from "../../type/User";
import UserService from "../../service/UserService";

const ProfileTab = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>({email:'', firstName:'', lastName:'', birthDate:'',sex:''})

    useEffect(() => {
        setIsLoading(true)
        UserService.getUserProfile().then((response) => {
            setUser(response.data)
            reset(response.data)
            setIsLoading(false)
        })
    },[])

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValidating}
    } = useForm<User>({
        resolver: yupResolver(UserSchema),
        shouldUnregister: true,
        mode: 'all'
    });


    const onSubmit = async (user: User) => {
        console.log(user)
    }

    return (
        <div className='profile-tab'>
            <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <FloatingLabel label={'Email'}>
                        <FormControl
                            className={errors.email ? 'is-invalid' : ''}
                            {...register('email')}
                            type='text'
                            name={'email'}
                        />
                        <Feedback type='invalid'>
                            {errors.email?.message}
                        </Feedback>
                    </FloatingLabel>
                </FormGroup>
                <FormGroup>
                    <FloatingLabel label={'First name'}>
                        <FormControl
                            className={errors.firstName ? 'is-invalid' : ''}
                            {...register('firstName')}
                            type='text'
                        />
                        <Feedback type='invalid'>
                            {errors.firstName?.message}
                        </Feedback>
                    </FloatingLabel>
                </FormGroup>
                <FormGroup>
                    <FloatingLabel label={'Last name'}>
                        <FormControl
                            className={errors.lastName ? 'is-invalid' : ''}
                            {...register('lastName')}
                            type='text'
                        />
                        <Feedback type='invalid'>
                            {errors.lastName?.message}
                        </Feedback>
                    </FloatingLabel>
                </FormGroup>
                <FormGroup>
                    <FloatingLabel label={'Date of birth'}>
                        <FormControl
                            type='date'
                            className={errors.birthDate ? 'is-invalid' : ''}
                            {...register('birthDate')}
                        />
                        <Feedback type='invalid'>
                            {errors.birthDate?.message}
                        </Feedback>
                    </FloatingLabel>
                </FormGroup>
                <FormGroup>
                    <FloatingLabel label={'Gender'} controlId="floatingSelect">
                        <Form.Select {...register('sex')}>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                        </Form.Select>
                    </FloatingLabel>
                </FormGroup>

                <div className="control-area">
                    <Button variant='outline-dark' className={'submit-button'} type='submit'> Submit </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileTab;