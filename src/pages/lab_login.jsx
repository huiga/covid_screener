import React, {Component} from 'react';
import * as Constants from '../constants';
import axios from 'axios';

class LabLogin extends Component {
    state = {
        email: '',
        password: '',
        loginType: '',
        error: 0
    }

    login = (event) => {
        event.preventDefault();
        var labID = '';
        axios.get('/labemployee/login', {params: { 
            email: this.state.email, 
            pass: this.state.password 
        }}).then(response => {
            console.log("Query result is: ", response.data[0])
            if( response.data === '' ){
                console.log("Null result, can't log in. Make error animation?");
            }
            else {
                labID = response.data[0].labID
                switch (this.state.loginType) {
                    case 'home':
                        console.log(labID)
                        this.props.history.push({
                            pathname: '/labtech/home',
                            labID: labID
                        })
                        break
                    case 'collector':
                        this.props.history.push({
                            pathname: '/labtech/collect',
                            labID: labID
                        })
                        break
                    default:
                        break
                }
            }
        })
    }


    emailHandler = (event) => {
        event.preventDefault();
        this.setState({email : event.target.value});
    }

    passwordHandler = (event) => {
        event.preventDefault();
        this.setState({password : event.target.value});
    }

    backHandler = (event) => {
        event.preventDefault();
        this.props.history.goBack();
    }

    render(){
        return (
            <div style={{ 'display':'flex', 'justifyContent':'center', 'alignItems':'center', 
            'height':'100vh', 'flexDirection':'column', 'backgroundColor':Constants.BGCOLOR_GREEN}}>
                <div className="loginBox">
                    <h1 style={{'margin':'0px 10px 30px 10px'}}>Lab Worker Login</h1>
                    <form className='loginForm' onSubmit={this.login}>
                        <input className='loginInput' type='email' placeholder='Email' onChange={this.emailHandler}></input>
                        <input className='loginInput' type='password' placeholder='Password' onChange={this.passwordHandler}></input>
                        <div>
                            <button type='button' className='btn btn-outline-primary' style={{'width':'70px'}}
                                onClick={this.backHandler}>Back</button>
                            <input type='submit' className='btn btn-outline-primary' onClick={() => {
                                this.setState({loginType:'collector'})}} value='Login Collector' 
                                style={{'margin':'10px', 'width':'130px'}}></input>
                            <input type='submit' className='btn btn-outline-primary' onClick={() => {
                                this.setState({loginType:'home'})}} 
                                value='Lab Login' style={{'width':'100px'}}></input>
                        </div>    
                    </form>
                </div>
            </div> 
        )
    }
}

export default LabLogin;