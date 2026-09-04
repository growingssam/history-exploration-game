import React, {useEffect, useMemo, useState} from 'react';
import {BookOpen, Lightbulb, RotateCcw, Volume2, VolumeX, X} from 'lucide-react';
import valley from './assets/time_valley_prehistory_gojoseon.png';
import paleolithic from './assets/scene_paleolithic.png';
import neolithic from './assets/scene_neolithic.png';
import bronzeAge from './assets/scene_bronze.png';
import gojoseon from './assets/scene_gojoseon.png';
import characterNormal from './assets/character_normal.png';
import classroomReturn from './assets/classroom_revealed_integrated.png';

const KEY='historyEscapeStage2_v3_deep_puzzles';
const START={solved:[],found:[],attempts:0,finished:false,sound:true};
const CLUES={
  fire:['불 덕분에 추위와 사나운 짐승을 피할 수 있었어.','고기도 익혀 먹었겠지. 불은 구석기 생활의 큰 변화야.'],
  cave:['동굴과 바위 그늘은 구석기 사람들의 생활 터전이었어.','한곳에 오래 머물지 않고 먹을 것을 찾아 이동했대.'],
  shelter:['비바람만 겨우 피하는 막집이야. 이동 생활에 잘 맞겠어.','이건 움집이 아니야. 땅을 깊게 파지 않은 임시 집이야.'],
  hide:['동물 가죽으로 옷을 만들어 입었구나.','가죽은 풀로 만든 옷보다 오래 입을 수 있었대.'],
  village:['강가에 움집이 모여 있어. 신석기에는 마을을 이루었지.','농사를 짓기 시작하면서 한곳에 머무는 시간이 길어졌어.'],
  fence:['도랑과 나무 울타리로 마을을 지켰네. 청동기에는 전쟁도 일어났어.','강가 근처 산지나 낮은 언덕에 마을을 만들었대.'],
  store:['곡식을 따로 보관한 창고야. 수확량이 늘어난 흔적이지.','재산 차이가 생기며 지배자가 등장한 까닭과 이어져.'],
  dolmen:['이 거대한 덮개돌을 옮기려면 많은 사람을 이끄는 지배자가 필요했겠어.','고인돌에서는 청동기뿐 아니라 간석기도 발견돼.'],
  map:['비파형 동검과 탁자식 고인돌의 분포를 함께 보면 고조선의 문화 범위를 짐작할 수 있어.','한반도 북부와 중국 동북쪽을 중심으로 발전했지.'],
};

