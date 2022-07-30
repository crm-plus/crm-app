import React from 'react';
import { Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import OrganizationNavBar from "./navbar/OrganizationNavBar";

import './OrganizationMainPage.scss'

function OrganizationMainPage() {
    const {name} = useParams();

    return (
        <div >
            <Grid container className={'organization-page'}>
                <Grid item xs={2} wrap={'nowrap'}>
                    <OrganizationNavBar organizationName={name ? name : ''} />
                </Grid>
                <Grid item xs={10}>

                </Grid>
            </Grid>
        </div>
    );
}

export default OrganizationMainPage;