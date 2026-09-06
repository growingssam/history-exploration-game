import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {X, Play, RotateCcw, Volume2, VolumeX} from 'lucide-react';
import classroomCovered from './assets/classroom_book_integrated.png';
import classroomRevealed from './assets/classroom_revealed_integrated.png';
import characterNormal from './assets/character_normal.png';
import characterTimeTravel from './assets/character_time_travel_surprised.png';
import bookCloseup from './assets/book_closeup.png';
import coveredCloseupNatural from './assets/covered_closeup_2_natural.png';
import windowView from './assets/window_schoolyard.png';
import Stage2Escape from './Stage2Escape.jsx';
import './styles.css';
import './responsive.css';
import './viewport.js';

const KEY='historyEscapePrologue_art_v26_clear_story_fire';
const STAGE2_KEY='historyEscapeStage2_v24_story_order';
const SKIP_COVER_ONCE='historyEscapeSkipCoverOnce';

const OBJECT_REACTIONS={
  book:{left:'21%',top:'62%',lines:[
    '사회 5-2 교과서다. 오늘 선사 시대부터 고조선까지 배웠지.',
    '책장이 저절로 선사 시대에서 멈췄다. 바람 때문인가?',
    '교과서: 나를 두고 가면 내일 준비물은 어쩌려고?'
  ]},
  board:{left:'37%',top:'10%',lines:[
    '선생님이 “남아 있는 흔적”을 강조하셨다.',
    '분필 자국을 보니… 왠지 누군가 급하게 쓴 것 같다.',
    '칠판: 내 글씨를 다 읽었으면 이제 단서를 찾아봐!'
  ]},
  clock:{left:'61%',top:'20%',lines:[
    '4시 27분. 빨리 집에 가야겠다.',
    '째깍… 분명 시간이 흐르는데 교실은 왜 이렇게 조용하지?',
    '시계: 자꾸 쳐다보면 시간이 더 천천히 간다구.'
  ]},
  tv:{left:'75%',top:'25%',lines:[
    '전원이 꺼져 있다.',
    '화면에 내 얼굴만 비친다. 표정이 왜 이렇게 심각하지?',
    'TV: 오늘은 나 말고 저 수상한 기계를 봐 줘.'
  ]},
  desk:{left:'15%',top:'49%',lines:[
    '달칵. 잠겨 있다.',
    '선생님 서랍을 함부로 열면 안 되지. 그래도 궁금하다…',
    '책상: 달칵달칵해도 비밀은 안 알려 줄 거야.'
  ]},
  window:{left:'2%',top:'35%',lines:[
    '운동장에도 아무도 없네.',
    '창문에 입김을 불어 동그라미를 그렸다. 후우—',
    '창문: 밖만 보지 말고 교실 안을 잘 살펴봐.'
  ]},
  sticker:{left:'8%',top:'39%',lines:[
    '작은 모래시계다. 왜 창틀에 놓여 있지?',
    '살짝 뒤집으니 모래가 위로 흐른다. 이건 말이 안 되는데?',
    '모래시계: 쉿! 시간은 꼭 아래로만 흐르진 않아.'
  ]},
  trash:{left:'79%',top:'57%',lines:[
    '우유갑 하나. 특별한 건 없다.',
    '바스락! …깜짝이야. 종이가 미끄러진 소리였다.',
    '쓰레기통: 단서는 없지만 분리배출은 정확히 부탁해.'
  ]},
  cabinet:{left:'70%',top:'24%',lines:[
    '책과 상자가 놓여 있다. 너무 높아서 닿지 않는다.',
    '맨 위 상자에 “과거 물품”이라고 쓰여 있는 것 같다.',
    '캐비닛: 까치발로는 부족해. 성장판을 조금 더 기다려 봐.'
  ]},
  timetable:{left:'50%',top:'12%',lines:[
    '오늘 2교시는 사회였다.',
    '사회 다음은 수학, 과학, 체육. 평범한 하루였는데.',
    '시간표: 방과 후에는 곧장 집에 가는 게 원칙입니다.'
  ]}
};
const initial={
  scene:'normal',
  clicks:{},
  machine:{uncovered:false, leverReady:false},
  timerStarted:false,
  timerStartedAt:null,
  introSeen:false,
  sound:true,
  musicVolume:.48,
};

function load(){
  try{
    const q=new URLSearchParams(location.search);
    const saved=JSON.parse(localStorage.getItem(KEY)||'{}');
    if(q.get('reset')==='1'){
      localStorage.removeItem(KEY);
      localStorage.removeItem(STAGE2_KEY);
      return initial;
    }
    return {...initial,...saved,machine:{...initial.machine,...saved.machine},clicks:{...initial.clicks,...saved.clicks},sound:saved.sound??true,musicVolume:saved.musicVolume??.48};
  }catch{return initial;}
}

function hasSavedProgress(){
  try{
    const prologue=JSON.parse(localStorage.getItem(KEY)||'null');
    const history=JSON.parse(localStorage.getItem(STAGE2_KEY)||'null');
    if(history)return true;
    if(!prologue)return false;
    return Boolean(
      prologue.introSeen||
      prologue.scene!=='normal'||
      prologue.machine?.uncovered||
      prologue.timerStarted||
      Object.values(prologue.clicks||{}).some(Boolean)
    );
  }catch{return false;}
}

function shouldShowCover(){
  try{
    if(sessionStorage.getItem(SKIP_COVER_ONCE)==='1'){
      sessionStorage.removeItem(SKIP_COVER_ONCE);
      return false;
    }
  }catch{}
  return true;
}

function fmt(sec){
  sec=Math.max(0,Math.floor(sec));
  return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
}

function tone(freq=700,d=.08,enabled=true,delay=0){
  if(!enabled)return;
  setTimeout(()=>{try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    const ctx=new Ctx(), o=ctx.createOscillator(), g=ctx.createGain();
    o.type='sine';o.frequency.value=freq;g.gain.value=.04;
    g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+d);
    o.connect(g).connect(ctx.destination);o.start();o.stop(ctx.currentTime+d);o.onended=()=>ctx.close();
  }catch{}},delay)
}

