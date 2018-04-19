var dataMock = require('../data/data.json');

const initialState = {
  data: dataMock,
  user_id: '?'
};

const dataReducer = (state = initialState, action) => {
  switch(action.type){
    case "GET_DATA":
            state = {
              ...state,
              data: state.data
            };
    break;

     case "LOGIN":
           var the_id = '';
          for(var i2 = 0; i2 < action.data.length ; i2++ ){ //Recorre todos los usuarios y ve si hay un match
              if(action.values.email === action.data[i2].email && action.values.password === action.data[i2].password){
                  the_id = i2;
                  i2 = action.data.length;
               }
            }

             state = {
               ...state,
               user_id: the_id
             }
     break;
    case "SEND_EMAIL":

          var newdataSended = '';
          var copy = action.data;
          var d = new Date();
          var date = d.toString();
          date =date.substring(0, 21);

          for(var i = 0; i < action.data.length; i++){
             if(action.data[i].email === action.values.to){ //Si se encuentra un email igual al to
                 //Actualizar emails RECIBIDOS del email al que se envia. Asignarle el siguiente id solo contando los que ya tiene en emails recibidos
                 var newObject = {
                       id: action.data[i].mailbox[2].emails.length+1,
                       from: action.data[action.id].email,
                       to: action.values.to,
                       subject: action.values.subject,
                       body: action.values.body,
                       isReaded: false,
                       deleted:false,
                       date:date,
                       avatar:"https://robohash.org/aliquamautdolore.jpg?size=50x50&set=set1",
                       tag: action.data[action.id].tag,
                       attachements:[
                         {
                           file:"http://dummyimage.com/250x250.jpg/dddddd/000000",
                           name:"sodales_scelerisque_mauris.jpeg"
                         }
                       ]};
                 newdataSended = action.data[i].mailbox[2].emails.concat(newObject);    //Juntar los emails recibidos del usuario al que se le envio
                 copy[i].mailbox[2].emails = newdataSended;
               break;
             }
          }

          //Actualizar emails ENVIADOS y asignarle el siguiente id solo contando los que ya tiene en emails enviados
          var newSecondObject = {
            id: action.data[action.id].mailbox[3].emails.length+1,
            from: action.data[action.id].email,
            to: action.values.to,
            subject: action.values.subject,
            body: action.values.body,
            isReaded: true,
            deleted:false,
            date:date,
            avatar:"https://robohash.org/aliquamautdolore.jpg?size=50x50&set=set1",
            tag:action.data[action.id].tag,
            attachements:[
              {
                file:"http://dummyimage.com/250x250.jpg/dddddd/000000",
                name:"sodales_scelerisque_mauris.jpeg"
              }
            ]
          };
          var newdataUser = action.data[action.id].mailbox[3].emails.concat(newSecondObject);  //Juntar los emails ENVIADOS
          copy[action.id].mailbox[3].emails = newdataUser; //poner todos o email en una copia de los datos ENVIADOS

          state = {
            ...state,
            data: copy
          }
          break;
    case "SEND_EMAIL_AUT":
            var d = new Date();
            var date = d.toString();
            date =date.substring(0, 21);
            var newdataSended = '';
            var copy = action.data;
            var newObject = {
                  "id":action.data[action.id].mailbox[2].emails.length+1 ,
                  "from": "pistianlara@gmail.com",
                  "to": "pistia@gmail.com",
                  "subject": "Que onda perro",
                  "body": "Email automatico",
                  "isReaded":false,
                  "deleted":false,
                  "date":date,
                  "avatar":"https://robohash.org/aliquamautdolore.jpg?size=50x50&set=set1",
                  "tag":"Teal",
                  "attachements":[
                      {
                        "file":"http://dummyimage.com/250x250.jpg/dddddd/000000",
                        "name":"sodales_scelerisque_mauris.jpeg"
                      }
                      ]
                 };
            newdataSended = action.data[action.id].mailbox[2].emails.concat(newObject);    //Juntar los emails recibidos del usuario al que se le envio
            copy[action.id].mailbox[2].emails = newdataSended;

            state = {
              ...state,
              data: copy
            }
          break;
          case "CHANGE_STATE":
                 var copy = action.data;
                 copy[action.id_user].mailbox[action.mailbox_id-1].emails[action.email_id-1].isReaded = true;

                  state = {
                    ...state,
                    data: copy
                  }
          break;

          case "MOVE_TO_SPAM":
                  var copy = action.data;
                  newObject = {
                        "id": action.data[action.user_id].mailbox[0].emails.length + 1 ,
                        "from":action.email.from ,
                        "to": action.email.to,
                        "subject": action.email.subject,
                        "body": action.email.body,
                        "isReaded":true,
                        "deleted":false,
                        "date":action.email.date,
                        "avatar":"https://robohash.org/aliquamautdolore.jpg?size=50x50&set=set1",
                        "tag":action.email.tag,
                        "attachements":[
                            {
                              "file":"http://dummyimage.com/250x250.jpg/dddddd/000000",
                              "name":"sodales_scelerisque_mauris.jpeg"
                            }
                            ]
                       };

                  for(var i = 0; i<action.data[action.user_id].mailbox[action.mailbox-1].emails.length; i++){
                    if(action.email.id === action.data[action.user_id].mailbox[action.mailbox-1].emails[i].id){
                          copy[action.user_id].mailbox[action.mailbox-1].emails[i].deleted = true;
                          copy[action.user_id].mailbox[0].emails =  action.data[action.user_id].mailbox[0].emails.concat(newObject);

                      break;
                    }
                  }

                  state = {
                    ...state,
                    data: copy
                  }
          break;

          case "MOVE_TO_TRASH":
                  var copy = action.data;
                  newObject = {
                        "id": action.data[action.user_id].mailbox[1].emails.length + 1 ,
                        "from":action.email.from ,
                        "to": action.email.to,
                        "subject": action.email.subject,
                        "body": action.email.body,
                        "isReaded":true,
                        "deleted":false,
                        "date":action.email.date,
                        "avatar":"https://robohash.org/aliquamautdolore.jpg?size=50x50&set=set1",
                        "tag":action.email.tag,
                        "attachements":[
                            {
                              "file":"http://dummyimage.com/250x250.jpg/dddddd/000000",
                              "name":"sodales_scelerisque_mauris.jpeg"
                            }
                            ]
                       };

                  for(var i = 0; i<action.data[action.user_id].mailbox[action.mailbox-1].emails.length; i++){
                    if(action.email.id === action.data[action.user_id].mailbox[action.mailbox-1].emails[i].id){
                          copy[action.user_id].mailbox[action.mailbox-1].emails[i].deleted = true;
                          copy[action.user_id].mailbox[1].emails =  action.data[action.user_id].mailbox[1].emails.concat(newObject);

                      break;
                    }
                  }

                  state = {
                    ...state,
                    data: copy
                  }
          break;

          case "MARK_AS_UNREAD":
                 var copy = action.data;

                 copy[action.user_id].mailbox[action.mailbox-1].emails[action.email.id-1].isReaded = false;

                  state = {
                    ...state,
                    data: copy
                  }
          break;
  }
  return state;
};
 export default dataReducer;


/*

action.data[i].mailbox[2].emails[action.data[i].mailbox[2].emails.length-1].id+1,
action.data[action.id].mailbox[1].emails[action.data[action.id].mailbox[1].emails.length-1].id+1,
action.data[action.id].mailbox[2].emails[action.data[action.id].mailbox[2].emails.length-1].id+1,
*/
