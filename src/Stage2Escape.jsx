import React, { useEffect, useRef, useState } from "react";
import { BookOpen, Lightbulb, PackageOpen, Sparkles, X } from "lucide-react";
import oldBg from "./assets/scene_paleolithic_axe_restored.png";
import newBg from "./assets/scene_neolithic.png";
import bronzeBg from "./assets/scene_bronze_spread.png";
import joseonBg from "./assets/scene_gojoseon_spread.png";
import classroomBg from "./assets/classroom_revealed_integrated.png";
import hero from "./assets/character_normal.png";
import heroSurprised from "./assets/character_time_travel_surprised.png";
import caveWallCloseup from "./assets/cave_wall_closeup.png";
import daggerArt from "./assets/gojoseon_bipa_dagger.png";
import dryBranchArt from "./assets/paleolithic_dry_branch.png";
import torchArt from "./assets/paleolithic_torch.png";
import handAxeArt from "./assets/paleolithic_hand_axe.png";
import paleolithicSpears from "./assets/paleolithic_spears_isolated.png";
import paleolithicShelter from "./assets/paleolithic_shelter_closeup.png";
import paleolithicChild from "./assets/paleolithic_child_npc.png";
import paleolithicChildWorried from "./assets/paleolithic_child_worried.png";
import paleolithicChildPointing from "./assets/paleolithic_child_pointing.png";
import paleolithicChildReward from "./assets/paleolithic_child_reward.png";
import neolithicNetCloseup from "./assets/neolithic_net_sinker_closeup.png";
import neolithicGrainCloseup from "./assets/neolithic_grinding_stone_closeup.png";
import neolithicSpinCloseup from "./assets/neolithic_spindle_needle_closeup.png";
import neolithicPotteryCloseup from "./assets/neolithic_pottery_closeup.png";
import neolithicChildWorried from "./assets/neolithic_child_worried.png";
import neolithicChildReward from "./assets/neolithic_child_reward.png";
import bronzeKnifeCloseup from "./assets/bronze_crescent_knife_closeup.png";
import bronzeMirrorCloseup from "./assets/bronze_mirror_closeup.png";
import bronzeBellCloseup from "./assets/bronze_bell_closeup.png";
import bronzeDolmenCloseup from "./assets/bronze_dolmen_closeup.png";
import bronzeStoreCloseup from "./assets/bronze_store_record_closeup.png";
import bronzeMaruWorried from "./assets/bronze_maru_worried.png";
import bronzeMaruHarvest from "./assets/bronze_maru_harvest.png";
import bronzeMaruReward from "./assets/bronze_maru_reward.png";
import joseonLawCloseup from "./assets/gojoseon_law_board_closeup.png";
import joseonRecordCloseup from "./assets/gojoseon_record_stone_closeup.png";
import joseonDolmenCloseup from "./assets/gojoseon_table_dolmen_closeup.png";
import joseonNuriWorried from "./assets/gojoseon_nuri_worried.png";
import joseonNuriReward from "./assets/gojoseon_nuri_reward.png";
import "./chain-extra.css";
import "./stage2-polish.css";
import { safeHeroPosition } from "./hero-placement.js";

const KEY = "historyEscapeStage2_v24_story_order";
const eras = [
  { id: "old", name: "구석기 시대", sub: "바뀐 동굴 벽화", bg: oldBg },
  { id: "new", name: "신석기 시대", sub: "깨진 빗살무늬 토기", bg: newBg },
  { id: "bronze", name: "청동기 시대", sub: "잠긴 곡식 창고", bg: bronzeBg },
  { id: "joseon", name: "고조선", sub: "흩어진 나라 기록", bg: joseonBg },
];
const oldExplorationEntries = [
  {
    id: "fire",
    icon: "🔥",
    title: "불의 쓰임",
    sentence:
      "구석기 사람들은 불을 이용해 추위를 견디고 음식을 익혀 먹으며 짐승을 막았다.",
  },
  {
    id: "gather",
    icon: "🧺",
    title: "사냥과 채집",
    sentence: "구석기 사람들은 사냥과 채집으로 먹을 것을 구했다.",
  },
  {
    id: "hide",
    icon: "🪶",
    title: "짐승 가죽",
    sentence: "구석기 사람들은 사냥한 짐승의 가죽을 생활에 이용했다.",
  },
];
const emptyOldExploration = { fire: false, gather: false, hide: false };
const lifeExplorationEntries = {
  old: oldExplorationEntries,
  new: [
    {
      id: "stoneAxe",
      icon: "🪨",
      title: "갈아 만든 돌도끼",
      sentence: "신석기 사람들은 돌을 갈아 간석기를 만들어 사용했다.",
    },
    {
      id: "settlement",
      icon: "🏡",
      title: "움집 마을",
      sentence:
        "신석기 사람들은 농사를 시작하면서 한곳에 머물러 움집을 짓고 살았다.",
    },
    {
      id: "riverside",
      icon: "🛶",
      title: "강가의 생활",
      sentence:
        "신석기 사람들은 강가나 바닷가에 마을을 이루고 고기잡이를 했다.",
    },
  ],
  bronze: [
    {
      id: "woodTools",
      icon: "🪵",
      title: "돌과 나무 도구",
      sentence:
        "청동기 시대에도 농기구와 생활 도구는 주로 돌이나 나무로 만들었다.",
    },
    {
      id: "harvest",
      icon: "🌾",
      title: "발달한 농사",
      sentence: "청동기 시대에는 농사가 발달하면서 곡식 생산량이 늘었다.",
    },
    {
      id: "plainPottery",
      icon: "🏺",
      title: "민무늬 토기",
      sentence: "청동기 사람들은 무늬가 거의 없는 민무늬 토기를 사용했다.",
    },
  ],
  joseon: [
    {
      id: "farming",
      icon: "🌾",
      title: "농사와 곡식",
      sentence: "고조선 사람들은 농사를 지으며 곡식을 중요하게 여겼다.",
    },
    {
      id: "fort",
      icon: "🪵",
      title: "성책 마을",
      sentence: "고조선은 여러 사람과 마을을 다스리는 나라로 성장했다.",
    },
    {
      id: "ritual",
      icon: "🔔",
      title: "제사와 정치",
      sentence: "단군왕검은 제사와 정치를 이끄는 지배자를 나타낸다.",
    },
  ],
};
const emptyLifeExploration = {
  old: { ...emptyOldExploration },
  new: { stoneAxe: false, settlement: false, riverside: false },
  bronze: { woodTools: false, harvest: false, plainPottery: false },
  joseon: { farming: false, fort: false, ritual: false },
};
const initial = {
  route: "old",
  unlocked: 0,
  completed: [],
  inventory: [],
  evidence: [],
  explore: {
    old: { ...emptyLifeExploration.old },
    new: { ...emptyLifeExploration.new },
    bronze: { ...emptyLifeExploration.bronze },
    joseon: { ...emptyLifeExploration.joseon },
  },
  old: {
    tinder: false,
    axe: false,
    axeShown: false,
    fire: false,
    wall: false,
    met: false,
    hunt: false,
    shelter: false,
    food: false,
    rewardReady: false,
  },
  new: { met: false, net: false, grain: false, spin: 0, pot: false },
  bronze: {
    knife: false,
    mirror: false,
    bell: false,
    dolmen: false,
    final: false,
    met: false,
  },
  joseon: {
    met: false,
    founding: false,
    laws: false,
    dagger: false,
    dolmen: false,
    final: false,
  },
  ending: false,
  signal: false,
  departing: false,
};
const countCompleted = (flags) =>
  flags.reduce((total, flag) => total + Number(Boolean(flag)), 0);
const explorationHints = {
  old: {
    tinder: [
      "불을 들고 이동하려면 손에 들 수 있는 마른 재료가 필요해.",
      "모닥불 가까운 바닥부터 천천히 살펴봐.",
      "불 옆의 마른 나뭇가지를 찾아 눌러 봐.",
    ],
    fire: [
      "어두운 곳으로 가져갈 빛을 만들어야 해.",
      "챙긴 나뭇가지를 불 가까이 가져가면 어떨까?",
      "모닥불을 눌러 나뭇가지에 불을 붙여 봐.",
    ],
    wall: [
      "밝아진 불빛으로 확인할 어두운 장소가 있어.",
      "장면 왼쪽의 커다란 바위 안쪽을 살펴봐.",
      "횃불을 든 채 동굴 안쪽을 눌러 봐.",
    ],
    person: [
      "동굴 안에서 누군가 조심스럽게 나오고 있어.",
      "새로 나타난 아이와 먼저 이야기를 나눠 보자.",
      "동굴 앞의 하루를 한 번 눌러 봐.",
    ],
    axe: [
      "하루가 단단한 열매 때문에 곤란해 보여.",
      "열매 가까운 바닥에 놓인 돌 도구를 살펴봐.",
      "열매 바구니 옆 주먹 도끼를 눌러 봐.",
    ],
    hunt: [
      "여럿이 함께 사용했을 것 같은 긴 도구가 있어.",
      "동굴 입구 옆에 기대어 있는 물건들을 살펴봐.",
      "동굴 옆 사냥 도구를 눌러 봐.",
    ],
    shelter: [
      "구석기 사람들이 잠시 머문 흔적을 찾아봐.",
      "장면 오른쪽의 가죽으로 덮인 구조물을 살펴봐.",
      "오른쪽 막집을 눌러 이동 생활 기록을 확인해 봐.",
    ],
    explore: [
      "핵심 기록은 모두 고쳤지만 탐험 기록에 빈 생활 흔적이 남아 있어.",
      "모닥불, 열매 바구니, 막집에 걸린 가죽을 다시 살펴봐.",
    ],
    done: [
      "구석기 생활 기록을 모두 되찾았어.",
      "하루에게 달라진 일이 있는지 살펴봐.",
      "막집 앞의 하루에게 다시 다가가 봐.",
    ],
  },
  new: {
    child: [
      "깨진 토기 조각을 든 아이가 주변을 살피고 있어.",
      "먼저 그 아이와 이야기를 나눠 보면 어떨까?",
      "마을 오른쪽의 다온을 눌러 봐.",
    ],
    net: [
      "강가에서 물고기를 잡을 때 쓴 도구를 찾아봐.",
      "그물 가장자리에 매단 돌이 단서야.",
      "장면 아래쪽의 그물과 돌그물추를 눌러 봐.",
    ],
    grain: [
      "곡식 알갱이가 남아 있는 넓은 돌을 찾아봐.",
      "단단한 돌 두 개가 한 쌍으로 놓여 있어.",
      "갈판과 갈돌을 눌러 봐.",
    ],
    spin: [
      "실과 옷을 만드는 데 이어서 쓴 두 도구가 있어.",
      "작은 바퀴 모양 돌과 가느다란 바늘을 살펴봐.",
      "가락바퀴나 뼈바늘을 눌러 봐.",
    ],
    pot: [
      "되찾은 무늬들이 모이는 물건을 살펴봐.",
      "장면 왼쪽 아래의 깨진 그릇이 빛나고 있어.",
      "빗살무늬 토기를 눌러 생활 기록을 정리해 봐.",
    ],
    explore: [
      "토기 기록은 완성됐지만 아직 못 본 생활 흔적이 있어.",
      "간석기, 움집 마을, 강가의 나무배를 천천히 살펴봐.",
    ],
    done: [
      "신석기 생활 기록을 모두 되찾았어.",
      "다온이 무언가를 건네려는지 살펴봐.",
      "다온이나 완성된 토기를 다시 살펴봐.",
    ],
  },
  bronze: {
    knife: [
      "마루가 곡식을 거둘 도구를 찾고 있어.",
      "반달 모양의 납작하고 거친 도구를 찾아봐.",
      "곡식밭 가까이의 반달 돌칼을 눌러 봐.",
    ],
    mirror: [
      "농기구와 달리 귀한 사람이 썼을 물건이 있어.",
      "빛을 비추는 둥근 청동 물건을 살펴봐.",
      "청동 거울을 눌러 봐.",
    ],
    bell: [
      "특별한 의식에서 소리를 냈을 물건을 찾아봐.",
      "매달아 흔들면 소리가 날 모양이야.",
      "청동 방울을 눌러 소리를 들어 봐.",
    ],
    dolmen: [
      "아주 많은 힘이 필요했을 커다란 돌무덤이 있어.",
      "한 사람이 옮기기 어려운 큰 돌을 찾아봐.",
      "장면 왼쪽의 고인돌을 눌러 봐.",
    ],
    store: [
      "되찾은 기록이 모이는 장소에 변화가 생겼어.",
      "마을의 곡식을 보관하는 건물을 살펴봐.",
      "오른쪽 위 곡식 창고를 눌러 봐.",
    ],
    explore: [
      "창고 기록은 돌아왔지만 마을 생활 흔적이 더 남아 있어.",
      "나무 도구, 곡식밭, 왼쪽 아래의 토기를 살펴봐.",
    ],
    done: [
      "청동기 마을 기록을 모두 되찾았어.",
      "마루와 열린 창고를 다시 살펴봐.",
      "마루가 건네는 시간 톱니를 확인해 봐.",
    ],
  },
  joseon: {
    nuri: [
      "푸른 균열 가까이에 서 있는 아이가 단서를 들고 있어.",
      "아이와 먼저 이야기를 나누면 흩어진 기록을 찾을 수 있어.",
      "오른쪽의 누리를 눌러 봐.",
    ],
    laws: [
      "건국 이야기 기록 옆에 사람·곡식·집 그림이 새겨진 나무판이 있어.",
      "불이 있는 제사 터의 왼쪽 아래, 세 장으로 세워진 나무판을 살펴봐.",
      "누리나 빈 땅이 아니라 세워진 나무판을 눌러 봐.",
    ],
    dagger: [
      "땅 위에서 독특한 청동빛이 반짝이고 있어.",
      "악기 비파처럼 가운데가 넓은 칼 모양을 찾아봐.",
      "장면 가운데의 비파형 동검을 눌러 봐.",
    ],
    dolmen: [
      "고조선의 문화 범위를 알려 줄 돌무덤이 있어.",
      "받침돌 위에 넓은 덮개돌을 얹은 모습을 찾아봐.",
      "왼쪽의 탁자식 고인돌을 눌러 봐.",
    ],
    record: [
      "네 기록이 모이는 푸른 균열을 살펴봐.",
      "장면 아래쪽의 푸른빛이 전보다 안정되어 보여.",
      "푸른 시간 균열을 눌러 기록을 정리해 봐.",
    ],
    explore: [
      "나라 기록은 완성됐지만 주변 생활 모습이 더 남아 있어.",
      "농사짓는 사람들, 성책, 제사 터를 살펴봐.",
    ],
    done: [
      "고조선 기록을 모두 되찾았어.",
      "누리가 마지막 시간 톱니를 들고 있어.",
      "누리에게 다가가 시간 톱니를 받아 봐.",
    ],
  },
};
const eraBriefings = {
  new: {
    title: "깨진 토기의 무늬를 찾아서",
    button: "강가 마을로 들어가기",
    turns: [
      {
        speaker: "npc",
        text: "나는 다온이야. 들고 있던 토기가 갑자기 깨져 버렸어.",
        left: "72%",
        top: "58%",
      },
      {
        speaker: "hero",
        text: "걱정 마. 마을을 함께 살펴보자!",
        left: "58%",
        top: "68%",
      },
    ],
  },
  bronze: {
    title: "수확을 앞둔 청동기 마을",
    button: "마을 안으로 들어가기",
    turns: [
      {
        speaker: "npc",
        text: "나는 마루야. 수확에 쓸 도구를 고르지 못하겠어.",
        left: "86%",
        top: "57%",
      },
      {
        speaker: "hero",
        text: "내가 같이 찾아볼게. 생김새부터 살펴보자!",
        left: "71%",
        top: "63%",
      },
    ],
  },
  joseon: {
    title: "흩어진 고조선의 기록",
    button: "고조선 마을로 들어가기",
    turns: [
      {
        speaker: "npc",
        text: "나는 누리야. 푸른빛이 번쩍인 뒤 단서들이 뒤섞였어.",
        left: "86%",
        top: "58%",
      },
      {
        speaker: "hero",
        text: "그럼 흩어진 단서를 하나씩 제자리로 돌려놓자!",
        left: "72%",
        top: "63%",
      },
    ],
  },
};
const clearStories = {
  old: "동굴 벽화와 이동 생활, 무리 사냥, 주먹 도끼의 기록을 모두 복구했다. 구석기 아이에게 받은 첫 번째 시간 톱니가 다시 움직인다.",
  new: "다온이와 토기의 의·식·주 기록을 복원하자 신석기 마을이 제 모습을 되찾았다. 다온이가 발견한 두 번째 시간 톱니를 두 손으로 건네줬다.",
  bronze:
    "청동기 마을의 뒤섞인 기록을 바로잡았다. 마루가 직접 건넨 세 번째 시간 톱니가 다시 움직인다.",
  joseon:
    "누리와 함께 건국 이야기·8조법·대표 문화유산을 확인하자 푸른 시간 균열이 닫혔다. 누리가 건넨 네 번째 시간 톱니가 교실로 돌아가는 길을 연다.",
};
const villainNotes = {
  old: "“첫 기록은 고쳤군. 다음 마을의 깨진 토기도 되돌릴 수 있을까?”",
  new: "“정착 생활까지 기억해 냈네. 하지만 힘이 생겨난 순서도 맞힐 수 있을까?”",
  bronze: "“힘의 비밀도 알아냈군. 마지막 나라의 법과 경계는 이미 지워 두었다.”",
  joseon:
    "고조선 마을의 푸른 시간 균열이 닫히고 네 개의 시간 톱니가 한꺼번에 빛난다.",
};
const evidenceNotes = {
  old: "구석기의 이동 생활·무리 사냥·뗀석기 기록을 뒤섞은 흔적",
  new: "깨진 빗살무늬 토기에 생활 기록을 뒤섞어 놓은 흔적",
  bronze: "곡식 창고에서 발견한 ‘힘의 순서를 흐트러뜨려라’ 쪽지",
  joseon: "고조선의 건국 이야기·8조법·비파형 동검·탁자식 고인돌 기록",
};
const gameSfx = (kind) =>
  window.dispatchEvent(new CustomEvent("game-sfx", { detail: kind }));
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      ...initial,
      ...saved,
      explore: {
        ...initial.explore,
        ...(saved.explore || {}),
        old: { ...emptyLifeExploration.old, ...(saved.explore?.old || {}) },
        new: { ...emptyLifeExploration.new, ...(saved.explore?.new || {}) },
        bronze: {
          ...emptyLifeExploration.bronze,
          ...(saved.explore?.bronze || {}),
        },
        joseon: {
          ...emptyLifeExploration.joseon,
          ...(saved.explore?.joseon || {}),
        },
      },
      old: {
        ...initial.old,
        ...saved.old,
        axeShown: saved.old?.axeShown ?? Boolean(saved.old?.met),
      },
      new: { ...initial.new, ...saved.new },
      bronze: { ...initial.bronze, ...saved.bronze },
      joseon: { ...initial.joseon, ...saved.joseon },
    };
  } catch {
    return initial;
  }
}

