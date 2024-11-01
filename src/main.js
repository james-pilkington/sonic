import k from "./kaplayCtx";
import mainMenu from "./scenes/mainMenu";
import game from "./scenes/game";
import gameover from "./scenes/gameover";


k.loadSprite("chemical-bg","graphics/chemical-bg.png");
k.loadSprite("platforms","graphics/platforms.png");
k.loadSprite("sonic", "graphics/sonic.png",{
    sliceX:8,
    sliceY:2,
    anims: {
        run: {from: 0, to: 7, loop: true, speed: 30},
        jump: {from: 8, to: 15, loop: true, speed: 100},
    },
});
k.loadSprite("ring", "graphics/ring.png",{
    sliceX:16,
    sliceY:1,
    anims: {
        spin: {from: 0, to: 15, loop: true, speed: 30},
    },
});
k.loadSprite("motobug", "graphics/motobug.png",{
    sliceX:5,
    sliceY:1,
    anims: {
        run: {from: 0, to: 4, loop: true, speed: 8},
    },
});
k.loadSprite("robotnik", "graphics/robotnik.png",{
    sliceX:7,
    sliceY:1,
    anims: {
        run: {from: 0, to: 6, loop: true, speed: 8},
    },
});

k.loadSprite("shield", "graphics/shield2.png",{
    sliceX:3,
    sliceY:1,
    anims: {
        spin: {from: 0, to: 2, loop: true, speed: 8},
    },
});

k.loadSprite("box", "graphics/box.png",{
    sliceX:1,
    sliceY:1,
    anims: {
        spin: {from: 0, to: 1, loop: true, speed: 8},
    },
});

k.loadFont("mania","fonts/mania.ttf");
k.loadSound("destroy","sounds/Destroy.wav");
k.loadSound("hurt","sounds/Hurt.wav");
k.loadSound("hyper-ring","sounds/HyperRing.wav");
k.loadSound("jump","sounds/Jump.wav");
k.loadSound("ring","sounds/Ring.wav");
k.loadSound("city","sounds/City.wav");

k.scene("main-menu", mainMenu);

k.scene("game", game);

k.scene("gameover", gameover)

k.go("main-menu")
