// Array Of Words

const wordsEasy = [
    "Hello",
    "Code",
    "Town",
    "Rust",
    "Task",
    "Test",
    "Roles",
    "Working",
    "Coding",
    "Funny",
    "Runner",
    "Playing"
]

const wordsNormal = [
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Internet",
    "Python",
    "Scala",
    "Cascade",
]

const wordsHard = [
    "Programming",
    "Javascript",
    "Destructuring",
    "Documentation",
    "Dependencies",
    "Paradigm",
    "Leetcode",
    "Styling",
    "Documentation",
]


let words;
// Settings Levels
const levels = {
    "easy": 5,
    "normal": 3,
    "hard": 2
}
if (!localStorage.getItem("mode")) {
    localStorage.setItem("mode" , "easy")
}
let mode = localStorage.getItem("mode")



let defaultLevelSecons = levels[mode];



// Catch Selectors
let startButton = document.querySelector(".start");
let levelNameSpan = document.querySelector(".message .lvl");
let secondSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word")
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let checkList = document.getElementById("list")
let listChildren = [...checkList.children]

// Setting Levelname and Second

// Check Box Manage

listChildren.forEach((element) => {
    if (element.innerHTML.toLowerCase() === mode) {
        element.classList.add("active")
    }
})



listChildren.forEach(element => {
    element.addEventListener("click", () => {
        listChildren.forEach((ele) => {
            ele.classList.remove("active")
        })

        element.classList.add("active")
        localStorage.setItem("mode", element.innerHTML.toLowerCase())
        window.location.reload()
    })
})



if (mode === "easy") {
    words = wordsEasy
}
if (mode === "normal") {
    words = wordsNormal
}
if (mode === "hard") {
    words = wordsHard
}












levelNameSpan.innerHTML = localStorage.getItem("mode")

secondSpan.innerHTML = defaultLevelSecons;

timeLeftSpan.innerHTML = defaultLevelSecons;



scoreTotal.innerHTML = words.length


// disable Paste Event

function disablePaste() {
    return false
}
input.onpaste = disablePaste






// Start Game

// startButton.onclick = function () {
//     this.remove()
// }

startButton.addEventListener("click", () => {
    startButton.style.display = "none"
    input.focus()


    // GenerateWordFunction
    GenerateWordFunction()
})

function GenerateWordFunction() {
    let randomWord = words[Math.floor(Math.random() * words.length)]

    console.log(randomWord)
    // Get Word Index

    let wordIndex = words.findIndex(ele => ele == randomWord);
    console.log(wordIndex)

    // Remove item
    // function removeWord(wordIn) {
    //     words.filter((word) => {
    //         word = !words[wordIn]
    //     })
    // } 
    // Remove word
    words.splice(wordIndex, 1)
    // Show the Random Word
    theWord.innerHTML = randomWord;
    // Free uncoming
    upcomingWords.innerHTML = ""

    // Upcoming wwords
    for (let i = 0; i < words.length; i++) {
        // Create Div
        let div = document.createElement("div");
        let text = document.createTextNode(words[i]);
        div.appendChild(text);
        upcomingWords.appendChild(div)

    }

    startPlay()
}

// Call Start Play Function


function startPlay() {

    timeLeftSpan.innerHTML = defaultLevelSecons
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop Timer
            clearInterval(start)
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty Value
                input.value = ""
                // Increase Score
                scoreGot.innerHTML++

                if (words.length > 0) {
                    // Call Generate Word Function
                    GenerateWordFunction()
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("Congrats");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span)
                    // Remove upcomting Box
                    upcomingWords.remove()
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span)
            }
        }
    }, 1000)
}
