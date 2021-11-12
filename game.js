/**
 * @module
 */

import {
    checkReversal,
    choosePoint,
    chooseImage,
    newPattern,
} from "./functions.js";

import {execSqlSync} from "./driver";

import { POINT_PROB, TIME_FOR_MOVE, TIME_IN_BLOCK } from "./constants.js";

/**
 * Class representing a pattern image.
 */
class Pattern {
    /**
     *
     * @param {HTMLElement} ele  - The image's element in the DOM.
     * @param {String} luck - Whether it is lucky or unlucky.
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
     * @param {String} img_name - Name of the image.
     * Sets name of image and `src` to image in `ele`.
     */
    set img(_img_name) {
        this.img_name = _img_name;
        this.ele.src = `./images/${_img_name}`;
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
 * @returns Checks if current block as ended.
 */
const checkIfBlockEnded = () => {
    return timeTakeninBlock < TIME_IN_BLOCK;
};

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
 * @param {String} key - which key the user pressed.
 * @param {Number} point - how much point the user gets.
 * This function shows the correct arrow after a correct move and loads the next move.
 */
const setStyle = (key, point) => {
    console.log("setStyle", key, point);
    const arrow =
        key === "e" ? pattern1.arrow : key === "i" ? pattern2.arrow : null;
    
    if(point===1){
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
    addCurrentData();
    hideLoadingScreen();
};

document.addEventListener("keydown", (e) => {
    if (!loading && (e.key === "e" || e.key === "i")) {
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

const raw_dataHeader = 
    ['date', 'time', 'blocknum', 'values.countBlocks',
    'values.index_correctChoice','values.index_incorrectChoice', 
    'values.correctChoicePosition', 'values.maxCorrectChoices', 
    'values.reversal', 'values.relearned','values.respCategory', 
    'values.countConsecutiveCorrect', 'values.feedback', 'values.countICFeedback', 
    'values.countReversals', 'values.totalPoints', 'values.iti', 
    'presentedCorrectStim', 'presentedIncorrectStim', 'response', 
    'correct'];

let raw_data = [];

const currentdate = new Date(); 
const currentDateTime = currentdate.getFullYear() + "-" 
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

// adding data for this block
function addCurrentData(current_res, correct_res){
    let current_data = [];
    current_data.push(currentDateTime); // 'date'
    current_data.push(blocksCompleted); // 'values.countBlocks '
    current_data.push(correct_res.img); // 'values.index_correctChoice'
    current_data.push(correct_res===pattern1?pattern2.img:pattern1.img); // 'values.index_incorrectChoice'
    current_data.push(correct_res===pattern1?1:2);  // 'values.correctChoicePosition'
    current_data.push(i = (current_res===correct_res ? ++i : 0)); // 'values.maxCorrectChoices'
    current_data.push(); // 'values.reversal'
    current_data.push(); // 'values.relearned'
    current_data.push(resp()); // 'values.respCategory' 
    current_data.push(); // 'values.countConsecutiveCorrect'
    current_data.push(); // 'values.feedback'
    current_data.push(); // 'values.countICFeedback' 
    current_data.push(reversalss); // 'values.countReversals'
    current_data.push(document.getElementById('points'.textContent));
    current_data.push(correct_res===pattern1?pattern1.img:pattern2.img);
    current_data.push(correct_res===pattern1?pattern2.img:pattern1.img);
    current_data.push(current_res===correct_res?1:0);     //correct
    
    raw_data.push(current_data);
};

/**
 * 
 */
const savingData = () => {      
    const sql1 = `CREATE TABLE IF NOT EXISTS Data_${i} (date_time DATETIME, blocknum INT, values_countBlocks INT, values_index_correctChoice INT, values_index_incorrectChoice INT, values_correctChoicePosition INT, values_maxCorrectChoices INT,  values_reversal INT, values_relearned INT,values_respCategory INT, values_countConsecutiveCorrect INT, values_feedback INT, values_countICFeedback INT, values_countReversals INT, values_totalPoints INT, values_iti INT,  presentedCorrectStim INT, presentedIncorrectStim INT, response INT, correct INT);`;

    const query = `INSERT INTO ProjectNEWTable (date_time, blocknum, values_countBlocks, values_index_correctChoice, values_index_incorrectChoice,  values_correctChoicePosition, values_maxCorrectChoices,  values_reversal, values_relearned,values_respCategory,  values_countConsecutiveCorrect, values_feedback, values_countICFeedback,  values_countReversals, values_totalPoints, values_iti, presentedCorrectStim, presentedIncorrectStim, response,  correct) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?);`;
    execSqlSync(sql, raw_data);
    execSqlSync(query, raw_data);
}

