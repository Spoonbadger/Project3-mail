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
  document.querySelector('#read-email-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#read-email-view').style.display = 'none';

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
        // Use bootstraps to form a list of email elements
        element.className = 'list-group-item'
        // Change the background color of each element if read or not
        if (!email.read) {
          element.classList.add('unread');
        }
        else {
          element.classList.add('read');
        }
        // The HTML each email element will display
        element.innerHTML = `
        <div><strong>From:</strong> ${email.sender}</div>
        <div><strong>Subject:</strong> ${email.subject}</div>
        <div><span class='email-timestamp' style='color: gray'>${email.timestamp}</span></div>
        `;
        // When an email element is clicked, trigger the read_email function
        element.addEventListener('click', function() {
            read_email(email);
        })
        document.querySelector('#emails-view').append(element);
      });
  });
}

function read_email(email, user) {
  // Collect the email information from the API
  fetch(`/emails/${email.id}`)
  .then(response => response.json())
  .then(email => {
      // Show read-email view and hide other views
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#read-email-view').style.display = 'block';

      // Print email
      console.log(email);

      // Create email on page
      const element = document.createElement('div');

      // Clear the read-email-view div with each load of the email
      document.querySelector('#read-email-view').innerHTML = '';
      element.innerHTML = `
      <div><strong>From:</strong> ${email.sender}</div>
      <div><strong>Subject:</strong> ${email.subject}</div>
      <div>${email.timestamp}</div><br>
      <div id='archive-button'></div>
      <hr>
      <div>${email.body}</div>
      `;
      document.querySelector('#read-email-view').append(element);
      
      // Change the email 'read' boolean to true
      fetch(`/emails/${email.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            read: true,
        })
      })

      // Create an archive/unarchive button
      if (email.sender != user) {
        const archiveButton = document.createElement('button');
        archiveButton.classList.add('btn');
        if (!email.archived) {
          archiveButton.innerHTML = "Archive";
          archiveButton.classList.add('btn-light');
        }
        else {
          archiveButton.innerHTML = "Unarchive";
          archiveButton.classList.add('btn-danger');
        }
        archiveButton.addEventListener('click', function() {
          fetch(`/emails/${email.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archived: !email.archived,
            })
          })
          .then(() => {
            if (!email.archived) {
              load_mailbox('archive');
            }
            else {
              load_mailbox('inbox');
            }
          })
        });
        document.querySelector('#archive-button').append(archiveButton);

        // Reply button
        const replyButton = document.createElement('button');
        replyButton.classList.add('btn', 'btn-primary');
        replyButton.innerHTML = 'Reply';
        document.querySelector('#archive-button').append(replyButton);
        replyButton.onclick = () => {
          compose_email()
          // Fill in composition fields
          document.querySelector('#compose-recipients').value = email.sender;
          
          if (email.subject.startsWith('Re:')) {
            document.querySelector('#compose-subject').value = `${email.subject}`;
          }
          else {
            document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
          }
          document.querySelector('#compose-body').value = `On ${email.timestamp}, ${email.sender} wrote:\n ${email.body}\n`;
        }
      }
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