// Change title, change color of words in the title, click through the four subtitle options.
document.addEventListener('DOMContentLoaded', () => {
    // Set variables
    let title = document.querySelector('#mainHeading')
    let subtitle = document.querySelector('#subtitle')
    let counter = 0;

    // change title
    document.querySelector('#mainTitleButton').onclick = changeTitle;

    // Change title color
    document.querySelectorAll('button[data-color]').forEach((button) => {
        button.onclick = () => {
            title.style.color = button.dataset.color;
        }
    })

    // Change the subtitle
    document.querySelector('#subtitleSelect').onchange = changeSubtitle;

    function changeTitle() {
        if (title.innerHTML === "This is the main heading.") {
            title.innerHTML = "And this is the second.";
        }
        else if (title.innerHTML === "And this is the second.") {
            title.innerHTML = "Final one I promise!";
        }
        else if (title.innerHTML === "Final one I promise!") {
            title.innerHTML = "Just kidding ;p";
        }
        else title.innerHTML = "This is the main heading."
    }
    
    function changeSubtitle(event) {
        subtitle.innerHTML = event.target.value;
    }


    // Counter
    document.querySelector('#counterButton').onclick = count;

    function count() {
        counter ++;
        document.querySelector('#counter').innerHTML = counter;
    }
});

