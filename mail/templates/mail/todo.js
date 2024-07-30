document.addEventListener('DOMContentLoaded', () => {
    // Append task items to a webpage list
    let newTask = document.querySelector('#taskInput')

    document.querySelector('#taskForm').onsubmit = () => {
        let li = document.createElement('li');
        li.innerHTML = newTask.value;
        // Add a button to each task item which can remove each task item...
        removeButton = document.createElement('button')
        removeButton.innerHTML = "remove"
        li.appendChild(removeButton);

        document.querySelector('#tasks').appendChild(li);

        // Have the button remove item on click
        removeButton.onclick = () => {
            li.remove()
        }
        // Reset the form
        newTask.value = '';
        submit.disabled = true;
        // Stop the form from submitting
        return false;
    }
    // Disable the submit button when there is no text
    submit = document.querySelector('#submitButton');
    submit.disabled = true;
    newTask.onkeyup = () => {
        if (newTask.value.length > 0) {
            submit.disabled = false;
        }
        else {
            submit.disabled = true;
        }
    }
});
