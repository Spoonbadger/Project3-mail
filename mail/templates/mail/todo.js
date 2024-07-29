document.addEventListener('DOMContentLoaded', () => {
    // Set variables: the task input and the submit button
    const newTask = document.querySelector('#inputTask')
    const submit = document.querySelector('#submitButton')

    // Make sure the submit button is disabled if there is no text in the task input box.
    submit.disabled = true;
    newTask.onkeyup = () => {
        if (newTask.value.length > 0) {
            submit.disabled = false;
        }
        else {
            submit.disabled = true;
        }
    }

    // Append the list when a task is submitted
    document.querySelector('#taskForm').onsubmit = () => {
        const li = document.createElement('li')
        li.innerHTML = newTask.value
        let but = document.createElement('button')
        but.innerHTML = "Remove"
        li.appendChild(but);
        document.querySelector('#tasks').appendChild(li)

        // Make the new button remove the list item when clicked.
        but.onclick = () => {
            li.remove();
        }

        //reset the input box
        newTask.value = '';

        return false;
    }
})