const missions={
  old:{tag:'구석기',title:'이동하는 무리의 생존 계획',note:'구석기 · 뗀석기 · 이동 생활 · 막집·동굴 · 불',success:'먹을 것을 찾아 이동하던 구석기 생활의 기억이 모두 복구됐어.',steps:[
    {title:'짐 꾸리기',question:'먹을 것을 찾아 곧 이동해야 한다. 구석기 무리가 가져갈 물건 세 개를 고르자.',choices:['주먹 도끼','동물 가죽','불씨','빗살무늬 토기','청동 거울'],answers:[0,1,2],hint:'이동 생활, 뗀석기, 불 사용을 떠올려 봐.'},
    {title:'주먹 도끼 사용하기',question:'주먹 도끼로 할 수 있는 일을 모두 고르자.',choices:['풀뿌리를 캐기','고기를 자르기','단단한 것을 두들기기','실을 뽑기'],answers:[0,1,2],hint:'주먹 도끼는 한 가지 일만 하는 도구가 아니야.'},
    {title:'생활 기록 고치기',question:'시간수첩의 잘못된 기록은 무엇일까?',choices:['동굴이나 바위 그늘에서 생활했다','한데에 막집을 지었다','농사를 지으며 한곳에 정착했다'],answers:[2],hint:'구석기 사람들은 먹을 것을 찾아 옮겨 다녔어.'}
  ]},
  new:{tag:'신석기',title:'강가 마을의 하루 복구',note:'신석기 · 간석기 · 농사 시작 · 강가 마을·움집 · 빗살무늬 토기',success:'먹고, 입고, 머무는 신석기 마을의 하루가 돌아왔어.',steps:[
    {title:'식량 마련',question:'신석기 마을에서 식량을 구하는 방법을 모두 고르자.',choices:['돌화살로 사냥하기','뼈작살로 물고기 잡기','밭농사 짓기','청동 검으로 벼 베기'],answers:[0,1,2],hint:'사냥과 물고기잡이는 계속했고 농사도 시작했어.'},
    {title:'곡식 보관과 조리',question:'곡식을 갈고 음식을 보관하는 데 필요한 두 가지는?',choices:['갈판과 갈돌','빗살무늬 토기','주먹 도끼','청동 방울'],answers:[0,1],hint:'납작한 돌 위에서 곡식을 갈고, 진흙을 구워 그릇을 만들었어.'},
    {title:'옷 만들기',question:'옷을 만드는 순서로 알맞은 것은?',choices:['가락바퀴로 실 뽑기 → 뼈바늘로 꿰매기','뼈바늘로 돌 갈기 → 가락바퀴로 사냥하기','반달 돌칼로 실 뽑기 → 청동 거울로 꿰매기'],answers:[0],hint:'두 유물의 쓰임을 차례로 연결해 봐.'}
  ]},
  bronze:{tag:'청동기',title:'언덕 마을의 변화 추리',note:'청동기 · 벼농사 · 반달 돌칼 · 민무늬 토기 · 재산 차이와 지배자',success:'농사의 발달이 재산 차이와 지배자의 등장으로 이어진 흐름을 복구했어.',steps:[
    {title:'수확 장면 바로잡기',question:'청동기 시대 농사에 관한 올바른 설명을 모두 고르자.',choices:['반달 돌칼로 곡식을 거두었다','돌과 나무 도구로 농사 지었다','청동 검을 농기구로 널리 썼다','일부 지역에서 벼농사가 시작됐다'],answers:[0,1,3],hint:'귀한 청동기는 주로 누구의 물건이었을까?'},
    {title:'마을 방어',question:'다른 세력과의 전쟁에 대비한 흔적 두 개를 고르자.',choices:['마을 둘레의 도랑','나무 울타리','강가의 조개 장신구','뾰족한 빗살무늬 토기'],answers:[0,1],hint:'마을의 바깥 경계를 살펴봐.'},
    {title:'변화의 원인과 결과',question:'시대 변화의 흐름이 바르게 이어진 것은?',choices:['농사 발달 → 곡식 증가 → 재산 차이 → 지배자 등장','청동기 보급 → 모두 같은 재산 → 전쟁 사라짐','이동 생활 → 막집 증가 → 창고 등장'],answers:[0],hint:'창고와 고인돌이 함께 알려 주는 사회 변화를 생각해 봐.'}
  ]},
  joseon:{tag:'고조선',title:'법과 문화 범위 복구',note:'고조선 · 최초의 국가 · 8조법 · 비파형 동검과 탁자식 고인돌',success:'8조법과 문화유산을 통해 고조선 사회의 모습과 범위를 복구했어.',steps:[
    {title:'사건에 법 적용하기',question:'다른 사람을 다치게 한 사람에게 적용할 법은?',choices:['곡식으로 갚는다','사형에 처한다','무조건 노비로 삼는다'],answers:[0],hint:'다친 사람의 노동력을 보상하는 조항이야.'},
    {title:'법에서 사회 읽기',question:'도둑을 노비로 삼되 50만 전을 내면 죄를 면하게 한 조항에서 알 수 있는 것을 모두 고르자.',choices:['신분제가 있었다','화폐를 사용했다','개인의 재산을 인정했다','모두가 평등했다'],answers:[0,1,2],hint:'노비, 돈, 남의 물건이라는 표현에 주목해.'},
    {title:'문화 범위 복구',question:'고조선의 문화 범위를 짐작할 때 함께 살펴볼 두 흔적은?',choices:['비파형 동검','탁자식 고인돌','빗살무늬 토기','주먹 도끼'],answers:[0,1],hint:'고조선을 대표하며 분포 지역을 비교하는 문화유산이야.'}
  ]},
};

