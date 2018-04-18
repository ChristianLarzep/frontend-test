import React from 'react';

import { EmailListItems } from './emailListItem.js';

export class EmailList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      item_id: ''
    }
  }
  onClick(id){
    this.setState({
      item_id: id
    });
    this.props.onClick(id);
  }
  render(){
     var emails = this.props.theemails.slice(0).reverse().map(function(content){
        if(content.deleted === false){
            var style = '';
            if(content.id === this.state.item_id){
                style = "itemListClicked";
            }else{
                style = "itemList";
            }
         return(
           <EmailListItems key={content.id}
                      style={style}
                      isReaded = {content.isReaded}
                      date = {content.date}
                      tag={content.tag}
                      subject={content.subject}
                      body={content.body}
                      onclick = {()=> this.onClick(content.id) }/>
            );
          }
    }.bind(this))

  return(
      <div className="list">
          {emails}
      </div>
    );
  }
}
