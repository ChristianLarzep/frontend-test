
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineForms } from 'react-redux-form';

//components
import { Sendemail } from './sendEmail.js';
import { Email } from './email.js';
import { EmailList } from './emailList.js';
import { MailBoxList } from './mailboxList.js';

export class App extends React.Component{

constructor(props){
  super(props);
  this.state = {
    mailbox_id: 3,
    option:0,
    email_id:null
  }

}
  onSelected(id){
    this.setState({
      mailbox_id: id,
      option: 0,
      email_id:null
    })
  }

  onSending(){
      this.setState({
        option: 1
      })
  }

  emailSended(val){ //Para que al enviar el correo squite el formulario
    this.props.onSendEmail(val);
    this.setState({
      option: 0
    });
  }

  onEmailSelected(id){
    this.setState({
      email_id: id,
      option: 2
    });
    this.props.onReadEmail(this.state.mailbox_id,id);
  }

  render(){

    var mailbox_id = this.state.mailbox_id;
    var email_id = this.state.email_id;
    var option = this.state.option;
    var selected = '';

    var thisemails = this.props.emails.filter(function(content){
       return content.id === mailbox_id;
       })[0];
    var emailsList = <EmailList
                         theemails={thisemails.emails}
                         onClick={(id)=>this.onEmailSelected(id)}
                      />

    if(this.state.option === 2){
        var the_email =  thisemails.emails.filter(function(content){
               return content.id === email_id;
        })[0];

         selected = <Email
                         selectedAs={(email, option)=>this.props.selectedAs(email, this.state.mailbox_id, option)}
                         email={the_email} Tag={the_email.tag}
                         From={the_email.from}
                         date={the_email.date}
                         To={the_email.to}
                         Subject={the_email.subject}
                         Body={the_email.body}
                         />
    }//if
    else if(this.state.option === 1){
      const initialState = {
        to:'',
        subject: '',
        body: ''
      }
      var store = createStore(combineForms({email: initialState}));

      selected = <Provider store={store}>
                   <Sendemail onClick={(val)=>this.emailSended(val)} />
                 </Provider>
    }
    return(
    <div>
      <div className="mainFrame">
          <div className="leftDivision">
             <MailBoxList onClick = {(id)=> this.onSelected(id)}/>
             {emailsList}
          </div>
          <div className="rightDivision">
                <div ><i className=" navi empty far fa-envelope"></i></div>
                <div className="infoi">
                  {selected}
                </div>
          </div>
      </div>
      <div className="buttons">
       <button className=" buttonRedactar" onClick = {() => this.onSending()}>Write</button>
       <button className=" buttonSalir" onClick = {()=> this.props.logOut()} >Logout</button>
      </div>
    </div>
    );
  }
}
