import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import { makeRobotnik } from "../entities/robotnik";
import { makeBox } from "../entities/box";
import { makeShield } from "../entities/shield"
import k from "../kaplayCtx";
export default function game () {
    k.setGravity(3100);
const citySfx = k.play("city", {volume: 0.2,loop: true});

    const bgPieceWidth = 1920;
    const bgPieces = [
            k.add([k.sprite("chemical-bg"), k.pos(0,0), k.scale(2), k.opacity(0.8)]),
            k.add([k.sprite("chemical-bg"), k.pos(bgPieceWidth * 2 ,0), k.scale(2), k.opacity(0.8)]),
    ];

    const platformWidth = 1280;
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0,450), k.scale(4)]),
        k.add([k.sprite("platforms"), k.pos(platformWidth * 4,450), k.scale(4)]),
    ];

    let score = 0;
    let scoreMultiplier = 0;
    let shieldActive = false;

    //const controlsText = 
    const scoreText = k.add([
        k.text("SCORE : 0", {font: "mania", size: 72}),
        k.pos(20,20),
    ]);

const sonic = makeSonic(k.vec2(200,745));
sonic.setControls();
sonic.setEvents();
sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()) {
        k.play("destroy", {volume: 0.5});
        k.play("hyper-ring", {volume:0.5});
        k.destroy(enemy);
        sonic.play("jump");
        sonic.jump();
        scoreMultiplier+=1;
        score += 10 *scoreMultiplier
        scoreText.text =  `SCORE : ${score}`;
        if (scoreMultiplier === 1)
            sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
          if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
          k.wait(1, () => {
            sonic.ringCollectUI.text = "";
          });
        return;
    }
    else if (shieldActive) {
        shieldActive=false;
        k.destroyAll("shield");
        return;
    }
    else {
    k.play("hurt", {volume:0.5});
    k.setData("current-score",score);
    k.go("gameover", citySfx);}
})

sonic.onCollide("robotnik", (enemy) => {
    if (!sonic.isGrounded()) {
        k.play("destroy", {volume: 0.5});
        k.play("hyper-ring", {volume:0.5});
        k.destroy(enemy);
        sonic.play("jump");
        sonic.jump();
        scoreMultiplier+=1;
        score += 100 *scoreMultiplier
        scoreText.text =  `SCORE : ${score}`;
        if (scoreMultiplier === 1)
            sonic.ringCollectUI.text = `+${100 * scoreMultiplier}`;
          if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
          k.wait(1, () => {
            sonic.ringCollectUI.text = "";
          });
        return;
    }
    else if (shieldActive) {
        shieldActive=false;
        destroyAll("shield");
        return;
    }
    else {
    k.play("hurt", {volume:0.5});
    k.setData("current-score",score);
    k.go("gameover", citySfx);}
})

sonic.onCollide("ring", (ring) => {
    k.play("ring", {volume: 0.5});
    k.destroy(ring);
    score++;
    scoreText.text =  `SCORE : ${score}`;
    sonic.ringCollectUI.text = "+1";
    k.wait(1, () => sonic.ringCollectUI.text = "");
})

sonic.onCollide("box", (box) => {
    if (!sonic.isGrounded()) {
        k.play("destroy", {volume: 0.5});
        k.destroy(box);
        sonic.play("jump");
        sonic.jump();
        shieldActive = true;

        const shield = makeShield(sonic.pos);
        shield.onUpdate(() => {
            shield.pos = sonic.pos
        });
        
        
        return;
    }
})


    let gameSpeed = 300;
    k.loop(1, ()=> {
        gameSpeed+=50;
    });

    const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1950,773));
        motobug.onUpdate(() => {
            if (gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0);
                return;
            }
            motobug.move(-(gameSpeed), 0);
        });

        motobug.onExitScreen(() => {
            if(motobug.pos.x < 0) k.destroy(motobug);
        });
    const waitTime = k.rand(0.5,2.5)
    k.wait(waitTime, spawnMotoBug)
    }
    spawnMotoBug();

    const spawnRobotnik = () => {
        const robotnik = makeRobotnik(k.vec2(1950,300));
        robotnik.onUpdate(() => {
            robotnik.move(-(gameSpeed), 0);
        });
        robotnik.onExitScreen(() => {
            if(robotnik.pos.x < 0) k.destroy(robotnik);
        });
    const waitTime = k.rand(2,7)
    k.wait(waitTime, spawnRobotnik)
    }
    spawnRobotnik();

    const spawnRing = () => {
        const ring = makeRing(k.vec2(1950, 745));
        ring.onUpdate(() => {
          ring.move(-gameSpeed, 0);
        });
        ring.onExitScreen(() => {
          if (ring.pos.x < 0) k.destroy(ring);
        });
    
        const waitTime = k.rand(0.5, 3);
    
        k.wait(waitTime, spawnRing);
      };
    
      spawnRing();


      const spawnBox = () => {
        const box = makeBox(k.vec2(1950, 780));
        box.onUpdate(() => {
            box.move(-gameSpeed, 0);
        });
        box.onExitScreen(() => {
          if (box.pos.x < 0) k.destroy(box);
        });
    
        const waitTime = k.rand(10, 15);
    
        k.wait(waitTime, spawnBox);
      };
    
      spawnBox();

k.add([
    k.rect(1920,300),
    k.opacity(0),
    k.area(),
    k.pos(0,832),
    k.body({isStatic:true}),
]);



    k.onUpdate(() => {
        if (sonic.isGrounded()) scoreMultiplier = 0;

        if (bgPieces[1].pos.x <0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2,0);
            bgPieces.push(bgPieces.shift());
        }
    
        bgPieces[0].move(-100, 0)
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth *2, 0);
    
        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4,456);
            platforms.push(platforms.shift());
        }
    
        platforms[0].move(-gameSpeed,0)
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4, 450);
    });


}