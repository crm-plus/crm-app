import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {Stepper, Step, StepLabel, Box, Button, Paper, TextField, Alert} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {useState} from "react";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";

import {useFormik} from "formik";
import * as yup from "yup";
import emailSchema from "../../Validations/UserRegistrationSchema.js";


import './RegistrationPage.css';
import * as Yup from 'yup';

const Connector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor:
                ' #033b4c',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor:
                ' #033b4c',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const StepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor:
            '#033b4c',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor:
            '#033b4c',
    }),

}));

function StepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <MarkEmailReadRoundedIcon fontSize="large" className={"email-icon"}/>,
        2: <AssignmentRoundedIcon fontSize="large" className={"email-icon"}/>,
        3: <VpnKeyRoundedIcon fontSize="large" className={"email-icon"}/>,
    }

    return (
        <StepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </StepIconRoot>
    );
}

StepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['EMAIL', 'PERSONAL INFORMATION', 'PASSWORD'];

export default function RegistrationPage() {
    const [activeState, setActiveState] = useState(0);
    const maxSteps = 2;
    const minSteps = 1;

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailConfirmError, setConfirmEmailError] = useState();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [residentialAddress, setResidentialAddress] = useState('');
    const [sex, setSex] = useState();



    const formik = useFormik({
        initialValues: {
            email: email,
            confirmEmail: confirmEmail,
            firstName: firstName,
            lastName: lastName
        },
        validationSchema: emailSchema,
        validateOnBlur: true
    });

        const handleEmailChange = (event) => {
            formik.handleChange(event);
            setEmail(event.target.value);
        }


        const handleConfirmEmailChange = (event) => {
            formik.handleChange(event);
            setConfirmEmail(event.target.value);
        }



    const handleEmailsEquals = () => {
        if(email !== confirmEmail){
            setConfirmEmailError("Emails should be equals");
            return false;
        }
        setConfirmEmailError(null);
        return true;
    }

    const checkIsNotNull = (object) => {
            return !!object;
    }


    const getAppropriateStep = (step) => {
        switch (step) {
            case 0:
                return (
                 <>
                    <TextField
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        className="inputs"
                        label="Email"
                        variant="outlined" />
                    <TextField
                        name="confirmEmail"
                        type = "email"
                        value={confirmEmail}
                        onChange={handleConfirmEmailChange}
                        onBlur={handleEmailsEquals}
                        className="inputs"
                        label="Confirm email"
                        variant="outlined" />
                     {emailConfirmError ? <Alert severity="error">{emailConfirmError}</Alert> : null}
                </>)

            case 1: return (
                <>
                    <TextField
                        name="firstName"
                        value={firstName}
                        //onChange={handleFirstNameChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        className="inputs"
                        label="Email"
                        variant="outlined" />
                    <TextField
                        name="lastName"
                        value={lastName}
                        //onChange={handleLastNameChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        className="inputs"
                        label="Email"
                        variant="outlined" />

                </>

            );
            case 2: return null;
        }
    }

    const handleNext = () => {
        if(activeState < maxSteps) {
            switch (activeState) {
                case 0: {
                    if(!handleEmailsEquals()) {
                        return;
                    }
                    if(checkIsNotNull(email)
                        && !Boolean(formik.errors.email)
                        && !emailConfirmError) {
                        setActiveState(activeState + 1);
                        return;
                    }


                }
            }

        }
    }

    const handlePrev = () => {
        if(activeState >= minSteps) {
            setActiveState(activeState - 1);
        }
    }

    return (
        <>
            <Box sx={{ width: '80%', m: "5rem auto" }} spacing={4}>
                <Paper sx={{padding: '2rem', display: "flex", flexDirection: "column"}} elevation={12} >
                    <Stepper alternativeLabel activeStep={activeState} connector={<Connector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                        <Box sx={{width : '80%', m : "2rem auto", flexDirection: "column"}}>
                            <Paper sx={{width : '80%', padding: '1rem', m : "0.5rem auto", display: "flex", flexDirection: "column"}} elevation={1} >
                                {getAppropriateStep(activeState)}
                                <Button onClick={handleNext}>Next</Button>
                                <Button onClick={handlePrev}>Prev</Button>
                            </Paper>
                        </Box>
                    </Paper>
            </Box>
        </>
    );
}
