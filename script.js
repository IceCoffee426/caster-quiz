const answers = document.querySelectorAll(".answer");
const questions = document.querySelectorAll(".quizQuestion");
const results = document.querySelectorAll(".result");
const submitButton = document.getElementById("submitButton");
const retryButton = document.getElementById("retryButton");

function getSiblings(e) {
    let siblings = []; 
    
    if (!e.parentNode) {
        return siblings;
    }
    let sibling  = e.parentNode.firstChild;
    
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    return siblings;
    // Adapted from https://www.javascripttutorial.net/javascript-dom/javascript-siblings/
}

function highlightSelected() {
    // console.log(this);
    this.classList.add("selected");
    this.classList.remove("muted");
    siblings = getSiblings(this);
    // console.log(siblings);
    for (let i = 0; i < siblings.length; i++) {
        siblings[i].classList.add("muted");
        siblings[i].classList.remove("selected");
    }
    this.parentElement.classList.add("answered");
    // How data-* works https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
}

function submitAnswers() {
    let aCount = document.querySelectorAll(".selected[data-value='A']").length;
    let bCount = document.querySelectorAll(".selected[data-value='B']").length;
    let cCount = document.querySelectorAll(".selected[data-value='C']").length;
    let dCount = document.querySelectorAll(".selected[data-value='D']").length;
    
    const aPersonality = document.getElementById("a-personality");
    const bPersonality = document.getElementById("b-personality");
    const cPersonality = document.getElementById("c-personality");
    const dPersonality = document.getElementById("d-personality");
    const noPersonality = document.getElementById("no-personality");

    const answered = document.querySelectorAll(".answered");
    console.log(answered.length);
    if (answered.length !== 4) {
        alert("Answer all the questions!");
        return;
    }

    else if (aCount > 1) {
        console.log("A");
        aPersonality.style.display = "block";
    }

    else if (bCount > 1) {
        console.log("B");
        bPersonality.style.display = "block";
    }

    else if (cCount > 1) {
        console.log("C");
        cPersonality.style.display = "block";
    }

    else if (dCount > 1) {
        console.log("D");
        dPersonality.style.display = "block";
    }

    else {
        console.log("NULL");
        noPersonality.style.display = "block";
    }

    for (let i = 0; i < questions.length; i++) {
        questions[i].style.display = "none";
    }

    retryButton.style.display = "block";
    submitButton.style.display = "none";
}

function resetPage() {
    submitButton.style.display = "block";
    retryButton.style.display = "none";
    for (let i = 0; i < questions.length; i++) {
        questions[i].style.display = "block";
    }
    for (let i = 0; i < results.length; i++) {
        results[i].style.display = "none";
    }
    for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove("selected");
        answers[i].classList.remove("muted");
        answers[i].parentElement.classList.remove("answered");
    }
}

for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", highlightSelected);
}

submitButton.addEventListener("click", submitAnswers);
retryButton.addEventListener("click", resetPage);