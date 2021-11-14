/**
 * @module
 */

import { POINT_PROB } from "./constants.js";

/**
 * @function
 * @returns Return a random combination for two pattern images.
 */
export const chooseImage = () => {
    if (Math.random() > 0.5) {
        return ["lucky", "unlucky"];
    } else {
        return ["unlucky", "lucky"];
    }
};

/**
 * @function
 * @param {String} imageType - Whether image is lucky or unlucky.
 * @returns The point given for selecting the image.
 */
export const choosePoint = (imageType) => {
    let point = Math.random() < POINT_PROB ? 1 : -1;
    if (imageType === "unlucky") {
        point *= -1;
    }
    return point;
};

/**
 * @function
 * @returns Filename of two new pattern images.
 */
export const newPattern = () => {
    let selected = [];
    while (selected.length != 2) {
        const randomNo = Math.floor(1 + Math.random() * 6);
        if (selected.indexOf(randomNo) === -1) selected.push(randomNo);
    }
    console.log("newPattern", selected);
    return selected.map((v) => {
        return `stim${v}.jpg`;
    });
};

/**
 *
 * @returns consecutive correct turns after which pattern is reversed.
 */
export const chooseReversal = () => {
    const items = [10, 11, 12, 13, 14, 15];
    return items[Math.floor(Math.random() * items.length)];
};

/**
 *
 * @returns The current date time in string.
 */
export const currentDateTime = () => {
    const currentdate = new Date();
    return (
        currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds()
    );
};

/**
 *
 * @param {Pattern} current_res - the pattern user selected.
 * @param {Number} point - point given in this move.
 * @param {Pattern} correct_res - the lucky pattern.
 * @param {Boolean} hasReversed - if the last turn reversed the pattern this will be true.
 * @param {Number} reversals - how many reversals has been done till now.
 * @returns - the response category for the user.
 */
export const respCategory = (
    current_res,
    point,
    correct_res,
    hasReversed,
    reversals
) => {
    if (point === 0) {
        return "NR";
    } else if (point === 1 && current_res === correct_res && hasReversed) {
        // C-RE = first correct after reversal error or 'lucky guess' (selected correct outcome and received 'happy' feedback)
        return "C-RE";
    } else if (current_res === correct_res && point === 1) {
        // C = correct (selected correct/winning pattern and received 'happy' feedback)
        return "C";
    } else if (current_res === correct_res && point === -1 && hasReversed) {
        // C-RE (PE) = first correct after reversal errors (selected correct/winning pattern BUT received 'unhappy' feedback)
        return "C-RE (PE)";
    } else if (current_res === correct_res && point === -1) {
        // PE = correct (selected correct/winning patterbBUT received 'unhappy' feedback)
        return "PE";
    } else if (relearned(hasReversed, point, reversals)) {
        return "RE";
    } else if (point === 1 && correct_res !== current_res) {
        return "E (PE)";
    } else if (point === -1 && correct_res !== current_res) {
        return "E";
    }
};

/**
 *
 * @param {Boolean} hasReversed - if the last turn reversed the pattern this will be true.
 * @param {Number} point - point given in this move.
 * @param {Number} reversals - how many reversals has been done till now.
 * @returns - whether the user has learned the pattern after reversal.
 */
export const relearned = (hasReversed, point, reversals) => {
    // 1 = participant has likely learned the reversed probability assignment
    // => the first selection of the new lucky pattern after a reversal
    // (lucky guesses excluded)
    // 0 = participant has likey not learned the reversed probability assignment
    return !hasReversed && point === 1 && reversals > 0 ? 1 : 0;
};
