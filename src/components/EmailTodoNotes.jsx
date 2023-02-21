import React from "react";

function EmailTodoNotes(emailValue,btnSendEmail){
    return(
        <div>
            <input type="email" placeholder="Please enter a valid email-address" value={emailValue}/>
            <button type="button" onClick={btnSendEmail}>Send Email</button>
        </div>
    )

}

export default EmailTodoNotes;