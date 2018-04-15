import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

class EmailListItems extends React.Component{
  render(){
    return(
      <tr onClick = { this.props.onClick.bind(null)}>
         <td>{this.props.from}</td>
         <td>{this.props.to}</td>
         <td>{this.props.subject}</td>
      </tr>
    );
  }
}

class EmailList extends React.Component{
  render(){
    var emails = this.props.mails.map(function(content){
      return(
        <EmailListItems key={content.id}
                        from={content.from}
                        to={content.to}
                        subject={content.subject}
                        onClick = {()=> this.props.onClick(content.id)}/>
      );
    }.bind(this))
    return(
      <li>{emails}</li>

    );
  }
}

class Email extends React.Component{
  render(){
    return(
      <dl>
       <dt>From</dt>
       <dd>{this.props.From}</dd>

       <dt>To</dt>
       <dd>{this.props.To}</dd>

       <dt>Subject</dt>
       <dd>{this.props.Subject}</dd>
       <div className="body" dangerouslySetInnerHTML={{__html: this.props.Body}}></div>
      </dl>

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
  }

  render(){

       var email_id = this.state.email_id
     if(email_id){
         var the_email = this.props.mails.filter(function(content){
           return content.id === email_id;
         })[0];

         var email_selected = <Email From={the_email.from}  To={the_email.to} Subject={the_email.subject} Body={the_email.body}/>

     }
    return(
      <div>
      <EmailList mails={this.props.mails} onClick={(id) => this.onSelected(id)}/>
      <div>{email_selected}</div>
     </div>
    );
  }
}

class MailboxList extends React.Component{
  render(){
    console.log(this.props.data);
    var mailbox_list = this.props.thedata.map(function(content){
      return(
        <div>
        <div key={content.id} onClick={() => this.props.onClick(content.id)}>
          {content.emails.length}
        </div>
        {content.name}
      </div>
      );
    }.bind(this));

    return(

      <div>{mailbox_list}</div>
    );
  }
}

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      mailbox_id: null
    }
  }

  selectedMainbox(id){
    this.setState({
       mailbox_id: id
    });
  }
  render(){
    var id = this.state.mailbox_id;
      console.log(id);

    if(id){
      var emailslist = this.props.data.filter(function(mailbox) {
        return mailbox.id === id;
      })[0];

       var mailboxSelected = <MailBox mails={emailslist.emails} mailbox_id={emailslist.id} />
    }else{
      var mailboxSelected = <span>No has seleccionada nada perro</span>
    }

    return(
       <div>
          <MailboxList thedata={this.props.data} onClick= {(id) => this.selectedMainbox(id)} />
          <div>{mailboxSelected}</div>
       </div>


    );
  }

}

var thedata = [
  {
    id: 1,
    name: "Inbox",
    emails: [
      {
        id: 1,
        from: "christian.dm@live.com",
        to: "christian.dm2@hotmail.com",
        subject: "Saca las caguas",
        body: "Este es el cuerpo del email"
      },
      {
        id: 2,
        from: "pistianlara@gmail.com",
        to: "christian.dm2@hotmail.com",
        subject: "Tarea 2",
        body: "Este es el cuerpo del email2"
      }
    ]
  },
  {
    id: 2,
    name: "Spam",
    emails: [
      {
        id: 1,
        from: "basura@live.com",
        to: "christian.dm2@hotmail.com",
        subject: "Saca las caguas",
        body: "Este es el cuerpo del email spam"
      },
      {
        id: 2,
        from: "cochinada@gmail.com",
        to: "christian.dm2@hotmail.com",
        subject: "Tarea 2",
        body: "Este es el cuerpo del email spam2"
      }
    ]
  }
];

ReactDOM.render(<App data={thedata}/> , document.getElementById('root'));
