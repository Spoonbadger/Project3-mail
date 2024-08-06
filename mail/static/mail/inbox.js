document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');

  document.querySelector('#compose-form').onsubmit = send_email;
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

  // Collect all emails from the selected mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails to console
      console.log(emails);

      // Create element for each email to display in a list
      emails.forEach(email => {
        const element = document.createElement('div');
        element.className = 'list-group-item'
        if (!email.read) {
          element.classList = 'unread';
        }
        else {
          element.classList = 'read';
        }
        element.innerHTML = `
        <div><strong>From:</strong> ${email.sender}</div>
        <div><strong>Subject:</strong>${email.subject}</div>
        <div><span class='email-timestamp' style='color: gray'>${email.timestamp}</span></div>
        `;
        element.addEventListener('click', function() {
            console.log('This element has been clicked!')
        })
        document.querySelector('#emails-view').append(element);
      });
  });
}

function send_email() {
  // Collect the information from the form
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;


  // Send the email
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: `${recipients}`,
        subject: `${subject}`,
        body: `${body}`,
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      // Load sent mailbox
      load_mailbox('sent');
  })
  // Catch any errors
  .catch(error => {
    console.log("Error:", error);
  });
}