let sfxContext=null;
function getSfxContext(){
  try{
    if(!sfxContext||sfxContext.state==='closed'){
      const Ctx=window.AudioContext||window.webkitAudioContext;
      sfxContext=new Ctx();
    }
    if(sfxContext.state==='suspended')sfxContext.resume();
    return sfxContext;
  }catch{return null;}
}

function playSfx(kind='tap'){
  const ctx=getSfxContext();
  if(ctx)playUiEffect(ctx,kind);
}

const MUSIC_CHORDS={
  classroom:[
    [261.63,329.63,392,493.88],
    [220,261.63,329.63,392],
    [174.61,261.63,329.63,392],
    [196,246.94,293.66,392]
  ],
  travel:[
    [146.83,220,293.66,369.99],
    [164.81,246.94,329.63,415.3],
    [196,293.66,392,493.88],
    [220,329.63,440,554.37]
  ],
  history:[
    [146.83,220,261.63,329.63],
    [130.81,196,246.94,329.63],
    [116.54,174.61,233.08,293.66],
    [130.81,196,246.94,293.66]
  ],
  'history-old':[
    [110,164.81,220,293.66],
    [98,146.83,196,261.63],
    [116.54,174.61,233.08,293.66],
    [98,146.83,220,261.63]
  ],
  'history-new':[
    [174.61,220,261.63,329.63],
    [196,246.94,293.66,369.99],
    [164.81,220,261.63,329.63],
    [146.83,196,246.94,293.66]
  ],
  'history-bronze':[
    [130.81,196,261.63,329.63],
    [146.83,220,293.66,369.99],
    [123.47,185,246.94,311.13],
    [146.83,196,261.63,329.63]
  ],
  'history-joseon':[
    [146.83,220,293.66,349.23],
    [164.81,246.94,329.63,392],
    [130.81,196,261.63,329.63],
    [146.83,220,293.66,369.99]
  ]
};

const MUSIC_MOTIFS={
  classroom:[659.25,523.25,587.33,493.88],
  travel:[440,659.25,880,698.46],
  history:[293.66,329.63,261.63,246.94],
  'history-old':[220,164.81,196,146.83],
  'history-new':[523.25,659.25,587.33,783.99],
  'history-bronze':[392,587.33,493.88,739.99],
  'history-joseon':[440,523.25,659.25,587.33]
};

