/**
 * @module
 */

import { POINT_PROB, TIME_FOR_MOVE, TIME_IN_BLOCK } from "./constants.js";

/**
 * @function
 * @returns Return a random combination for two pattern images.
 */
export const chooseImage = () => {
    console.log("chooseImage");
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
    console.log("choosePoint");
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

export const checkReversal = () => {
    const items = [10, 11, 12, 13, 14, 15];
    return items[Math.floor(Math.random() * items.length)];
};
