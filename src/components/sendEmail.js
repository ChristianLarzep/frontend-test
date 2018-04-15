import React from 'react';
import { Control, Form } from 'react-redux-form';

export class Sendemail extends React.Component{
  render(){
    return(
      <Form  model="email" onSubmit={(val)=>this.props.onClick(val)}>
          <label>To: </label>
          <Control.text model=".to" />
          <label>Subject: </label>
          <Control.text model=".subject" />
          <label>Body: </label>
          <Control.textarea model=".body" />
          <button className="buttonSendEmail">Send</button>
      </Form>

    );
  }

}