function playUiEffect(ctx,kind='tap'){
  try{
    if(ctx.state==='suspended')ctx.resume();
    const now=ctx.currentTime;
    const pitch=.94+Math.random()*.12;
    const voice=(from,to,delay=0,duration=.09,type='triangle',volume=.035)=>{
      const osc=ctx.createOscillator(),env=ctx.createGain(),start=now+delay;
      const audible=Math.min(.18,volume*2.7);
      osc.type=type;osc.frequency.setValueAtTime(from*pitch,start);
      osc.frequency.exponentialRampToValueAtTime(to*pitch,start+duration*.8);
      env.gain.setValueAtTime(.0001,start);
      env.gain.exponentialRampToValueAtTime(audible,start+.012);
      env.gain.exponentialRampToValueAtTime(.0001,start+duration);
      osc.connect(env).connect(ctx.destination);osc.start(start);osc.stop(start+duration+.02);
    };
    const noise=(delay=0,duration=.16,volume=.055,cutoff=2400)=>{
      const start=now+delay,length=Math.max(1,Math.floor(ctx.sampleRate*duration));
      const buffer=ctx.createBuffer(1,length,ctx.sampleRate),data=buffer.getChannelData(0);
      for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
      const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),env=ctx.createGain();
      source.buffer=buffer;filter.type='bandpass';filter.frequency.value=cutoff;filter.Q.value=.65;
      env.gain.setValueAtTime(.0001,start);env.gain.exponentialRampToValueAtTime(volume,start+.012);env.gain.exponentialRampToValueAtTime(.0001,start+duration);
      source.connect(filter).connect(env).connect(ctx.destination);source.start(start);source.stop(start+duration+.02);
    };
    if(kind==='tick'){voice(1250,720,0,.045,'square',.035);voice(1050,650,.13,.045,'square',.027);return}
    if(kind==='static'){noise(0,.24,.075,3100);voice(145,118,.02,.2,'sawtooth',.018);return}
    if(kind==='paper'){noise(0,.11,.048,1850);noise(.075,.13,.04,2600);return}
    if(kind==='chalk'){noise(0,.2,.04,4200);voice(1750,1050,.02,.18,'sine',.012);return}
    if(kind==='knock'){voice(170,92,0,.09,'triangle',.07);voice(145,78,.115,.1,'triangle',.055);return}
    if(kind==='whoosh'){noise(0,.28,.055,1150);voice(360,620,.02,.24,'sine',.018);return}
    if(kind==='sand'){noise(0,.32,.035,5200);voice(880,1320,.05,.13,'sine',.022);voice(1180,1660,.2,.12,'sine',.018);return}
    if(kind==='rustle'){noise(0,.12,.07,2100);noise(.085,.16,.055,1450);return}
    if(kind==='cloth'){noise(0,.38,.075,980);voice(260,390,.06,.3,'sine',.018);return}
    if(kind==='step'){voice(118,76,0,.08,'triangle',.045);noise(.07,.08,.025,650);voice(105,70,.22,.075,'triangle',.038);return}
    if(kind==='stone'){voice(310,155,0,.11,'triangle',.06);noise(.015,.09,.035,1250);voice(220,115,.1,.1,'sine',.035);return}
    if(kind==='heavy-stone'){voice(125,58,0,.28,'triangle',.075);noise(.02,.26,.07,430);voice(82,48,.18,.28,'sine',.05);return}
    if(kind==='fire'){noise(0,.28,.04,3600);voice(180,260,.03,.12,'sawtooth',.012);noise(.15,.16,.025,5200);return}
    if(kind==='water'){noise(0,.32,.042,1350);voice(620,910,.04,.13,'sine',.02);voice(760,1120,.17,.14,'sine',.018);return}
    if(kind==='basket'){noise(0,.16,.045,1850);voice(235,165,.05,.1,'triangle',.03);return}
    if(kind==='wood'){voice(260,128,0,.1,'triangle',.052);voice(205,105,.12,.1,'triangle',.04);return}
    if(kind==='door'){voice(145,72,0,.42,'sawtooth',.04);noise(.05,.48,.05,520);voice(92,55,.36,.25,'triangle',.05);return}
    if(kind==='gear'){voice(440,660,0,.14,'triangle',.035);voice(660,990,.12,.18,'sine',.032);voice(880,1320,.27,.22,'sine',.025);noise(.04,.32,.018,3400);return}
    if(kind==='rope'){noise(0,.2,.055,1600);voice(190,145,.04,.13,'sine',.018);return}
    if(kind==='spin'){voice(720,520,0,.06,'triangle',.028);voice(820,610,.09,.06,'triangle',.026);voice(920,700,.18,.07,'triangle',.024);return}
    if(kind==='pottery'){voice(520,260,0,.18,'sine',.04);voice(780,390,.025,.22,'sine',.022);return}
    if(kind==='metal'){voice(910,1360,0,.28,'sine',.04);voice(1210,1810,.03,.34,'sine',.024);return}
    if(kind==='bell'){voice(740,1110,0,.38,'sine',.045);voice(1110,1660,.02,.46,'sine',.027);voice(1480,1850,.04,.34,'sine',.015);return}
    if(kind==='ritual'){voice(196,130.81,0,.34,'triangle',.05);voice(698.46,1046.5,.08,.58,'sine',.034);voice(1046.5,1568,.12,.64,'sine',.02);noise(.26,.32,.026,1050);return}
    if(kind==='wind'){noise(0,.42,.035,920);voice(330,430,.04,.34,'sine',.012);return}
    if(kind==='cave'){voice(210,145,0,.32,'sine',.032);voice(315,218,.1,.42,'sine',.018);noise(.03,.22,.02,720);return}
    if(kind==='warning'){voice(760,570,0,.16,'square',.042);voice(820,610,.2,.16,'square',.042);voice(910,680,.4,.2,'square',.04);return}
    if(kind==='lever'){voice(135,70,0,.17,'sawtooth',.065);noise(.08,.16,.05,760);voice(430,190,.17,.18,'triangle',.045);return}
    if(kind==='coordinate'){voice(310,465,0,.16,'sine',.035);voice(465,698,.13,.2,'sine',.032);noise(.18,.18,.025,3600);return}
    if(kind==='warp'){voice(180,720,0,.65,'sawtooth',.035);voice(260,1040,.12,.72,'sine',.03);noise(.2,.55,.045,1800);return}
    if(kind==='inspect'){voice(285,430,0,.12,'sine',.042);voice(430,570,.075,.11,'triangle',.025);return}
    if(kind==='select'){voice(560,720,0,.075,'sine',.03);return}
    if(kind==='confirm'){voice(392,523.25,0,.12,'triangle',.038);voice(523.25,659.25,.095,.16,'sine',.032);return}
    if(kind==='success'){voice(392,523.25,0,.14,'sine',.035);voice(523.25,659.25,.11,.16,'sine',.032);voice(659.25,783.99,.23,.2,'sine',.028);return}
    if(kind==='restore'){voice(329.63,493.88,0,.15,'triangle',.04);voice(493.88,659.25,.1,.2,'sine',.035);voice(659.25,987.77,.23,.32,'sine',.026);noise(.06,.32,.018,4200);return}
    if(kind==='discovery'){voice(523.25,659.25,0,.09,'triangle',.035);voice(659.25,880,.1,.12,'sine',.03);voice(880,1174.66,.21,.18,'sine',.022);return}
    if(kind==='surprise'){voice(310,620,0,.12,'triangle',.035);voice(470,940,.11,.16,'sine',.026);noise(0,.09,.025,2800);return}
    if(kind==='dialogue'){voice(420,520,0,.065,'sine',.018);voice(500,620,.075,.07,'triangle',.014);return}
    if(kind==='error'){voice(210,165,0,.16,'square',.018);voice(185,145,.11,.18,'triangle',.022);return}
    if(kind==='error2'){voice(330,220,0,.12,'sawtooth',.026);voice(280,170,.13,.19,'square',.018);return}
    if(kind==='error3'){voice(520,390,0,.09,'triangle',.03);voice(390,260,.1,.11,'triangle',.028);voice(260,175,.21,.16,'sine',.025);return}
    if(kind==='error4'){noise(0,.16,.05,680);voice(155,82,.03,.18,'square',.025);voice(120,70,.18,.16,'triangle',.028);return}
    if(kind==='close'){voice(430,230,0,.11,'triangle',.035);return}
    if(kind==='toggle'){voice(330,440,0,.085,'sine',.028);return}
    voice(520,310,0,.09,'triangle',.035);
  }catch{}
}

function uiEffectKind(target){
  if(target?.closest?.('.chain-x,.x'))return 'close';
  if(target?.closest?.('.audio-tab,.bgm-switch'))return 'toggle';
  if(target?.closest?.('.hot,.chain-hit'))return 'inspect';
  if(target?.closest?.('.answer-grid,.radio-choices,.puzzle-parts,.use-grid'))return 'select';
  if(target?.closest?.('.puzzle-main,.gbtn.primary,.gbtn.danger,.route-ready'))return 'confirm';
  return 'tap';
}

