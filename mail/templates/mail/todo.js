document.addEventListener('DOMContentLoaded', () => {
    // Check if there is already a value in local storage
    if (!localStorage.getItem('counter')) {
        // If not, set the counter to 0 in local storage
        localStorage.setItem('counter', 0);
    }

    // Retrieve counter value from local storage
    let counter = parseInt(localStorage.getItem('counter'));
    let hasBegun = false;
    
    function count() {
        // Increment counter
        counter++;
        document.querySelector('#counterElement').innerHTML = counter;
        
        // Store updated counter in local storage
        localStorage.setItem('counter', counter);
        
        // Begin automatic counter once upon first click
        if (!hasBegun) {
            setInterval(() => {
                counter++;
                document.querySelector('#counterElement').innerHTML = counter;
                localStorage.setItem('counter', counter);
            }, 1000);
            hasBegun = true;
        }
    }

    // Set heading to the current value inside local storage
    document.querySelector('#counterElement').innerHTML = counter;
    document.querySelector('#counterButton').onclick = count;
});
