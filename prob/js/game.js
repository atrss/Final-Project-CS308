/**
 * @module
 */

import {
  chooseReversal,
  choosePoint,
  newPattern,
  chooseImage,
  currentDateTime,
  respCategory,
  relearned,
} from "./functions.js";

import { Pattern } from "./pattern.js";
import { TIME_FOR_MOVE, TIME_IN_BLOCK } from "./constants.js";

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
  face = document.getElementById("face"),
  startTime = currentDateTime();

/**
 * Checks if the current move has expired beyond the time.
 */
const moveExpired = (loading) => {
  console.log("moveExpired");
  if (!loading) {
    setStyle(0, 0);
  }
};

let loading = false,
  rev,
  hasReversed = false,
  maxCorrectChoices = 0,
  blocksCompleted = 0,
  timeTakeninBlock = 0,
  consecutive = 0,
  time = new Date().getTime(),
  points = 0,
  totalReversals = 0,
  countICFeedback = 0,
  totalPointsAcrossBlocks = 0,
  timeout = setTimeout(moveExpired, TIME_FOR_MOVE);

/**
 * Starts the game by choose pattern image and their luck.
 */
const startGame = () => {
  rev = chooseReversal();
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
  document.getElementById("message").textContent = "Loading next move...";
};

/**
 * Hides the loading screen.
 */
const hideLoadingScreen = () => {
  document.getElementsByClassName("main")[0].style.visibility = "visible";
  document.getElementsByClassName("loading")[0].style.display = "none";
  loading = false;
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
 * Updates block on the DOM.
 */
const updateBlockNumber = () => {
  document.getElementById(
    "message"
  ).textContent = `Block ${blocksCompleted} Ended. Get Ready for next block!`;
};

/**
 * Probability: Endgame.
 */
const endTheGame = () => {
  document.getElementById(
    "message"
  ).textContent = `Game over! Thanks for playing!`;
};

/**
 * Prepares for next move by hiding the arrows, and adds time taken in the previous move.
 */
const prepareNextMove = () => {
  pattern1.arrow.visibility = "hidden";
  pattern2.arrow.visibility = "hidden";
  const currentTime = new Date().getTime();
  let ms = 1000;
  timeTakeninBlock += currentTime - time;
  time = currentTime;
  if (timeTakeninBlock > TIME_IN_BLOCK) {
    ms = 3000;
    console.log("time for new block", timeTakeninBlock);
    blocksCompleted++;
    setTimeout(updateBlockNumber, 500);
    if (blocksCompleted === 3) {
      return [true, null];
    }
    startGame();
    totalPointsAcrossBlocks += points;
    points = 0;
    timeTakeninBlock = 0;
    (totalReversals = 0), (consecutive = 0);
  }
  timeout = setTimeout(() => {
    moveExpired(loading);
  }, TIME_FOR_MOVE);

  return [false, ms];
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
    consecutive++;
  } else {
    face.src = "./images/frowny.jpg";
    maxCorrectChoices = Math.max(maxCorrectChoices, consecutive);
    consecutive = 0;
  }

  if (hasReversed) {
    // next move after reversal
    hasReversed = false;
  }

  if (consecutive == rev) {
    console.log("reversed");
    [pattern1.luck, pattern2.luck] = [pattern2.luck, pattern1.luck];
    hasReversed = true;
    maxCorrectChoices = 0;
    totalReversals++;
    countICFeedback = 0;
    consecutive = 0;
  }

  if (arrow !== null && arrow.style.visibility == "hidden") {
    arrow.style.visibility = "visible";
    setTimeout(() => {
      arrow.style.visibility = "hidden";
    }, 500);
  }

  if (arrow !== null && face.style.visibility == "hidden") {
    face.style.visibility = "visible";
    setTimeout(() => {
      face.style.visibility = "hidden";
    }, 500);
  }

  if (point === 0 && key === 0) {
    face.style.visibility = "visible";
    const new_arrow = pattern1.luck === "lucky" ? pattern1.arrow : pattern2.arrow;
    new_arrow.style.visibility = "visible";
    setTimeout(() => {
      face.style.visibility = "hidden";
      new_arrow.style.visibility = "hidden";
    }, 500);
  }

  setTimeout(showLoadingScreen, 500);
  const [endgame, ms] = prepareNextMove();
  if (endgame) {
    endTheGame();
    savingData();
    return;
  }
  addCurrentData(key, point);
  setTimeout(hideLoadingScreen, ms);
};

document.addEventListener("keydown", (e) => {
  const check_key = e.key.toLowerCase();
  if (!loading && (check_key === "e" || check_key === "i")) {
    clearTimeout(timeout);
    const key = check_key;
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

let raw_data = [];

/**
 *
 * @param {String} key - key pressed by the user.
 * @param {Number} point - point given in this move.
 * Processes the move, creates different variables and add them to a array; which is then pushed to a global array containing data for all the moves in this game.
 */
const addCurrentData = (key, point) => {
  console.log("addCurrentData", point, key);
  const current_res = key === "e" ? pattern1 : key === "i" ? pattern2 : null;
  const correct_res = pattern1.luck === "lucky" ? pattern1 : pattern2;
  countICFeedback += point === -1 && current_res.luck === "unlucky" ? 1 : 0;

  let current_data = [];
  current_data.push(startTime); // 'date'
  current_data.push(blocksCompleted + 1); // blocknum
  current_data.push(blocksCompleted); // 'values.countBlocks '
  current_data.push(correct_res.img); // 'values.index_correctChoice'
  current_data.push(correct_res === pattern1 ? pattern2.img : pattern1.img); // 'values.index_incorrectChoice'
  current_data.push(correct_res === pattern1 ? 1 : 2); // 'values.correctChoicePosition'
  current_data.push(maxCorrectChoices); // 'values.maxCorrectChoices'
  current_data.push(Number(hasReversed)); // 'values.reversal'
  current_data.push(Number(relearned(hasReversed, point, totalReversals))); // 'values.relearned'
  current_data.push(
    respCategory(current_res, point, correct_res, hasReversed, totalReversals)
  ); // 'values.respCategory'
  current_data.push(consecutive); // 'values.countConsecutiveCorrect'
  current_data.push(point === -1 ? 1 : 2); // 'values.feedback'
  current_data.push(countICFeedback); // 'values.countICFeedback'
  current_data.push(totalReversals); // 'values.countReversals'
  current_data.push(totalPointsAcrossBlocks); // totalPoints
  current_data.push(correct_res === pattern1 ? pattern1.img : pattern2.img); // presentedCorrectStim
  current_data.push(correct_res === pattern1 ? pattern2.img : pattern1.img); // presentedIncorrectStim
  current_data.push(key === "e" ? 18 : key === "i" ? 23 : 57); // response
  current_data.push(current_res === correct_res ? 1 : 0); //correct

  raw_data.push(current_data.slice());
};

/**
 * Function for saving the data.
 */
const savingData = () => {
  let csv =
    "date_time, blocknum, values_countBlocks, values_index_correctChoice, values_index_incorrectChoice,  values_correctChoicePosition, values_maxCorrectChoices,  values_reversal, values_relearned,values_respCategory,  values_countConsecutiveCorrect, values_feedback, values_countICFeedback,  values_countReversals, values_totalPoints, presentedCorrectStim, presentedIncorrectStim, response,  correct\n";

  raw_data.forEach((row) => {
    csv += row.join(",");
    csv += "\n";
  });

  const hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";
  hiddenElement.download = `probData_${currentDateTime()}.csv`;
  hiddenElement.click();
};
