import fs from "node:fs";

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  throw new Error("Usage: node scripts/patch-built-html.mjs <input> <output>");
}

let html = fs.readFileSync(input, "utf8");

const replaceOnce = (before, after, label) => {
  const count = html.split(before).length - 1;
  if (count !== 1) {
    throw new Error(`${label}: expected one match, found ${count}`);
  }
  html = html.replace(before, after);
};

replaceOnce("강가에서 만난 다온", "깨진 토기의 무늬를 찾아서", "Neolithic arrival title");
replaceOnce("다온에게 다가가기", "강가 마을로 들어가기", "Neolithic arrival button");
replaceOnce("곡식밭에서 만난 마루", "수확을 앞둔 청동기 마을", "Bronze arrival title");
replaceOnce("마루에게 다가가기", "마을 안으로 들어가기", "Bronze arrival button");
replaceOnce("푸른 균열 앞에서 만난 누리", "흩어진 고조선의 기록", "Gojoseon arrival title");
replaceOnce("누리에게 다가가기", "고조선 마을로 들어가기", "Gojoseon arrival button");
replaceOnce(
  "마을 둘레에 성책이 길게 이어져 있어. 푸른 균열 옆 아이와 먼저 이야기해 보자.",
  "마을 둘레에 성책이 길게 이어져 있어. 먼저 마을 아이와 이야기해 보자.",
  "Gojoseon fort pre-meeting line",
);
replaceOnce(
  "사람들이 곡식을 거두고 있어. 푸른 균열 옆 아이와 먼저 이야기해 보자.",
  "사람들이 곡식을 거두고 있어. 먼저 마을 아이와 이야기해 보자.",
  "Gojoseon field pre-meeting line",
);

replaceOnce(
  "laws:[`사람들이 지켜야 했던 규칙의 흔적을 찾아봐.`,`성책 아래에 놓인 작은 나무 조각을 살펴봐.`,`8조법 단서 조각을 눌러 봐.`]",
  "laws:[`건국 이야기 기록 옆에 사람·곡식·집 그림이 새겨진 나무판이 있어.`,`불이 있는 제사 터의 왼쪽 아래, 세 장으로 세워진 나무판을 살펴봐.`,`누리나 빈 땅이 아니라 세워진 나무판을 눌러 봐.`]",
  "Gojoseon law clue targets the visible board",
);

replaceOnce(
  "if(r.joseon.founding){if(Ft===3){if(!r.joseon.laws)return R(`누리가 성책 아래의 작은 나무 조각을 보며 고개를 갸웃해.`,`72%`,`56%`);",
  "if(r.joseon.founding){if(!r.joseon.laws)return R(`두 번째 단서는 내가 아니라, 내 왼쪽 아래에 세워진 나무판에 있어.`,`70%`,`57%`,`npc`);if(Ft===3){",
  "Nuri points problem 2 to the board instead of herself",
);

replaceOnce(
  "label:`8조법 단서 조각`,guided:Rt===`laws`,onClick:()=>z(`61%`,`-2%`,()=>gn(`laws`))",
  "label:`화덕 왼쪽 앞의 세워진 8조법 나무판`,guided:Rt===`laws`,onClick:()=>z(`51%`,`-2%`,()=>gn(`laws`))",
  "Gojoseon law board label and hero destination",
);

replaceOnce(
  "e===`joseon`&&at(`worried`)},7550)",
  "e===`joseon`&&at(`worried`),e===`joseon`&&!r.joseon.founding&&S({type:`joseonFounding`})},7550)",
  "Gojoseon first puzzle after meeting",
);

