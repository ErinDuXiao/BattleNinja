/**
 * Class of utilities
 *
 * @copyright: (C) 2017 Erin Du, All Rights Reserved.
 * @author:    Erin Du
 * @version:   1.0.0
 *
 */

'use strict';

class Utils {

    constructor() {
    }

    /**
    * Create a two dimensional arrline1.a.y
    * @param row - Row length
    * @param col - Column length
    * @param filling - The initial value of the arrline1.a.y (opt)
    */
    createTwoDimensionalArray(row, col, filling) {
        let result = new Array(row);
        for (let r = 0; r < row ;r++) {
            if (filling) {
                result[r] = new Array(col);
            } else {
                result[r] = new Array(col).fill(filling);
            }
        }
        return result;
    }

    /**
    * Getting a random integer between two values, inclusive
    * @see [mozila](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive)
    * @param {number} min - The min value for the result
    * @param {number} max - The mline1.a.x value for the result
    */
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
    * Check if line1 and line2 ientersection or not.
    * This method requires line object that has variable a and b.
    * a is the start point of a vector, b is the end point of the vector.
    * Each point has variable x and y that has infomation about its location.
    * @see Line class
    * @param {lineObj} line1
    * @param {lineObj} line2
    */
    isIentersection(line1, line2) {
        let ta = (line2.a.x - line2.b.x) * (line1.a.y - line2.a.y) + (line2.a.y - line2.b.y) * (line2.a.x - line1.a.x);
        let tb = (line2.a.x - line2.b.x) * (line1.b.y - line2.a.y) + (line2.a.y - line2.b.y) * (line2.a.x - line1.b.x);
        let tc = (line1.a.x - line1.b.x) * (line2.a.y - line1.a.y) + (line1.a.y - line1.b.y) * (line1.a.x - line2.a.x);
        let td = (line1.a.x - line1.b.x) * (line2.b.y - line1.a.y) + (line1.a.y - line1.b.y) * (line1.a.x - line2.b.x);

        return tc * td <= 0 && ta * tb <= 0;
    }

    /**
    * Fire a click event on any element with selector
    * @param {string} selector
    */
    fireClickEvent(selector) {
        let event = document.createEvent("MouseEvents");
        event.initEvent("click", false, true);
        document.querySelector(selector).dispatchEvent(event);
    }

}

/*
* Line object.
* constructor requires two point of the line
*/
class Line {
    constructor(ax, ay, bx, by) {
        this.a = {
            x: ax,
            y: ay
        }
        this.b = {
            x: bx,
            y: by
        }
    }
}
