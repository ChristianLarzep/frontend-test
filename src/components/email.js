import React from 'react';

export class Email extends React.Component{
  render(){
    var email = '';
    var tag = '';
    if(this.props.EmailType === 4){
        tag = "To: "+this.props.Tag;
        email = "<"+this.props.To+">";
    }else{
      tag = this.props.Tag;
        email = "<"+this.props.From+">";
    }
    return(
      <div className="emailContainer">
          <div className="subjectContainer">
               <div className="emailSubject">{this.props.Subject}</div>
                    <div className="iconsAction">
                      <div onClick = {()=>this.props.selectedAs(this.props.email, 0)}><i className="circle fas fa-circle"></i></div>
                      <div onClick = {()=>this.props.selectedAs(this.props.email, 1)}><i className="trash fas fa-trash-alt"></i></div>
                      <div onClick = {()=>this.props.selectedAs(this.props.email, 2)}><i className="microchip fas fa-microchip"></i></div>
                   </div>
               </div>
               <div className="email">
               <div className="emailHead">
                    <div className="sender">{tag}</div>
                    <div className="from">{email}</div>

                    <div className="emailDate">{this.props.date}</div>
               </div>
               <div className="emailBody">
                   <div className="body">{this.props.Body}</div>
               </div>
          </div>
     </div>
    );
  }
}
