export function getdata(){
  return{
    type: "GET_DATA"

  };
}

export function sendEmail(form, dataMock, id_user){
  return{
    type: "SEND_EMAIL",
    values: form,
    data: dataMock,
    id: id_user

  };
}

export function sendEmailAutomatically(dataMock, email_user,id_user){
  return{
    type: "SEND_EMAIL_AUT",
    data: dataMock,
    email: email_user,
    id: id_user
  };
}


export function changeEmailState(dataMock,id_user, mailbox_id, email_id){
  return{
    type: "CHANGE_STATE",
    data: dataMock,
    id_user: id_user,
    mailbox_id: mailbox_id,
    email_id: email_id
  };
}
