document.addEventListener('DOMContentLoaded', () => {
    // Set the variables I need.
    const newTask = document.querySelector('#newTask')
    const submit = document.querySelector('#submitButton')

    // Initialize the submit button as diabled.
    submit.disabled = true;
    // Change to enabled if words are input into the text box
    newTask.onkeyup = () => {
        if (newTask.value.length > 0) {
            submit.disabled = false;
        }
        else {
            submit.disabled = true;
        }
    }

    // Add tasks to the list
    document.querySelector('#taskForm').onsubmit = () => {
        const task = newTask.value;
        const li = document.createElement('li');
        li.innerHTML = task;
        but = document.createElement('button');
        but.innerHTML = "Remove";
        li.appendChild(but);
        document.querySelector('#tasks').appendChild(li)
        but.onclick = () => {
            li.remove()
        }
        newTask.value = '';
        submit.disabled = true;
        return false;
    }
});