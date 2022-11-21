let popup = document.getElementById("review-form-popup");
let CCPROG1 = document.getElementById("listed-course1");
let CCPROG2 = document.getElementById("listed-course2");
let CCPROG3 = document.getElementById("listed-course3");
let CCAPDEV = document.getElementById("listed-course4");

function openReviewForm(){
    popup.classList.add("popup-review-form");
}

function closeReviewForm(){
    popup.classList.remove("popup-review-form");
}

function openCCPROG1(){
    CCPROG1.classList.add("popup-listed-courses");
}

function closeCCPROG1(){
    CCPROG1.classList.remove("popup-listed-courses");
}

function openCCPROG2(){
    CCPROG2.classList.add("popup-listed-courses");
}

function closeCCPROG2(){
    CCPROG2.classList.remove("popup-listed-courses");
}

function openCCPROG3(){
    CCPROG3.classList.add("popup-listed-courses");
}

function closeCCPROG3(){
    CCPROG3.classList.remove("popup-listed-courses");
}

function openCCAPDEV(){
    CCAPDEV.classList.add("popup-listed-courses");
}

function closeCCAPDEV(){
    CCAPDEV.classList.remove("popup-listed-courses");
}