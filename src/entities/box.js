import k from "../kaplayCtx";

export function makeBox(pos) {
  return k.add([
    k.sprite("box"),
    k.area({ shape: new k.Rect(k.vec2(0, 0), 400, 400) }),
    k.scale(0.4),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "box"
  ]);
}