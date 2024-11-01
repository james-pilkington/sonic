import k from "../kaplayCtx";

export function makeShield(pos) {
  return k.add([
    k.sprite("shield", { anim: "spin" }),
    k.area(),
    k.scale(5),
    k.opacity(0.5),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "shield"
  ]);
}