export default function Stage2Escape({
  onReplayIntro,
  onEraChange,
  audioControl,
}) {
  const [g, setG] = useState(load);
  const [arriving, setArriving] = useState(true);
  const [intro, setIntro] = useState(false);
  const [speech, setSpeech] = useState(
    "으악…! 여기가 어디야? 교실이 아니잖아!",
  );
  const [heroPos, setHeroPosition] = useState(() =>
    g.route === "old" && g.old.wall && !g.old.met
      ? { left: "36%", bottom: "-2%" }
      : { left: "4%", bottom: "-2%" },
  );
  // Every walking/meeting destination uses the same foreground protection.
  const setHeroPos = (position, route = g.route) =>
    setHeroPosition(safeHeroPosition(route, position));
  const [walking, setWalking] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [followingChild, setFollowingChild] = useState(false);
  const [bubble, setBubble] = useState(null);
  const [modal, setModal] = useState(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [hintLevel, setHintLevel] = useState(1);
  const [scanActive, setScanActive] = useState(false);
  const [pickupNotice, setPickupNotice] = useState("");
  const [laws, setLaws] = useState(["", "", ""]);
  const moveTimer = useRef(null);
  const bubbleTimer = useRef(null);
  const returnTimer = useRef(null);
  const ambientCount = useRef({});
  const explorationCount = useRef({});
  const pickupTimer = useRef(null);
  const exploreFlashTimer = useRef(null);
  const exploreNoticeTimer = useRef(null);
  const exploreSoundTimer = useRef(null);
  const axeRevealTimer = useRef(null);
  const ritualTimer = useRef(null);
  const newFlashTimer = useRef(null);
  const oldFlashTimer = useRef(null);
  const scanTimer = useRef(null);
  const [returning, setReturning] = useState(false);
  const [newFlash, setNewFlash] = useState("");
  const [oldFlash, setOldFlash] = useState("");
  const [lifeExploreFlash, setLifeExploreFlash] = useState("");
  const [exploreNotice, setExploreNotice] = useState(null);
  const [bronzeFlash, setBronzeFlash] = useState("");
  const [joseonFlash, setJoseonFlash] = useState("");
  const [ritualActive, setRitualActive] = useState(false);
  const [newChildPos, setNewChildPos] = useState({
    left: g.new?.pot ? "60%" : "79.5%",
    bottom: "-2.5%",
  });
  const [newChildWalking, setNewChildWalking] = useState(false);
  const [maruMode, setMaruMode] = useState(
    g.bronze?.knife ? "harvest" : "worried",
  );
  const [maruPos, setMaruPos] = useState(
    g.bronze?.knife
      ? { left: "80%", bottom: "-3%" }
      : { left: "62%", bottom: "-3%" },
  );
  const [maruWalking, setMaruWalking] = useState(false);
  const [nuriMode, setNuriMode] = useState(
    g.joseon?.final ? "happy" : "worried",
  );
  const [nuriPos, setNuriPos] = useState({ left: "78%", bottom: "-4%" });
  const [nuriWalking, setNuriWalking] = useState(false);
  const bronzeTimer = useRef(null);
  const maruTimer = useRef(null);
  const maruReturnTimer = useRef(null);
  const maruSettleTimer = useRef(null);
  const joseonTimer = useRef(null);
  const nuriTimer = useRef(null);
  const nuriReturnTimer = useRef(null);
  const nuriSettleTimer = useRef(null);
  const meetingTimer = useRef(null);
  const meetingReturnTimer = useRef(null);
  const meetingSettleTimer = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      setArriving(false);
      setIntro(true);
      setSpeech("타임머신이 멈췄어. 무슨 일이 생긴 건지 확인해 보자.");
    }, 2200);
    return () => clearTimeout(t);
  }, []);
  useEffect(
    () => () => {
      clearTimeout(moveTimer.current);
      clearTimeout(bubbleTimer.current);
      clearTimeout(returnTimer.current);
      clearTimeout(pickupTimer.current);
      clearTimeout(exploreFlashTimer.current);
      clearTimeout(exploreNoticeTimer.current);
      clearTimeout(exploreSoundTimer.current);
      clearTimeout(axeRevealTimer.current);
      clearTimeout(ritualTimer.current);
      clearTimeout(newFlashTimer.current);
      clearTimeout(oldFlashTimer.current);
      clearTimeout(bronzeTimer.current);
      clearTimeout(maruTimer.current);
      clearTimeout(maruReturnTimer.current);
      clearTimeout(maruSettleTimer.current);
      clearTimeout(joseonTimer.current);
      clearTimeout(nuriTimer.current);
      clearTimeout(nuriReturnTimer.current);
      clearTimeout(nuriSettleTimer.current);
      clearTimeout(meetingTimer.current);
      clearTimeout(meetingReturnTimer.current);
      clearTimeout(meetingSettleTimer.current);
      clearTimeout(scanTimer.current);
    },
    [],
  );
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(g)), [g]);
  useEffect(() => onEraChange?.(g.route), [g.route, onEraChange]);
  useEffect(() => {
    if (g.route !== "new" || !g.new?.pot || meetingId) return;
    setNewChildPos({ left: "60%", bottom: "-2.5%" });
  }, [g.route, g.new?.pot, meetingId]);
  const era = eras.find((e) => e.id === g.route);
  const oldSolvedCount = countCompleted([
    g.old.wall,
    g.old.hunt,
    g.old.shelter,
    g.old.axe && g.old.food,
  ]);
  const lifeExploration = {
    old: { ...emptyLifeExploration.old, ...(g.explore?.old || {}) },
    new: { ...emptyLifeExploration.new, ...(g.explore?.new || {}) },
    bronze: { ...emptyLifeExploration.bronze, ...(g.explore?.bronze || {}) },
    joseon: { ...emptyLifeExploration.joseon, ...(g.explore?.joseon || {}) },
  };
  const lifeExplorationCounts = Object.fromEntries(
    eras.map(({ id }) => [
      id,
      countCompleted(
        lifeExplorationEntries[id].map((item) => lifeExploration[id][item.id]),
      ),
    ]),
  );
  const oldExploration = lifeExploration.old;
  const oldExplorationCount = countCompleted(
    oldExplorationEntries.map((item) => oldExploration[item.id]),
  );
  const newExplorationCount = lifeExplorationCounts.new;
  const bronzeExplorationCount = lifeExplorationCounts.bronze;
  const joseonExplorationCount = lifeExplorationCounts.joseon;
  const oldRewardReady = Boolean(
    g.old.rewardReady && oldExplorationCount === 3,
  );
  const oldAxeVisible = Boolean(g.old.axeShown || g.old.axe || g.old.food);
  const newSolvedCount = countCompleted([
    g.new.net,
    g.new.grain,
    g.new.spin >= 3,
  ]);
  const newProgressCount = countCompleted([
    g.new.net,
    g.new.grain,
    g.new.spin >= 3,
    g.new.pot,
  ]);
  const bronzeProgressCount = countCompleted([
    g.bronze.knife,
    g.bronze.mirror,
    g.bronze.bell,
    g.bronze.dolmen,
  ]);
  const joseonSolvedCount = countCompleted([
    g.joseon.founding,
    g.joseon.laws,
    g.joseon.dagger,
    g.joseon.dolmen,
  ]);
  const oldStep = !g.old.tinder
    ? "tinder"
    : !g.old.fire
      ? "fire"
      : !g.old.wall
        ? "wall"
        : !g.old.met
          ? "person"
          : !(g.old.axe && g.old.food)
            ? "axe"
            : !g.old.hunt
              ? "hunt"
              : !g.old.shelter
                ? "shelter"
                : "done";
  const newStep = !g.new.met
    ? "child"
    : !g.new.net
      ? "net"
      : !g.new.grain
        ? "grain"
        : g.new.spin < 3
          ? "spin"
          : !g.new.pot
            ? "pot"
            : "done";
  const bronzeStepKey = !g.bronze.knife
    ? "knife"
    : !g.bronze.mirror
      ? "mirror"
      : !g.bronze.bell
        ? "bell"
        : !g.bronze.dolmen
          ? "dolmen"
          : !g.bronze.final
            ? "store"
            : "done";
  const joseonStep = !g.joseon.met
    ? "nuri"
    : !g.joseon.founding
      ? "nuri"
      : !g.joseon.laws
        ? "laws"
        : !g.joseon.dagger
          ? "dagger"
          : !g.joseon.dolmen
            ? "dolmen"
            : !g.joseon.final
              ? "record"
              : "done";
  const baseStep =
    { old: oldStep, new: newStep, bronze: bronzeStepKey, joseon: joseonStep }[
      g.route
    ] || "done";
  const finalSolvedByEra = {
    old: oldSolvedCount === 4,
    new: Boolean(g.new.pot),
    bronze: Boolean(g.bronze.final),
    joseon: Boolean(g.joseon.final),
  };
  const currentLifeCount = lifeExplorationCounts[g.route] || 0;
  const showingLifeProgress = Boolean(
    finalSolvedByEra[g.route] && !g.completed.includes(g.route),
  );
  const currentStep =
    showingLifeProgress && currentLifeCount < 3 ? "explore" : baseStep;
  const hintLines = explorationHints[g.route]?.[currentStep] || [
    "주변 사물의 모양과 위치를 천천히 살펴봐.",
  ];
  const clueNames = ["관찰 실마리", "연결 실마리"];
  const hintKey = `${g.route}:${currentStep}`;
  useEffect(() => {
    setHintLevel(1);
    setHintOpen(false);
    setScanActive(false);
    clearTimeout(scanTimer.current);
  }, [hintKey]);
  const currentProgress =
    {
      old: oldSolvedCount,
      new: newProgressCount,
      bronze: bronzeProgressCount,
      joseon: joseonSolvedCount,
    }[g.route] ?? 0;
  const progressComplete = showingLifeProgress
    ? currentLifeCount === 3
    : currentProgress === 4;
  const placeBubble = (text, left = "50%", top = "48%", speaker = "hero") => {
    const x = Math.max(4, Math.min(96, Number.parseFloat(left) || 50));
    let y = Math.max(14, Math.min(90, Number.parseFloat(top) || 48));
    // Keep foreground observations above the stone/tools, not over their artwork.
    if ((g.route === "bronze" || g.route === "joseon") && x >= 30 && x <= 67 && y > 62) y = 62;
    const align = x < 28 ? "left" : x > 72 ? "right" : "center";
    setSpeech("");
    setBubble({ text, left: `${x}%`, top: `${y}%`, align, speaker });
  };
  const say = (text, left = "50%", top = "48%", speaker = "hero") => {
    clearTimeout(bubbleTimer.current);
    placeBubble(text, left, top, speaker);
    const readingTime = Math.min(
      5200,
      Math.max(2800, 1800 + String(text).length * 42),
    );
    bubbleTimer.current = setTimeout(() => setBubble(null), readingTime);
  };
  const startScan = () => {
    clearTimeout(scanTimer.current);
    if (currentStep === "done")
      return say(
        g.route === "old"
          ? "이 시대의 핵심 기록은 모두 복구했어. 이제 친구가 건네는 시간 톱니를 확인해 보자."
          : "핵심 기록과 생활 흔적을 모두 확인했어. 이제 친구가 건네는 시간 톱니를 확인해 보자.",
        "50%",
        "45%",
      );
    setHintOpen(false);
    setScanActive(false);
    gameSfx("discovery");
    requestAnimationFrame(() => setScanActive(true));
    scanTimer.current = setTimeout(() => setScanActive(false), 3200);
  };
  const converse = (turns = []) => {
    clearTimeout(bubbleTimer.current);
    setSpeech("");
    setBubble(null);
    let index = 0;
    const next = () => {
      const turn = turns[index++];
      if (!turn) {
        setBubble(null);
        return;
      }
      gameSfx("dialogue");
      placeBubble(turn.text, turn.left, turn.top, turn.speaker);
      const readingTime = Math.min(
        2500,
        Math.max(1750, 1050 + String(turn.text).length * 24),
      );
      bubbleTimer.current = setTimeout(
        index < turns.length ? next : () => setBubble(null),
        readingTime,
      );
    };
    next();
  };
  const collectTool = (name) => {
    gameSfx("discovery");
    clearTimeout(pickupTimer.current);
    setPickupNotice(name);
    pickupTimer.current = setTimeout(() => setPickupNotice(""), 2100);
  };
  const flashNew = (id) => {
    clearTimeout(newFlashTimer.current);
    setNewFlash(id);
    newFlashTimer.current = setTimeout(() => setNewFlash(""), 1100);
  };
  const flashOld = (id) => {
    clearTimeout(oldFlashTimer.current);
    setOldFlash(id);
    oldFlashTimer.current = setTimeout(() => setOldFlash(""), 1150);
  };
  const flashBronze = (id) => {
    clearTimeout(bronzeTimer.current);
    setBronzeFlash(id);
    bronzeTimer.current = setTimeout(() => setBronzeFlash(""), 1250);
  };
  const flashJoseon = (id) => {
    clearTimeout(joseonTimer.current);
    setJoseonFlash(id);
    joseonTimer.current = setTimeout(() => setJoseonFlash(""), 1250);
  };
  const patchEra = (id, p) => setG((s) => ({ ...s, [id]: { ...s[id], ...p } }));
  const moveTo = (left, bottom, action) => {
    if (walking) return;
    clearTimeout(moveTimer.current);
    clearTimeout(bubbleTimer.current);
    setBubble(null);
    setSpeech("");
    gameSfx("step");
    setWalking(true);
    setHeroPos({ left, bottom });
    moveTimer.current = setTimeout(() => {
      setWalking(false);
      action();
    }, 650);
  };
  const revealOldChild = () => {
    clearTimeout(moveTimer.current);
    clearTimeout(bubbleTimer.current);
    setModal(null);
    setBubble(null);
    setSpeech("");
    setWalking(true);
    setHeroPos({ left: "36%", bottom: "-2%" });
    gameSfx("step");
    moveTimer.current = setTimeout(() => {
      setWalking(false);
      patchEra("old", { wall: true });
      flashOld("wall");
      gameSfx("restore");
      say("됐다! 그런데… 동굴 안에 누가 있어!", "22%", "42%");
    }, 760);
  };
  const beginEraMeeting = (id) => {
    const briefing = eraBriefings[id];
    clearTimeout(meetingTimer.current);
    clearTimeout(meetingReturnTimer.current);
    clearTimeout(meetingSettleTimer.current);
    clearTimeout(maruTimer.current);
    clearTimeout(maruReturnTimer.current);
    clearTimeout(maruSettleTimer.current);
    clearTimeout(nuriTimer.current);
    clearTimeout(nuriReturnTimer.current);
    clearTimeout(nuriSettleTimer.current);
    setModal(null);
    setMeetingId(id);
    setSpeech("");
    setBubble(null);
    setG((s) => ({ ...s, [id]: { ...s[id], met: true } }));
    gameSfx("step");
    setWalking(true);
    setHeroPos(
      {
        new: { left: "59%", bottom: "-2%" },
        bronze: { left: "66%", bottom: "-2%" },
        joseon: { left: "69%", bottom: "-2%" },
      }[id],
    );
    if (id === "new") {
      setNewChildWalking(true);
      setNewChildPos({ left: "69%", bottom: "-2.5%" });
    }
    if (id === "bronze") {
      setMaruMode("curious");
      setMaruWalking(true);
      setMaruPos({ left: "80%", bottom: "-3%" });
    }
    if (id === "joseon") {
      setNuriMode("happy");
      setNuriWalking(true);
      setNuriPos({ left: "78%", bottom: "-4%" });
    }
    meetingTimer.current = setTimeout(() => {
      setWalking(false);
      setNewChildWalking(false);
      setMaruWalking(false);
      setNuriWalking(false);
      converse(briefing.turns);
    }, 1050);
    meetingReturnTimer.current = setTimeout(() => {
      gameSfx("step");
      if (id === "bronze" || id === "joseon") {
        setWalking(true);
        setHeroPos({ left: id === "bronze" ? "18%" : "15%", bottom: "-2%" }, id);
      }
      if (id === "new") {
        setNewChildWalking(true);
        setNewChildPos({ left: "79.5%", bottom: "-2.5%" });
      }
      if (id === "bronze") {
        setMaruWalking(true);
        setMaruPos({ left: "62%", bottom: "-3%" });
      }
      if (id === "joseon") {
        setNuriWalking(true);
        setNuriPos({ left: "78%", bottom: "-4%" });
      }
    }, 6200);
    meetingSettleTimer.current = setTimeout(() => {
      setMeetingId("");
      setWalking(false);
      setNewChildWalking(false);
      setMaruWalking(false);
      setNuriWalking(false);
      if (id === "bronze") setMaruMode("worried");
      if (id === "joseon") setNuriMode("worried");
      if (id === "joseon" && !g.joseon.founding) {
        setModal({ type: "joseonFounding" });
      }
    }, 7550);
  };
  const finishBronze = (key, text, left, top) => {
    patchEra("bronze", { [key]: true, met: true });
    gameSfx("restore");
    flashBronze(key);
    setModal(null);
    clearTimeout(maruTimer.current);
    clearTimeout(maruReturnTimer.current);
    clearTimeout(maruSettleTimer.current);
    if (key === "knife") {
      setMaruMode("curious");
      setMaruWalking(true);
      setMaruPos({ left: "82%", bottom: "-3%" });
      gameSfx("step");
      maruTimer.current = setTimeout(() => {
        setMaruWalking(false);
        setMaruMode("harvest");
        gameSfx("rustle");
        converse([
          {
            speaker: "npc",
            text: "이 도구였구나! 이제 내가 해 볼게.",
            left: "84%",
            top: "55%",
          },
          {
            speaker: "hero",
            text: "좋아! 이삭 쪽을 조심히 잡아.",
            left: "70%",
            top: "72%",
          },
        ]);
      }, 1550);
      return;
    }
    const target = { mirror: "25%", bell: "61%", dolmen: "15%" }[key] || "62%";
    const home = g.bronze.knife ? "82%" : "62%";
    setMaruMode(key === "bell" ? "surprised" : "curious");
    setMaruWalking(true);
    setMaruPos({ left: target, bottom: "-3%" });
    gameSfx("step");
    maruTimer.current = setTimeout(() => {
      setMaruWalking(false);
      if (key === "bell") gameSfx("bell");
      Array.isArray(text) ? converse(text) : say(text, left, top);
    }, 1350);
    const dialogueDelay = Array.isArray(text) ? 5850 : 4350;
    maruReturnTimer.current = setTimeout(() => {
      setMaruWalking(true);
      setMaruPos({ left: home, bottom: "-3%" });
      gameSfx("step");
    }, dialogueDelay);
    maruSettleTimer.current = setTimeout(() => {
      setMaruWalking(false);
      setMaruMode(g.bronze.knife ? "harvest" : "worried");
    }, dialogueDelay + 1350);
  };
  const finishJoseon = (key, text, left, top) => {
    const restored = { ...g.joseon, [key]: true, met: true };
    const allRestored =
      restored.founding && restored.laws && restored.dagger && restored.dolmen;
    patchEra("joseon", { [key]: true, met: true });
    gameSfx("restore");
    flashJoseon(key);
    setModal(null);
    clearTimeout(nuriTimer.current);
    clearTimeout(nuriReturnTimer.current);
    clearTimeout(nuriSettleTimer.current);
    const target =
      { founding: "65%", laws: "59%", dagger: "49%", dolmen: "30%" }[key] ||
      "65%";
    setNuriMode("worried");
    setNuriWalking(true);
    setNuriPos({ left: target, bottom: "-4%" });
    gameSfx("step");
    nuriTimer.current = setTimeout(() => {
      setNuriWalking(false);
      setNuriMode("happy");
      Array.isArray(text) ? converse(text) : say(text, left, top);
    }, 1250);
    const dialogueDelay = Array.isArray(text) ? 5650 : 4200;
    nuriReturnTimer.current = setTimeout(() => {
      setNuriWalking(true);
      setNuriPos(
        allRestored
          ? { left: "51%", bottom: "-4%" }
          : { left: "78%", bottom: "-4%" },
      );
      gameSfx("step");
    }, dialogueDelay);
    nuriSettleTimer.current = setTimeout(() => {
      setNuriWalking(false);
      setNuriMode(allRestored ? "happy" : "worried");
      if (allRestored) setModal({ type: "joseonFinal" });
    }, dialogueDelay + 1350);
  };
  const followChildToHut = () => {
    clearTimeout(moveTimer.current);
    clearTimeout(bubbleTimer.current);
    clearTimeout(axeRevealTimer.current);
    setModal(null);
    setBubble(null);
    setSpeech("");
    converse([
      {
        speaker: "npc",
        text: "나는 하루야. 막집 앞에서 곤란한 일이 생겼어.",
        left: "20%",
        top: "54%",
      },
      {
        speaker: "hero",
        text: "무슨 일인지 같이 보러 가자!",
        left: "39%",
        top: "73%",
      },
    ]);
    moveTimer.current = setTimeout(() => {
      setBubble(null);
      setFollowingChild(true);
      setWalking(true);
      gameSfx("step");
      setHeroPos({ left: "48%", bottom: "-2%" });
      moveTimer.current = setTimeout(() => {
        setFollowingChild(false);
        setWalking(false);
        patchEra("old", { met: true, axeShown: false });
        converse([
          {
            speaker: "npc",
            text: "이 열매 껍질이 너무 단단해서 먹을 수가 없어.",
            left: "73%",
            top: "58%",
          },
          {
            speaker: "hero",
            text: "근처에 쓸 만한 도구가 있는지 살펴볼게.",
            left: "54%",
            top: "75%",
          },
        ]);
        axeRevealTimer.current = setTimeout(() => {
          patchEra("old", { axeShown: true });
          gameSfx("discovery");
          flashOld("axe");
        }, 3650);
      }, 1500);
    }, 4600);
  };
  const observe = (key, lines, left, top, sound, speaker = "hero") => {
    const n = (ambientCount.current[key] || 0) + 1;
    ambientCount.current[key] = n;
    if (sound) gameSfx(sound);
    say(lines[(n - 1) % lines.length], left, top, speaker);
  };
  const discoverLife = (
    eraId,
    key,
    { title, first, repeat, left, top, sound },
  ) => {
    const token = `${eraId}:${key}`;
    const found = Boolean(lifeExploration[eraId]?.[key]);
    const n = (explorationCount.current[token] || 0) + 1;
    explorationCount.current[token] = n;
    if (sound) gameSfx(sound);
    if (found) {
      const line = repeat[(n - 1) % repeat.length];
      typeof line === "string"
        ? say(line, left, top)
        : say(
            line.text,
            line.left || left,
            line.top || top,
            line.speaker || "hero",
          );
      return;
    }
    setG((s) => {
      const nextEraExplore = {
        ...emptyLifeExploration[eraId],
        ...(s.explore?.[eraId] || {}),
        [key]: true,
      };
      const next = {
        ...s,
        explore: { ...(s.explore || {}), [eraId]: nextEraExplore },
      };
      if (eraId === "old") {
        const coreDone =
          countCompleted([
            s.old.wall,
            s.old.hunt,
            s.old.shelter,
            s.old.axe && s.old.food,
          ]) === 4;
        const explorationDone = lifeExplorationEntries.old.every(
          (item) => nextEraExplore[item.id],
        );
        if (coreDone && explorationDone)
          next.old = { ...s.old, rewardReady: true };
      }
      return next;
    });
    clearTimeout(exploreFlashTimer.current);
    clearTimeout(exploreNoticeTimer.current);
    clearTimeout(exploreSoundTimer.current);
    setLifeExploreFlash(token);
    setExploreNotice({
      title,
      count: (lifeExplorationCounts[eraId] || 0) + 1,
      era: eras.find((item) => item.id === eraId)?.name || "",
    });
    Array.isArray(first) ? converse(first) : say(first, left, top);
    exploreSoundTimer.current = setTimeout(() => gameSfx("discovery"), 170);
    exploreFlashTimer.current = setTimeout(() => setLifeExploreFlash(""), 1350);
    exploreNoticeTimer.current = setTimeout(() => setExploreNotice(null), 2700);
  };
  function complete(id, item) {
    gameSfx("gear");
    setG((s) => ({
      ...s,
      completed: [...new Set([...s.completed, id])],
      evidence: [...new Set([...s.evidence, evidenceNotes[id]])],
      unlocked: Math.max(s.unlocked, eras.findIndex((e) => e.id === id) + 1),
    }));
    setModal({ type: "clear", id, item });
  }
  function advance(id) {
    const i = eras.findIndex((e) => e.id === id);
    setModal(null);
    if (i === eras.length - 1) {
      gameSfx("warp");
      setReturning(true);
      setSpeech("네 개의 시간 톱니가 맞물렸어. 교실로 돌아간다!");
      returnTimer.current = setTimeout(() => {
        gameSfx("coordinate");
        setG((s) => ({ ...s, ending: true }));
      }, 2400);
      return;
    }
    const next = eras[i + 1];
    setHeroPos({ left: "3%", bottom: "-2%" }, next.id);
    if (next.id === "new") {
      setNewChildPos({ left: "79.5%", bottom: "-2.5%" });
      setNewChildWalking(false);
    }
    if (next.id === "bronze") {
      setMaruMode("worried");
      setMaruPos({ left: "62%", bottom: "-3%" });
    }
    if (next.id === "joseon") {
      setNuriMode("worried");
      setNuriPos({ left: "78%", bottom: "-4%" });
      setNuriWalking(false);
    }
    setG((s) => ({ ...s, route: next.id }));
    setSpeech(`시간 톱니가 빛나더니 주변 풍경이 ${next.name}로 바뀌었어.`);
    setModal({ type: "arrival", id: next.id });
  }

  function oldAction(id) {
    if (oldRewardReady && (id === "person" || id === "food")) {
      setModal({ type: "oldReward" });
      return;
    }
    if (id === "tinder" && g.old.tinder)
      return say(
        "마른 나뭇가지는 이미 챙겼어. 이제 가까운 모닥불에 불을 붙일 수 있어.",
        "25%",
        "57%",
      );
    if (id === "axe" && g.old.food)
      return say(
        "주먹 도끼로 단단한 열매를 깨서 아이를 도와줬어.",
        "84%",
        "61%",
      );
    if (id === "fire" && g.old.fire)
      return discoverLife("old", "fire", {
        title: "불의 쓰임",
        first: "가까이 오니까 따뜻해. 밤에는 짐승도 쉽게 다가오지 못했겠어.",
        repeat: [
          "타닥타닥 소리를 듣고 있으니 마음까지 따뜻해지는 것 같아.",
          "너무 가까이 가면 뜨거우니까 이쯤에서 봐야겠다.",
        ],
        left: "30%",
        top: "56%",
        sound: null,
      });
    if (id === "wall" && g.old.wall)
      return say("벽화의 잘못된 장면은 이미 바로잡았어.", "16%", "31%");
    if (id === "person" && g.old.met)
      return g.old.food
        ? observe(
            "old-person-helped",
            [
              "고마워! 단단한 열매를 함께 나눠 먹으니 정말 맛있어.",
              "이제 열매 걱정은 없어. 아직 못 본 생활 흔적도 같이 찾아보자!",
            ],
            "75%",
            "61%",
            "basket",
            "npc",
          )
        : observe(
            "old-person",
            [
              "저 단단한 열매를 먹고 싶은데 손으로는 안 깨져.",
              "막집 앞의 날카로운 돌 도구를 한번 살펴봐 줄래?",
            ],
            "75%",
            "61%",
            "rustle",
            "npc",
          );
    if (id === "hunt" && g.old.hunt)
      return say(
        "구석기 사람들이 힘을 합쳐 사냥했다는 기록은 이미 복구했어.",
        "39%",
        "43%",
      );
    if (id === "shelter" && g.old.shelter)
      return say(
        "먹을거리를 따라 이동하며 동굴과 막집에서 생활했다는 기록은 이미 복구했어.",
        "82%",
        "39%",
      );
    if (id === "food" && g.old.food)
      return say(
        "주먹 도끼로 단단한 열매 껍질을 깨서 아이를 도와줬어.",
        "62%",
        "72%",
      );
    if (id === "tinder") {
      patchEra("old", { tinder: true });
      collectTool("마른 나뭇가지");
      return say(
        "마른 나뭇가지를 챙겼어. 가까운 불에 붙이면 동굴을 밝힐 수 있겠다.",
        "25%",
        "59%",
      );
    }
    if (id === "axe") {
      if (!g.old.met)
        return say(
          "막집 앞에 놓인 뗀석기야. 주인이 있는 물건인지 먼저 살펴봐야겠어.",
          "84%",
          "61%",
        );
      setModal({ type: "axeUse" });
      return;
    }
    if (id === "fire") {
      if (!g.old.tinder)
        return say(
          "불은 있지만 들고 갈 나뭇가지가 없어. 모닥불 옆을 살펴보자.",
          "30%",
          "55%",
        );
      patchEra("old", { fire: true });
      collectTool("횃불");
      clearTimeout(moveTimer.current);
      clearTimeout(bubbleTimer.current);
      setBubble(null);
      setSpeech("");
      gameSfx("step");
      setWalking(true);
      setHeroPos({ left: "2%", bottom: "-1%" });
      moveTimer.current = setTimeout(() => {
        setWalking(false);
        say(
          "횃불을 들고 동굴 입구까지 왔어. 이제 안쪽 벽을 비춰 보자.",
          "17%",
          "43%",
        );
      }, 1650);
      return;
    }
    if (id === "wall") {
      if (!g.old.fire)
        return say("동굴 안쪽은 너무 어두워서 보이지 않는다.", "16%", "31%");
      setModal({ type: "wall" });
      return;
    }
    if (id === "person") {
      followChildToHut();
      return;
    }
    if (id === "hunt") {
      if (oldStep !== "hunt")
        return say(
          g.old.wall && !g.old.met
            ? "동굴에서 나온 아이가 긴 사냥 도구를 힐끗 바라봤어."
            : "끝에 날카로운 돌을 묶은 긴 사냥 도구가 여러 개 기대어 있어.",
          "36%",
          "43%",
        );
      setModal({ type: "oldHunt" });
      return;
    }
    if (id === "shelter") {
      if (oldStep !== "shelter")
        return say(
          "가죽을 덮은 막집이야. 사냥 도구의 기록부터 이어야 안쪽 흔적이 보일 것 같아.",
          "82%",
          "39%",
        );
      setModal({ type: "oldShelter" });
      return;
    }
    if (id === "food") {
      if (!g.old.met)
        return say(
          "단단한 껍질의 열매가 담겨 있어. 누가 모아 둔 걸까?",
          "62%",
          "72%",
        );
      return say("내가 모은 열매야. 손으로는 안 열려.", "66%", "64%", "npc");
    }
  }
  function newAction(id, part = "") {
    if (id === "child") {
      if (!g.new.met) {
        return beginEraMeeting("new");
      }
      if (g.new.pot) {
        if (newExplorationCount === 3) return setModal({ type: "newReward" });
        return say(
          "토기는 완성됐어. 그런데 마을에서 아직 못 본 생활 흔적이 있는 것 같아.",
          "87%",
          "61%",
          "npc",
        );
      }
      const lines = [
        "토기 조각의 무늬가 마을 도구와 같은 빛을 내고 있어.",
        "무늬 한 줄이 돌아왔어! 깨진 자리가 좀 줄었어.",
        "이제 두 줄이 이어졌어. 토기가 조금씩 원래 모습을 찾고 있어.",
        "세 줄의 무늬가 모두 돌아왔어. 토기 안에 무언가 여전히 빛나!",
      ];
      return say(lines[newSolvedCount], "87%", "61%", "npc");
    }
    if (id === "net" && g.new.net)
      return say("돌그물추의 기록은 이미 복구했어.", "68%", "73%");
    if (id === "grain" && g.new.grain)
      return say("갈판과 갈돌의 기록은 이미 복구했어.", "35%", "71%");
    if (id === "spin" && g.new.spin >= 3)
      return say(
        "이 도구의 기록은 이미 복구했어.",
        part === "needle" ? "53%" : "44%",
        part === "needle" ? "65%" : "63%",
      );
    if (id !== "pot" && newStep !== id) {
      const locked = {
        net: "그물 아래에 작은 돌들이 매달려 있어. 다온과 먼저 이야기해 보자.",
        grain: "갈판 위에 곡식이 남아 있지만 토기 조각은 아직 반응하지 않아.",
        spin: "실과 바늘이 가지런히 놓여 있어. 앞의 무늬가 이어지면 살펴보자.",
      }[id];
      return say(
        locked,
        id === "net"
          ? "68%"
          : id === "grain"
            ? "35%"
            : part === "needle"
              ? "53%"
              : "44%",
        id === "net" ? "73%" : id === "grain" ? "71%" : "64%",
      );
    }
    if (id === "net") return setModal({ type: "newNet" });
    if (id === "grain") return setModal({ type: "newGrain" });
    if (id === "spin") return setModal({ type: "newSpin" });
    if (id === "pot") {
      if (g.completed.includes("new"))
        return say(
          "신석기 생활 기록 4/4 완료. 빗살무늬 토기가 모두 복구됐어.",
          "13%",
          "72%",
        );
      if (g.new.pot)
        return newExplorationCount === 3
          ? setModal({ type: "newReward" })
          : say(
              "토기는 완성됐어. 마을에서 아직 못 본 생활 흔적도 찾아보자.",
              "13%",
              "72%",
            );
      if (!(g.new.net && g.new.grain && g.new.spin >= 3))
        return say(
          `토기 무늬 복구 ${newProgressCount}/4. 아직 비어 있는 무늬가 있어.`,
          "13%",
          "72%",
        );
      setModal({ type: "newLife" });
    }
  }
  function bronzeAction(id) {
    if (id === "knife" && g.bronze.knife)
      return say("이 도구의 기록은 이미 복구했어.", "86%", "61%");
    if (id === "mirror" && g.bronze.mirror)
      return say("청동 거울의 기록은 이미 복구했어.", "28%", "28%");
    if (id === "bell" && g.bronze.bell)
      return say("청동 방울의 기록은 이미 복구했어.", "68%", "24%");
    if (id === "dolmen" && g.bronze.dolmen)
      return say("고인돌과 지배자의 기록은 이미 복구했어.", "21%", "25%");
    if (id !== "store" && bronzeStepKey !== id) {
      const locked = {
        knife: "반달 모양의 돌 도구가 곡식밭 가까이에 놓여 있어.",
        mirror: "거울 표면이 반짝였지만 아직 창고 표식은 반응하지 않아.",
        bell: "방울이 살짝 흔들렸어. 먼저 거울에 남은 기록을 확인하자.",
        dolmen:
          "커다란 돌무덤이 마을을 내려다보고 있어. 청동 방울의 기록과 이어질 것 같아.",
      }[id];
      return say(
        locked,
        id === "knife"
          ? "86%"
          : id === "mirror"
            ? "28%"
            : id === "bell"
              ? "68%"
              : "21%",
        id === "knife"
          ? "61%"
          : id === "mirror"
            ? "28%"
            : id === "bell"
              ? "24%"
              : "25%",
      );
    }
    if (id === "knife") return setModal({ type: "bronzeKnife" });
    if (id === "mirror") return setModal({ type: "bronzeMirror" });
    if (id === "bell") return setModal({ type: "bronzeBell" });
    if (id === "dolmen") return setModal({ type: "bronzeDolmen" });
    if (id === "store") {
      if (g.completed.includes("bronze"))
        return say(
          "청동기 핵심 기록 4/4 완료. 창고 문도 활짝 열려 있어.",
          "88%",
          "24%",
        );
      if (g.bronze.final)
        return bronzeExplorationCount === 3
          ? setModal({ type: "bronzeReward" })
          : say(
              "창고 기록은 돌아왔어. 마을을 조금만 더 둘러볼까?",
              "88%",
              "24%",
              "npc",
            );
      if (!(
        g.bronze.knife &&
        g.bronze.mirror &&
        g.bronze.bell &&
        g.bronze.dolmen
      ))
        return say(
          `청동기 핵심 기록 ${bronzeProgressCount}/4. 아직 확인하지 않은 유물이 있어.`,
          "88%",
          "24%",
        );
      setModal({ type: "bronzeCause" });
    }
  }
  function joseonAction(id) {
    if (id === "nuri") {
      if (!g.joseon.met) {
        return beginEraMeeting("joseon");
      }
      if (g.joseon.final) {
        if (joseonExplorationCount === 3)
          return setModal({ type: "joseonReward" });
        return say(
          "나라 기록은 완성됐어. 주변에 남은 생활 모습도 확인해 보자.",
          "82%",
          "61%",
          "npc",
        );
      }
      if (g.joseon.founding) {
        if (!g.joseon.laws)
          return say(
            "두 번째 단서는 내가 아니라, 내 왼쪽 아래에 세워진 나무판에 있어.",
            "70%",
            "57%",
            "npc",
          );
        if (joseonSolvedCount === 3) {
          if (!g.joseon.dagger)
            return say(
              "누리의 시선이 흙바닥에서 반짝이는 청동검에 멈췄어.",
              "53%",
              "54%",
            );
          if (!g.joseon.dolmen)
            return say(
              "누리가 왼쪽의 커다란 돌무덤을 올려다보고 있어.",
              "28%",
              "48%",
            );
        }
        return say(
          "맞춰진 건국 이야기 조각이 이제 흔들리지 않아.",
          "82%",
          "61%",
          "npc",
        );
      }
      return setModal({ type: "joseonFounding" });
    }
    if (id === "laws" && g.joseon.laws)
      return say("8조법의 기록은 이미 복구했어.", "69%", "58%");
    if (id === "dagger" && g.joseon.dagger)
      return say("비파형 동검의 기록은 이미 복구했어.", "50%", "55%");
    if (id === "dolmen" && g.joseon.dolmen)
      return say("탁자식 고인돌의 기록은 이미 복구했어.", "27%", "52%");
    if (id !== "record" && joseonStep !== id) {
      const locked = {
        laws: "나무 조각에 법의 흔적이 보여. 먼저 누리가 주운 이야기 조각을 맞춰 보자.",
        dagger:
          "흙 사이에서 청동빛이 반짝여. 법의 기록이 이어지면 자세히 볼 수 있겠어.",
        dolmen:
          "왼쪽의 커다란 돌무덤이 눈에 띄어. 청동검의 기록과 이어질지도 몰라.",
      }[id];
      return say(
        locked,
        id === "laws" ? "69%" : id === "dagger" ? "50%" : "27%",
        id === "laws" ? "58%" : id === "dagger" ? "55%" : "52%",
      );
    }
    if (id === "laws") {
      setLaws(["", "", ""]);
      return setModal({ type: "joseonLaws" });
    }
    if (id === "dagger") return setModal({ type: "joseonDagger" });
    if (id === "dolmen") return setModal({ type: "joseonDolmen" });
    if (id === "record") {
      if (g.completed.includes("joseon"))
        return say(
          "고조선 핵심 기록 4/4 완료. 푸른 균열도 사라졌어.",
          "49%",
          "79%",
        );
      if (g.joseon.final)
        return joseonExplorationCount === 3
          ? setModal({ type: "joseonReward" })
          : say(
              "나라 기록은 완성됐어. 주변에 남은 생활 모습도 확인해 보자.",
              "49%",
              "79%",
              "npc",
            );
      if (joseonSolvedCount === 3) {
        if (!g.joseon.founding) return setModal({ type: "joseonFounding" });
        if (!g.joseon.laws) {
          setLaws(["", "", ""]);
          return setModal({ type: "joseonLaws" });
        }
        if (!g.joseon.dagger) return setModal({ type: "joseonDagger" });
        if (!g.joseon.dolmen) return setModal({ type: "joseonDolmen" });
      }
      if (joseonSolvedCount < 4)
        return say(
          `고조선 핵심 기록 ${joseonSolvedCount}/4. 균열의 빛이 아직 불안정해.`,
          "49%",
          "79%",
        );
      return setModal({ type: "joseonFinal" });
    }
  }
  const reset = () => {
    localStorage.removeItem(KEY);
    location.reload();
  };

  if (g.ending)
    return (
      <ReturnClassroom
        g={g}
        setG={setG}
        reset={reset}
        onReplayIntro={onReplayIntro}
      />
    );
  if (returning) return <ReturnTravelEffect scene={era.bg} />;
  return (
    <div
      className={`chain-game era-${g.route} ${walking || meetingId ? "is-walking" : ""} ${bubble ? "is-dialogue" : ""} ${bubble?.speaker === "npc" ? "npc-speaking" : ""} ${scanActive ? "scanning" : ""} ${ritualActive ? "ritual-active" : ""} ${oldRewardReady ? "old-reward-ready" : ""}`}
    >
      <img key={g.route} className="chain-bg" src={era.bg} alt={era.name} />
      {!arriving && (
        <header className="chain-hud">
          <div>
            <small>역사 탐험 중</small>
            <b>{era.name}</b>
          </div>
          <nav aria-label="시대별 복구 진행">
            {eras.map((e, i) => (
              <i
                className={
                  g.completed.includes(e.id)
                    ? "done"
                    : e.id === g.route
                      ? "open"
                      : ""
                }
                key={e.id}
              >
                {g.completed.includes(e.id) ? "✓" : i + 1}
              </i>
            ))}
          </nav>
          <span
            className={`chain-progress-chip ${progressComplete ? "complete" : ""}`}
            aria-label={
              showingLifeProgress
                ? `${era.name} 생활 발견 ${currentLifeCount}/3`
                : `${era.name} 핵심 기록 ${currentProgress}/4`
            }
          >
            <b>{showingLifeProgress ? currentLifeCount : currentProgress}</b>
            <small>{showingLifeProgress ? "/ 3 발견" : "/ 4 복구"}</small>
          </span>
          <button
            className="chain-journal-tab"
            onClick={() => setModal({ type: "journal" })}
          >
            <BookOpen />
            <span>탐험 기록</span>
          </button>
          <button
            className={`chain-hint-tab ${hintOpen ? "open" : ""}`}
            onClick={() => setHintOpen((v) => !v)}
            aria-expanded={hintOpen}
            aria-controls="stage-hint-panel"
          >
            <Lightbulb />
            <span>복구 단서</span>
          </button>
          <button
            className={`chain-look-tab ${scanActive ? "active" : ""}`}
            onClick={startScan}
            aria-label="현재 살펴볼 곳의 단서 표시"
          >
            <Sparkles />
            <span>단서 찾기</span>
          </button>
          {audioControl}
        </header>
      )}
      {!arriving && hintOpen && (
        <section
          id="stage-hint-panel"
          className={`stage-hint-card clue-${hintLevel}`}
          role="dialog"
          aria-label={`복구 단서: ${clueNames[hintLevel - 1]}`}
          aria-live="polite"
        >
          <div className="stage-hint-guide" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="stage-hint-copy">
            <small>복구 단서 · {clueNames[hintLevel - 1]}</small>
            <p>{hintLines[Math.min(hintLevel - 1, hintLines.length - 1)]}</p>
            <div className="stage-hint-actions">
              {hintLevel < 2 && (
                <button onClick={() => setHintLevel(2)}>
                  한 가지 더 생각하기
                </button>
              )}
              <button className="secondary" onClick={() => setHintOpen(false)}>
                접어 두기
              </button>
            </div>
          </div>
        </section>
      )}
      {pickupNotice && (
        <div className="pickup-notice" role="status" aria-live="polite">
          <PackageOpen />
          <span>
            <small>탐험 물건 발견</small>
            <b>{pickupNotice}</b>
          </span>
        </div>
      )}
      {exploreNotice && (
        <div className="old-explore-notice" role="status" aria-live="polite">
          <Sparkles />
          <span>
            <small>
              {exploreNotice.era} 생활 흔적 발견 · {exploreNotice.count}/3
            </small>
            <b>{exploreNotice.title}</b>
          </span>
        </div>
      )}
      {era?.id === "old" && g.old.met && !oldRewardReady && (
        <img
          className={`scene-artifact old-person-pointing ${g.old.food ? "helped" : ""}`}
          src={g.old.food ? paleolithicChild : paleolithicChildPointing}
          alt={
            g.old.food
              ? "열매를 나누어 먹고 편안해진 구석기 시대 아이 하루"
              : "막집 앞에서 열매 바구니를 가리키는 구석기 시대 아이 하루"
          }
        />
      )}
      {era?.id === "old" && (
        <>
          {!g.old.tinder && (
            <>
              <img
                className="scene-artifact old-branch-art"
                src={dryBranchArt}
                alt="모닥불 바로 옆의 마른 나뭇가지"
              />
              <Hit
                c="old-tinder"
                sound="rustle"
                label="모닥불 옆 마른 나뭇가지"
                guided={oldStep === "tinder"}
                onClick={() => moveTo("18%", "-2%", () => oldAction("tinder"))}
              />
            </>
          )}
          {g.old.met &&
            oldAxeVisible &&
            !oldRewardReady &&
            modal?.type !== "oldReward" && (
            <>
              <img
                className={`scene-artifact old-axe-art ${g.old.food ? "solved" : ""}`}
                src={handAxeArt}
                alt="열매 바구니 옆에 놓인 주먹 도끼"
              />
              <Hit
                c={`old-axe ${g.old.food ? "solved" : ""}`}
                sound="stone"
                label="열매 바구니 옆 주먹 도끼"
                guided={oldStep === "axe"}
                onClick={() => moveTo("57%", "-2%", () => oldAction("axe"))}
              />
            </>
          )}
          <Hit
            c={`old-fire old-explore-target life-explore-target ${lifeExploreFlash === "old:fire" ? "discovering" : ""}`}
            sound="fire"
            label="나뭇가지 옆 모닥불"
            guided={
              oldStep === "fire" ||
              (currentStep === "explore" && !oldExploration.fire)
            }
            onClick={() =>
              g.old.fire
                ? oldAction("fire")
                : moveTo("22%", "-2%", () => oldAction("fire"))
            }
          />
          <Hit
            c="old-wall"
            sound="cave"
            label="동굴 안쪽"
            guided={oldStep === "wall"}
            onClick={() =>
              g.old.fire
                ? oldAction("wall")
                : moveTo("4%", "-1%", () => oldAction("wall"))
            }
          />
          {g.old.wall && (
            <>
              <img
                className={`scene-artifact old-person-art ${followingChild ? "following" : g.old.met ? "at-hut" : ""} ${oldRewardReady ? "rewarded" : ""}`}
                src={
                  oldRewardReady
                    ? paleolithicChildReward
                    : g.old.met
                      ? paleolithicChildWorried
                      : paleolithicChild
                }
                alt={
                  oldRewardReady
                    ? "웃으며 시간 톱니를 건네는 구석기 시대 아이"
                    : g.old.met
                      ? "막집 앞에서 걱정하는 구석기 시대 아이"
                      : "동굴에서 나온 구석기 시대 아이"
                }
              />
              <Hit
                c={`old-person ${g.old.met ? "at-hut" : ""} ${oldRewardReady ? "rewarded" : ""}`}
                sound="inspect"
                label={
                  oldRewardReady
                    ? "시간 톱니를 건네는 하루"
                    : "구석기 시대의 아이"
                }
                guided={oldStep === "person"}
                onClick={() =>
                  oldRewardReady
                    ? oldAction("person")
                    : moveTo(g.old.met ? "66%" : "34%", "-2%", () =>
                        oldAction("person"),
                      )
                }
              />
            </>
          )}
          <Hit
            c="old-hide"
            sound="cloth"
            label="동물 가죽으로 덮은 막집"
            guided={oldStep === "shelter"}
            onClick={() => moveTo("70%", "-2%", () => oldAction("shelter"))}
          />
          <Hit
            c="old-food"
            sound="basket"
            label="단단한 열매 바구니"
            guided={oldStep === "axe"}
            onClick={() => moveTo("52%", "-2%", () => oldAction("food"))}
          />
          <Hit
            c="old-spears"
            sound="wood"
            label="사냥 도구"
            guided={oldStep === "hunt"}
            onClick={() => moveTo("34%", "-2%", () => oldAction("hunt"))}
          />
          {oldStep !== "shelter" && (
            <AmbientHit
              c={`old-pelt-detail old-explore-target life-explore-target ${lifeExploreFlash === "old:hide" ? "discovering" : ""} ${currentStep === "explore" && !oldExploration.hide ? "guided" : ""}`}
              label="막집에 걸린 짐승 가죽"
              onClick={() =>
                discoverLife("old", "hide", {
                  title: "짐승 가죽",
                  first:
                    "옷이나 덮개로 사용하면 추운 날에도 몸을 보호할 수 있겠어.",
                  repeat: [
                    "생각보다 두껍고 따뜻해 보여.",
                    "버리는 것 없이 생활에 알뜰하게 이용했구나.",
                  ],
                  left: "91%",
                  top: "42%",
                  sound: "cloth",
                })
              }
            />
          )}
          {g.old.food && (
            <AmbientHit
              c={`old-basket-detail old-explore-target life-explore-target ${lifeExploreFlash === "old:gather" ? "discovering" : ""} ${currentStep === "explore" && !oldExploration.gather ? "guided" : ""}`}
              label="모아 둔 열매 바구니"
              onClick={() =>
                discoverLife("old", "gather", {
                  title: "사냥과 채집",
                  first:
                    "사냥만 한 건 아니구나. 주변에서 열매와 먹을거리도 모았어.",
                  repeat: [
                    "먹을 수 있는 열매와 먹으면 안 되는 열매를 어떻게 구별했을까?",
                    "이제 배가 든든하니 주변을 더 천천히 살펴볼 수 있겠어.",
                  ],
                  left: "57%",
                  top: "76%",
                  sound: "basket",
                })
              }
            />
          )}
          <AmbientHit
            c="old-river"
            label="계곡물"
            onClick={() =>
              observe(
                "old-river",
                [
                  "물이 차갑다! 손이 얼얼해.",
                  "졸졸졸… 물소리를 듣고 있으니 조금 진정돼.",
                  "물 위에 비친 노을이 반짝반짝 흔들려.",
                ],
                "59%",
                "40%",
                "water",
              )
            }
          />
          <AmbientHit
            c="old-sunset"
            label="산 너머 노을"
            onClick={() =>
              observe(
                "old-sunset",
                [
                  "해가 산 뒤로 쏙 숨고 있어. 곧 밤이 오겠다.",
                  "노을빛이 하늘을 불처럼 물들였어.",
                ],
                "50%",
                "25%",
                "wind",
              )
            }
          />
          <AmbientHit
            c="old-leaves"
            label="나뭇잎"
            onClick={() =>
              observe(
                "old-leaves",
                [
                  "나뭇잎 사이에서 바스락! 작은 동물이 지나갔나 봐.",
                  "바람이 불자 나뭇잎이 손을 흔드는 것 같아.",
                ],
                "88%",
                "24%",
                "rustle",
              )
            }
          />
          <AmbientHit
            c="old-tracks"
            label="땅 위의 발자국"
            onClick={() =>
              observe(
                "old-tracks",
                [
                  "땅에 사람과 짐승의 발자국이 뒤섞여 있어.",
                  "한 발, 두 발… 앗, 내 발자국도 섞였다!",
                ],
                "45%",
                "58%",
                "step",
              )
            }
          />
          <AmbientHit
            c="old-left-stones"
            label="왼쪽 돌무더기"
            onClick={() =>
              observe(
                "old-left-stones",
                [
                  "울퉁불퉁한 돌이 잔뜩 모여 있어. 발밑 조심!",
                  "이건 주먹 도끼가 아니라 그냥 돌멩이네.",
                ],
                "12%",
                "80%",
                "stone",
              )
            }
          />
          <AmbientHit
            c="old-right-rocks"
            label="오른쪽 바위틈"
            onClick={() =>
              observe(
                "old-right-rocks",
                [
                  "바위틈에서 작은 도마뱀이 쏙 숨었어!",
                  "쉿… 가만히 기다리면 다시 나올지도 몰라.",
                ],
                "91%",
                "78%",
                "cave",
              )
            }
          />
        </>
      )}
      {era?.id === "new" && (
        <>
          <div
            className={`new-pot-memory ${newFlash ? "restoring" : ""} ${g.new.pot ? "complete" : ""}`}
            aria-hidden="true"
          >
            <i className={g.new.net ? "restored" : ""} />
            <i className={g.new.grain ? "restored" : ""} />
            <i className={g.new.spin >= 3 ? "restored" : ""} />
            <i className={g.new.pot ? "restored" : ""} />
          </div>
          <span
            className="neolithic-child-shadow"
            style={{ left: `calc(${newChildPos.left} + 2.5%)` }}
            aria-hidden="true"
          />
          <img
            className={`scene-artifact neolithic-child ${newChildWalking ? "walking" : ""} ${newFlash ? "reacting" : ""} clues-${newSolvedCount}`}
            style={{ left: newChildPos.left, bottom: newChildPos.bottom }}
            src={neolithicChildWorried}
            alt="깨진 토기 조각을 든 신석기 마을 아이 다온"
          />
          <AmbientHit
            c={`new-child-hit ${g.new.pot ? "shifted" : ""} ${newStep === "child" ? "guided" : ""}`}
            label="신석기 마을 아이 다온"
            onClick={() => newAction("child")}
          />
          <Hit
            c={`new-net ${g.new.net ? "solved" : ""} ${newFlash === "net" ? "just-restored" : ""}`}
            sound="rope"
            label="그물과 돌그물추"
            guided={newStep === "net"}
            onClick={() => moveTo("59%", "-2%", () => newAction("net"))}
          />
          <Hit
            c={`new-grain ${g.new.grain ? "solved" : ""} ${newFlash === "grain" ? "just-restored" : ""}`}
            sound="stone"
            label="갈판과 갈돌"
            guided={newStep === "grain"}
            onClick={() => moveTo("28%", "-2%", () => newAction("grain"))}
          />
          <Hit
            c={`new-spin-wheel ${g.new.spin >= 3 ? "solved" : ""} ${newFlash === "spin" ? "just-restored" : ""}`}
            sound="spin"
            label="가락바퀴"
            guided={newStep === "spin"}
            onClick={() =>
              moveTo("40%", "-2%", () => newAction("spin", "wheel"))
            }
          />
          <Hit
            c={`new-spin-needle ${g.new.spin >= 3 ? "solved" : ""} ${newFlash === "spin" ? "just-restored" : ""}`}
            sound="select"
            label="뼈바늘과 실"
            guided={newStep === "spin"}
            onClick={() =>
              moveTo("48%", "-2%", () => newAction("spin", "needle"))
            }
          />
          <Hit
            c={`new-pot ${g.new.pot ? "solved" : ""} ${newFlash === "pot" ? "just-restored" : ""}`}
            sound="pottery"
            label={`빗살무늬 토기, 복구 ${newProgressCount}/4`}
            guided={newStep === "pot"}
            onClick={() => moveTo("7%", "-2%", () => newAction("pot"))}
          />
          <AmbientHit
            c="new-fish-rack"
            label="말리는 물고기"
            onClick={() =>
              observe(
                "new-fish-rack",
                [
                  "물고기가 줄에 나란히 매달려 있어.",
                  "바람이 불자 말리는 물고기들이 살짝 흔들린다.",
                ],
                "8%",
                "29%",
                "rustle",
              )
            }
          />
          <AmbientHit
            c="new-villagers"
            label="마을 사람들"
            onClick={() =>
              observe(
                "new-villagers",
                [
                  "여러 사람이 한곳에 모여 일을 나누고 있어.",
                  "한곳에 오래 머물러 사는 마을인가 봐.",
                ],
                "47%",
                "31%",
                "step",
              )
            }
          />
          <AmbientHit
            c="new-smoke"
            label="움집의 연기"
            onClick={() =>
              observe(
                "new-smoke",
                [
                  "연기가 지붕 위로 몽글몽글 올라간다.",
                  "안에서는 저녁 준비를 하고 있을까?",
                ],
                "23%",
                "20%",
                "fire",
              )
            }
          />
          <AmbientHit
            c="new-reeds"
            label="강가의 갈대"
            onClick={() =>
              observe(
                "new-reeds",
                [
                  "바람이 불 때마다 갈대가 사각사각 흔들려.",
                  "방금 갈대 사이에서 뭔가 움직인 것 같은데?",
                ],
                "20%",
                "50%",
                "rustle",
              )
            }
          />
          <AmbientHit
            c={`new-stone-axe life-explore-target ${lifeExploreFlash === "new:stoneAxe" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.new.stoneAxe ? "guided" : ""}`}
            label="갈아 만든 돌도끼"
            onClick={() =>
              !g.new.met
                ? observe(
                    "new-stone-axe-before",
                    [
                      "돌의 표면이 매끈하게 갈려 있어. 마을 아이와 먼저 이야기해 보자.",
                    ],
                    "91%",
                    "84%",
                    "stone",
                  )
                : discoverLife("new", "stoneAxe", {
                    title: "갈아 만든 돌도끼",
                    first: [
                      {
                        speaker: "npc",
                        text: "이 돌도끼는 표면을 오래 갈아서 만들었어.",
                        left: "87%",
                        top: "72%",
                      },
                      {
                        speaker: "hero",
                        text: "그래서 깨뜨린 돌보다 날이 더 반듯하고 매끈하구나.",
                        left: "72%",
                        top: "82%",
                      },
                    ],
                    repeat: [
                      "손끝으로 만지면 돌 표면이 매끈할 것 같아.",
                      "이만큼 갈려면 팔이 꽤 아팠겠는데?",
                    ],
                    left: "89%",
                    top: "80%",
                    sound: "stone",
                  })
            }
          />
          <AmbientHit
            c="new-harpoon"
            label="뼈로 만든 작살"
            onClick={() =>
              observe(
                "new-harpoon",
                [
                  "뾰족한 가시가 여러 개 달려 있어.",
                  "잡은 물고기가 쉽게 빠져나가지 못하겠어.",
                ],
                "47%",
                "84%",
                "select",
              )
            }
          />
          <AmbientHit
            c="new-river"
            label="강물"
            onClick={() =>
              observe(
                "new-river",
                [
                  "물고기가 방금 물 위로 톡 튀었어!",
                  "내가 잡으려고 하니까 더 멀리 도망갔네.",
                  "햇빛이 물결 위에서 반짝반짝 춤추고 있어.",
                ],
                "51%",
                "47%",
                "water",
              )
            }
          />
          <AmbientHit
            c={`new-houses life-explore-target ${lifeExploreFlash === "new:settlement" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.new.settlement ? "guided" : ""}`}
            label="움집 마을"
            onClick={() =>
              !g.new.met
                ? observe(
                    "new-houses-before",
                    [
                      "움집이 여러 채 모여 있어. 마을 아이에게 먼저 말을 걸어 보자.",
                    ],
                    "48%",
                    "27%",
                    "wind",
                  )
                : discoverLife("new", "settlement", {
                    title: "움집 마을",
                    first: [
                      {
                        speaker: "npc",
                        text: "우리 가족도 저 움집에서 오래 함께 지내.",
                        left: "52%",
                        top: "29%",
                      },
                      {
                        speaker: "hero",
                        text: "농사를 시작하면서 한곳에 머물러 마을을 이루었구나.",
                        left: "44%",
                        top: "40%",
                      },
                    ],
                    repeat: [
                      "움집이 여러 채 모여 있으니까 혼자 사는 곳은 아닌 것 같아.",
                      "저 집 굴뚝에서는 저녁 냄새가 나는 것 같아.",
                    ],
                    left: "48%",
                    top: "29%",
                    sound: "wood",
                  })
            }
          />
          <AmbientHit
            c="new-crops"
            label="곡식밭"
            onClick={() =>
              observe(
                "new-crops",
                [
                  "조와 기장 같은 곡식이 자라고 있어.",
                  "곡식들이 바람에 맞춰 흔들흔들 춤을 춘다.",
                ],
                "89%",
                "58%",
                "rustle",
              )
            }
          />
          <AmbientHit
            c="new-shell"
            label="조개껍데기"
            onClick={() =>
              observe(
                "new-shell",
                [
                  "귀에 대면 바다 소리가 들릴까?",
                  "음… 파도 소리보다 내 숨소리가 더 크게 들려.",
                ],
                "31%",
                "88%",
                "water",
              )
            }
          />
          <AmbientHit
            c={`new-raft life-explore-target ${lifeExploreFlash === "new:riverside" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.new.riverside ? "guided" : ""}`}
            label="강가의 나무배"
            onClick={() =>
              !g.new.met
                ? observe(
                    "new-raft-before",
                    [
                      "강가에 작은 나무배가 묶여 있어. 마을 아이에게 먼저 물어볼까?",
                    ],
                    "8%",
                    "49%",
                    "water",
                  )
                : discoverLife("new", "riverside", {
                    title: "강가의 생활",
                    first: [
                      {
                        speaker: "npc",
                        text: "저 배를 타고 강으로 나가 물고기를 잡기도 해.",
                        left: "13%",
                        top: "48%",
                      },
                      {
                        speaker: "hero",
                        text: "강가에 마을을 이루면 물과 먹을거리를 함께 구할 수 있겠네.",
                        left: "24%",
                        top: "58%",
                      },
                    ],
                    repeat: [
                      "저 배에 타면 강 건너편까지 갈 수 있을까?",
                      "물살이 세질 때는 단단히 묶어 둬야겠어.",
                    ],
                    left: "10%",
                    top: "49%",
                    sound: "water",
                  })
            }
          />
          <AmbientHit
            c="new-stones"
            label="토기 주변 작은 돌"
            onClick={() =>
              observe(
                "new-stones",
                [
                  "반짝이는 돌인 줄 알았는데 평범한 돌멩이네.",
                  "그래도 주머니에 하나 넣고 싶다.",
                ],
                "22%",
                "92%",
                "stone",
              )
            }
          />
        </>
      )}
      {era?.id === "bronze" && (
        <>
          <div
            className={`bronze-maru ${maruMode} ${maruWalking ? "walking" : ""}`}
            style={{ left: maruPos.left, bottom: maruPos.bottom }}
          >
            <img
              src={
                maruMode === "harvest" ? bronzeMaruHarvest : bronzeMaruWorried
              }
              alt={
                maruMode === "harvest"
                  ? "곡식을 수확하는 마루"
                  : "청동기 시대 아이 마루"
              }
            />
          </div>
          <AmbientHit
            c={`bronze-maru-hit ${g.bronze.knife ? "harvest" : ""}`}
            label="청동기 시대 아이 마루"
            onClick={() =>
              g.bronze.final
                ? bronzeExplorationCount === 3
                  ? setModal({ type: "bronzeReward" })
                  : say(
                      "창고 기록은 돌아왔어. 마을을 조금만 더 둘러볼까?",
                      "84%",
                      "62%",
                      "npc",
                    )
                : g.bronze.knife
                  ? observe(
                      "maru-done",
                      [
                        "이제 이삭 거두는 법을 알겠어!",
                        "이 이삭 정말 잘 익었지?",
                      ],
                      "84%",
                      "62%",
                      "rustle",
                      "npc",
                    )
                  : observe(
                      "maru-worried",
                      [
                        "수확에 쓸 도구를 아직 고르지 못했어.",
                        "곡식밭에 맞는 도구가 이 근처에 있을 텐데…",
                      ],
                      "69%",
                      "62%",
                      "inspect",
                      "npc",
                    )
            }
          />
          <Hit
            c={`bronze-knife ${g.bronze.knife ? "solved" : ""} ${bronzeFlash === "knife" ? "just-restored" : ""}`}
            sound="rustle"
            label="반달 돌칼"
            guided={bronzeStepKey === "knife"}
            onClick={() => moveTo("77%", "-2%", () => bronzeAction("knife"))}
          />
          <Hit
            c={`bronze-mirror ${g.bronze.mirror ? "solved" : ""} ${bronzeFlash === "mirror" ? "just-restored" : ""}`}
            sound="metal"
            label="청동 거울"
            guided={bronzeStepKey === "mirror"}
            onClick={() => moveTo("25%", "-2%", () => bronzeAction("mirror"))}
          />
          <Hit
            c={`bronze-bell ${g.bronze.bell ? "solved" : ""} ${bronzeFlash === "bell" ? "just-restored" : ""}`}
            sound="bell"
            label="청동 방울"
            guided={bronzeStepKey === "bell"}
            onClick={() => moveTo("61%", "-2%", () => bronzeAction("bell"))}
          />
          <Hit
            c={`bronze-dolmen ${g.bronze.dolmen ? "solved" : ""} ${bronzeFlash === "dolmen" ? "just-restored" : ""}`}
            sound="heavy-stone"
            label="고인돌"
            guided={bronzeStepKey === "dolmen"}
            onClick={() => moveTo("15%", "-2%", () => bronzeAction("dolmen"))}
          />
          <Hit
            c={`bronze-store ${g.bronze.knife && g.bronze.mirror && g.bronze.bell && g.bronze.dolmen ? "ready" : ""}`}
            sound="wood"
            label="곡식 창고"
            guided={bronzeStepKey === "store"}
            onClick={() => moveTo("82%", "-2%", () => bronzeAction("store"))}
          />
          <AmbientHit
            c={`bronze-field life-explore-target ${lifeExploreFlash === "bronze:harvest" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.bronze.harvest ? "guided" : ""}`}
            label="곡식단"
            onClick={() =>
              !g.bronze.met
                ? observe(
                    "bronze-field-before",
                    [
                      "곡식 이삭이 황금빛으로 익었어. 곡식밭의 아이와 먼저 이야기해 보자.",
                    ],
                    "77%",
                    "53%",
                    "rustle",
                  )
                : discoverLife("bronze", "harvest", {
                    title: "발달한 농사",
                    first: [
                      {
                        speaker: "npc",
                        text: "올해는 이삭이 많이 여물었어.",
                        left: "80%",
                        top: "49%",
                      },
                      {
                        speaker: "hero",
                        text: "농사가 발달하니 거두는 곡식도 늘었겠어.",
                        left: "67%",
                        top: "62%",
                      },
                    ],
                    repeat: [
                      "이삭을 가까이에서 보니까 알갱이가 꽉 차 있어.",
                      "한 줌만 들었는데 생각보다 묵직하다!",
                    ],
                    left: "77%",
                    top: "53%",
                    sound: "rustle",
                  })
            }
          />
          <AmbientHit
            c={`bronze-pots life-explore-target ${lifeExploreFlash === "bronze:plainPottery" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.bronze.plainPottery ? "guided" : ""}`}
            label="민무늬 토기"
            onClick={() =>
              !g.bronze.met
                ? observe(
                    "bronze-pots-before",
                    [
                      "겉면에 무늬가 거의 없는 토기가 놓여 있어. 마을 아이와 먼저 이야기해 보자.",
                    ],
                    "12%",
                    "69%",
                    "pottery",
                  )
                : discoverLife("bronze", "plainPottery", {
                    title: "민무늬 토기",
                    first: [
                      {
                        speaker: "npc",
                        text: "이 토기는 겉면에 무늬가 거의 없어.",
                        left: "14%",
                        top: "66%",
                      },
                      {
                        speaker: "hero",
                        text: "청동기 시대의 민무늬 토기구나.",
                        left: "25%",
                        top: "77%",
                      },
                    ],
                    repeat: [
                      "토기 안에서 내 목소리가 웅웅 울려.",
                      "곡식을 가득 담으면 혼자 들기 어렵겠어.",
                    ],
                    left: "12%",
                    top: "69%",
                    sound: "pottery",
                  })
            }
          />
          <AmbientHit
            c="bronze-smoke"
            label="움집 연기"
            onClick={() =>
              observe(
                "bronze-smoke",
                [
                  "연기가 구름처럼 몽글몽글 올라간다.",
                  "저녁밥 냄새가 나는 것 같기도 하고?",
                ],
                "47%",
                "33%",
                "wind",
              )
            }
          />
          <AmbientHit
            c="bronze-small-rocks"
            label="고인돌 주변 작은 돌"
            onClick={() =>
              observe(
                "bronze-rocks",
                [
                  "이 돌은 내가 옮길 수 있겠는데?",
                  "큰 돌은… 보는 것만으로도 허리가 아파.",
                ],
                "21%",
                "35%",
                "stone",
              )
            }
          />
          <AmbientHit
            c="bronze-sacks"
            label="곡식 창고 자루"
            onClick={() =>
              observe(
                "bronze-sacks",
                [
                  "곡식이 이렇게 많이 쌓여 있어.",
                  "한 자루쯤 없어져도 모를 것 같지만… 그러면 안 되지!",
                ],
                "93%",
                "39%",
                "basket",
              )
            }
          />
          <AmbientHit
            c="bronze-fire"
            label="화덕"
            onClick={() =>
              observe(
                "bronze-fire",
                [
                  "타닥타닥, 불씨가 춤을 춘다.",
                  "너무 가까이 갔더니 얼굴이 뜨거워!",
                ],
                "59%",
                "53%",
                "fire",
              )
            }
          />
          <AmbientHit
            c="bronze-people"
            label="마을 사람들"
            onClick={() =>
              observe(
                "bronze-people",
                [
                  "모두 수확 준비로 바빠 보여.",
                  "나만 가만히 서 있는 것 같아 조금 눈치 보이네.",
                ],
                "71%",
                "47%",
                "step",
              )
            }
          />
          <AmbientHit
            c="bronze-river"
            label="강물"
            onClick={() =>
              observe(
                "bronze-river",
                [
                  "물이 햇빛을 받아 반짝반짝해.",
                  "물가 쪽 바람은 조금 시원하네.",
                ],
                "8%",
                "47%",
                "water",
              )
            }
          />
          <AmbientHit
            c="bronze-houses"
            label="움집"
            onClick={() =>
              observe(
                "bronze-houses",
                [
                  "움집들이 한곳에 모여 있어.",
                  "마을이 꽤 크네. 길을 잃지 않게 조심해야겠다.",
                ],
                "45%",
                "42%",
                "wood",
              )
            }
          />
          <AmbientHit
            c={`bronze-tools life-explore-target ${lifeExploreFlash === "bronze:woodTools" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.bronze.woodTools ? "guided" : ""}`}
            label="나무 도구"
            onClick={() =>
              !g.bronze.met
                ? observe(
                    "bronze-tools-before",
                    [
                      "나무로 만든 도구가 가지런히 놓여 있어. 곡식밭의 아이에게 먼저 말을 걸어 보자.",
                    ],
                    "54%",
                    "78%",
                    "wood",
                  )
                : discoverLife("bronze", "woodTools", {
                    title: "돌과 나무 도구",
                    first: [
                      {
                        speaker: "npc",
                        text: "청동은 귀해서 이런 생활 도구까지 모두 만들 수는 없어.",
                        left: "59%",
                        top: "70%",
                      },
                      {
                        speaker: "hero",
                        text: "그래서 돌과 나무 도구도 계속 사용했구나.",
                        left: "48%",
                        top: "82%",
                      },
                    ],
                    repeat: [
                      "청동기 시대라고 모든 물건이 반짝이는 청동은 아니구나.",
                      "나무 손잡이는 손에 쥐기 편하게 닳아 있어.",
                    ],
                    left: "54%",
                    top: "78%",
                    sound: "wood",
                  })
            }
          />
        </>
      )}
      {era?.id === "joseon" && (
        <>
          <img
            className="scene-artifact j-dagger-art"
            src={daggerArt}
            alt="배경에 놓인 비파형 동검"
          />
          <span className="joseon-nuri-shadow" aria-hidden="true" />
          <img
            className={`scene-artifact joseon-nuri ${nuriMode} ${nuriWalking ? "walking" : ""}`}
            style={{ left: nuriPos.left, bottom: nuriPos.bottom }}
            src={joseonNuriWorried}
            alt="푸른 시간 균열을 걱정하는 고조선 아이 누리"
          />
          <Hit
            c="j-nuri-hit"
            sound="inspect"
            label="고조선 아이 누리와 건국 이야기 조각"
            guided={joseonStep === "nuri"}
            onClick={() => moveTo("70%", "-2%", () => joseonAction("nuri"))}
          />
          <Hit
            c={`j-law ${g.joseon.laws ? "solved" : ""} ${joseonFlash === "laws" ? "just-restored" : ""}`}
            sound="wood"
            label="화덕 왼쪽 앞의 세워진 8조법 나무판"
            guided={joseonStep === "laws"}
            onClick={() => moveTo("51%", "-2%", () => joseonAction("laws"))}
          />
          <Hit
            c={`j-dagger ${g.joseon.dagger ? "solved" : ""} ${joseonFlash === "dagger" ? "just-restored" : ""}`}
            sound="metal"
            label="비파형 동검"
            guided={joseonStep === "dagger"}
            onClick={() => moveTo("43%", "-2%", () => joseonAction("dagger"))}
          />
          <Hit
            c={`j-dolmen ${g.joseon.dolmen ? "solved" : ""} ${joseonFlash === "dolmen" ? "just-restored" : ""}`}
            sound="heavy-stone"
            label="탁자식 고인돌"
            guided={joseonStep === "dolmen"}
            onClick={() => moveTo("20%", "-2%", () => joseonAction("dolmen"))}
          />
          <Hit
            c={`j-record ${joseonSolvedCount === 4 ? "ready" : ""} ${joseonFlash ? "just-restored" : ""}`}
            sound="stone"
            label={`푸른 시간 균열 ${joseonSolvedCount}/4`}
            guided={joseonStep === "record"}
            onClick={() => moveTo("15%", "-2%", () => joseonAction("record"))}
          />
          <AmbientHit
            c={`j-fort life-explore-target ${lifeExploreFlash === "joseon:fort" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.joseon.fort ? "guided" : ""}`}
            label="성책"
            onClick={() =>
              !g.joseon.met
                ? observe(
                    "j-fort-before",
                    [
                      "마을 둘레에 성책이 길게 이어져 있어. 먼저 마을 아이와 이야기해 보자.",
                    ],
                    "49%",
                    "27%",
                    "wood",
                  )
                : discoverLife("joseon", "fort", {
                    title: "성책 마을",
                    first: [
                      {
                        speaker: "npc",
                        text: "성책 안에는 여러 집과 사람들이 함께 있어.",
                        left: "53%",
                        top: "29%",
                      },
                      {
                        speaker: "hero",
                        text: "여러 마을과 사람을 다스리는 나라로 성장한 흔적이네.",
                        left: "46%",
                        top: "41%",
                      },
                    ],
                    repeat: [
                      "성책 말뚝을 세다가 몇 개인지 잊어버렸어.",
                      "틈 사이로 바람이 휘익— 성책이 휘파람을 부는 것 같아.",
                    ],
                    left: "49%",
                    top: "27%",
                    sound: "wood",
                  })
            }
          />
          <AmbientHit
            c={`j-fields life-explore-target ${lifeExploreFlash === "joseon:farming" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.joseon.farming ? "guided" : ""}`}
            label="농사짓는 사람들"
            onClick={() =>
              !g.joseon.met
                ? observe(
                    "j-fields-before",
                    [
                      "사람들이 곡식을 거두고 있어. 먼저 마을 아이와 이야기해 보자.",
                    ],
                    "18%",
                    "45%",
                    "rustle",
                  )
                : discoverLife("joseon", "farming", {
                    title: "농사와 곡식",
                    first: [
                      {
                        speaker: "npc",
                        text: "마을 사람들이 거둔 곡식을 한데 모으고 있어.",
                        left: "19%",
                        top: "43%",
                      },
                      {
                        speaker: "hero",
                        text: "고조선에서도 농사와 곡식이 중요한 생활 기반이었구나.",
                        left: "30%",
                        top: "56%",
                      },
                    ],
                    repeat: [
                      "볏단 뒤에 숨으면 안 보일 줄 알았는데 발이 다 보여.",
                      "볏짚이 코끝을 간질여서 재채기가 나올 것 같아.",
                    ],
                    left: "18%",
                    top: "45%",
                    sound: "rustle",
                  })
            }
          />
          <AmbientHit
            c={`j-altar life-explore-target ${lifeExploreFlash === "joseon:ritual" ? "discovering" : ""} ${currentStep === "explore" && !lifeExploration.joseon.ritual ? "guided" : ""}`}
            label="제사 터"
            onClick={() =>
              !g.joseon.met
                ? observe(
                    "j-altar-before",
                    [
                      "제사 도구가 놓인 특별한 자리야. 먼저 마을 아이와 이야기해 보자.",
                    ],
                    "82%",
                    "45%",
                    "bell",
                  )
                : moveTo("69%", "-2%", () => {
                    clearTimeout(ritualTimer.current);
                    setRitualActive(true);
                    ritualTimer.current = setTimeout(
                      () => setRitualActive(false),
                      5200,
                    );
                    discoverLife("joseon", "ritual", {
                      title: "제사와 정치",
                      first: [
                        {
                          speaker: "npc",
                          text: "쉿, 지금 하늘에 제사를 지내는 중이야. 방울 소리에 맞춰 함께 고개를 숙여 보자.",
                          left: "83%",
                          top: "42%",
                        },
                        {
                          speaker: "hero",
                          text: "단군왕검은 제사와 나라의 일을 함께 이끄는 지배자였구나.",
                          left: "69%",
                          top: "56%",
                        },
                      ],
                      repeat: [
                        "방울 소리에 맞춰 고개를 숙이니 제사 터가 더 엄숙하게 느껴져.",
                        "불빛에 비친 거울이 반짝여. 특별한 의식에 쓰던 물건인가 봐.",
                      ],
                      left: "82%",
                      top: "45%",
                      sound: "ritual",
                    });
                  })
            }
          />
          {ritualActive && (
            <div className="joseon-ritual-effects" aria-hidden="true">
              <i className="ritual-fire-glow" />
              <i className="ritual-bell-wave wave-one" />
              <i className="ritual-bell-wave wave-two" />
              <span className="ritual-smoke smoke-one" />
              <span className="ritual-smoke smoke-two" />
            </div>
          )}
          <AmbientHit
            c="j-cattle"
            label="소"
            onClick={() =>
              observe(
                "j-cattle",
                [
                  "소가 꼬리로 파리를 쫓다가 내 쪽까지 휙 쳤어!",
                  "음머— 내가 인사하자 소도 대답한 걸까?",
                ],
                "26%",
                "42%",
                "rustle",
              )
            }
          />
          <AmbientHit
            c="j-grain"
            label="곡식단"
            onClick={() =>
              observe(
                "j-grain",
                [
                  "볏단 뒤에 숨으면 아무도 못 찾겠지? …발이 다 보이네.",
                  "한 단만 들어 보려 했는데 생각보다 훨씬 묵직해!",
                ],
                "9%",
                "57%",
                "basket",
              )
            }
          />
          <AmbientHit
            c="j-gate"
            label="마을 문"
            onClick={() =>
              observe(
                "j-gate",
                [
                  "문지기처럼 팔을 벌려 봤더니 사람들이 웃으며 지나가네.",
                  "문을 두드리자 안쪽에서도 똑똑— 누가 따라 했어!",
                ],
                "55%",
                "34%",
                "knock",
              )
            }
          />
          <AmbientHit
            c="j-watch"
            label="망루와 깃발"
            onClick={() =>
              observe(
                "j-watch",
                [
                  "깃발이 펄럭일 때마다 나도 몰래 손을 흔들게 돼.",
                  "저 위에 올라가면 우리 교실까지 보이려나?",
                ],
                "72%",
                "20%",
                "wind",
              )
            }
          />
          <AmbientHit
            c="j-river"
            label="강물"
            onClick={() =>
              observe(
                "j-river",
                [
                  "물에 비친 내 얼굴이 물결 때문에 길쭉해졌다 짧아졌다 해.",
                  "돌을 던져 물수제비를 뜨려다 퐁당 한 번으로 끝났어.",
                ],
                "5%",
                "36%",
                "water",
              )
            }
          />
          <AmbientHit
            c="j-pots"
            label="토기"
            onClick={() =>
              observe(
                "j-pots",
                [
                  "토기에 대고 “안녕?” 하니 웅웅거리는 목소리가 돌아왔어.",
                  "비밀을 속삭여 봤는데 토기가 꽤 입이 무거운걸?",
                ],
                "60%",
                "61%",
                "pottery",
              )
            }
          />
          <AmbientHit
            c="j-fire"
            label="제사 불"
            onClick={() =>
              observe(
                "j-fire",
                [
                  "손을 녹이려다 너무 뜨거워서 얼른 뒤로 물러났어.",
                  "타닥! 불씨가 튀자 누리와 동시에 깜짝 놀랐어.",
                ],
                "76%",
                "55%",
                "fire",
              )
            }
          />
          <AmbientHit
            c="j-tree"
            label="큰 나무"
            onClick={() =>
              observe(
                "j-tree",
                [
                  "잎 한 장이 빙글빙글 돌더니 내 머리 위에 착 내려앉았어.",
                  "나무 뒤에 숨었더니 누리가 금방 찾아냈어.",
                ],
                "93%",
                "30%",
                "rustle",
              )
            }
          />
          <AmbientHit
            c="j-sky"
            label="하늘"
            onClick={() =>
              observe(
                "j-sky",
                [
                  "저 구름은 곰 같고, 그 옆은 마늘 같아 보여. 배가 고픈가?",
                  "구름에게 손을 흔들었더니 바람이 대신 대답해 줬어.",
                ],
                "37%",
                "16%",
                "wind",
              )
            }
          />
        </>
      )}
      <div
        className={`roaming-hero ${arriving ? "arriving" : ""} ${walking ? "walking" : ""} ${bubble?.speaker === "hero" ? "speaking" : ""} ${era?.id === "old" && g.old.fire && !g.old.wall ? "holding-torch" : ""} ${walking && g.old.fire && !g.old.wall ? "torch-walk" : ""} ${followingChild ? "follow-walk" : ""}`}
        style={{ left: heroPos.left, bottom: heroPos.bottom }}
      >
        <img
          src={
            arriving ||
            walking ||
            (era?.id === "bronze" && modal?.type === "arrival")
              ? heroSurprised
              : hero
          }
          alt="주인공"
        />
        {era?.id === "old" && g.old.fire && !g.old.wall && (
          <img className="hero-torch" src={torchArt} alt="손에 든 횃불" />
        )}
      </div>
      {speech && (
        <div
          className={`hero-dialogue-row ${arriving ? "arrival-dialogue" : ""}`}
        >
          <div className="hero-dialogue">{speech}</div>
        </div>
      )}
      {arriving && <div className="arrival-lock" aria-hidden="true" />}
      {bubble && (
        <div
          key={`${bubble.speaker}-${bubble.text}`}
          className={`object-dialogue-row ${bubble.align}`}
          style={{ left: bubble.left, top: bubble.top }}
          aria-live="polite"
        >
          <div
            className={`chain-bubble speaker-${bubble.speaker || "hero"}`}
            role="status"
          >
            {bubble.text}
          </div>
        </div>
      )}
      {intro && (
        <div className="chain-overlay">
          <section className="chain-card intro">
            <small>타임머신 비상 기록</small>
            <h1>네 시대의 기록이 뒤바뀌었다</h1>
            <div className="history-error-list">
              <p>
                <b>구석기</b>
                <span>
                  동굴 벽화에 다른 시대 장면이 섞이고 생활 기록이 끊어졌다.
                </span>
              </p>
              <p>
                <b>신석기</b>
                <span>생활 도구의 쓰임이 서로 바뀌었다.</span>
              </p>
              <p>
                <b>청동기</b>
                <span>도구의 재료와 사회 변화의 순서가 뒤섞였다.</span>
              </p>
              <p>
                <b>고조선</b>
                <span>8조법과 문화유산의 기록이 끊어졌다.</span>
              </p>
            </div>
            <p>
              각 시대의 사물과 유물을 조사해 잘못된 부분을 바로잡아야 교실로
              돌아갈 수 있다.
            </p>
            <VillainNote>
              “틀린 역사를 그대로 믿는 순간,
              <br />
              너는 이곳에 영원히 갇힐 거야.”
            </VillainNote>
            <button
              onClick={() => {
                setIntro(false);
                setSpeech(
                  "구석기 동굴 벽화와 생활 기록이 뒤섞여 있어. 주변의 사물을 살펴보자.",
                );
              }}
            >
              구석기 기록 조사 시작
            </button>
          </section>
        </div>
      )}
      {modal && (
        <Puzzle
          modal={modal}
          close={() => setModal(null)}
          openModal={setModal}
          beginEraMeeting={beginEraMeeting}
          followChildToHut={followChildToHut}
          revealOldChild={revealOldChild}
          g={g}
          laws={laws}
          setLaws={setLaws}
          complete={complete}
          patchEra={patchEra}
          flashNew={flashNew}
          flashOld={flashOld}
          finishBronze={finishBronze}
          finishJoseon={finishJoseon}
          advance={advance}
          setSpeech={setSpeech}
          say={say}
          converse={converse}
        />
      )}
    </div>
  );
}

