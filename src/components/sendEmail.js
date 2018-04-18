import React from 'react';
import { Control, Form } from 'react-redux-form';

export class Sendemail extends React.Component{
  render(){
    return(
      <Form  className="formsSendEmail"model="email" onSubmit={(val)=>this.props.onClick(val)}>
          <label>To: </label>
          <Control.text className="sendTo" model=".to" />
          <label>Subject: </label>
          <Control.text className="sendSubject" model=".subject" />
          <label>Body: </label>
          <Control.textarea model=".body" />
          <button className="buttonSendEmail">Send</button>
      </Form>

    );
  }

}