const SCENES={
  old:{name:'구석기 시대',sub:'먹을 것을 찾아 이동하던 강가',bg:paleolithic,mission:'old',items:[
    ['old-cave','동굴','동굴과 바위 그늘은 비바람을 피하기 좋은 생활 터전이었어.','7%','20%','0%','15%','25%','42%'],
    ['old-fire','불','불로 추위와 짐승을 막고 음식을 익혀 먹었어.','70%','55%','69%','53%','13%','18%'],
    ['old-house','막집','이동할 때 지은 임시 집이야. 움집처럼 땅을 파서 만든 집은 아니지.','75%','27%','75%','22%','23%','36%'],
    ['old-food','열매와 풀뿌리','사냥만 한 게 아니야. 나무 열매와 풀뿌리도 채집했어.','54%','69%','49%','64%','20%','19%'],
    ['old-hide','가죽옷','동물 가죽이나 풀로 옷을 만들어 입었어.','35%','48%','26%','35%','19%','27%'],
  ]},
  new:{name:'신석기 시대',sub:'농사를 시작한 강가의 움집 마을',bg:neolithic,mission:'new',items:[
    ['new-house','움집','땅을 파고 지붕을 덮은 움집이 모여 마을을 이루었어.','54%','20%','44%','8%','38%','27%'],
    ['new-grind','갈판과 갈돌','열매 껍질을 벗기거나 곡식을 갈 때 썼어.','31%','70%','22%','60%','24%','24%'],
    ['new-thread','가락바퀴와 뼈바늘','가락바퀴로 실을 뽑고 뼈바늘로 옷을 만들었어.','50%','72%','39%','59%','19%','25%'],
    ['new-net','돌그물추','그물 가장자리에 돌그물추를 달아 물고기를 잡았어.','69%','76%','59%','60%','24%','29%'],
    ['new-field','밭농사','조와 기장 같은 밭농사를 점차 짓기 시작했어.','88%','55%','81%','42%','18%','30%'],
  ]},
  bronze:{name:'청동기 시대',sub:'벼농사와 지배자가 나타난 언덕 마을',bg:bronzeAge,mission:'bronze',items:[
    ['bronze-rice','벼농사','청동기 시대에는 벼농사가 본격적으로 시작됐어.','76%','46%','67%','36%','30%','30%'],
    ['bronze-store','창고','곡식과 물건을 보관하는 창고를 따로 만들었어.','89%','25%','82%','10%','17%','29%'],
    ['bronze-fence','울타리','전쟁에 대비해 도랑을 파고 나무 울타리를 세웠어.','65%','22%','34%','10%','55%','28%'],
    ['bronze-pot','민무늬 토기','신석기의 빗살무늬와 달리 무늬가 없는 토기를 사용했어.','12%','74%','1%','60%','24%','30%'],
    ['bronze-dolmen','고인돌','많은 사람을 동원할 수 있는 지배자가 있었음을 보여 줘.','15%','22%','0%','10%','31%','30%'],
  ]},
  joseon:{name:'고조선',sub:'청동기 문화를 바탕으로 세운 최초의 국가',bg:gojoseon,mission:'joseon',items:[
    ['joseon-dolmen','탁자식 고인돌','비파형 동검과 함께 분포를 살피면 고조선의 문화 범위를 알 수 있어.','28%','53%','17%','39%','29%','29%'],
    ['joseon-dagger','비파형 동검','비파처럼 넓은 몸체를 가진 고조선의 대표 문화유산이야.','8%','69%','0%','51%','19%','42%'],
    ['joseon-law','8조법 돌판','법 조항을 통해 생명·노동력·개인 재산을 중시했음을 알 수 있어.','81%','73%','68%','59%','31%','34%'],
    ['joseon-map','문화 범위 지도','비파형 동검과 탁자식 고인돌이 함께 발견되는 지역을 살펴봐.','48%','74%','32%','59%','32%','34%'],
    ['joseon-village','고조선 마을','한반도 북부와 중국 동북쪽을 중심으로 발전했어.','67%','24%','34%','8%','58%','35%'],
  ]},
};

