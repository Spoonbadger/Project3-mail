document.addEventListener('DOMContentLoaded', () => {
    // Check if there is already a 'counter' value in localStorage, if not, set it to 0
    if (!localStorage.getItem('counter')) {
        localStorage.setItem('counter', 0);
    }

    // Ensure the inital value on the webpage is set to the current value of counter in the localStorage
    document.querySelector('#counterElement').innerHTML = localStorage.getItem('counter');

    // When the button is clicked the counter should increase by a value of 1
    document.querySelector('#counterButton').onclick = () => {
        let counter = parseInt(localStorage.getItem('counter'));
        counter ++;
        document.querySelector('#counterElement').innerHTML = counter;
        localStorage.setItem('counter', counter);
    }
});

