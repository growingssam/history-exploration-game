import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const dist=path.join(root,'dist');
const assets=path.join(dist,'assets');
const output=path.join(root,'history-escape-mobile-preview.html');
const index=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const jsName=index.match(/src="\.\/assets\/([^"]+\.js)"/)?.[1];
const cssName=index.match(/href="\.\/assets\/([^"]+\.css)"/)?.[1];
if(!jsName||!cssName)throw new Error('Built JS/CSS entry was not found.');

let js=fs.readFileSync(path.join(assets,jsName),'utf8');
const css=fs.readFileSync(path.join(assets,cssName),'utf8');

js=js.replace(/new URL\(`([^`]+\.(?:png|jpe?g|webp|gif|svg))`,import\.meta\.url\)\.href/g,(full,name)=>{
  const file=path.join(assets,name);
  if(!fs.existsSync(file))throw new Error(`Missing asset: ${name}`);
  const ext=path.extname(name).slice(1).replace('jpg','jpeg');
  const uri=`data:image/${ext};base64,${fs.readFileSync(file).toString('base64')}`;
  return JSON.stringify(uri);
});

const html=`<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <title>역사 속에 갇혔다! : 모바일 확인용</title>
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <script type="module">${js}</script>
</body>
</html>`;

fs.writeFileSync(output,html);
console.log(output);
