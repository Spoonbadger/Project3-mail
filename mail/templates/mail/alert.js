// Change title, change color of words in the title, click through the four subtitle options.
function changeTitle() {
    title = document.querySelector('#mainHeading')
    if (title.innerHTML === "This is the main heading.") {
        title.innerHTML = "And this is the second."
    }
    else if (title.innerHTML === "And this is the second.") {
        title.innerHTML = "Final one I promise!"
    }
    else if (title.innerHTML === "Final one I promise!") {
        title.innerHTML = "Just kidding ;p"
    }
    else title.innerHTML = "This is the main heading."
}


document.addEventListener('DOMContentLoaded', () => {
    // Set variables

    subtitle = document.querySelector('#subtitle')

    // change title
    document.querySelector('#mainTitleButton').onclick = changeTitle;

    // Change title color
    document.querySelectorAll('button[data-color]').forEach((button) => {
        button.onclick = () => {
            title.style.color = button.dataset.color;
        }
    })
});