const ritualBefore = "r.joseon.met?un(`joseon`,`ritual`,{title:`제사와 정치`,first:[{speaker:`npc`,text:`단군왕검은 제사와 나라의 일을 함께 이끌었대.`,left:`83%`,top:`42%`},{speaker:`hero`,text:`제사와 정치를 이끄는 지배자를 나타내는 이름이구나.`,left:`69%`,top:`56%`}],repeat:[`방울 소리가 나니까 나도 모르게 자세를 바로 하게 돼.`,`불빛에 비친 거울 속 내 얼굴이 평소보다 엄숙해 보여.`],left:`82%`,top:`45%`,sound:`bell`}):B(`j-altar-before`,[`제사 도구가 놓인 특별한 자리가 보여. 푸른 균열 옆 아이와 먼저 이야기해 보자.`],`82%`,`45%`,`bell`)";
const ritualAfter = "r.joseon.met?z(`68%`,`-2%`,()=>un(`joseon`,`ritual`,{title:`제사와 정치`,first:[{speaker:`npc`,text:`쉿, 지금 하늘에 제사를 지내는 중이야. 방울 소리에 맞춰 함께 고개를 숙여 보자.`,left:`83%`,top:`42%`},{speaker:`hero`,text:`단군왕검은 제사와 나라의 일을 함께 이끄는 지배자였구나.`,left:`69%`,top:`56%`}],repeat:[`방울 소리에 맞춰 고개를 숙이니 제사 터가 더 엄숙하게 느껴져.`,`불빛에 비친 거울이 반짝여. 특별한 의식에 쓰던 물건인가 봐.`],left:`82%`,top:`45%`,sound:`bell`})):B(`j-altar-before`,[`제사 도구가 놓인 특별한 자리야. 먼저 마을 아이와 이야기해 보자.`],`82%`,`45%`,`bell`)";
replaceOnce(ritualBefore, ritualAfter, "Gojoseon ritual interaction");

const css = String.raw`
/* Final continuity fixes: reward overlap, Neolithic axe access, ritual action. */
.chain-game:has(.chain-card.compact-reward) .old-axe-art{display:none!important}
.chain-game:has(.old-person-art.rewarded) .old-person-art.rewarded{left:68%!important;bottom:-2%!important;width:21%!important}
.chain-game:has(.old-person-art.rewarded) .roaming-hero{left:42%!important;bottom:-2%!important}
.chain-game:has(.old-person-art.rewarded) .old-person.at-hut{left:68%!important;top:43%!important;width:20%!important;height:51%!important}
.chain-game.era-new:has(.new-pot-memory.complete) .neolithic-child{left:60%!important}
.chain-game.era-new:has(.new-pot-memory.complete) .neolithic-child-shadow{left:62.5%!important}
.chain-game.era-new:has(.new-pot-memory.complete) .new-child-hit{left:59.5%!important}
.chain-game .new-stone-axe{z-index:28!important}
.chain-game.era-joseon .j-law{left:61.5%!important;top:51.5%!important;width:13.5%!important;height:20%!important;z-index:25!important;border-radius:18%!important}
.chain-game:has(.j-altar.discovering) .roaming-hero:not(.walking) img{transform-origin:50% 100%;animation:finalRitualHeroBow 1.25s ease-in-out}
.chain-game:has(.j-altar.discovering) .joseon-nuri:not(.walking){transform-origin:50% 100%;animation:finalRitualNuriBow 1.25s ease-in-out}
.chain-game .j-altar.discovering:after{inset:5%!important;opacity:1!important;background:radial-gradient(circle at 58% 70%,#fff1a8aa 0 8%,#ffae505d 24%,transparent 58%)!important;animation:finalRitualGlow .42s ease-in-out infinite alternate!important}
.chain-game .j-altar.discovering:before{content:"";position:absolute;left:60%;top:8%;width:28%;aspect-ratio:1;border:3px solid #fff0b5c7;border-left-color:transparent;border-bottom-color:transparent;border-radius:50%;animation:finalRitualBell 1.15s ease-out infinite;pointer-events:none}
@keyframes finalRitualHeroBow{0%,100%{transform:translateY(14%) rotate(0)}42%,68%{transform:translateY(14%) rotate(8deg) scaleY(.97)}}
@keyframes finalRitualNuriBow{0%,100%{transform:rotate(0)}42%,68%{transform:rotate(8deg) scaleY(.97)}}
@keyframes finalRitualGlow{to{filter:brightness(1.35);transform:scale(1.06)}}
@keyframes finalRitualBell{0%{opacity:0;transform:rotate(35deg) scale(.5)}25%{opacity:.9}100%{opacity:0;transform:rotate(35deg) scale(1.45)}}
`;

if (!html.includes("</style>")) throw new Error("style closing tag not found");
html = html.replace("</style>", `${css}</style>`);

fs.writeFileSync(output, html);
console.log(output);