function Hit({ c, label, guided, sound = "inspect", onClick }) {
  return (
    <button
      type="button"
      className={`chain-hit ${c} ${guided ? "guided" : ""}`}
      data-sfx-manual="true"
      aria-label={label}
      onClick={() => {
        gameSfx(sound);
        onClick();
      }}
    >
      <span>{label}</span>
    </button>
  );
}
function AmbientHit({ c, label, onClick }) {
  return (
    <button
      type="button"
      className={`chain-hit ambient-hit ${c}`}
      data-sfx-manual="true"
      aria-label={label}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
}

function Puzzle({
  modal,
  close,
  openModal,
  beginEraMeeting,
  followChildToHut,
  revealOldChild,
  g,
  laws,
  setLaws,
  complete,
  patchEra,
  flashNew,
  flashOld,
  finishBronze,
  finishJoseon,
  advance,
  setSpeech,
  say,
  converse,
}) {
  const [error, setError] = useState("");
  const [wallChoices, setWallChoices] = useState([]);
  const [axeUses, setAxeUses] = useState([]);
  const [life, setLife] = useState({});
  const [cause, setCause] = useState([]);
  const [choice, setChoice] = useState([]);
  const [single, setSingle] = useState("");
  const [order, setOrder] = useState([]);
  const [netPlacement, setNetPlacement] = useState("");
  const [netUse, setNetUse] = useState("");
  const [grainPlaced, setGrainPlaced] = useState(false);
  const [grainGround, setGrainGround] = useState(false);
  const [grainUse, setGrainUse] = useState("");
  const [potUse, setPotUse] = useState("");
  const [selectedEvidence, setSelectedEvidence] = useState("");
  const [summary, setSummary] = useState({
    nation: "",
    culture: "",
    law: "",
    heritage: "",
    growth: "",
  });
  const [joseonMeaning, setJoseonMeaning] = useState("");
  const [bronzeStep, setBronzeStep] = useState(0);
  const [bronzeTarget, setBronzeTarget] = useState("");
  const [bronzeSweeps, setBronzeSweeps] = useState(0);
  const [bronzeMaterial, setBronzeMaterial] = useState("");
  const [bronzeUse, setBronzeUse] = useState("");
  const [bronzeInference, setBronzeInference] = useState("");
  const [bellRings, setBellRings] = useState(0);
  const [dolmenMoved, setDolmenMoved] = useState(false);
  const [journalEra, setJournalEra] = useState(g.route);
  const errorTurn = useRef(0);
  const toggleChoice = (x) =>
    setChoice((s) => (s.includes(x) ? s.filter((v) => v !== x) : [...s, x]));
  const fail = (message) => {
    const sounds = ["error", "error2", "error3", "error4"];
    gameSfx(sounds[errorTurn.current++ % sounds.length]);
    setError(message);
  };
  const solvedAt = (text, left, top) => {
    close();
    Array.isArray(text) ? converse(text) : say(text, left, top);
  };
  const lawOptions = [
    "사형",
    "곡식으로 갚기",
    "노비로 삼거나 50만 전을 내면 풀어 주기",
  ];
  const oldExploreCount = countCompleted(
    oldExplorationEntries.map((item) => Boolean(g.explore?.old?.[item.id])),
  );
  const newExploreCount = countCompleted(
    lifeExplorationEntries.new.map((item) =>
      Boolean(g.explore?.new?.[item.id]),
    ),
  );
  const bronzeExploreCount = countCompleted(
    lifeExplorationEntries.bronze.map((item) =>
      Boolean(g.explore?.bronze?.[item.id]),
    ),
  );
  const joseonExploreCount = countCompleted(
    lifeExplorationEntries.joseon.map((item) =>
      Boolean(g.explore?.joseon?.[item.id]),
    ),
  );
  const finishOldClue = (key, text, left, top) => {
    const restored = { ...g.old, [key]: true };
    gameSfx("restore");
    flashOld(key);
    if (restored.hunt && restored.shelter && restored.food) {
      const rewardReady = oldExploreCount === 3;
      patchEra("old", { [key]: true, rewardReady });
      solvedAt(
        rewardReady
          ? "핵심 기록과 생활 흔적을 모두 확인했어. 하루가 무언가를 건네려 해."
          : "핵심 기록은 모두 복구했어. 탐험 기록에 아직 빈 생활 흔적이 남아 있어.",
        rewardReady ? "75%" : "52%",
        rewardReady ? "61%" : "48%",
      );
      return;
    }
    patchEra("old", { [key]: true });
    solvedAt(text, left, top);
  };
  const finishNewClue = (key, value, text, left, top) => {
    patchEra("new", { [key]: value });
    gameSfx("restore");
    flashNew(key);
    solvedAt(text, left, top);
  };
  if (modal.type === "arrival") {
    const b = eraBriefings[modal.id];
    const start = () => beginEraMeeting(modal.id);
    return (
      <Box close={start}>
        <small>{eras.find((e) => e.id === modal.id)?.name} 도착</small>
        <h2>{b.title}</h2>
        <button className="puzzle-main" onClick={start}>
          {b.button}
        </button>
      </Box>
    );
  }
  if (modal.type === "newNet") {
    const uses = [
      "곡식을 갈아 가루로 만들었다",
      "그물을 물속에 가라앉혀 물고기를 잡는 데 사용했다",
      "실을 뽑아 옷을 만들었다",
    ];
    const check = () =>
      netPlacement === "아랫부분" && netUse === uses[1]
        ? finishNewClue(
            "net",
            true,
            [
              {
                speaker: "npc",
                text: "봐! 토기의 빈 무늬가 반짝여!",
                left: "83%",
                top: "60%",
              },
              {
                speaker: "hero",
                text: "좋아, 제대로 찾았나 봐!",
                left: "65%",
                top: "75%",
              },
            ],
            "68%",
            "73%",
          )
        : fail(
            netPlacement !== "아랫부분"
              ? "그물이 물 위로 떠오르지 않으려면 돌을 어느 쪽에 달아야 할까?"
              : "물속에 가라앉힌 그물로 무엇을 잡았을지 다시 생각해 봐.",
          );
    return (
      <Box
        close={close}
        investigate="돌그물추를 조사하는 중..."
        compact="new-puzzle"
      >
        <InspectPuzzle
          scene={neolithicNetCloseup}
          focus="new-isolated"
          badge="돌그물추"
          caption="구멍이 나거나 끈에 묶인 여러 돌이 그물과 함께 놓여 있다."
          thought="돌들이 그물에서 떨어져 있어. 그물이 물속에 가라앉도록 돌그물추를 달 위치를 고르고, 쓰임도 연결해 보자."
        >
          <div className="net-placement">
            <span>그물</span>
            <button
              className={netPlacement === "윗부분" ? "on" : ""}
              onClick={() => setNetPlacement("윗부분")}
            >
              윗부분에 달기
            </button>
            <div className="net-mesh" />
            <button
              className={netPlacement === "아랫부분" ? "on" : ""}
              onClick={() => setNetPlacement("아랫부분")}
            >
              아랫부분에 달기
            </button>
            <i
              className={
                netPlacement === "아랫부분"
                  ? "lower"
                  : netPlacement === "윗부분"
                    ? "upper"
                    : ""
              }
            >
              ● ● ● ●
            </i>
          </div>
          <RadioChoices options={uses} value={netUse} onChange={setNetUse} />
          <button className="puzzle-main" onClick={check}>
            돌그물추 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "newGrain") {
    const options = [
      "청동으로 농기구를 만들어 사용했다",
      "먹을 것을 찾아 계속 이동하기만 했다",
      "곡식을 갈아 먹고 점차 농사를 시작했다",
    ];
    const check = () =>
      grainPlaced && grainGround && grainUse === options[2]
        ? finishNewClue(
            "grain",
            true,
            "곡식이 곱게 갈렸어. 토기 쪽에서도 빛이 난다!",
            "35%",
            "71%",
          )
        : fail(
            !grainPlaced
              ? "먼저 곡식 알갱이를 갈판 위에 놓아 보자."
              : !grainGround
                ? "곡식이 놓였어. 손에 쥔 갈돌을 어떻게 사용했을까?"
                : "갈판 위의 곡식 알갱이와 마을의 움집을 함께 살펴봐.",
          );
    return (
      <Box
        close={close}
        investigate="갈판과 갈돌을 조사하는 중..."
        compact="new-puzzle"
      >
        <InspectPuzzle
          scene={neolithicGrainCloseup}
          focus="new-isolated"
          badge="갈판과 갈돌"
          caption="넓고 평평한 돌 위에 손에 쥘 만한 돌과 곡식 알갱이가 놓여 있다."
          thought="갈판 옆에 곡식이 놓여 있어. 실제로 도구를 사용하는 순서대로 움직인 뒤, 이 유물에서 알 수 있는 생활을 골라 보자."
        >
          <div
            className={`grain-lab ${grainPlaced ? "placed" : ""} ${grainGround ? "ground" : ""}`}
          >
            <button
              data-sfx-manual="true"
              onClick={() => {
                gameSfx("rustle");
                setGrainPlaced(true);
                setError("");
              }}
            >
              {grainPlaced
                ? "✓ 곡식을 갈판에 놓았어"
                : "곡식 알갱이를 갈판에 놓기"}
            </button>
            <button
              data-sfx-manual="true"
              disabled={!grainPlaced}
              onClick={() => {
                gameSfx("stone");
                setGrainGround(true);
                setError("");
              }}
            >
              {grainGround ? "✓ 갈돌로 곡식을 갈았어" : "갈돌 움직이기"}
            </button>
            <div className="grain-motion">
              <span>곡식</span>
              <i>갈돌</i>
            </div>
          </div>
          <RadioChoices
            options={options}
            value={grainUse}
            onChange={setGrainUse}
          />
          <button className="puzzle-main" onClick={check}>
            곡식 생활 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "newSpin") {
    const cards = ["옷을 만들어 입기", "뼈바늘로 꿰매기", "가락바퀴로 실 뽑기"];
    const expected = [
      "가락바퀴로 실 뽑기",
      "뼈바늘로 꿰매기",
      "옷을 만들어 입기",
    ];
    const check = () =>
      JSON.stringify(order) === JSON.stringify(expected)
        ? finishNewClue(
            "spin",
            3,
            [
              {
                speaker: "npc",
                text: "깨진 틈이 거의 다 이어졌어!",
                left: "82%",
                top: "60%",
              },
              {
                speaker: "hero",
                text: "이제 토기를 가까이 살펴보자.",
                left: "57%",
                top: "73%",
              },
            ],
            "49%",
            "64%",
          )
        : (setOrder([]), fail("바늘로 꿰매기 전에 먼저 무엇이 필요할까?"));
    return (
      <Box
        close={close}
        investigate="가락바퀴와 뼈바늘을 조사하는 중..."
        compact="new-puzzle"
      >
        <InspectPuzzle
          scene={neolithicSpinCloseup}
          focus="new-isolated"
          badge="가락바퀴와 뼈바늘"
          caption="가운데 구멍이 난 둥근 도구와 끝이 뾰족한 뼈 도구에 실이 이어져 있다."
          thought="옷을 만드는 기록의 순서가 뒤섞였어. 실제 작업 순서대로 눌러 놓아 보자."
        >
          <NeolithicOrderPuzzle
            cards={cards}
            order={order}
            setOrder={setOrder}
          />
          <button className="puzzle-main" onClick={check}>
            옷 만들기 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "bronzeKnife") {
    const materials = ["청동으로 만든 도구", "돌로 만든 도구"];
    const uses = [
      "땅을 깊게 파는 데 사용했다",
      "제사 때 소리를 내는 데 사용했다",
      "곡식의 이삭을 거두는 데 사용했다",
    ];
    const place = (target) => {
      setBronzeTarget(target);
      setError("");
      if (target === "이삭") {
        gameSfx("rustle");
        setBronzeSweeps(1);
      } else fail("반달 모양의 날을 곡식의 어느 부분에 대야 할까?");
    };
    const check = () =>
      bronzeTarget === "이삭" &&
      bronzeSweeps >= 1 &&
      bronzeMaterial === materials[1] &&
      bronzeUse === uses[2]
        ? finishBronze(
            "knife",
            "마루와 함께 반달 돌칼의 수확 기록을 되찾았어.",
            "88%",
            "31%",
          )
        : fail(
            bronzeSweeps < 1
              ? "반달 돌칼을 먼저 누르거나 끌어서 곡식의 알맞은 부분에 사용해 보자."
              : bronzeMaterial !== materials[1]
                ? "이 도구의 표면은 금속처럼 빛날까, 돌처럼 거칠까?"
                : "거둔 것은 뿌리나 줄기가 아니라 곡식의 어느 부분일까?",
          );
    return (
      <Box
        close={close}
        investigate="반달 돌칼을 조사하는 중..."
        compact="bronze-puzzle"
      >
        <InspectPuzzle
          scene={bronzeKnifeCloseup}
          focus="bronze-isolated"
          badge="반달 돌칼"
          caption="반달 모양의 납작한 돌에 끈을 끼울 수 있는 구멍이 나 있다."
          thought="마루가 수확할 도구를 찾고 있어. 돌칼을 끌거나 누른 뒤, 곡식의 알맞은 부분에 한 번 사용해 보자."
        >
          <div className="bronze-harvest-lab">
            <button
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", "knife")}
              className="stone-knife-token"
              onClick={() => setBronzeStep(1)}
            >
              반달 돌칼
            </button>
            {["이삭", "줄기", "뿌리"].map((x) => (
              <button
                key={x}
                className={`${bronzeTarget === x ? "on" : ""} ${bronzeStep ? "ready" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => place(x)}
                onClick={() => bronzeStep && place(x)}
              >
                {x}
                {x === "이삭" && bronzeSweeps > 0 ? (
                  <small>✓ 사용함</small>
                ) : null}
              </button>
            ))}
          </div>
          <RadioChoices
            options={materials}
            value={bronzeMaterial}
            onChange={setBronzeMaterial}
          />
          <RadioChoices
            options={uses}
            value={bronzeUse}
            onChange={setBronzeUse}
          />
          <button className="puzzle-main" onClick={check}>
            수확 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "bronzeMirror") {
    const places = [
      "곡식을 거두는 밭",
      "일반 사람이 생활하는 움집",
      "지배자가 특별한 의식을 하는 자리",
    ];
    const right = places[2];
    const place = (where) => {
      setBronzeInference(where);
      setError("");
      gameSfx(where === right ? "metal" : "select");
    };
    const check = () =>
      bronzeInference === right
        ? finishBronze(
            "mirror",
            "거울이 빛나자 창고의 표식도 반짝였어!",
            "28%",
            "29%",
          )
        : fail(
            !bronzeInference
              ? "청동 거울을 어느 자리에서 쓰였을지 골라 보자."
              : bronzeInference === places[0]
                ? "밭일을 할 때 반짝이는 청동 거울이 꼭 필요했을까?"
                : "매일 쓰는 생활 도구라기엔 청동 거울이 너무 귀하지 않았을까?",
          );
    return (
      <Box
        close={close}
        investigate="청동 거울을 조사하는 중..."
        compact="bronze-puzzle"
      >
        <InspectPuzzle
          scene={bronzeMirrorCloseup}
          focus="bronze-isolated"
          badge="청동 거울"
          caption="둥근 청동판의 표면과 가장자리에 정교한 무늬가 보인다."
          thought="반달 돌칼은 곡식밭에 남겨 두었어. 반짝이는 청동 거울은 어느 자리에 놓아야 할까?"
        >
          <div className="bronze-mirror-place">
            <button
              className="bronze-mirror-token"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("text/plain", "mirror")
              }
              onClick={() => gameSfx("metal")}
            >
              청동 거울<small>끌거나, 놓을 자리를 눌러 보자</small>
            </button>
            <div className="bronze-place-zones">
              {places.map((where) => (
                <button
                  key={where}
                  className={bronzeInference === where ? "selected" : ""}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    if (e.dataTransfer.getData("text/plain") === "mirror")
                      place(where);
                  }}
                  onClick={() => place(where)}
                >
                  {where}
                </button>
              ))}
            </div>
          </div>
          <button className="puzzle-main" onClick={check}>
            청동 거울 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "bronzeBell") {
    const options = ["생활 도구", "농사 도구", "제사 도구"];
    const ring = () => {
      gameSfx("bell");
      setBellRings((v) => Math.min(3, v + 1));
      setError("");
    };
    const check = () =>
      bellRings >= 2 && single === options[2]
        ? finishBronze(
            "bell",
            [
              {
                speaker: "npc",
                text: "우와, 방울 소리가 멀리까지 들려!",
                left: "70%",
                top: "27%",
              },
              {
                speaker: "hero",
                text: "저쪽 창고 표식도 소리에 반응했어!",
                left: "57%",
                top: "68%",
              },
            ],
            "68%",
            "25%",
          )
        : fail(
            bellRings < 2
              ? "방울을 직접 눌러 서로 다른 울림을 들어 보자."
              : "방울 소리가 곡식을 베는 데 필요했을까, 특별한 의식에 필요했을까?",
          );
    return (
      <Box
        close={close}
        investigate="청동 방울을 조사하는 중..."
        compact="bronze-puzzle"
      >
        <InspectPuzzle
          scene={bronzeBellCloseup}
          focus="bronze-isolated"
          badge="청동 방울"
          caption="속이 빈 청동 방울 아래에 길쭉한 울림 부분이 달려 있다."
          thought="방울을 두 번 이상 눌러 소리를 듣고, 어떤 때 쓰였을지 골라 보자."
        >
          <button
            className={`bronze-ring ${bellRings ? "ringing" : ""}`}
            data-sfx-manual="true"
            onClick={ring}
          >
            🔔 방울 울리기 <small>{bellRings}/2</small>
          </button>
          <RadioChoices options={options} value={single} onChange={setSingle} />
          <button className="puzzle-main" onClick={check}>
            청동 방울 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "bronzeDolmen") {
    const moveStone = (way) => {
      if (way === "혼자 밀어 보기")
        return fail("이렇게 큰 덮개돌을 한 사람이 혼자 움직일 수 있었을까?");
      setDolmenMoved(true);
      setError("");
      gameSfx("heavy-stone");
    };
    const rulers = [
      "혼자 이동하던 사냥꾼",
      "힘이 강한 지배자",
      "평범한 농사 도구 제작자",
    ];
    const check = () =>
      dolmenMoved && single === rulers[1]
        ? finishBronze(
            "dolmen",
            "마지막 돌 표식이 묵직하게 제자리를 찾았어!",
            "22%",
            "27%",
          )
        : fail(
            !dolmenMoved
              ? "먼저 커다란 덮개돌을 어떻게 옮겼을지 선택해 보자."
              : "많은 사람에게 일을 시킬 수 있었던 사람은 마을에서 어떤 위치였을까?",
          );
    return (
      <Box
        close={close}
        investigate="고인돌을 조사하는 중..."
        compact="bronze-puzzle"
      >
        <InspectPuzzle
          scene={bronzeDolmenCloseup}
          focus="bronze-isolated"
          badge="고인돌"
          caption="커다란 덮개돌을 받침돌 위에 올려 만든 거대한 무덤이다."
          thought="사람보다 훨씬 큰 덮개돌이야. 어떻게 옮겼을지 먼저 선택한 뒤, 이 무덤의 주인을 추리해 보자."
        >
          <div className="dolmen-steps">
            <b className={dolmenMoved ? "done" : "current"}>① 덮개돌 옮기기</b>
            <b className={dolmenMoved ? "current" : ""}>② 무덤 주인 추리</b>
          </div>
          <div className={`dolmen-move-choice ${dolmenMoved ? "moved" : ""}`}>
            <button onClick={() => moveStone("혼자 밀어 보기")}>
              한 사람이 혼자 밀기
            </button>
            <button
              onClick={() => moveStone("여러 사람이 통나무와 밧줄로 옮기기")}
            >
              {dolmenMoved
                ? "✓ 여러 사람이 힘을 모아 옮겼어"
                : "여러 사람이 통나무와 밧줄로 옮기기"}
            </button>
          </div>
          {dolmenMoved ? (
            <div className="dolmen-ruler-question">
              <strong>
                이렇게 많은 사람을 모아 거대한 무덤을 만들도록 한 사람은?
              </strong>
              <RadioChoices
                options={rulers}
                value={single}
                onChange={setSingle}
              />
            </div>
          ) : (
            <p className="dolmen-next-hint">
              먼저 덮개돌을 옮길 방법을 선택하면 다음 추리가 열려.
            </p>
          )}
          <button className="puzzle-main" onClick={check}>
            고인돌 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "joseonFounding") {
    const cards = [
      "단군왕검이 아사달에 고조선을 세웠다",
      "곰과 호랑이가 사람이 되기를 바랐다",
      "환웅이 인간 세상에 내려왔다",
      "곰이 약속을 지켜 웅녀가 되었다",
      "단군왕검이 태어났다",
    ];
    const expected = [
      "환웅이 인간 세상에 내려왔다",
      "곰과 호랑이가 사람이 되기를 바랐다",
      "곰이 약속을 지켜 웅녀가 되었다",
      "단군왕검이 태어났다",
      "단군왕검이 아사달에 고조선을 세웠다",
    ];
    const meanings = [
      "곡식을 많이 거둔다",
      "널리 인간을 이롭게 한다",
      "힘센 지배자만 이롭게 한다",
    ];
    const check = () =>
      JSON.stringify(order) === JSON.stringify(expected) &&
      single === meanings[1]
        ? finishJoseon(
            "founding",
            [
              {
                speaker: "npc",
                text: "이야기 조각이 순서대로 이어졌어!",
                left: "75%",
                top: "59%",
              },
              {
                speaker: "hero",
                text: "푸른 균열도 조금 작아진 것 같아.",
                left: "55%",
                top: "76%",
              },
            ],
            "49%",
            "79%",
          )
        : (setOrder([]),
          fail(
            single !== meanings[1]
              ? "홍익인간의 ‘홍익’은 이로움을 널리 나눈다는 뜻이야."
              : "환웅이 내려온 뒤 웅녀와 단군왕검의 이야기가 어떻게 이어지는지 생각해 봐.",
          ));
    return (
      <Box
        close={close}
        investigate="누리가 주운 그림 조각을 조사하는 중..."
        compact="joseon-puzzle"
      >
        <InspectPuzzle
          scene={joseonRecordCloseup}
          focus="joseon-isolated"
          badge="건국 이야기 조각"
          caption="푸른빛이 도는 그림 조각에서 건국 이야기의 장면들이 순서를 잃고 흩어져 있다."
          thought="『삼국유사』에 전하는 고조선 건국 이야기 카드를 시간 순서대로 놓고, 홍익인간의 뜻을 골라 보자."
        >
          <BronzeOrderPuzzle cards={cards} order={order} setOrder={setOrder} />
          <RadioChoices
            options={meanings}
            value={single}
            onChange={setSingle}
          />
          <button className="puzzle-main" onClick={check}>
            건국 이야기 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "joseonLaws") {
    const cases = [
      "사람을 죽인 사건",
      "다른 사람을 다치게 한 사건",
      "남의 물건을 훔친 사건",
    ];
    const rightLaws = [
      "사형",
      "곡식으로 갚기",
      "노비로 삼거나 50만 전을 내면 풀어 주기",
    ];
    const insights = [
      "생명을 소중히 여겼다",
      "농사를 지어 곡식이 중요했다",
      "개인의 재산을 인정했다",
      "노비와 신분 차이가 있었다",
      "화폐가 모든 생활에서 널리 쓰였다",
    ];
    const rightInsights = insights.slice(0, 4);
    const matched = JSON.stringify(laws) === JSON.stringify(rightLaws);
    const inferred =
      choice.length === 4 && rightInsights.every((x) => choice.includes(x));
    const check = () =>
      matched && inferred
        ? finishJoseon("laws", "나무 조각들이 딱 맞아 들어갔어!", "49%", "79%")
        : fail(
            !matched
              ? "죽음·상처·도둑질로 생긴 피해에 각각 어떤 벌을 정했는지 다시 연결해 봐."
              : "법에 50만 전이 나온다고 해서 화폐가 모든 생활에서 널리 쓰였다고 단정할 수 있을까?",
          );
    return (
      <Box
        close={close}
        investigate="8조법 단서 조각을 조사하는 중..."
        compact="joseon-puzzle"
      >
        <InspectPuzzle
          scene={joseonLawCloseup}
          focus="joseon-isolated"
          badge="8조법 단서 조각"
          caption="세 사건에 관한 벌과 사회 모습 단서가 서로 뒤섞여 있다."
          thought="전해지는 8조법의 세 조항을 사건과 연결한 뒤, 법에서 알 수 있는 고조선 사회의 모습만 골라 보자."
        >
          {cases.map((item, i) => (
            <div className="law-row" key={item}>
              <b>{item}</b>
              <select
                value={laws[i]}
                onChange={(e) =>
                  setLaws(laws.map((x, j) => (j === i ? e.target.value : x)))
                }
              >
                <option value="">벌 선택</option>
                {lawOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
          <div className="answer-grid joseon-insights">
            {insights.map((x) => (
              <button
                className={choice.includes(x) ? "on" : ""}
                key={x}
                onClick={() => toggleChoice(x)}
              >
                {choice.includes(x) ? "✓ " : ""}
                {x}
              </button>
            ))}
          </div>
          <button className="puzzle-main" onClick={check}>
            8조법 단서 맞추기
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "joseonDagger") {
    const shapes = [
      "날이 곧고 아주 가느다란 철검",
      "반달 모양에 구멍이 난 돌칼",
      "몸통 가운데가 비파처럼 넓게 퍼진 청동검",
    ];
    const meanings = [
      "곡식의 이삭을 거두는 농기구다",
      "고조선의 대표적인 청동기 문화유산이다",
      "실을 뽑는 신석기 생활 도구다",
    ];
    const check = () =>
      single === shapes[2] && joseonMeaning === meanings[1]
        ? finishJoseon(
            "dagger",
            "푸른빛이 검의 넓은 몸통을 따라 움직여!",
            "49%",
            "79%",
          )
        : fail(
            single !== shapes[2]
              ? "악기 비파처럼 몸통 가운데가 넓게 퍼진 모양을 찾아봐."
              : "이 검은 농기구가 아니라 고조선의 청동기 문화를 보여 주는 유물이야.",
          );
    return (
      <Box
        close={close}
        investigate="청동으로 만든 검을 조사하는 중..."
        compact="joseon-puzzle"
      >
        <InspectPuzzle
          scene={daggerArt}
          focus="standalone joseon-dagger-isolated"
          badge="청동으로 만든 검"
          caption="손잡이 아래의 몸통이 양옆으로 넓게 퍼져 있고 끝으로 갈수록 좁아진다."
          thought="눈앞의 검과 같은 생김새를 찾고, 이 유물이 고조선 기록에서 중요한 까닭을 연결해 보자."
        >
          <RadioChoices options={shapes} value={single} onChange={setSingle} />
          <RadioChoices
            options={meanings}
            value={joseonMeaning}
            onChange={setJoseonMeaning}
          />
          <button className="puzzle-main" onClick={check}>
            비파형 동검 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "joseonDolmen") {
    const artifacts = ["비파형 동검", "탁자식 고인돌", "빗살무늬 토기"];
    const meanings = [
      "고인돌이 있는 곳은 모두 하나의 마을이었다",
      "두 유물은 농사 도구로 함께 사용되었다",
      "두 유물이 함께 분포한 지역을 통해 고조선의 문화 범위를 짐작할 수 있다",
    ];
    const paired =
      choice.length === 2 &&
      choice.includes(artifacts[0]) &&
      choice.includes(artifacts[1]);
    const check = () =>
      paired && single === meanings[2]
        ? finishJoseon(
            "dolmen",
            [
              {
                speaker: "npc",
                text: "마지막 기록 조각이야!",
                left: "72%",
                top: "59%",
              },
              {
                speaker: "hero",
                text: "좋아, 이제 기록석으로 가 보자!",
                left: "53%",
                top: "76%",
              },
            ],
            "49%",
            "79%",
          )
        : fail(
            !paired
              ? "고조선의 청동기 문화를 함께 보여 주는 대표 유물 두 가지를 골라 봐."
              : "같은 유물이 여러 지역에서 발견되면 무엇의 범위를 짐작할 수 있을까?",
          );
    return (
      <Box
        close={close}
        investigate="탁자식 고인돌을 조사하는 중..."
        compact="joseon-puzzle"
      >
        <InspectPuzzle
          scene={joseonDolmenCloseup}
          focus="joseon-isolated"
          badge="탁자식 고인돌"
          caption="세로로 세운 받침돌 위에 넓고 평평한 덮개돌을 올린 고조선의 대표 유적이다."
          thought="이 고인돌과 함께 고조선의 문화 범위를 짐작하게 하는 유물을 하나 더 골라 연결하고, 두 유물의 분포가 뜻하는 바를 찾아보자."
        >
          <div className="answer-grid joseon-heritage-pair">
            {artifacts.map((x) => (
              <button
                className={choice.includes(x) ? "on" : ""}
                key={x}
                onClick={() => toggleChoice(x)}
              >
                {choice.includes(x) ? "✓ " : ""}
                {x}
              </button>
            ))}
          </div>
          <RadioChoices
            options={meanings}
            value={single}
            onChange={setSingle}
          />
          <button className="puzzle-main" onClick={check}>
            고조선 문화 범위 연결하기
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "wall") {
    const scenes = [
      "무리 지어 사냥하기",
      "열매와 뿌리 채집하기",
      "동굴과 막집에서 생활하기",
      "밭에서 곡식 재배하기",
      "청동 거울로 햇빛 비추기",
    ];
    const wrong = ["밭에서 곡식 재배하기", "청동 거울로 햇빛 비추기"];
    const toggle = (x) =>
      setWallChoices((s) =>
        s.includes(x) ? s.filter((v) => v !== x) : [...s, x],
      );
    const check = () =>
      wallChoices.length === 2 && wrong.every((x) => wallChoices.includes(x))
        ? revealOldChild()
        : (setWallChoices([]),
          fail(
            "구석기 사람들은 농사를 짓거나 청동기를 사용하지 않았어. 다른 시대에서 끼어든 장면을 찾아봐.",
          ));
    return (
      <Box close={close} investigate="동굴 벽화를 조사하는 중...">
        <InspectPuzzle
          scene={caveWallCloseup}
          badge="동굴 벽화"
          caption="벽면의 그림만 가까이 살펴보자. 두 장면에는 푸른 균열이 남아 있다."
          thought="범인이 다른 시대의 장면 두 개를 벽화에 끼워 넣었어. 구석기 생활과 맞지 않는 장면을 모두 고르자."
        >
          <div className="use-grid wall-scene-grid">
            {scenes.map((x) => (
              <button
                className={wallChoices.includes(x) ? "on" : ""}
                key={x}
                onClick={() => toggle(x)}
              >
                {wallChoices.includes(x) ? "✓ " : ""}
                {x}
              </button>
            ))}
          </div>
          <button
            className="puzzle-reset"
            onClick={() => {
              setWallChoices([]);
              setError("");
            }}
          >
            선택 지우기
          </button>
          <button className="puzzle-main" onClick={check}>
            벽화 바로잡기
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "oldEncounter") {
    return (
      <Box
        close={close}
        investigate="동굴에서 나온 아이를 만나는 중..."
        compact="old-encounter"
      >
        <InspectPuzzle
          scene={paleolithicChild}
          focus="standalone old-child-intro"
          badge="구석기 시대의 아이"
          caption="짐승 가죽을 덧댄 옷을 입은 또래 아이가 불빛을 따라 가까이 왔다."
          thought="아이와 먼저 이야기를 나눠 보자."
        >
          <button className="puzzle-main" onClick={followChildToHut}>
            아이에게 말 걸기
          </button>
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "oldHunt") {
    const options = [
      "여러 사람이 짐승을 에워싸고 함께 사용했다",
      "한 사람이 장식품처럼 세워 두었다",
      "밭을 갈아 곡식을 심는 데 사용했다",
    ];
    const check = () =>
      single === options[0]
        ? finishOldClue(
            "hunt",
            "사냥 도구의 흔적이 다시 선명해졌어!",
            "39%",
            "43%",
          )
        : fail(
            "큰 짐승 가까이에서 여러 개의 창이 어떻게 쓰였을지 다시 생각해 봐.",
          );
    return (
      <Box close={close} investigate="사냥용 창을 조사하는 중...">
        <InspectPuzzle
          scene={paleolithicSpears}
          focus="standalone spear-alone"
          badge="구석기 시대의 사냥용 창"
          caption="나무 자루 끝에 뾰족한 뗀석기를 묶어 사용한 사냥 도구"
          thought="길고 뾰족한 창이 여러 개 놓여 있어. 구석기 사람들은 큰 짐승을 잡을 때 이것을 어떻게 사용했을까?"
        >
          <RadioChoices options={options} value={single} onChange={setSingle} />
          <button className="puzzle-main" onClick={check}>
            사냥 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "oldShelter") {
    const cards = [
      "잠시 머물며 사냥과 채집을 함",
      "먹을거리와 짐승을 찾아 이동함",
      "동굴이나 임시 막집을 발견함",
    ];
    const expected = [
      "먹을거리와 짐승을 찾아 이동함",
      "동굴이나 임시 막집을 발견함",
      "잠시 머물며 사냥과 채집을 함",
    ];
    const check = () =>
      JSON.stringify(order) === JSON.stringify(expected)
        ? finishOldClue(
            "shelter",
            "막집 위의 흐릿한 흔적이 또렷해졌어!",
            "82%",
            "39%",
          )
        : (setOrder([]),
          fail(
            "한곳에 오래 정착한 것이 아니야. 먼저 먹을거리를 찾아 움직인 까닭부터 놓아 봐.",
          ));
    return (
      <Box close={close} investigate="동물 가죽으로 덮은 막집을 조사하는 중...">
        <InspectPuzzle
          scene={paleolithicShelter}
          badge="구석기 시대의 막집"
          caption="나뭇가지 뼈대에 동물 가죽을 덮어 잠시 머문 임시 거처"
          thought="구석기 사람들이 동굴과 막집에서 생활한 까닭이 드러나도록 기록을 순서대로 놓아 보자."
        >
          <OrderPuzzle cards={cards} order={order} setOrder={setOrder} />
          <button className="puzzle-main" onClick={check}>
            주생활 기록 복구
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "axeUse") {
    const uses = [
      "풀뿌리 캐기",
      "고기 자르기",
      "단단한 열매 껍질 두들기기",
      "실 뽑기",
    ];
    const toggle = (x) =>
      setAxeUses((s) => (s.includes(x) ? s.filter((v) => v !== x) : [...s, x]));
    const check = () => {
      if (!(axeUses.length === 3 && !axeUses.includes("실 뽑기")))
        return fail(
          "주먹 도끼는 찍고 자르고 두드리는 뗀석기야. 실을 뽑는 도구는 신석기 시대에 찾아보자.",
        );
      gameSfx("restore");
      const restored = { ...g.old, axe: true, food: true };
      flashOld("food");
      if (restored.hunt && restored.shelter) {
        const rewardReady = oldExploreCount === 3;
        patchEra("old", { axe: true, food: true, rewardReady });
        solvedAt(
          rewardReady
            ? "핵심 기록과 생활 흔적을 모두 확인했어. 하루가 무언가를 건네려 해."
            : "열매는 잘 나눠 먹었어. 이제 아직 못 본 생활 흔적을 찾아보자.",
          rewardReady ? "75%" : "58%",
          rewardReady ? "61%" : "70%",
        );
        return;
      }
      patchEra("old", { axe: true, food: true });
      solvedAt(
        [
          {
            speaker: "npc",
            text: "와, 열렸어! 우리 같이 나눠 먹자.",
            left: "69%",
            top: "61%",
          },
          {
            speaker: "hero",
            text: "좋아! 생각보다 고소한데?",
            left: "56%",
            top: "76%",
          },
        ],
        "68%",
        "70%",
      );
    };
    return (
      <Box close={close} investigate="막집 앞의 주먹 도끼를 살펴보는 중...">
        <InspectPuzzle
          scene={handAxeArt}
          focus="standalone axe-alone"
          badge="주먹 도끼"
          caption="찍고 자르고 두드리는 데 두루 사용한 구석기 시대의 만능 뗀석기"
          thought="아이와 열매 바구니 옆에서 발견했어. 주먹 도끼로 할 수 있는 일을 모두 골라 바로 도와주자."
        >
          <div className="use-grid">
            {uses.map((x) => (
              <button
                className={axeUses.includes(x) ? "on" : ""}
                key={x}
                onClick={() => toggle(x)}
              >
                {axeUses.includes(x) ? "✓ " : ""}
                {x}
              </button>
            ))}
          </div>
          <button className="puzzle-main" onClick={check}>
            주먹 도끼로 열매 깨기
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "oldReward") {
    return (
      <Box close={close} compact="reward">
        <small>구석기 시대의 기록이 돌아오는 중</small>
        <div className="old-reward-scene">
          <img
            src={paleolithicChildReward}
            alt="환하게 웃으며 시간 톱니를 건네는 구석기 시대 아이"
          />
        </div>
        <h2>도움을 받은 아이가 환하게 웃었다!</h2>
        <p>
          열매를 나누어 먹은 아이가 목에 걸고 있던 시간 톱니를 꺼내 두 손으로
          건넨다.
        </p>
        <button
          className="puzzle-main"
          onClick={() => complete("old", "시간 톱니 ①")}
        >
          시간 톱니 받기
        </button>
      </Box>
    );
  }
  if (modal.type === "newLife") {
    const items = [
      "돌그물추",
      "갈판과 갈돌",
      "빗살무늬 토기",
      "가락바퀴",
      "뼈바늘",
      "움집",
      "강가 마을",
    ];
    const expected = {
      돌그물추: "식생활",
      "갈판과 갈돌": "식생활",
      "빗살무늬 토기": "식생활",
      가락바퀴: "의생활",
      뼈바늘: "의생활",
      움집: "주생활",
      "강가 마을": "주생활",
    };
    const potOptions = [
      "짐승을 사냥하는 무기로 사용했다",
      "음식을 저장하거나 조리하는 데 사용했다",
      "실을 뽑는 데 사용했다",
    ];
    const check = () => {
      const sorted = items.every((x) => life[x] === expected[x]);
      if (!sorted)
        return fail(
          "먹는 일, 입는 옷, 머무는 집과 관계된 증거를 각각 다시 연결해 봐.",
        );
      if (potUse !== potOptions[1])
        return fail(
          "토기 안에 무엇을 담고 불 가까이에서 어떻게 사용했을지 생각해 봐.",
        );
      patchEra("new", { pot: true });
      gameSfx("restore");
      flashNew("pot");
      if (newExploreCount === 3) {
        openModal({ type: "newReward" });
      } else {
        solvedAt(
          "토기는 완성됐어. 그런데 마을에서 아직 못 본 생활 흔적이 있는 것 같아.",
          "83%",
          "61%",
        );
      }
    };
    return (
      <Box
        close={close}
        investigate="완성된 빗살무늬 토기를 조사하는 중..."
        compact="new-puzzle final"
      >
        <InspectPuzzle
          scene={neolithicPotteryCloseup}
          focus="new-pot-isolated"
          badge="빗살무늬 토기"
          caption="토기 겉면에 빗살처럼 보이는 무늬가 여러 줄 새겨져 있다."
          thought="다온이가 세 조각을 모두 맞추었어. 조각에서 되찾은 증거를 의·식·주에 연결하면 토기의 기록이 완성될 거야."
        >
          <EvidenceSort
            items={items}
            value={life}
            setValue={setLife}
            selected={selectedEvidence}
            setSelected={setSelectedEvidence}
          />
          <RadioChoices
            options={potOptions}
            value={potUse}
            onChange={setPotUse}
          />
          <button className="puzzle-main" onClick={check}>
            신석기 생활 기록 완성
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "newReward") {
    return (
      <Box close={close} compact="new-reward">
        <small>신석기 시대의 기록이 돌아오는 중</small>
        <div className="new-reward-scene">
          <img
            className="new-reward-pot"
            src={neolithicPotteryCloseup}
            alt="완성된 빗살무늬 토기"
          />
          <img
            className="new-reward-child"
            src={neolithicChildReward}
            alt="환하게 웃으며 시간 톱니를 건네는 다온"
          />
          <i />
          <i />
          <i />
        </div>
        <h2>다온이가 환하게 웃었다!</h2>
        <p>
          완성된 토기 안에서 반짝이는 시간 톱니 ②가 나타났다. 다온이가 톱니를 두
          손으로 건네준다.
        </p>
        <button
          className="puzzle-main"
          onClick={() => complete("new", "시간 톱니 ②")}
        >
          시간 톱니 받기
        </button>
      </Box>
    );
  }
  if (modal.type === "bronzeCause") {
    const cards = [
      "사람들 사이에 재산 차이가 생겼다",
      "농사 기술이 발달했다",
      "힘이 강한 지배자가 등장했다",
      "곡식 생산량이 늘었다",
      "남는 곡식과 재산이 생겼다",
    ];
    const expected = [
      "농사 기술이 발달했다",
      "곡식 생산량이 늘었다",
      "남는 곡식과 재산이 생겼다",
      "사람들 사이에 재산 차이가 생겼다",
      "힘이 강한 지배자가 등장했다",
    ];
    const check = () => {
      if (JSON.stringify(cause) !== JSON.stringify(expected)) {
        setCause([]);
        return fail(
          "먼저 곡식이 많아져야 재산을 쌓을 수 있지 않을까? 지배자는 그보다 앞일까, 뒷일까?",
        );
      }
      patchEra("bronze", { final: true });
      gameSfx("door");
      if (bronzeExploreCount === 3) return openModal({ type: "bronzeReward" });
      solvedAt(
        "창고 기록은 돌아왔어. 마을을 조금만 더 둘러볼까?",
        "84%",
        "45%",
      );
    };
    return (
      <Box
        close={close}
        investigate="잠긴 곡식 창고를 조사하는 중..."
        compact="bronze-puzzle final"
      >
        <InspectPuzzle
          scene={bronzeStoreCloseup}
          focus="bronze-isolated"
          badge="잠긴 곡식 창고"
          caption="네 가지 유물을 모두 확인하자 창고 문에서 희미한 빛이 난다."
          thought="청동기 사회가 변한 흐름을 원인과 결과에 맞게 놓으면 창고 문이 열릴 거야."
        >
          <BronzeOrderPuzzle cards={cards} order={cause} setOrder={setCause} />
          <button className="puzzle-main" onClick={check}>
            창고 문 열기
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "bronzeReward") {
    return (
      <BronzeReward
        close={close}
        onClaim={() => complete("bronze", "시간 톱니 ③")}
      />
    );
  }
  if (modal.type === "joseonFinal") {
    const fields = [
      ["nation", "우리 역사 속 최초의 국가", ["부여", "고조선", "신라"]],
      [
        "culture",
        "나라가 세워진 문화적 바탕",
        ["불교 문화", "철기 문화", "청동기 문화"],
      ],
      ["law", "사회 질서를 유지한 법", ["율령", "경국대전", "8조법"]],
      [
        "heritage",
        "대표 문화유산",
        [
          "주먹 도끼와 동굴 벽화",
          "비파형 동검과 탁자식 고인돌",
          "빗살무늬 토기와 움집",
        ],
      ],
      [
        "growth",
        "세력이 커진 방식",
        [
          "농사를 그만두고 모두 이동했다",
          "청동 농기구만으로 밭을 갈았다",
          "주변 세력을 정복하거나 통합했다",
        ],
      ],
    ];
    const cards = [
      "주변 세력을 정복하거나 통합했다",
      "발달된 청동기 문화를 바탕으로 힘을 키웠다",
      "고조선의 세력이 커졌다",
    ];
    const expected = [
      "발달된 청동기 문화를 바탕으로 힘을 키웠다",
      "주변 세력을 정복하거나 통합했다",
      "고조선의 세력이 커졌다",
    ];
    const completeFields =
      summary.nation === "고조선" &&
      summary.culture === "청동기 문화" &&
      summary.law === "8조법" &&
      summary.heritage === "비파형 동검과 탁자식 고인돌" &&
      summary.growth === "주변 세력을 정복하거나 통합했다";
    const check = () => {
      if (!(
        completeFields && JSON.stringify(cause) === JSON.stringify(expected)
      ))
        return fail(
          !completeFields
            ? "첫 국가·문화적 바탕·법·대표 유산을 지금까지 확인한 네 가지 단서와 다시 연결해 봐."
            : "먼저 힘의 바탕이 생기고, 주변 세력과의 관계가 변한 뒤 세력이 커지는 흐름을 생각해 봐.",
        );
      patchEra("joseon", { final: true });
      gameSfx("stone");
      if (joseonExploreCount === 3) return openModal({ type: "joseonReward" });
      solvedAt(
        "나라 기록은 완성됐어. 주변에 남은 생활 모습도 확인해 보자.",
        "79%",
        "58%",
      );
    };
    return (
      <Box
        close={close}
        investigate="푸른 시간 균열을 조사하는 중..."
        compact="joseon-puzzle final"
      >
        <InspectPuzzle
          scene={joseonRecordCloseup}
          focus="joseon-isolated"
          badge="푸른 시간 균열"
          caption="네 가지 역사 단서가 이어지자 갈라진 틈에서 밝은 빛이 번진다."
          thought="확인한 증거를 고조선의 핵심 내용에 연결하고, 고조선이 성장한 흐름을 순서대로 놓아 보자."
        >
          <div className="summary-fields">
            {fields.map(([key, label, opts]) => (
              <label key={key}>
                <b>{label}</b>
                <select
                  value={summary[key]}
                  onChange={(e) =>
                    setSummary({ ...summary, [key]: e.target.value })
                  }
                >
                  <option value="">기록 선택</option>
                  {opts.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <BronzeOrderPuzzle cards={cards} order={cause} setOrder={setCause} />
          <button className="puzzle-main" onClick={check}>
            시간 균열 닫기
          </button>
          {error && <small>{error}</small>}
        </InspectPuzzle>
      </Box>
    );
  }
  if (modal.type === "joseonReward")
    return (
      <JoseonReward
        close={close}
        onClaim={() => complete("joseon", "시간 톱니 ④")}
      />
    );
  if (modal.type === "clear") {
    const i = eras.findIndex((x) => x.id === modal.id),
      last = modal.id === "joseon",
      next = eras[i + 1];
    return (
      <Box close={() => advance(modal.id)}>
        <small>역사 기록 정상화</small>
        <div className="coord-piece">⚙</div>
        <h2>{modal.item} 복구!</h2>
        <p>{clearStories[modal.id]}</p>
        <VillainNote>{villainNotes[modal.id]}</VillainNote>
        <button className="puzzle-main" onClick={() => advance(modal.id)}>
          {last ? "교실로 돌아가기" : `${next.name}로 이동`}
        </button>
      </Box>
    );
  }
  if (modal.type === "journal") {
    const journalEraInfo =
      eras.find((item) => item.id === journalEra) || eras[0];
    const journalExplore = {
      ...emptyLifeExploration[journalEra],
      ...(g.explore?.[journalEra] || {}),
    };
    const journalEntries = lifeExplorationEntries[journalEra];
    const journalExploreCount = countCompleted(
      journalEntries.map((item) => journalExplore[item.id]),
    );
    const coreCounts = {
      old: countCompleted([
        g.old.wall,
        g.old.hunt,
        g.old.shelter,
        g.old.axe && g.old.food,
      ]),
      new: countCompleted([g.new.net, g.new.grain, g.new.spin >= 3, g.new.pot]),
      bronze: countCompleted([
        g.bronze.knife,
        g.bronze.mirror,
        g.bronze.bell,
        g.bronze.dolmen,
      ]),
      joseon: countCompleted([
        g.joseon.founding,
        g.joseon.laws,
        g.joseon.dagger,
        g.joseon.dolmen,
      ]),
    };
    const journalCoreCount = coreCounts[journalEra];
    return (
      <Box close={close} compact="journal">
        <h2>탐험 기록</h2>
        <div className="journal-era-column">
          <div className="journal-list">
            {eras.map((e, i) => (
              <button
                type="button"
                className={journalEra === e.id ? "selected" : ""}
                key={e.id}
                onClick={() => setJournalEra(e.id)}
              >
                <b>
                  {g.completed.includes(e.id) ? "✓" : "○"} {e.name}
                </b>
                <span>
                  핵심 {coreCounts[e.id]}/4 · 생활{" "}
                  {countCompleted(
                    lifeExplorationEntries[e.id].map((item) =>
                      Boolean(g.explore?.[e.id]?.[item.id]),
                    ),
                  )}
                  /3
                </span>
              </button>
            ))}
          </div>
          {g.evidence?.length > 0 && (
            <>
              <h3 className="journal-evidence-title">발견한 범인의 흔적</h3>
              <div className="evidence-notes">
                {g.evidence.map((x, i) => (
                  <p key={i}>{x}</p>
                ))}
              </div>
            </>
          )}
        </div>
        <section
          className={`old-discovery-journal era-${journalEra} ${journalExploreCount === 3 ? "complete" : ""}`}
        >
          <header>
            <div>
              <small>{journalEraInfo.name} · 생활 탐험</small>
              <h3>{journalEraInfo.name} 생활 발견</h3>
            </div>
            <div className="old-discovery-count">
              <b>{journalExploreCount}</b>
              <span>/ 3</span>
            </div>
          </header>
          <div
            className="old-journal-progress"
            aria-label={`${journalEraInfo.name} 핵심 기록 ${journalCoreCount}/4, 생활 발견 ${journalExploreCount}/3`}
          >
            <span>
              핵심 기록 <b>{journalCoreCount}/4</b>
            </span>
            <span>
              생활 발견 <b>{journalExploreCount}/3</b>
            </span>
          </div>
          <div className="old-discovery-cards">
            {journalEntries.map((item) => (
              <article
                className={journalExplore[item.id] ? "found" : "locked"}
                key={item.id}
              >
                <i aria-hidden="true">{item.icon}</i>
                <div>
                  <b>
                    {journalExplore[item.id]
                      ? item.title
                      : "아직 찾지 못한 생활 흔적"}
                  </b>
                  <p>
                    {journalExplore[item.id]
                      ? item.sentence
                      : `${journalEraInfo.name} 장면을 자유롭게 살펴보세요.`}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {journalExploreCount === 3 && (
            <p className="old-discovery-complete">
              <Sparkles /> {journalEraInfo.name} 생활 흔적을 모두 발견했어!
            </p>
          )}
        </section>
      </Box>
    );
  }
  if (modal.type === "help")
    return (
      <Box close={close}>
        <h2>막혔을 때</h2>
        <p>
          화면의 사물은 서로 연결되어 있어. 작동하지 않는 곳이 있다면 다른
          사물에서 필요한 도구나 무늬, 숫자, 방향, 소리를 먼저 찾아봐.
        </p>
        <p>관찰 문장은 정답이 아니라 다음 행동을 위한 단서야.</p>
      </Box>
    );
  return null;
}
function InspectPuzzle({
  scene,
  badge,
  caption = "유물과 유적은 당시 사람들의 생활을 알려 주는 증거다.",
  focus = "",
  thought,
  children,
}) {
  return (
    <div className="investigation-grid">
      <div className={`artifact-panel ${focus ? `focus-${focus}` : ""}`}>
        <div className="artifact-image">
          <img src={scene} alt={badge} />
        </div>
        <strong>{badge}</strong>
        <span>{caption}</span>
      </div>
      <div className="investigation-work">
        <div className="modal-thought">
          <span className="modal-face">
            <img src={hero} alt="주인공 얼굴" />
          </span>
          <p>{thought}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
function RadioChoices({ options, value, onChange }) {
  return (
    <div className="radio-choices">
      {options.map((x) => (
        <button
          className={value === x ? "on" : ""}
          key={x}
          onClick={() => onChange(x)}
        >
          {value === x ? "●" : "○"} {x}
        </button>
      ))}
    </div>
  );
}
function OrderPuzzle({ cards, order, setOrder }) {
  return (
    <>
      <div className={`order-slots slots-${cards.length}`}>
        {cards.map((_, i) => (
          <i key={i}>{order[i] || i + 1}</i>
        ))}
      </div>
      <div className="puzzle-parts">
        {cards.map((c) => (
          <button
            disabled={order.includes(c)}
            key={c}
            onClick={() => setOrder([...order, c])}
          >
            {c}
          </button>
        ))}
      </div>
      <button className="puzzle-reset" onClick={() => setOrder([])}>
        다시 놓기
      </button>
    </>
  );
}
function NeolithicOrderPuzzle({ cards, order, setOrder }) {
  return (
    <>
      <div className="order-slots slots-3">
        {cards.map((_, i) => (
          <i key={i}>{order[i] || i + 1}</i>
        ))}
      </div>
      <div className="puzzle-parts">
        {cards.map((c) => (
          <button
            data-sfx-manual="true"
            disabled={order.includes(c)}
            key={c}
            onClick={() => {
              gameSfx(c.startsWith("가락바퀴") ? "spin" : "select");
              setOrder([...order, c]);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <button className="puzzle-reset" onClick={() => setOrder([])}>
        다시 놓기
      </button>
    </>
  );
}
function BronzeOrderPuzzle({ cards, order, setOrder }) {
  const add = (card) => {
    if (!card || order.includes(card)) return;
    setOrder([...order, card]);
    gameSfx("select");
  };
  const drop = (e) => {
    e.preventDefault();
    add(e.dataTransfer.getData("text/plain"));
  };
  return (
    <div className="bronze-order">
      <div
        className="bronze-order-slots"
        onDragOver={(e) => e.preventDefault()}
        onDrop={drop}
      >
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (order[i]) setOrder(order.filter((_, j) => j !== i));
            }}
          >
            <b>{i + 1}</b>
            <span>{order[i] || "여기에 놓기"}</span>
          </button>
        ))}
      </div>
      <div className="bronze-order-bank">
        {cards.map((c) => (
          <button
            draggable
            disabled={order.includes(c)}
            key={c}
            onDragStart={(e) => e.dataTransfer.setData("text/plain", c)}
            onClick={() => add(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <button className="puzzle-reset" onClick={() => setOrder([])}>
        순서 다시 놓기
      </button>
    </div>
  );
}
function BronzeReward({ close, onClaim }) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    gameSfx("door");
    const timers = [
      setTimeout(() => setBeat(1), 650),
      setTimeout(() => { setBeat(2); gameSfx("gear"); }, 1500),
      setTimeout(() => { setBeat(3); gameSfx("step"); }, 2400),
      setTimeout(() => { setBeat(4); gameSfx("step"); }, 3550),
      setTimeout(() => { setBeat(5); gameSfx("gear"); }, 4750),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <Box close={close} compact="bronze-reward">
      <small>청동기 시대의 기록이 돌아오는 중</small>
      <div className={`bronze-reward-scene beat-${beat}`}>
        <svg className="bronze-handoff-art" viewBox="0 0 1672 941" role="img" aria-label="창고 문에서 나와 시간 톱니를 건네는 마루">
          <defs>
            <clipPath id="maru-door-opening"><rect x="631" y="222" width="199" height="372" rx="3" /></clipPath>
            <clipPath id="maru-reward-outline" clipPathUnits="objectBoundingBox">
              <path d="M .49 .075 C .36 .071 .31 .17 .30 .25 L .325 .287 C .338 .308 .377 .337 .430 .350 L .357 .369 C .319 .394 .310 .456 .346 .480 L .367 .501 L .355 .600 L .332 .728 Q .322 .747 .372 .753 L .362 .830 Q .330 .858 .303 .884 Q .292 .912 .354 .916 L .431 .916 Q .458 .901 .454 .880 L .464 .768 L .527 .768 L .538 .880 Q .536 .910 .574 .918 L .652 .918 Q .690 .906 .679 .889 L .621 .837 L .609 .752 Q .686 .741 .675 .721 L .641 .602 L .634 .502 C .709 .490 .705 .403 .657 .367 L .550 .351 C .604 .332 .628 .303 .637 .271 C .662 .172 .627 .077 .49 .075 Z" />
            </clipPath>
            <radialGradient id="maru-door-light"><stop stopColor="#ffe4a0" /><stop offset="1" stopColor="#b77b24" stopOpacity="0" /></radialGradient>
          </defs>
          <image href={bronzeStoreCloseup} width="1672" height="941" />
          <g clipPath="url(#maru-door-opening)">
            <rect x="631" y="222" width="199" height="372" fill="#28180d" />
            <ellipse className="bronze-door-glimmer" cx="730" cy="460" rx="72" ry="95" fill="url(#maru-door-light)" />
            <svg x="631" y="222" width="199" height="372" viewBox="631 222 199 372" preserveAspectRatio="none" className="bronze-door-leaf">
              <image href={bronzeStoreCloseup} width="1672" height="941" />
            </svg>
          </g>
          <g className="bronze-maru-emerge">
            <image href={bronzeMaruReward} width="1086" height="1448" clipPath="url(#maru-reward-outline)" />
          </g>
        </svg>
      </div>
        <div className="bronze-handoff-caption" aria-live="polite">
          {beat < 1
            ? "창고 문이 움직이기 시작한다…"
            : beat < 2
              ? "문 안쪽에서 마루의 목소리가 들린다."
              : beat < 3
                ? "“찾았다! 여기 반짝이는 톱니가 있어!”"
                : beat < 5
                  ? "마루가 문을 나와 톱니를 들고 다가온다."
                : "“덕분에 마을의 기록이 돌아왔어. 이건 네가 가져가!”"}
        </div>
      <button className="puzzle-main" disabled={beat < 5} onClick={onClaim}>
        마루에게 시간 톱니 ③ 받기
      </button>
    </Box>
  );
}
function JoseonReward({ close, onClaim }) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    gameSfx("stone");
    const a = setTimeout(() => {
      setBeat(1);
      gameSfx("success");
    }, 650);
    const b = setTimeout(() => {
      setBeat(2);
      gameSfx("step");
    }, 1450);
    const c = setTimeout(() => {
      setBeat(3);
      gameSfx("gear");
    }, 2450);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, []);
  return (
    <Box close={close} compact="joseon-reward">
      <small>고조선의 시간 균열이 닫히는 중</small>
      <div className={`joseon-reward-scene beat-${beat}`}>
        <img
          className="joseon-reward-stone"
          src={joseonRecordCloseup}
          alt="푸른 시간 균열이 닫힌 바위"
        />
        <div className="joseon-reward-light" />
        <img
          className="joseon-reward-nuri"
          src={joseonNuriReward}
          alt="시간 톱니 4를 두 손으로 건네는 누리"
        />
        <div className="joseon-reward-caption">
          {beat < 1
            ? "바위의 푸른 균열이 천천히 닫힌다…"
            : beat < 2
              ? "네 가지 역사 단서가 한꺼번에 빛났다!"
              : beat < 3
                ? "누리가 반짝이는 톱니를 들고 다가온다."
                : "“덕분에 시간 균열이 닫혔어. 이건 네가 가져가!”"}
        </div>
      </div>
      <button className="puzzle-main" disabled={beat < 3} onClick={onClaim}>
        누리에게 시간 톱니 ④ 받기
      </button>
    </Box>
  );
}
function EvidenceSort({ items, value, setValue, selected, setSelected }) {
  const groups = ["식생활", "의생활", "주생활"];
  const assign = (item, group) => {
    if (!item) return;
    setValue({ ...value, [item]: group });
    setSelected("");
    gameSfx("select");
  };
  const drop = (e, group) => {
    e.preventDefault();
    assign(e.dataTransfer.getData("text/plain"), group);
  };
  return (
    <div className="evidence-sort">
      <p>증거를 끌어 놓거나, 증거를 누른 뒤 생활 영역을 눌러 연결하세요.</p>
      <div className="evidence-bank">
        {items.map((item) => (
          <button
            draggable
            key={item}
            className={`${selected === item ? "selected" : ""} ${value[item] ? "assigned" : ""}`}
            onDragStart={(e) => e.dataTransfer.setData("text/plain", item)}
            onClick={() => setSelected(selected === item ? "" : item)}
          >
            <b>{item}</b>
            <small>{value[item] || "연결 전"}</small>
          </button>
        ))}
      </div>
      <div className="evidence-zones">
        {groups.map((group) => (
          <button
            key={group}
            className={selected ? "ready" : ""}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => drop(e, group)}
            onClick={() => assign(selected, group)}
          >
            <strong>{group}</strong>
            <span>
              {items.filter((item) => value[item] === group).join(" · ") ||
                "여기에 놓기"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
function Box({ children, close, investigate, compact = "" }) {
  return (
    <div className="chain-overlay">
      <section
        className={`chain-card ${investigate ? "investigation-card" : ""} ${compact ? `compact-${compact}` : ""}`}
      >
        {investigate && (
          <div className="investigation-bar">
            <b>🔍 조사 중</b>
            <span>{investigate}</span>
          </div>
        )}
        <button className="chain-x" onClick={close} aria-label="창 닫기">
          <X />
        </button>
        {children}
      </section>
    </div>
  );
}
function VillainNote({ children }) {
  return (
    <div className="villain-note">
      <span className="villain-note-copy">{children}</span>
      <span className="villain-stamp" aria-label="검은 모래시계 도장">
        ⌛
      </span>
    </div>
  );
}

function ReturnTravelEffect({ scene }) {
  return (
    <div className="return-travel" aria-live="polite">
      <img
        className="return-travel-scene"
        src={scene}
        alt="시간 이동이 시작된 역사 현장"
      />
      <div className="return-vortex">
        <i />
        <i />
        <i />
      </div>
      <div className="return-gear">⚙</div>
      <h1>교실로 돌아가는 중...</h1>
      <p>네 개의 시간 톱니가 하나의 길을 열고 있다.</p>
      <div className="return-white-flash" />
    </div>
  );
}

function ReturnClassroom({ g, setG, reset, onReplayIntro }) {
  if (g.departing)
    return (
      <div className="next-era">
        <div className="ending-ring">⌛</div>
        <h1>삼국 시대를 향해 이동 중...</h1>
        <p>기계 화면에 세 개의 봉화가 차례로 꺼진다.</p>
        <VillainNote>
          “첫 번째 역사는 되찾았군.
          <br />
          하지만 세 나라는 지킬 수 있을까?”
        </VillainNote>
        <b>다음 이야기에서 계속됩니다.</b>
      </div>
    );
  return (
    <div className="return-hq">
      <img src={classroomBg} alt="교실 본부" />
      <div className="hq-card">
        {!g.signal ? (
          <>
            <small>귀환 장치 복구 완료</small>
            <h1>교실로 돌아왔다!</h1>
            <p>
              네 시대의 기록을 바로잡자 시간 톱니 네 개가 맞물렸다. 멈췄던 교실
              시계도 다시 움직인다.
            </p>
            <p>
              그런데 마지막 톱니에 새겨진 ‘세 개의 꺼진 봉화’가 기계 화면에서
              깜빡이고 있다.
            </p>
            <button onClick={() => setG((s) => ({ ...s, signal: true }))}>
              마지막 톱니 살펴보기
            </button>
          </>
        ) : (
          <>
            <small>범인의 다음 역사 오류</small>
            <h1>삼국 시대의 봉화가 꺼지고 있다</h1>
            <div className="signal-sounds">
              <span>고구려 봉화 · 신호 없음</span>
              <span>백제 봉화 · 신호 없음</span>
              <span>신라 봉화 · 신호 없음</span>
            </div>
            <p>
              검은 모래시계 범인은 이미 삼국 시대로 이동했다. 복구된 시간 톱니가
              범인의 표식을 따라 새 통로를 연다.
            </p>
            <button
              className="route-ready"
              onClick={() => setG((s) => ({ ...s, departing: true }))}
            >
              다음 역사 오류를 막으러 <b>출발하기</b>
            </button>
            <button onClick={reset}>선사~고조선 다시 하기</button>
            <button className="secondary" onClick={onReplayIntro}>
              교실 인트로 보기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