function useAmbientMusic(enabled,mode,volume){
  const audio=useRef(null);
  const master=useRef(null);
  const timer=useRef(null);
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    const unlock=e=>{
      try{
        if(!audio.current){
          const Ctx=window.AudioContext||window.webkitAudioContext;
          audio.current=new Ctx();
          master.current=audio.current.createGain();
          master.current.gain.value=.0001;
          master.current.connect(audio.current.destination);
        }
        audio.current.resume();
        setReady(true);
      }catch{}
      window.removeEventListener('pointerdown',unlock);
      window.removeEventListener('keydown',unlock);
    };
    window.addEventListener('pointerdown',unlock,{once:true});
    window.addEventListener('keydown',unlock,{once:true});
    return()=>{
      window.removeEventListener('pointerdown',unlock);
      window.removeEventListener('keydown',unlock);
    };
  },[]);

  useEffect(()=>{
    const ctx=audio.current,gain=master.current;
    if(!ready||!ctx||!gain)return;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setTargetAtTime(enabled?Math.min(1,Math.max(0,volume)):0,ctx.currentTime,.18);
  },[enabled,ready,volume]);

  useEffect(()=>{
    clearInterval(timer.current);
    const ctx=audio.current,gain=master.current;
    if(!ready||!ctx||!gain)return;
    if(!enabled)return;
    const chords=MUSIC_CHORDS[mode]||MUSIC_CHORDS.classroom;
    const motif=MUSIC_MOTIFS[mode]||MUSIC_MOTIFS.classroom;
    const historyMode=mode.startsWith('history');
    const gap=mode==='travel'?1900:historyMode?3900:4600;
    const duration=mode==='travel'?2.45:historyMode?4.8:5.6;
    let step=0;
    const play=()=>{
      if(ctx.state==='suspended')ctx.resume();
      const now=ctx.currentTime;
      const chord=chords[step%chords.length];
      chord.forEach((frequency,i)=>{
        const osc=ctx.createOscillator(),env=ctx.createGain(),filter=ctx.createBiquadFilter();
        osc.type=i===0?'triangle':'sine';
        osc.frequency.setValueAtTime(frequency,now);
        osc.detune.value=i%2?-3:3;
        filter.type='lowpass';filter.frequency.value=mode==='travel'?1450:1050;filter.Q.value=.55;
        env.gain.setValueAtTime(.0001,now);
        env.gain.exponentialRampToValueAtTime(i===0?.021:.014,now+(mode==='travel'?.12:.7));
        env.gain.setValueAtTime(i===0?.021:.014,now+duration*.72);
        env.gain.exponentialRampToValueAtTime(.0001,now+duration);
        osc.connect(filter).connect(env).connect(gain);osc.start(now);osc.stop(now+duration+.08);
      });
      const melody=motif[step%motif.length];
      const offsets=mode==='travel'?[.18,.72,1.32]:mode==='history-old'?[.28,1.72]:mode==='history-bronze'?[.22,1.08,2.18]:[.24,1.42,2.55];
      offsets.forEach((offset,i)=>{
        const osc=ctx.createOscillator(),env=ctx.createGain(),filter=ctx.createBiquadFilter();
        const start=now+offset;
        osc.type=mode==='history-bronze'?'sine':mode==='history-old'?'triangle':'sine';
        osc.frequency.value=melody*(i===1?1.125:i===2?.75:1);
        filter.type='lowpass';filter.frequency.value=mode==='history-bronze'?2300:1500;
        env.gain.setValueAtTime(.0001,start);
        env.gain.exponentialRampToValueAtTime(mode==='history-old'?.008:.012,start+.02);
        env.gain.exponentialRampToValueAtTime(.0001,start+(mode==='history-bronze'?.7:.42));
        osc.connect(filter).connect(env).connect(gain);osc.start(start);osc.stop(start+.78);
      });
      if(mode==='history-old'||mode==='history-bronze'){
        [0.05,1.95].forEach(offset=>{
          const osc=ctx.createOscillator(),env=ctx.createGain(),start=now+offset;
          osc.type='triangle';osc.frequency.setValueAtTime(mode==='history-old'?72:88,start);osc.frequency.exponentialRampToValueAtTime(48,start+.13);
          env.gain.setValueAtTime(.0001,start);env.gain.exponentialRampToValueAtTime(.012,start+.01);env.gain.exponentialRampToValueAtTime(.0001,start+.16);
          osc.connect(env).connect(gain);osc.start(start);osc.stop(start+.18);
        });
      }
      step+=1;
    };
    play();
    timer.current=setInterval(play,gap);
    return()=>clearInterval(timer.current);
  },[enabled,mode,ready]);

  useEffect(()=>{
    const click=e=>{
      const button=e.target?.closest?.('button');
      if(button&&!button.dataset.sfxManual)playSfx(uiEffectKind(e.target));
    };
    const change=e=>{if(e.target?.matches?.('select,input'))playSfx('select')};
    const custom=e=>playSfx(e.detail||'tap');
    document.addEventListener('pointerdown',click);
    document.addEventListener('change',change);
    window.addEventListener('game-sfx',custom);
    return()=>{document.removeEventListener('pointerdown',click);document.removeEventListener('change',change);window.removeEventListener('game-sfx',custom)};
  },[]);

  useEffect(()=>()=>{
    clearInterval(timer.current);
    audio.current?.close?.();
  },[]);
}

