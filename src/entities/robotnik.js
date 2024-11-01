import k from "../kaplayCtx";

export function makeRobotnik(pos) {
  return k.add([
    k.sprite("robotnik", { anim: "run" }),
    k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }),
    k.scale(4),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "robotnik",
  ]);
}
