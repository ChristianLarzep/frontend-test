import React from 'react';

export class MailBoxList extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       option_id: ''
     }
   }

   onClick(id){
     this.setState({
       option_id: id
     });
     this.props.onClick(id);
   }

  render(){
      var styleSpam='';
      var styleTrash='';
      var styleInbox='';
         if(this.state.option_id === 3){
           styleInbox="optionSelected";
         }
         if(this.state.option_id === 1){
           styleSpam="optionSelected"
         }
         if(this.state.option_id === 2){
           styleTrash="optionSelected";
         }
  var theemails = <ul className="options">
                    <li className={styleSpam} key={1}onClick={()=>this.onClick(1)}>
                       <i className="fas fa-microchip"></i>Spam
                    </li>
                    <li className={styleTrash} key={2} onClick={()=>this.onClick(2)}>
                       <i className="fas fa-trash-alt"></i>Trash
                    </li>
                    <li className={styleInbox} key={3} onClick={()=>this.onClick(3)}>
                       <i className="fas fa-inbox"></i>Inbox
                    </li>
                </ul>
    return(
         <div>
           {theemails}
        </div>
    );
  }
}
