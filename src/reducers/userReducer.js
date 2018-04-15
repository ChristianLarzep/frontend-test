var dataMock = require('../containers/data.json');

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
          for(var i2 = 0; i2 < action.data.length ; i2++ ){ //Recorreo todos los usuarios y ve si hay un match
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
          date =date.substring(0, 25);

          for(var i = 0; i < action.data.length; i++){
             if(action.data[i].email === action.values.to){ //Si se encuantra un email igual al to
                 //Actualizar emails RECIBIDOS del la cuata a la que se envia, y asignarle el siguiente id solo contando los que ya tiene en emails recibidos
                 var newObject = {
                       id: action.data[i].mailbox[0].emails.length+1,
                       from: action.data[action.id].email,
                       to: action.values.to,
                       subject: action.values.subject,
                       body: action.values.body,
                       isReaded: false,
                       date:date,
                       avatar:"https://robohash.org/aliquamautdolore.jpg?size=50x50&set=set1",
                       tag: action.data[action.id].tag,
                       attachements:[
                         {
                           file:"http://dummyimage.com/250x250.jpg/dddddd/000000",
                           name:"sodales_scelerisque_mauris.jpeg"
                         }
                       ]};
                 newdataSended = action.data[i].mailbox[0].emails.concat(newObject);    //Juntar los emails recibidos del usuario al que se le envi
                 copy[i].mailbox[0].emails = newdataSended;
               i = action.data.length;
             }
          }

          //Actualizar emails ENVIADOS y asignarle el siguiente id solo contando los que ya tiene en emails enviados
          var newSecondObject = {
            id: action.data[action.id].mailbox[2].emails.length+1,
            from: action.data[action.id].email,
            to: action.values.to,
            subject: action.values.subject,
            body: action.values.body,
            isReaded: true,
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
          var newdataUser = action.data[action.id].mailbox[2].emails.concat(newSecondObject);  //Juntar los emails ENVIADOS
          copy[action.id].mailbox[2].emails = newdataUser; //poner todos o email en una copia de los datos enENVIADOS

          state = {
            ...state,
            data: copy
          }
          break;
    case "SEND_EMAIL_AUT":
            var d = new Date();
            var date = d.toString();
            date =date.substring(0, 25);
            var newdataSended = '';
            var copy = action.data;
            var newObject = {
                  id:action.data[action.id].mailbox[0].emails.length+1 ,
                  from:"pistianlara@gmail.com" ,
                  to: action.email,
                  subject:"Prueba" ,
                  body:"Email automatico",
                  isReaded: false,
                  date:date,
                  avatar:"https://robohash.org/aliquamautdolore.jpg?size=50x50&set=set1",
                  tag:"Pistian",
                  attachements:[
                    {
                      file:"http://dummyimage.com/250x250.jpg/dddddd/000000",
                      name:"sodales_scelerisque_mauris.jpeg"
                    }
                  ]
                 };
            newdataSended = action.data[action.id].mailbox[0].emails.concat(newObject);    //Juntar los emails recibidos del usuario al que se le envi
            copy[action.id].mailbox[0].emails = newdataSended;

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

  }
  return state;
};
 export default dataReducer;


/*var d = new Date();
var date = d.toString();
date =date.substring(0, 25);*/
