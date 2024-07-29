document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#headingButton').onclick = changeTitle;

    function changeTitle() {
        let newHeading = document.querySelector('#inputBox').value;
        document.querySelector('#titleMain').innerHTML = newHeading;
    }
});