function App(){
  const [game,setGame]=useState(load);
  const [coverOpen,setCoverOpen]=useState(shouldShowCover);
  const [hasSave,setHasSave]=useState(hasSavedProgress);
  const [restartConfirm,setRestartConfirm]=useState(false);
  const [modal,setModal]=useState(null);
  const [speech,setSpeech]=useState(game.introSeen?'':'다들 갔네.\n나도 가방 챙겨서 가야겠다.');
  const [sceneBubble,setSceneBubble]=useState(null);
  const [remaining,setRemaining]=useState(1800);
  const [audioOpen,setAudioOpen]=useState(false);
  const [historyEra,setHistoryEra]=useState('old');
  const stage=useRef(null);
  const audioDock=useRef(null);
  const bubbleTimer=useRef(null);
  const coverOpenedAt=useRef(Date.now());
  const musicMode=coverOpen?'classroom':game.scene==='done'?`history-${historyEra}`:game.scene==='traveling'?'travel':'classroom';
  useAmbientMusic(game.sound,musicMode,game.musicVolume);

  useEffect(()=>localStorage.setItem(KEY,JSON.stringify(game)),[game]);
  useEffect(()=>{
    const outside=e=>{if(audioOpen&&!audioDock.current?.contains(e.target))setAudioOpen(false)};
    const escape=e=>{if(e.key==='Escape')setAudioOpen(false)};
    document.addEventListener('pointerdown',outside);
    document.addEventListener('keydown',escape);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)};
  },[audioOpen]);
  useEffect(()=>setAudioOpen(false),[game.scene]);
  useEffect(()=>{
    if(coverOpen)return;
    if(!game.introSeen){
      const t=setTimeout(()=>{setSpeech('');setGame(g=>({...g,introSeen:true}))},2200);
      return()=>clearTimeout(t);
    }
  },[coverOpen,game.introSeen]);
  useEffect(()=>{
    if(coverOpen)return;
    if(!game.timerStarted){setRemaining(1800);return}
    const tick=()=>setRemaining(Math.max(0,1800-(Date.now()-game.timerStartedAt)/1000));
    tick();const id=setInterval(tick,250);return()=>clearInterval(id);
  },[coverOpen,game.timerStarted,game.timerStartedAt]);
  useEffect(()=>{
    if(coverOpen)return;
    const timers=[];
    if(game.scene==='warning')timers.push(setTimeout(()=>setGame(g=>({...g,scene:'error'})),650));
    if(game.scene==='error'){
      timers.push(setTimeout(()=>setSpeech('기계의 핵심 부품인\n네 개의 시간 톱니가 과거로 흩어졌습니다.'),650));
      timers.push(setTimeout(()=>setSpeech('잠깐...\n이거 진짜 타임머신이야?'),2150));
      timers.push(setTimeout(()=>{setSpeech('');setGame(g=>({...g,scene:'ready'}))},3700));
    }
    if(game.scene==='ready'&&!game.machine.leverReady){
      timers.push(setTimeout(()=>{
        playSfx('coordinate');
        setGame(g=>({...g,machine:{...g.machine,leverReady:true}}));
        setSpeech('레버 옆 램프가 켜졌어.\n이걸 움직이면 무슨 일이 생길까?');
      },450));
    }
    if(game.scene==='traveling')timers.push(setTimeout(()=>setGame(g=>({...g,scene:'done'})),2800));
    return()=>timers.forEach(clearTimeout);
  },[coverOpen,game.scene,game.machine.leverReady]);

  const error=['warning','error','ready','traveling'].includes(game.scene);
  const progressed=error;
  const count=id=>game.clicks[id]||0;
  const mark=id=>setGame(g=>({...g,clicks:{...g.clicks,[id]:(g.clicks[id]||0)+1}}));
  const showObjectBubble=(text,left,top)=>{
    clearTimeout(bubbleTimer.current);
    setSceneBubble({text,left,top});
    bubbleTimer.current=setTimeout(()=>setSceneBubble(null),2600);
  };
  const clearObjectBubble=()=>{
    clearTimeout(bubbleTimer.current);
    setSceneBubble(null);
  };

  function inspect(id){
    const sounds={book:'paper',board:'chalk',clock:'tick',tv:'static',desk:'knock',window:'whoosh',sticker:'sand',trash:'rustle',cabinet:'knock',timetable:'paper',covered:'cloth'};
    playSfx(sounds[id]||'inspect');
    if(id==='covered'&&game.machine.uncovered){
      const lines=[
        '둥근 창과 작은 램프, 커다란 레버가 달려 있다.',
        '이런 기계가 왜 교실에 있는 거지?',
        '오른쪽 아래의 빨간 버튼이 유난히 눈에 띈다.'
      ];
      const index=Math.min(count('machine'),lines.length-1);
      mark('machine');
      showObjectBubble(lines[index],'55%','27%');
      return;
    }
    mark(id);
    const reaction=OBJECT_REACTIONS[id];
    if(reaction){
      const index=Math.min(count(id),reaction.lines.length-1);
      const text=id==='tv'&&index===2
        ?(game.machine.uncovered?'TV: 오늘은 나 말고 저 수상한 기계를 봐 줘.':'TV: 나보다 저 천으로 덮인 물체가 더 수상한데?')
        :reaction.lines[index];
      showObjectBubble(text,reaction.left,reaction.top);
    }
    if(id==='covered')setModal({type:'covered',step:1});
  }

  function reveal(){
    playSfx('cloth');
    clearObjectBubble();
    setModal(null);
    setGame(g=>({...g,scene:'machine',machine:{...g.machine,uncovered:true}}));
    setSpeech('천 아래에서 낯선 기계가\n모습을 드러냈다.');
    setTimeout(()=>setSpeech(''),1700);
  }

  function accident(){
    playSfx('warning');
    clearObjectBubble();
    setModal(null);
    setSpeech('');
    setGame(g=>({...g,scene:'warning',timerStarted:true,timerStartedAt:g.timerStartedAt||Date.now()}));
    tone(560,.1,true,450);tone(820,.1,true,700);tone(620,.1,true,930);
  }

  function pull(){
    if(!game.machine.leverReady)return;
    playSfx('lever');
    clearObjectBubble();
    setGame(g=>({...g,scene:'traveling'}));
    setTimeout(()=>playSfx('warp'),180);
  }

  const replayIntro=()=>{
    try{sessionStorage.setItem(SKIP_COVER_ONCE,'1')}catch{}
    localStorage.removeItem(KEY);
    location.reload();
  };
  const continueGame=()=>{
    const pausedFor=Date.now()-coverOpenedAt.current;
    setGame(g=>g.timerStarted&&g.timerStartedAt?{...g,timerStartedAt:g.timerStartedAt+pausedFor}:g);
    setRestartConfirm(false);
    setCoverOpen(false);
  };
  const startFresh=()=>{
    if(hasSave&&!restartConfirm){
      setRestartConfirm(true);
      playSfx('warning');
      return;
    }
    localStorage.removeItem(KEY);
    localStorage.removeItem(STAGE2_KEY);
    const fresh={...initial,clicks:{},machine:{...initial.machine}};
    setGame(fresh);
    setModal(null);
    setSceneBubble(null);
    setSpeech('다들 갔네.\n나도 가방 챙겨서 가야겠다.');
    setRemaining(1800);
    setHistoryEra('old');
    setAudioOpen(false);
    setHasSave(false);
    setRestartConfirm(false);
    setCoverOpen(false);
  };
  const full=()=>stage.current?.requestFullscreen?.();
  const audioControls=(history=false)=><div ref={audioDock} className={`audio-dock ${history?'history-audio':'intro-audio'}`}>
    <button className={`audio-tab ${audioOpen?'open':''}`} onClick={()=>setAudioOpen(v=>!v)} aria-expanded={audioOpen} aria-controls="audio-settings-panel" aria-label="음향 설정" title={audioOpen?'음향 설정 닫기':'음향 설정 열기'}>
      {game.sound&&game.musicVolume>0?<Volume2/>:<VolumeX/>}<span>음향</span>
    </button>
    {audioOpen&&<div id="audio-settings-panel" className="audio-panel" role="group" aria-label="음향 설정 메뉴">
      <label><span>♪ 배경음악 크기 <output>{Math.round(game.musicVolume*100)}%</output></span><input aria-label="배경음악 크기" aria-valuetext={`${Math.round(game.musicVolume*100)}퍼센트`} type="range" min="0" max="100" step="1" value={Math.round(game.musicVolume*100)} onChange={e=>setGame(g=>({...g,musicVolume:Number(e.target.value)/100}))}/></label>
      <button aria-pressed={game.sound} className={`bgm-switch ${game.sound?'on':''}`} onClick={()=>setGame(g=>({...g,sound:!g.sound}))}>{game.sound?'배경음악 켜짐':'배경음악 꺼짐'}</button>
      <small>효과음은 계속 재생됩니다.</small>
    </div>}
  </div>;

  return <main className="shell">
    <section ref={stage} className={`stage ${error?'error-state':''} ${game.scene==='traveling'?'traveling':''}`}>
      <img className="bg" src={game.machine.uncovered?classroomRevealed:classroomCovered} alt="방과 후 교실" draggable="false"/>
      <ClassroomClock/>
      <div className="chalkboard-copy" aria-hidden="true"><small>오늘의 질문</small><b>옛날 사람들의 생활은<br/>어떻게 알 수 있을까?</b><em>남아 있는 흔적</em></div>

      <Hot style={{left:'36.2%',top:'15.2%',width:'28.5%',height:'35.5%'}} label="칠판" onClick={()=>inspect('board')}/>
      <Hot style={{left:'65.4%',top:'4.5%',width:'9.2%',height:'16.5%'}} label="교실 시계" onClick={()=>inspect('clock')}/>
      <Hot style={{left:'76.2%',top:'4.2%',width:'16.8%',height:'23.5%'}} label="TV" onClick={()=>inspect('tv')}/>
      <Hot style={{left:'14.5%',top:'56.5%',width:'32%',height:'18.5%'}} label="선생님 책상" onClick={()=>inspect('desk')}/>
      <Hot style={{left:'0%',top:'1%',width:'20.5%',height:'55%'}} label="창문" onClick={()=>inspect('window')}/>
      <Hot style={{left:'87%',top:'61%',width:'7.2%',height:'18.5%'}} label="쓰레기통" onClick={()=>inspect('trash')}/>
      <Hot style={{left:'77%',top:'29%',width:'15.5%',height:'31%'}} label="뒤쪽 캐비닛" onClick={()=>inspect('cabinet')}/>
      <Hot className="covered-hot" style={{left:'55.5%',top:'29%',width:'31.5%',height:'54%'}} label="천으로 덮인 수상한 물체" onClick={()=>inspect('covered')}/>
      <Hot className="timetable-hot" style={{left:'57.8%',top:'28.2%',width:'6.8%',height:'17.2%'}} label="시간표" onClick={()=>inspect('timetable')}/>
      <Hot className="book-hot" style={{left:'24.5%',top:'72.5%',width:'17.5%',height:'14.5%'}} label="사회 교과서" onClick={()=>inspect('book')}/>
      <button className="hourglass" data-sfx-manual="true" onClick={()=>inspect('sticker')} aria-label="작은 모래시계"></button>

      {game.machine.uncovered&&<TimeMachine state={game.scene} leverReady={game.machine.leverReady} onRed={()=>{playSfx('warning');setModal({type:'red',step:1})}} onLever={pull}/>} 

      {error&&<>
        <div className="machine-screen-error">⚠ 시간 장치 오류</div>
        <div className="reverse-hand"></div>
        <div className="flicker"></div>
      </>}
      {game.timerStarted&&game.scene!=='done'&&<div className={`machine-timer ${remaining<=60?'urgent':''}`}><small>귀환까지</small><b>{fmt(remaining)}</b></div>}
      {(game.scene==='error'||game.scene==='ready')&&<Shards/>}
      <Speech text={speech} danger={error} nearMachine={game.machine.uncovered}/> 
      {sceneBubble&&<div className="object-bubble" style={{left:sceneBubble.left,top:sceneBubble.top}}>{sceneBubble.text}</div>}
      {modal&&<Modal data={modal} setModal={setModal} close={()=>setModal(null)} reveal={reveal} accident={accident} reset={replayIntro}/>} 
      {game.scene==='traveling'&&<div className="travel-end intro-travel"><div className="travel-streaks">{Array.from({length:10},(_,i)=><i key={i}/>)}</div><img className="travel-hero" src={characterTimeTravel} alt="놀란 표정으로 시간 통로에 빨려 들어가는 여자아이"/><div className="ring">⌛</div><h1>시간 여행 중...</h1><p>선사 시대로 이동합니다</p></div>}
      {game.scene==='done'&&<Stage2Escape onReplayIntro={replayIntro} onEraChange={setHistoryEra} audioControl={audioControls(true)}/>} 
      {game.scene!=='done'&&audioControls(false)}
      {coverOpen&&<GameCover hasSave={hasSave} confirming={restartConfirm} onContinue={continueGame} onStartFresh={startFresh} onCancel={()=>setRestartConfirm(false)}/>} 
    </section>
  </main>
}

