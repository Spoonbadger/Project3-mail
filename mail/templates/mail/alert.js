document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#headingButton').onclick = changeTitle;

    function changeTitle() {
        let newHeading = document.querySelector('#inputBox').value;
        document.querySelector('#titleMain').innerHTML = newHeading;

        let colors = ['green', 'darkgreen', 'pink', 'darkpink', 'blue', 'darkblue', 'orange', 'red', 'darkred', 'yellow'];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.querySelector('#titleMain').style.color = randomColor;
    }
});