import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineForms } from 'react-redux-form';
import { Sendemail } from './sendEmail.js';

class Email extends React.Component{
  render(){
    var from = "<"+this.props.From+">";
    return(
      <div className="email">
       <div className="meta dl-horizontal panel panel-default">
          <dl>
           <dt>From</dt>
           <dd><div className="tag">{this.props.Tag}</div><div className="from">{from}</div><div className="date">{this.props.date}</div></dd>

           <dt>To</dt>
           <dd>{this.props.To}</dd>

           <dt>Subject</dt>
           <dd>{this.props.Subject}</dd>

          </dl>
       </div>
       <div className="body panel panel-default" dangerouslySetInnerHTML={{__html: this.props.Body}}></div>
     </div>
    );
  }
}




class EmailListItems extends React.Component{
  render(){
    var body = this.props.body;
    var visto = "Readed";
    if (this.props.body.length > 10) {
            body = this.props.body.substring(0, 10) + "...";
    }
    if (this.props.isReaded === false){
      visto = "noReaded";
    }
    return(
        <tr onClick = {this.props.onclick.bind(null)}>
          <td><div className={visto}></div></td>
          <td>{this.props.subject}</td>
          <td>{this.props.from}<i class="far fa-user"></i></td>
          <td>{this.props.to}</td>
          <td>{body}</td>
        </tr>
    );
  }
}

class EmailList extends React.Component{
  render(){
    var emails = this.props.theemails.map(function(content){
       return(
         <EmailListItems key={content.id}
                  isReaded = {content.isReaded}
                  from={content.from}
                  to={content.to}
                  subject={content.subject}
                  body={content.body}
                  onclick = {()=> this.props.onClick(content.id)}/>
       );
    }.bind(this))

    return(
      <table className="emailTable">
        <thead>
         <tr>
           <th>State</th>
           <th>Subject</th>
           <th>From</th>
           <th>To</th>
           <th>Body</th>
         </tr>
        </thead>
        <tbody>
          {emails}
        </tbody>
      </table>
    );
  }
}


class MailBox extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email_id: null
    }
  }
  onSelected(id){
    this.setState({
      email_id: id
    })
    this.props.onReadEmail(id);

  }
  render(){
        var email_id = this.state.email_id;
        var email = '';
        if(email_id){
             var the_email =  this.props.emails.filter(function(content){
                  return content.id === email_id;
             })[0];

             email = <Email Tag={the_email.tag} From={the_email.from} date={the_email.date} To={the_email.to} Subject={the_email.subject} Body={the_email.body}/>

        }else{
            email = <EmailList theemails={this.props.emails} onClick={(id)=>this.onSelected(id)}/>
        }

    return(
      <div>

        <div className="email-viewer">
          {email}
        </div>
     </div>
    );
  }
}

class MailBoxList extends React.Component{
  render(){
    var theemails = this.props.allemails.map(function(content){
      var icon = '';
       if(content.name === "Inbox"){
         icon = 'fas fa-inbox';
       }else if (content.name === "Spam") {
         icon = 'fas fa-microchip';
       }else{
         icon = ' fas fa-trash-alt';
       }

       return(
         <li className="list-group-item" key={content.id} onClick={()=>this.props.onClick(content.id)}>
           <span className="badge">{content.emails.length}</span><i className={icon}></i>
           {content.name}
         </li>
       )
    }.bind(this));
    return(
          <ul className="mailboxes list-group">
             {theemails}
          </ul>
    );
  }
}

export class App extends React.Component{


constructor(props){
  super(props);
  this.state = {
    mailbox_id: null,
    option:'',
    store: createStore(combineForms({email: initialState}))

  }
  const initialState = {
    to:'',
    subject: '',
    body: ''
  }

}
onSelected(id){
  this.setState({
    mailbox_id: id,
    option: 1
  })
}

onSending(){
    this.setState({
      option: 2
    })
}

emailSended(val){ //Para que al enviar el correo squite el formulario
  this.props.onSendEmail(val);
  this.setState({
    option: 0
  });
}


  render(){

    var mailbox_id = this.state.mailbox_id;
    var option = this.state.option;
    var selected = '';

    if(option === 1){
     var thisemails = this.props.emails.filter(function(content){
       return content.id === mailbox_id;
     })[0];

          selected = <MailBox className="mailbox" key={thisemails.id} emails ={thisemails.emails} onReadEmail={(id)=>this.props.onReadEmail(mailbox_id,id)}/>

    }else if(option === 2){
          selected = <Provider store={this.state.store}>
                       <Sendemail onClick={(val)=>this.emailSended(val)} />
                     </Provider>
    }
    else{
          selected = <h1>Bienvenido</h1>
    }

    return(
      <div className="row" >
        <div className="col-md-2">
           <MailBoxList allemails={this.props.emails} onClick = {(id)=> this.onSelected(id)}/>
           <button className="col-md-8 buttonRedactar" onClick = {() => this.onSending()}>Write</button>
           <button className="col-md-8 buttonSalir" onClick = {()=> this.props.logOut()} >Logout</button>
        </div>
        <div className="col-md-9">
           <div className="panel panel-default">
             <div className="panel-body">
               {selected}
             </div>
           </div>
        </div>

      </div>
    );
  }
}
