/**
 * @module
 */

import {
    checkReversal,
    choosePoint,
    chooseImage,
    newPattern,
} from "./functions.js";

import { POINT_PROB, TIME_FOR_MOVE, TIME_IN_BLOCK } from "./constants.js";

/**
 * Class representing a pattern image.
 */
class Pattern {
    /**
     *
     * @param {HTMLElement} ele  - The image's element in the DOM.
     * @param {string} luck - Whether it is lucky or unlucky.
     * @param {HTMLElement} arrow - The arrow above the pattern in the DOM.
     */
    constructor(ele, luck, arrow) {
        this.ele = ele;
        this.luck = luck;
        this.arrow = arrow;
        this.img_name;
    }

    /**
     * Return name of the image file for the pattern.
     */
    get img() {
        return this.img_name;
    }

    /**
     * Sets name of image and `src` to image in `ele`.
     */
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
 * Shows the loading screen.
 */
const showLoadingScreen = () => {
    loading = true;
    document.getElementsByClassName("main")[0].style.visibility = "hidden";
    document.getElementsByClassName("loading")[0].style.display = "block";
};

/**
 * Hides the loading screen.
 */
const hideLoadingScreen = () => {
    loading = false;
    document.getElementsByClassName("main")[0].style.visibility = "visible";
    document.getElementsByClassName("loading")[0].style.display = "none";
};

/**
 *
 * @returns Checks if current block as ended.
 */
const checkIfBlockEnded = () => {
    return timeTakeninBlock < TIME_IN_BLOCK;
};

/**
 *
 * @param {int} point - Add point to the total points and updates the points.
 */
const addPoints = (point) => {
    points += point;
    updatePoints();
};

/**
 * Updates points on the DOM.
 */
const updatePoints = () => {
    document.getElementById("points").textContent = points;
};

/**
 * Checks if the current move has expired beyond the time.
 */
const moveExpired = () => {
    console.log("moveExpired");
    if (!loading && new Date().getTime() - time > TIME_FOR_MOVE) {
        setStyle(false, null);
    }
};

/**
 * Prepares for next move by hiding the arrows, and adds time taken in the previous move.
 */
const prepareNextMove = () => {
    pattern1.arrow.visibility = "hidden";
    pattern2.arrow.visibility = "hidden";
    time = new Date().getTime();
    timeTaken += time;
    if (timeTaken > TIME_IN_BLOCK) {
        // time for new block
    }
};

/**
 *
 * @param {string} hasWon - if this is lucky show the smiley else the frown image.
 * @param {string} key - which key the user pressed.
 * This function shows the correct arrow after a correct move and loads the next move.
 */
const setStyle = (hasWon, key) => {
    console.log("setStyle", hasWon, key);
    const arrow =
        key === "e" ? pattern1.arrow : key === "i" ? pattern2.arrow : null;
    if (hasWon === "lucky") {
        face.src = "./images/smiley.png";
    } else {
        face.src = "./images/frowny.jpg";
    }

    if (arrow !== null && arrow.style.visibility == "hidden") {
        arrow.style.visibility = "visible";
        setTimeout(() => {
            arrow.style.visibility = "hidden";
        }, 300);
    }

    if (face.style.visibility == "hidden") {
        face.style.visibility = "visible";
        setTimeout(() => {
            face.style.visibility = "hidden";
        }, 300);
    }

    showLoadingScreen();
    prepareNextMove();
    hideLoadingScreen();
};

document.addEventListener("keydown", (e) => {
    if (!loading && (e.key === "e" || e.key === "i")) {
        const key = e.key;
        if (key === "e") {
            const point = choosePoint(pattern1.luck);
            setStyle(pattern1.luck, key);
            addPoints(point);
        } else {
            const point = choosePoint(pattern2.luck);
            setStyle(pattern2.luck, key);
            addPoints(point);
        }
    }
});

// setInterval(moveExpired, 200);
