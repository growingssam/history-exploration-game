import fs from "node:fs";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  throw new Error("Usage: node patch-old-reward-hit-v25.mjs <input> <output>");
}

let html = fs.readFileSync(input, "utf8");

const replaceOnce = (before, after, label) => {
  const count = html.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one match, found ${count}`);
  html = html.replace(before, after);
};

replaceOnce(
  "r.old.met&&jt&&(0,k.jsxs)(k.Fragment",
  "r.old.met&&jt&&!At&&(0,k.jsxs)(k.Fragment",
  "hide hand axe while Haru offers the gear",
);

replaceOnce(
  "c:`old-person ${r.old.met?`at-hut`:``}`,sound:`inspect`,label:`구석기 시대의 아이`,guided:L===`person`,onClick:()=>z(r.old.met?`66%`:`34%`,`-2%`,()=>pn(`person`))",
  "c:`old-person ${r.old.met?`at-hut`:``} ${At?`rewarded`:``}`,sound:`inspect`,label:At?`시간 톱니를 건네는 하루`:`구석기 시대의 아이`,guided:L===`person`,onClick:()=>At?pn(`person`):z(r.old.met?`66%`:`34%`,`-2%`,()=>pn(`person`))",
  "reward Haru direct touch",
);

const css = String.raw`
/* Paleolithic reward: make the visible Haru fully tappable and remove blockers. */
.chain-game.old-reward-ready .old-person.at-hut.rewarded{left:66.5%!important;top:15%!important;width:24%!important;height:80%!important;z-index:40!important;border-radius:34%!important}
.chain-game.old-reward-ready .old-axe,.chain-game.old-reward-ready .old-axe-art{display:none!important}
`;

if (!html.includes("</style>")) throw new Error("style closing tag not found");
html = html.replace("</style>", `${css}</style>`);
fs.writeFileSync(output, html);
console.log(output);
