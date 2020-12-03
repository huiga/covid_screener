import React from 'react';
import LoginContainer from '../components/LoginContainer';

const LabLogin = (props) => {

    const redirectPath = (response) => {
        props.history.push({
            pathname: '/labtech/home',
            labid: response
        })
    }

    return (
        <LoginContainer history={props.history} userType="Lab Worker" path="labemployee"
         redirectPath={redirectPath}/>
    )
}

export default LabLogin;