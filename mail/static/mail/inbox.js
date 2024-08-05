document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Sending an email
  document.querySelector('#compose-form').onsubmit = submitEmail;

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Fetch the emails for the mailbox select
  fetch(`emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    emails.forEach(email => {
      const element = document.createElement('div');
      element.className = 'list-group-item';
      element.innerHTML = `
      <div>Subject: ${email.subject}</div>
      <div>Sender: ${email.sender}  Received: ${email.timestamp}</div>
      `;

      // Check if the email has been read in order to choose the appropriate tile background color.
      if (email.read === "true") {
        className = 'read';
      }
      else {
        className = 'unread';
      }

      element.addEventListener('click', () => {
        // TODO change to link to the email clicked on.
        console.log("This element has been clicked")
      })
      document.querySelector('#emails-view').append(element)
    })
  })
}


function submitEmail(event) {

  // Stop the default action of the form continually submitting
  event.preventDefault();
  // Set variables needed for email
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // Fetch to the backend as a 'POST' method
  fetch('emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body,
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result)
  });
}