function GameCover({hasSave,confirming,onContinue,onStartFresh,onCancel}){
  return <div className="game-cover" role="dialog" aria-modal="true" aria-labelledby="game-cover-title">
    <img className="game-cover-bg" src={classroomCovered} alt="" aria-hidden="true"/>
    <div className="game-cover-shade" aria-hidden="true"/>
    <div className="game-cover-gears" aria-hidden="true"><i>⚙</i><i>⌛</i><i>⚙</i></div>
    <section className="game-cover-card">
      <div className="game-cover-copy">
        <small>5학년 사회 · 역사 탐험 게임</small>
        <h1 id="game-cover-title">역사 속에 갇혔다!</h1>
        <h2>고장 난 타임머신</h2>
        <p>교실에서 발견한 수상한 기계.<br/>흩어진 시간 톱니를 찾아 역사의 기록을 되돌리자!</p>
        <div className="game-cover-route" aria-label="게임 범위"><span>구석기</span><b>→</b><span>신석기</span><b>→</b><span>청동기</span><b>→</b><span>고조선</span></div>
        {!confirming?<div className="game-cover-actions">
          <button className={`cover-continue ${!hasSave?'disabled':''}`} onClick={onContinue} disabled={!hasSave}><Play/>이어하기</button>
          <button className={!hasSave?'cover-start primary':'cover-start'} onClick={onStartFresh}><RotateCcw/>{hasSave?'처음부터 다시하기':'처음부터 시작하기'}</button>
          {!hasSave&&<em>아직 저장된 기록이 없습니다.</em>}
        </div>:<div className="cover-confirm" role="alert">
          <strong>지금까지의 기록을 지울까요?</strong>
          <p>구석기부터 고조선까지 해결한 내용이 모두 초기화됩니다.</p>
          <div><button onClick={onCancel}>취소</button><button className="confirm-reset" onClick={onStartFresh}>기록 지우고 시작</button></div>
        </div>}
      </div>
      <img className="game-cover-hero" src={characterTimeTravel} alt="시간 여행을 앞두고 놀란 주인공 여자아이"/>
    </section>
    <p className="game-cover-tip">이어하기를 누르면 마지막으로 저장된 장면에서 계속됩니다.</p>
  </div>
}


