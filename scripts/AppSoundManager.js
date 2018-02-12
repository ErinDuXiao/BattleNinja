/**
 * Control all of the sounds in the app
 *
 * @copyright: (C) 2017 Erin Du, All Rights Reserved.
 * @author:    Erin Du
 * @version:   1.0.0
 *
 */

'use strict';

class AppSoundManager {
    constructor() {

        this.importOtherClasses();

        // check if sound file is able to be used or not
        if (!buzz.isWAVSupported()) {
            alert("Your browser doesn't support WAV Format.");
            this._isSoundAble = false;

        } else {
            this._isSoundAble = true;
            this._isMute = false;

            // load BGM for menu
            this.bgm_menu = new buzz.sound("./sounds/MUS_Menu.wav", {
                                        loop: true,
                                        volume: 20
                                    });

            // load BGM for game
            this.bgm_gameplay = new buzz.sound("./sounds/MUS_Gameplay.wav", {
                                        loop: true,
                                        volume: 20
                                    });

            // load shuriken SFX
            this.shurikenSFX = [
                new buzz.sound("./sounds/SFX_shuriken_1.wav", {volume: 50}),
                new buzz.sound("./sounds/SFX_shuriken_2.wav", {volume: 50}),
                new buzz.sound("./sounds/SFX_shuriken_3.wav", {volume: 50}),
                new buzz.sound("./sounds/SFX_shuriken_4.wav", {volume: 50}),
                new buzz.sound("./sounds/SFX_shuriken_5.wav", {volume: 50})
            ];

            this.blood_stab = [
                new buzz.sound("./sounds/SFX_Blood_Stab_1.wav"),
                new buzz.sound("./sounds/SFX_Blood_Stab_2.wav")
            ];

            this._ninja_hit_voices = [

                [
                    new buzz.sound("./sounds/VIO_Ninja_Hit_a1.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_a2.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_a3.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_a4.wav"),
                ],

                [
                    new buzz.sound("./sounds/VIO_Ninja_Hit_s1.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_s2.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_s3.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_s4.wav"),
                ],

                [
                    new buzz.sound("./sounds/VIO_Ninja_Hit_t1.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_t2.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_t3.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_t4.wav"),
                ],

                [
                    new buzz.sound("./sounds/VIO_Ninja_Hit_b1.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_b2.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_b3.wav"),
                ],

                [
                    new buzz.sound("./sounds/VIO_Ninja_Hit_m1.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_m2.wav"),
                    new buzz.sound("./sounds/VIO_Ninja_Hit_m3.wav"),
                ]
            ];

            this._ninja_die_voices = [
                new buzz.sound("./sounds/VIO_Ninja_Die_a1.wav"),
                new buzz.sound("./sounds/VIO_Ninja_Die_s1.wav"),
                new buzz.sound("./sounds/VIO_Ninja_Die_t1.wav"),
                new buzz.sound("./sounds/VIO_Ninja_Die_b1.wav"),
                new buzz.sound("./sounds/VIO_Ninja_Die_m1.wav")
            ];

            this.victory_sound = new buzz.sound("./sounds/VIO_Victory.wav", {volume: 90});
            this.victory_bgm = new buzz.sound("./sounds/MUS_Victory.wav", {volume: 50});
            this.defeat_sound = new buzz.sound("./sounds/VIO_Defeat.wav", {volume: 90}),
            this.defeat_bgm = new buzz.sound("./sounds/MUS_Defeat.wav", {volume: 50});

            this.victory_sound_group = new buzz.group(this.victory_sound, this.victory_bgm);
            this.defeat_sound_group = new buzz.group(this.defeat_sound, this.defeat_bgm);
        }

    }

    importOtherClasses() {
        this.utils = new Utils();
    }

    startMenuBGM() {
        if (!this.isSoundAble) return;

        if (this.bgm != "menu") {
            this.victory_bgm.stop();
            this.bgm_gameplay.stop();
            this.bgm_menu.play();
            this.bgm = "menu";
        }
    }

    stopMenuBGM() {
        if (!this.isSoundAble) return;

        this.bgm_menu.stop();
        this.bgm = "";
    }

    startGameplayBGM() {
        if (!this.isSoundAble) return;

        if (this.bgm != "gameplay") {
            this.victory_bgm.stop();
            this.bgm_menu.stop();
            this.bgm_gameplay.play();
            this.bgm = "gameplay";
        }
    }

    stopGameplayBGM() {
        if (!this.isSoundAble) return;

        this.bgm_gameplay.stop();
        this.bgm = "";
    }

    playShurikenSFX() {
        if (this._isMute || !this.isSoundAble) return;

        // choose sound effect randomly
        this.shurikenSFX[this.utils.getRandomIntInclusive(0, this.shurikenSFX.length-1)].play();
    }

    playHitVIO(value) {
        if (this._isMute || !this.isSoundAble) return;

        this.shurikenSFX[this.utils.getRandomIntInclusive(0, this.shurikenSFX.length-1)].play().bindOnce("ended", (event) => {
            this.blood_stab[this.utils.getRandomIntInclusive(0, this.blood_stab.length-1)].play().bindOnce("ended", (event) => {
                value.play();
            });
        });
    }

    playHitVIOArray(value) {
        if (this._isMute || !this.isSoundAble) return;

        this.shurikenSFX[this.utils.getRandomIntInclusive(0, this.shurikenSFX.length-1)].play().bindOnce("ended", (event) => {
            this.blood_stab[this.utils.getRandomIntInclusive(0, this.blood_stab.length-1)].play().bindOnce("ended", (event) => {
                value[this.utils.getRandomIntInclusive(0, value.length-1)].play();
            });
        });
    }

    playVictorySound() {
        if (this._isMute || !this.isSoundAble) return;
        this.stopGameplayBGM();
        this.victory_sound_group.play();
    }

    playDefeatSound() {
        if (this._isMute || !this.isSoundAble) return;
        this.stopGameplayBGM();
        this.defeat_sound_group.play();
    }

    mute() {
        if (!this.isSoundAble) return;

        this._isMute = true;
        this.bgm_menu.mute();
        this.bgm_gameplay.mute();

    }

    unmute() {
        if (!this.isSoundAble) return;

        this._isMute = false;
        this.bgm_menu.unmute();
        this.bgm_gameplay.unmute();
    }

    get isSoundAble() {
        return this._isSoundAble;
    }


    get ninja_hit_voices() {
        return this._ninja_hit_voices;
    }

    get ninja_die_voices() {
        return this._ninja_die_voices;
    }

}
