import React from 'react';

export class EmailListItems extends React.Component{
  render(){
      var body = this.props.body;
      var visto = "Readed";
      if (this.props.body.length > 40) {
            body = this.props.body.substring(0, 45) + "...";
      }

      if (this.props.isReaded === false){
            visto = "noReaded";
      }else{
           if(this.props.style === "itemListClicked"){
                visto="ReadedAndClicked";
           }
      }
      var date = this.props.date.toString();
      date =date.substring(4, 10);
   return(
      <div className={this.props.style} onClick = {this.props.onclick.bind(null)}>
            <div className="top">
                 <div className="iconDiv"><i className="icon far fa-user"></i></div>
                 <div className="tagDiv"><p>{this.props.tag}</p></div>
                 <div className="dateDiv"><p>{date}</p></div>
            </div>
            <div className="middle">
                 <div className={visto}></div>
                 <div className="subjectItem">{this.props.subject}</div>
            </div>
            <div className="bottom">
                 <div className="bodyDiv">{body}</div>
            </div>
       </div>
    );
  }
}
