import React from 'react';

//components
import { Login } from './login.js';
import { App } from './emailBox.js';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { combineForms } from 'react-redux-form';
import { connect } from 'react-redux';

//actions
import { getdata } from '../actions/userActions.js';
import { sendEmail } from '../actions/userActions.js';
import { sendEmailAutomatically } from '../actions/userActions.js';
import { changeEmailState } from '../actions/userActions.js';
import { moveToSpam } from '../actions/userActions.js';
import { moveToTrash } from '../actions/userActions.js';
import { markAsUnread } from '../actions/userActions.js';

class Main extends React.Component{
    constructor(props){
      super(props);

      const init = {
        email:'',
        password: ''
      }

      var store = createStore(combineForms({user: init}));

      this.state = {
        dom: <Provider store={store}>
               <Login onClick = {(val) => this.loged(val)}/>
            </Provider>,
        message: ""
      }
    }//Constructor

    logOut(){
        const init = {
          email:'',
          password: ''
        }

        var store = createStore(combineForms({user: init}));
        this.setState({
          dom: <Provider store={store}>
                   <Login onClick = {(val)=>this.loged(val)} />
              </Provider>
        });
    }//logout

   selectedAs(email, mailbox_id, user_id, option){
        if(option === 0){
            this.props.markAsUnread(this.props.response.data, mailbox_id, email, user_id );
        }else if(option === 1){
            this.props.moveToTrash(this.props.response.data, mailbox_id, email, user_id );
        }else{
            this.props.moveToSpam(this.props.response.data, mailbox_id, email, user_id );
       }
   }//selectedAs
  loged(val){
      var data = this.props.response.data;
      var the_id = '';

      for(var i = 0; i < data.length ; i++ ){ //Recorreo todos los usuarios y ve si hay un match
           if(val.email === data[i].email && val.password === data[i].password){ //Si hay match
                 the_id = i
                 this.setState({
                     dom:  <App
                           emails={data[i].mailbox}
                           logOut={()=>this.logOut()}
                           onSendEmail = {(val)=> this.props.sendEmail(val, this.props.response.data, the_id)}
                           onReadEmail={(mailboxId, emailId)=>this.props.changeEmailState(this.props.response.data,the_id, mailboxId, emailId)}
                           selectedAs={(email,mailbox_id, option)=>this.selectedAs(email, mailbox_id, the_id,option)}
                           />,
                     message: ""
                });

                 var theData = this.props.response.data;
                 var theEmail = this.props.response.data[the_id].email;
                 var sendAuth = this.props.sendEmailAutomatically;
                 setInterval(function(){
                      sendAuth(theData, theEmail, the_id);
                      sendAuth(theData, theEmail, the_id); }, 90000);
                 break;
          }else{
                this.setState({
                  message: "Email o contraseña incorrectos"
                })
              }
          }
    }//Al loged

  render(){
    return(
        <div>{this.state.message}
           <div>{this.state.dom}</div>
        </div>
    )
  }
} //final de Main

const mapStateToProps = (state) => {
  return{
    response: state.dataReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      getData: () => {
         dispatch(getdata());
      },
      sendEmail: (form_values, data, id) => {
         dispatch(sendEmail(form_values, data, id));
      },
      sendEmailAutomatically: (data, email, id) => {
         dispatch(sendEmailAutomatically(data, email, id));
      },
      changeEmailState: (data,id_user, mailbox_id, email_id) => {
         dispatch(changeEmailState(data,id_user, mailbox_id, email_id));
      },
      moveToSpam: (data, mailbox_id, email, user_id) => {
         dispatch(moveToSpam(data, mailbox_id, email, user_id));
      },
      moveToTrash: (data, mailbox_id, email, user_id) => {
         dispatch(moveToTrash(data, mailbox_id, email, user_id));
      },
      markAsUnread: (data, mailbox_id, email, user_id) => {
         dispatch(markAsUnread(data, mailbox_id, email, user_id));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
