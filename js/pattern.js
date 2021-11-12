/**
 * @class
 * Class representing a pattern image.
 */
export class Pattern {
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
     * Sets name of image and `src` to image in `ele`.
     */
    set img(i) {
        this.img_name = i;
        this.ele.src = `./images/${i}`;
    }
}
