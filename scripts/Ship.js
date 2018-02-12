/**
 * Ship object
 *
 * @copyright: (C) 2017 Erin Du, All Rights Reserved.
 * @author:    Erin Du
 * @version:   1.0.0
 *
 */

'use strict';

class Ship {
    constructor(id, length) {
        this._id = id;
        this._length = length;
        this._hitSum = 0;
        this._status = "alive";
    }

    set hitSound(value) {
        this._hitSound = value;
    }

    get hitSound() {
        return this._hitSound;
    }

    set defeatSound(value) {
        this._defeatSound = value;
    }

    get defeatSound() {
        return this._defeatSound;
    }

    set startLocationX(value) {
        this._startLocationX = value;
    }

    get startLocationX() {
        return this._startLocationX;
    }

    set startLocationY(value) {
        this._startLocationY = value;
    }

    get startLocationY() {
        return this._startLocationY;
    }

    set endLocationX(value) {
        this._endLocationX = value;
    }

    get endLocationX() {
        return this._endLocationX;
    }

    set endLocationY(value) {
        this._endLocationY = value;
    }

    get endLocationY() {
        return this._endLocationY;
    }

    set length(value) {
        this._length = value;
    }

    get length() {
        return this._length;
    }

    set hitSum(value) {
        this._hitSum = value;
    }

    get hitSum() {
        return this._hitSum;
    }

    get id() {
        return this._id;
    }

    set status(value) {
        this._status = value;
    }

    get status() {
        return this._status;
    }
}
