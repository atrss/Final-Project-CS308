/**
 * @module
 */

import {
    chooseReversal,
    choosePoint,
    newPattern,
    chooseImage,
    currentDateTime,
} from "./functions.js";

import { Pattern } from "./pattern.js";
import { TIME_FOR_MOVE, TIME_IN_BLOCK } from "./constants.js";

let pattern1 = new Pattern(
        document.getElementById("img1"),
        null,
        document.getElementById("arrow1")
    ),
    pattern2 = new Pattern(
        document.getElementById("img2"),
        null,
        document.getElementById("arrow2")
    ),
    face = document.getElementById("face"),
    startTime = currentDateTime();

/**
 * Checks if the current move has expired beyond the time.
 */
const moveExpired = (loading) => {
    console.log("moveExpired!!!");
    if (!loading) {
        setStyle(null, null);
    }
};

let loading = false,
    totalPointsAcrossBlocks = 0,
    rev = chooseReversal(),
    blocksCompleted = 0,
    timeTakeninBlock = 0,
    consecutive = 0,
    time = new Date().getTime(),
    points = 0,
    timeTaken = 0,
    timeout = setTimeout(moveExpired, TIME_FOR_MOVE);

const startGame = () => {
    [pattern1.img, pattern2.img] = newPattern();
    [pattern1.luck, pattern2.luck] = chooseImage();
};

startGame();

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
 * @returns Checks if current block as ended.
 */
const checkIfBlockEnded = () => timeTakeninBlock < TIME_IN_BLOCK;

/**
 * @param {Number} point - Add point to the total points and updates the points.
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
 * Updates block on the DOM.
 */
const updateBlockNumber = () => {
    document.getElementById("blockNumber").textContent = blocksCompleted;
};

/**
 * Prepares for next move by hiding the arrows, and adds time taken in the previous move.
 */
const prepareNextMove = () => {
    pattern1.arrow.visibility = "hidden";
    pattern2.arrow.visibility = "hidden";
    const currentTime = new Date().getTime();
    timeTakeninBlock += currentTime - time;
    timeTaken += currentTime - time;
    time = currentTime;
    if (timeTakeninBlock > TIME_IN_BLOCK) {
        console.log("time for new block", timeTakeninBlock);
        startGame();
        points = 0;
        blocksCompleted++;
        totalPointsAcrossBlocks += points;
        if (blocksCompleted == 3) {
            // end the game
        } else {
            // add block
            //display new game
            updateBlockNumber();
            timeTakeninBlock = 0;
        }
    } else {
        timeout = setTimeout(() => {
            moveExpired(loading);
        }, TIME_FOR_MOVE);
    }
};

/**
 *
 * @param {String} key - which key the user pressed.
 * @param {Number} point - how much point the user gets.
 * This function shows the correct arrow after a correct move and loads the next move.
 */
const setStyle = (key, point) => {
    console.log("setStyle", key, point);
    const arrow =
        key === "e" ? pattern1.arrow : key === "i" ? pattern2.arrow : null;

    if (point === 1) {
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
    // addCurrentData();
    hideLoadingScreen();
};

document.addEventListener("keydown", (e) => {
    if (!loading && (e.key === "e" || e.key === "i")) {
        clearTimeout(timeout);
        const key = e.key;
        if (key === "e") {
            const point = choosePoint(pattern1.luck);
            setStyle(key, point);
            addPoints(point);
        } else {
            const point = choosePoint(pattern2.luck);
            setStyle(key, point);
            addPoints(point);
        }
    }
});

// TODO

let raw_data = [];

// adding data for this block
function addCurrentData(current_res, key, reversal, respCategory, point) {
    const correct_res = pattern1.luck === "lucky" ? pattern1 : pattern2;

    let current_data = [];
    current_data.push(startTime); // 'date'
    current_data.push(blocksCompleted); // 'values.countBlocks '
    current_data.push(correct_res.img); // 'values.index_correctChoice'
    current_data.push(correct_res === pattern1 ? pattern2.img : pattern1.img); // 'values.index_incorrectChoice'
    current_data.push(correct_res === pattern1 ? 1 : 2); // 'values.correctChoicePosition'
    //TODO current_data.push((i = current_res === correct_res ? ++i : 0)); // 'values.maxCorrectChoices'
    current_data.push(reversal); // 'values.reversal'
    current_data.push(); // 'values.relearned'
    current_data.push(); // 'values.respCategory'
    current_data.push(); // 'values.countConsecutiveCorrect'
    current_data.push(point === -1 ? 1 : 2); // 'values.feedback'
    current_data.push(); // 'values.countICFeedback'
    current_data.push(reversalCount); // 'values.countReversals'
    current_data.push(totalPointsAcrossBlocks); // totalPoints
    current_data.push(key.charCodeAt(0)); // response
    current_data.push(correct_res === pattern1 ? pattern1.img : pattern2.img); // presentedCorrectStim
    current_data.push(correct_res === pattern1 ? pattern2.img : pattern1.img); // presentedIncorrectStim
    current_data.push(current_res === correct_res ? 1 : 0); //correct

    raw_data.push(current_data);
}

/**
 * Function for saving the data.
 */
const savingData = () => {
    // whats i ?
    // add sql for summary wala also
    const sql1 = `CREATE TABLE IF NOT EXISTS Data_${i} (date_time DATETIME, blocknum INT, values_countBlocks INT, values_index_correctChoice INT, values_index_incorrectChoice INT, values_correctChoicePosition INT, values_maxCorrectChoices INT,  values_reversal INT, values_relearned INT,values_respCategory INT, values_countConsecutiveCorrect INT, values_feedback INT, values_countICFeedback INT, values_countReversals INT, values_totalPoints INT, values_iti INT,  presentedCorrectStim INT, presentedIncorrectStim INT, response INT, correct INT);`;

    const query = `INSERT INTO ProjectNEWTable (date_time, blocknum, values_countBlocks, values_index_correctChoice, values_index_incorrectChoice,  values_correctChoicePosition, values_maxCorrectChoices,  values_reversal, values_relearned,values_respCategory,  values_countConsecutiveCorrect, values_feedback, values_countICFeedback,  values_countReversals, values_totalPoints, values_iti, presentedCorrectStim, presentedIncorrectStim, response,  correct) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?);`;
    // use API
    //execSqlSync(sql1); // TODO: name of table
    //execSqlSync(query, [raw_data]); // [raw_data] to insert multiple rows
};
