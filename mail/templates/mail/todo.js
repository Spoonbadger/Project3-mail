document.addEventListener('DOMContentLoaded', () => {
    // Set variables
    counter = 0;
    counterElement = document.querySelector('#counterElement');
    hasStarted = false;
    
    document.querySelector('#counterButton').onclick = () => {
        counter ++;
        counterElement.innerHTML = counter;

        if (!hasStarted) {
            hasStarted = true;
            setInterval(() => {
                counter ++;
                counterElement.innerHTML = counter;
            }, 1000)
        }
    }
});