function load(){try{return {...START,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return START}}

export default function Stage2({onReplayIntro}){
  const [state,setState]=useState(load);
  const [intro,setIntro]=useState(true);
  const [speech,setSpeech]=useState('여긴 서로 다른 시대가 한곳에 뒤섞인 시간 마을이야!');
  const [bubble,setBubble]=useState(null);
  const [modal,setModal]=useState(null);
  const [hint,setHint]=useState(false);
  const [clicks,setClicks]=useState({});
  const [active,setActive]=useState('hub');
  useEffect(()=>localStorage.setItem(KEY,JSON.stringify(state)),[state]);
  useEffect(()=>{const t=setTimeout(()=>setSpeech('네 개의 시간 흔적을 바로잡아 귀환 좌표를 되찾자.'),2100);return()=>clearTimeout(t)},[]);
  const complete=state.solved.length===4;
  const progress=state.solved.length;
  const evidence=useMemo(()=>state.solved.map(id=>missions[id]),[state.solved]);

  function react(id,left,top){
    const lines=CLUES[id]; if(!lines)return;
    const n=clicks[id]||0; setClicks(c=>({...c,[id]:n+1}));
    setState(s=>({...s,found:[...new Set([...s.found,id])]}));
    setBubble({text:lines[Math.min(n,lines.length-1)],left,top});
    setTimeout(()=>setBubble(null),3100);
  }
  function inspectScene(item){
    const [id,,text,left,top]=item;
    const n=clicks[id]||0;
    setClicks(c=>({...c,[id]:n+1}));
    setState(s=>({...s,found:[...new Set([...s.found,id])]}));
    const extra=n>0?' 이 흔적이 그 시대의 생활 모습과 어떻게 이어지는지도 생각해 보자.':'';
    setBubble({text:text+extra,left,top});
    setTimeout(()=>setBubble(null),3300);
  }
  function enterScene(id){setActive(id);setBubble(null);setSpeech(`${SCENES[id].name}에 도착했어. 주변 흔적부터 충분히 살펴보자.`)}
  function openMission(id){
    const foundHere=state.found.filter(x=>x.startsWith(`${id}-`)).length;
    if(foundHere<3){setSpeech(`아직 단서가 ${3-foundHere}개 부족해. 주변 생활 흔적을 더 조사하자.`);return}
    setModal({type:'mission',id,step:0,wrong:''});
  }
  function answer(selected){
    const m=missions[modal.id];
    const step=m.steps[modal.step];
    setState(s=>({...s,attempts:s.attempts+1}));
    const actual=[...selected].sort((a,b)=>a-b),expected=[...step.answers].sort((a,b)=>a-b);
    if(JSON.stringify(actual)!==JSON.stringify(expected)){setModal({...modal,wrong:step.hint});return}
    if(modal.step<m.steps.length-1){setModal({...modal,step:modal.step+1,wrong:''});return}
    setState(s=>({...s,solved:[...new Set([...s.solved,modal.id])]}));
    setModal({type:'success',id:modal.id});
  }
  function resetStage(){localStorage.removeItem(KEY);setState(START);setModal(null);setSpeech('시간 흔적이 다시 뒤섞였어. 차근차근 살펴보자!')}

  const scene=active==='hub'?null:SCENES[active];
  return <div className={`history-stage ${active==='hub'?'hub-view':'era-view'}`}>
    <img key={active} className="history-bg scene-enter" src={scene?scene.bg:valley} alt={scene?scene.name:'뒤섞인 시간의 중심 공간'}/>
    <header className="history-hud"><div className="stage-name"><small>{scene?'탐색 중':'첫 번째 역사 좌표'}</small><b>{scene?scene.name:'선사 시대 ~ 고조선'}</b></div><div className="seal-progress">{['old','new','bronze','joseon'].map((id,i)=><span className={state.solved.includes(id)?'on':''} key={id}>{state.solved.includes(id)?'✓':i+1}</span>)}<b>{progress}/4</b></div>{scene&&<button className="hub-return" onClick={()=>{setActive('hub');setSpeech('다른 시간길도 자유롭게 살펴볼 수 있어.')}}>⌂ 중심 공간</button>}<button onClick={()=>setModal({type:'notebook'})}><BookOpen/>시간 기록</button><button onClick={()=>setHint(true)}><Lightbulb/>도움</button><button className="sound" onClick={()=>setState(s=>({...s,sound:!s.sound}))}>{state.sound?<Volume2/>:<VolumeX/>}</button></header>

    {active==='hub'&&<div className="era-portals">
      {Object.entries(SCENES).map(([id,s],i)=><button key={id} className={`${id} ${state.solved.includes(id)?'cleared':''}`} onClick={()=>enterScene(id)}><small>시간길 {i+1}</small><b>{s.name}</b><span>{state.solved.includes(id)?'시간 복구 완료':s.sub}</span></button>)}
    </div>}
    {scene&&<>
      {scene.items.map(item=><HistoryHot key={item[0]} label={item[1]} onClick={()=>inspectScene(item)} style={{left:item[5],top:item[6],width:item[7],height:item[8]}}/>)}
      <button className={`scene-anomaly ${active} ${state.solved.includes(active)?'solved':''}`} onClick={()=>openMission(scene.mission)}><span>{state.solved.includes(active)?'✓ 복구 완료':`✦ 단서 ${state.found.filter(x=>x.startsWith(`${active}-`)).length}/3`}</span></button>
      <div className="scene-caption"><b>{scene.name}</b><span>{scene.sub}</span></div>
    </>}

    <div className="history-hero"><img src={characterNormal} alt="주인공"/>{speech&&<div className="history-speech">{speech}</div>}</div>
    {bubble&&<div className="history-bubble" style={{left:bubble.left,top:bubble.top}}>{bubble.text}</div>}
    {complete&&!state.finished&&active==='hub'&&<button className="final-rift" onClick={()=>setModal({type:'final'})}><span>✦</span>귀환 좌표 복구</button>}
    {intro&&<div className="history-curtain"><div className="arrival-card"><small>시간 좌표 01</small><h1>갈라진 네 개의 시간길</h1><p>시간 충돌로 네 시대가 서로 다른 길로 흩어졌다.<br/>중심 공간에서 각 시대로 이동해 시간 오류를 바로잡아라.</p><div className="era-line"><span>구석기</span><i>→</i><span>신석기</span><i>→</i><span>청동기</span><i>→</i><span>고조선</span></div><button onClick={()=>setIntro(false)}>시간길 열기</button></div></div>}
    {hint&&<Overlay close={()=>setHint(false)}><h2>{scene?`${scene.name} 탐색 도움`:'어디부터 갈까?'}</h2><p>{scene?'화면 속 집·도구·생활 흔적을 먼저 눌러 설명을 모은 뒤, 푸른 금이 간 핵심 유물을 조사해 봐.':'네 시간길은 잠겨 있지 않아. 원하는 시대부터 들어가도 되고, 구석기부터 차례로 가도 돼.'}</p><p>같은 사물을 다시 누르면 생각을 돕는 설명이 한 줄 더 나타나.</p></Overlay>}
    {modal&&<StageModal data={modal} missions={missions} evidence={evidence} state={state} answer={answer} close={()=>setModal(null)} reset={resetStage} finish={()=>{setState(s=>({...s,finished:true}));setModal({type:'ending'})}} onReplayIntro={onReplayIntro}/>} 
  </div>
}

function HistoryHot({cls='',label,onClick,done,style}){return <button className={`history-hot ${cls} ${done?'solved':''}`} style={style} onClick={onClick} aria-label={label}><span>{done?'✓':label}</span></button>}
function Overlay({children,close,wide=false}){return <div className="stage-overlay"><section className={`stage-card ${wide?'wide':''}`}><button className="stage-x" onClick={close}><X/></button>{children}</section></div>}
function StageModal({data,missions,evidence,state,answer,close,reset,finish,onReplayIntro}){
  const [selected,setSelected]=useState([]);
  useEffect(()=>setSelected([]),[data.type,data.id,data.step]);
  if(data.type==='mission'){
    const m=missions[data.id],step=m.steps[data.step];
    const toggle=i=>setSelected(s=>s.includes(i)?s.filter(x=>x!==i):[...s,i]);
    return <Overlay close={close}><div className="mission-tag">{m.tag} · {data.step+1}/3</div><h2>{m.title}</h2><div className="puzzle-step-title">{step.title}</div><p>{step.question}</p><div className="mission-choices multi">{step.choices.map((c,i)=><button className={selected.includes(i)?'selected':''} key={c} onClick={()=>toggle(i)}><i>{selected.includes(i)?'✓':''}</i>{c}</button>)}</div><button className="stage-primary" disabled={!selected.length} onClick={()=>answer(selected)}>선택 확인</button>{data.wrong&&<div className="wrong-note">아직 아니야! {data.wrong}</div>}</Overlay>
  }
  if(data.type==='success'){
    const m=missions[data.id];return <Overlay close={close}><div className="seal-big">✓</div><h2>{m.tag} 시간 흔적 복구!</h2><p>{m.success}</p><div className="memory-strip">{m.note}</div><button className="stage-primary" onClick={close}>계속 탐색하기</button></Overlay>
  }
  if(data.type==='notebook')return <Overlay close={close} wide><h2>시간 기록 수첩</h2><p className="notebook-lead">찾은 흔적 {state.found.length}개 · 바로잡은 시간 오류 {state.solved.length}/4</p><div className="evidence-list">{Object.entries(missions).map(([id,m])=><article className={state.solved.includes(id)?'open':'locked'} key={id}><b>{state.solved.includes(id)?'✓':'?'} {m.tag}</b><span>{state.solved.includes(id)?m.note:'시간 오류를 해결하면 기록됩니다.'}</span></article>)}</div><button className="reset-stage" onClick={reset}><RotateCcw size={16}/> 이 구역 처음부터</button></Overlay>;
  if(data.type==='final')return <Overlay close={close}><div className="mission-tag">마지막 시간 배열</div><h2>시대의 흐름을 완성하자</h2><p>가장 오래된 시대부터 차례대로 읽어 봐.</p><div className="timeline-final"><span>구석기</span><i>→</i><span>신석기</span><i>→</i><span>청동기</span><i>→</i><span>고조선</span></div><p className="final-check">뗀석기와 이동 생활 → 간석기와 농사 시작 → 벼농사와 지배자 → 최초의 국가</p><button className="stage-primary" onClick={finish}>귀환 좌표 입력</button></Overlay>;
  if(data.type==='ending')return <div className="return-classroom"><img src={classroomReturn} alt="다시 돌아온 방과 후 교실"/><div className="return-card"><small>귀환 성공</small><h1>교실로 돌아왔다!</h1><p>멈췄던 시계가 다시 움직이고, 시간수첩에 첫 번째 복구 도장이 찍혔다.</p><div className="return-stamp">선사 시대~고조선<br/><b>복구 완료</b></div><div className="next-signal"><em>새로운 시간 좌표 감지</em><b>삼국 시대</b><span>아직 연결할 수 없습니다 🔒</span></div><div className="ending-stats"><span>시간 조각 <b>4/4</b></span><span>탐색 단서 <b>{state.found.length}</b></span><span>다시 생각한 횟수 <b>{state.attempts}</b></span></div><button onClick={reset}>선사~고조선 다시 하기</button><button className="secondary" onClick={onReplayIntro}>인트로부터 다시 보기</button></div></div>;
  return null;
}
