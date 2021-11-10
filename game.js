import {
    checkReversal,
    choosePoint,
    chooseImage,
    newPattern,
} from "./functions.js";

import { POINT_PROB, TIME_FOR_MOVE, TIME_IN_BLOCK } from "./constants.js";

class Pattern {
    constructor(ele, luck, arrow) {
        this.ele = ele;
        this.luck = luck;
        this.arrow = arrow;
        this.img_name;
    }

    get img() {
        return this.img_name;
    }

    set img(i) {
        this.img_name = i;
        this.ele.src = `./images/${i}`;
    }
}

const pattern1 = new Pattern(
        document.getElementById("img1"),
        null,
        document.getElementById("arrow1")
    ),
    pattern2 = new Pattern(
        document.getElementById("img2"),
        null,
        document.getElementById("arrow2")
    ),
    face = document.getElementById("face");

let loading = false,
    blocksCompleted = 0,
    timeTakeninBlock = 0,
    time = new Date().getTime(),
    points = 0,
    timeTaken = 0;

[pattern1.img, pattern2.img] = newPattern();
[pattern1.luck, pattern2.luck] = chooseImage();

/**
 * Shows the loading screen when the block is complete.
 */
const showLoadingScreen = () => {
    document.getElementsByClassName("main")[0].style.visibility = "hidden";
    document.getElementsByClassName("loading")[0].style.display = "block";
};

const checkIfBlockEnded = () => {
    return timeTakeninBlock < TIME_IN_BLOCK;
};

/**
 *
 * @param {int} point - Add point to the total points.
 */
const addPoints = (point) => {
    points += point;
};

/**
 * Update points on the DOM.
 */
const updatePoints = () => {
    document.getElementById("points").textContent = points;
};

const moveExpired = () => {
    console.log("moveExpired");
    if (!loading && new Date().getTime() - time > TIME_FOR_MOVE) {
        setStyle(false, null);
    }
};

const prepareNextMove = () => {
    pattern1.arrow.visibility = "hidden";
    pattern2.arrow.visibility = "hidden";
    time = new Date().getTime();
    timeTaken += time;
    if (timeTaken > TIME_IN_BLOCK) {
        // time for new block
    }
};

const setStyle = (hasWon, key) => {
    const arrow =
        key === "E" ? pattern1.arrow : key === "I" ? pattern2.arrow : null;

    if (hasWon === true) {
        face.src = "./images/smiley.png";
    } else {
        face.src = "./images/frowny.jpg";
    }

    if (arrow !== null && arrow.style.visibility == "hidden") {
        arrow.style.visibility = "visible";
        setTimeout(() => {
            arrow.style.visibility = "hidden";
        }, 3000);
    }

    if (face.style.visibility == "hidden") {
        face.style.visibility = "visible";
        setTimeout(() => {
            face.style.visibility = "hidden";
        }, 3000);
    }

    showLoadingScreen();
    prepareNextMove();
};

document.addEventListener("keydown", (e) => {
    if (!loading && (e.key === "E" || e.key === "I")) {
        const key = e.key;
        setStyle(true, key);
        if (key === "E") {
            addPoints(choosePoint(pattern1.luck));
        } else {
            addPoints(choosePoint(pattern2.luck));
        }
    }
});

setInterval(moveExpired, 200);