function Hot({style,label,onClick,className=''}){return <button className={`hot ${className}`} data-sfx-manual="true" style={style} onClick={onClick} aria-label={label}></button>}

function ClassroomClock(){
  return <div className="clock-fix" aria-hidden="true">
    {Array.from({length:12},(_,i)=>{
      const n=i+1,angle=n*Math.PI/6;
      return <span className="clock-number" key={n} style={{left:`${50+36*Math.sin(angle)}%`,top:`${50-36*Math.cos(angle)}%`}}>{n}</span>
    })}
    <i className="hour-hand"></i><i className="minute-hand"></i><i className="clock-pin"></i>
  </div>
}

function Speech({text,danger,nearMachine}){
  const lines=(text||'').split('\n');
  return <div className={`speech ${danger?'danger':''} ${text?'has-text':'idle'} ${nearMachine?'near-machine':''}`}>
    <div className={`hero-wrap ${danger?'surprised':''}`}>
      <img className="hero-art" src={characterNormal} alt="주인공 여자아이"/>
      {danger&&<span className="surprise-mark">!</span>}
    </div>
    {text&&<div className="bubble">{lines.map((t,i)=><React.Fragment key={i}>{t}{i<lines.length-1&&<br/>}</React.Fragment>)}</div>}
  </div>
}

