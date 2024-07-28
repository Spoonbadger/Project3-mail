// Function to change the title.
function changeTitle(event) {
    title.innerHTML = event.target.value;
}


// Function to change the text of the subtitle, 3 subtitle options.
function changeSubtitle() {
    subtitle = document.querySelector('#subtitle1')
    if (subtitle.innerHTML === "Ok, now we have a subtitle.") {
        subtitle.innerHTML = "And look, it changes at the click of a button."
    }
    else if (subtitle.innerHTML === "And look, it changes at the click of a button.") {
        subtitle.innerHTML = "How fascinating..."
    }
    else {
        subtitle.innerHTML = "Ok, now we have a subtitle.";
    }
};


document.addEventListener('DOMContentLoaded', function() {
    title = document.querySelector('#titleToChange')

    // Change the title
    document.querySelector('select').onchange = changeTitle;

    // Change the color of the title
    document.querySelectorAll('button[data-color]').forEach(function(button) {
        button.onclick = function() {
            title.style.color = button.dataset.color;
        }
    })

    // Change the subtitle
    document.querySelector('#subtitle1Button').onclick = changeSubtitle;
});