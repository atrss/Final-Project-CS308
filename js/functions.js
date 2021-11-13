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

export const chooseReversal = () => {
    const items = [10, 11, 12, 13, 14, 15];
    return items[Math.floor(Math.random() * items.length)];
};

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