function Modal({data,setModal,close,reveal,accident,reset}){
  const x=<button className="x" onClick={close}><X/></button>;
  if(data.type==='text')return <Backdrop><Card>{x}<Title>{data.title}</Title><p>{data.body}</p></Card></Backdrop>;
  if(data.type==='book')return <Backdrop><Card wide>{x}<Title>사회 교과서</Title><div className="scene-detail book-detail"><img src={classroomCovered} alt="책상 위 사회 교과서"/></div><p>오늘 선사 시대부터 고조선까지 배웠다.</p></Card></Backdrop>;
  if(data.type==='board')return <Backdrop><Card>{x}<Title>🟩 칠판</Title><div className="mini-board"><b>오늘의 질문</b><p>옛날 사람들의 생활은<br/>어떻게 알 수 있을까?</p><em>남아 있는 흔적</em></div><p>선생님이 마지막에 강조했던 말이다.</p></Card></Backdrop>;
  if(data.type==='window')return <Backdrop><Card>{x}<Title>🌇 창문</Title><div className="window-closeup"><img src={windowView} alt="햇살이 비치는 텅 빈 운동장"/></div><p>운동장에도 아무도 없네.</p><small>창틀 한쪽에 작은 모래시계 스티커가 붙어 있다.</small></Card></Backdrop>;
  if(data.type==='trash')return <Backdrop><Card>{x}<Title>🗑️ 쓰레기통</Title><p>{data.step===1?'역사 탐험을 하다가\n쓰레기통까지 살펴보게 될 줄이야...':'우유갑 하나.\n끝.'}</p>{data.step===1&&<GameButton onClick={()=>setModal({type:'trash',step:2})}>그래도 본다</GameButton>}</Card></Backdrop>;
  if(data.type==='timetable')return <Backdrop><Card>{x}<Title>📋 시간표</Title><div className="timetable-card"><b>오늘의 시간표</b><span>1. 국어</span><span>2. 사회</span><span>3. 수학</span><span>4. 과학</span><span>5. 체육</span></div><p>오늘 사회 시간에 선사 시대부터 고조선까지 정리했지.</p></Card></Backdrop>;
  if(data.type==='cabinet')return <Backdrop><Card>{x}<Title>🗄️ 뒤쪽 캐비닛</Title><div className="box">📦</div><p>{data.step===1?'위에 작은 상자가 있다.':'너무 높아서 닿지 않는다.'}</p>{data.step===1&&<GameButton onClick={()=>setModal({type:'cabinet',step:2})}>손을 뻗어 본다</GameButton>}</Card></Backdrop>;
  if(data.type==='covered')return <Backdrop><Card wide className="covered-card">{x}<Title>수상한 물체</Title><div className={`scene-detail ${data.step===2?'covered-peek-natural':'covered-scene-full'}`}><img src={data.step===2?coveredCloseupNatural:classroomCovered} alt={data.step===2?'천 아래로 드러난 기계의 아랫부분':'교실 한쪽에서 천으로 완전히 덮인 수상한 물체'}/></div><p>{data.step===1?'커다란 물체가 천에 완전히 덮여 있다.':'천 아래로 낡은 금속 기계의 아랫부분이 보인다.\n기계...? '}</p>{data.step===1?<GameButton onClick={()=>setModal({type:'covered',step:2})}>천 아래를 살짝 본다</GameButton>:<GameButton primary onClick={reveal}>천을 걷어 본다</GameButton>}</Card></Backdrop>;
  if(data.type==='machineInfo')return <Backdrop><Card wide>{x}<Title>수상한 기계</Title><div className="scene-detail machine-detail"><img src={classroomRevealed} alt="교실에 놓인 수상한 금속 기계"/></div><p>둥근 창과 작은 램프, 커다란 레버가 달려 있다.<br/>교실에 왜 이런 기계가 있는 거지?</p><small>오른쪽 아래의 빨간 버튼이 유난히 눈에 띈다.</small></Card></Backdrop>;
  if(data.type==='red')return <Backdrop><Card center>{x}<div className="tape">절대 누르지 마시오</div><p>{data.step===1?'기계 오른쪽 아래에 빨간 버튼이 있다.\n절대 누르지 말라고 쓰여 있는데.':'......\n누르면 어떻게 되는지만 확인해 볼까?'}</p>{data.step===1?<GameButton onClick={()=>setModal({type:'red',step:2})}>조금 더 살펴본다</GameButton>:<GameButton danger onClick={accident}>누른다</GameButton>}</Card></Backdrop>;
  if(data.type==='tvError')return <Backdrop><Card>{x}<Title>📺 TV</Title><div className="tv-panel">⚠ 시간 장치 오류</div><p>아까는 꺼져 있었는데 저절로 켜졌다.</p></Card></Backdrop>;
  if(data.type==='emptyBag')return <Backdrop><Card>{x}<Title>🎒 가방</Title><div className="empty">아직 가방이 비어 있습니다.</div></Card></Backdrop>;
  if(data.type==='emptyNote')return <Backdrop><Card>{x}<Title>📖 시간수첩</Title><div className="empty">아직 기록된 시간 단서가 없습니다.</div></Card></Backdrop>;
  if(data.type==='help')return <Backdrop><Card>{x}<Title>🔔 도움 요청</Title><p>{data.after?'타임머신에서 가장 눈에 띄는 부분을 눌러 봐. 경고문이 붙은 곳 말이야.':'교실 가운데에 어제까지 없었던 것 같은 물체가 하나 보여. 천으로 덮여 있네.'}</p><button className="reset-link" onClick={reset}><RotateCcw size={15}/> 처음부터 다시 하기</button></Card></Backdrop>;
  return null;
}

function Backdrop({children}){return <div className="backdrop">{children}</div>}
function Card({children,wide,center,className=''}){return <div className={`card ${wide?'wide':''} ${center?'center':''} ${className}`}>{children}</div>}
function Title({children}){return <div className="title">{children}</div>}
function GameButton({children,onClick,primary,danger}){return <button className={`gbtn ${primary?'primary':''} ${danger?'danger':''}`} onClick={onClick}>{children}</button>}

function TimeMachine({state,leverReady,onRed,onLever}){
  const err=['warning','error','ready','traveling'].includes(state);
  return <div className={`machine-controls ${err?'machine-error':''}`}>
    <div className={`machine-monitor-integrated ${err?'error':''}`}>
      <strong>시간 이동 장치</strong>
      <span>{err?'역사 정보 오류':'상태 : 대기 중'}</span>
      <span>{err?'귀환 장치 정지':'목적지 : 미설정'}</span>
    </div>
    <div className="machine-lamps-integrated">{[0,1,2,3,4].map(i=><i key={i} style={{animationDelay:`${i*.1}s`}}></i>)}</div>
    <div className={`machine-warning-integrated ${err?'on':''}`}></div>
    <button className="red-hit-integrated" data-sfx-manual="true" onClick={onRed} aria-label="빨간 버튼"></button>
    <button className={`lever-hit-integrated ${leverReady?'ready':''}`} data-sfx-manual="true" onClick={onLever} aria-label="빛나는 레버"></button>
  </div>
}

function Shards(){return <div className="shards">{[0,1,2,3].map(i=><span key={i} className={`shard s${i}`}>◆</span>)}</div>}

createRoot(document.getElementById('root')).render(<App/>);
