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

export function moveToSpam(dataMock,mailbox_id, email, user_id){
  return{
    type: "MOVE_TO_SPAM",
    data: dataMock,
    mailbox: mailbox_id,
    email: email,
    user_id: user_id
  };
}

export function moveToTrash(dataMock,mailbox_id, email, user_id){
  return{
    type: "MOVE_TO_TRASH",
    data: dataMock,
    mailbox: mailbox_id,
    email: email,
    user_id: user_id
  };
}

export function markAsUnread(dataMock,mailbox_id, email, user_id){
  return{
    type: "MARK_AS_UNREAD",
    data: dataMock,
    mailbox: mailbox_id,
    email: email,
    user_id: user_id
  };
}
