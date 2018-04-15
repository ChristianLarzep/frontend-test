import React from 'react';
import { Control, Form } from 'react-redux-form';
require("../index.css");

export class Login extends React.Component{
  render(){

    return(
      <Form className="formLogin"model="user" onSubmit={(val)=>this.props.onClick(val)}>
        <label>Email</label>
        <Control.text className="input_email" placeholder="Your email" model=".email"/>
        <label>Password</label>
        <Control.password className="input_password" placeholder="Your password" model=".password"/>
        <button className="buttonLogin">Ingresar</button>
      </Form>
    );
  }
}
