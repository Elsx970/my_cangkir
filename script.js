// ===== FLOATING EMOJIS =====
const floatEmojis = ['🌸','💕','✨','🌺','💖','🦋','🍓','🌷','💝','🌼','🫶','☕'];
const floatContainer = document.getElementById('floaties');
function createFloatie() {
  const el = document.createElement('div');
  el.className = 'floatie';
  el.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.animationDuration = (8 + Math.random() * 12) + 's';
  el.style.animationDelay = (Math.random() * 5) + 's';
  el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
  el.style.opacity = 0.3 + Math.random() * 0.35;
  floatContainer.appendChild(el);
  setTimeout(() => el.remove(), 20000);
}
setInterval(createFloatie, 800);
for(let i=0;i<8;i++) createFloatie();

// ===== NAV =====
function showPage(id) {
  window.location.href = (id === 'home') ? 'index.html' : id + '.html';
}

// ===== CAKE TAP =====
let cakeTaps = 0;
function cakeTap() {
  cakeTaps++;
  showFirework(window.innerWidth/2, window.innerHeight/3);
  if(cakeTaps === 3) {
    launchConfetti();
    if(document.getElementById('cakebtn')) document.getElementById('cakebtn').style.fontSize = '10rem';
    setTimeout(() => { if(document.getElementById('cakebtn')) document.getElementById('cakebtn').style.fontSize = ''; }, 1500);
  }
  if(cakeTaps >= 5) { launchConfetti(); cakeTaps = 0; }
}

// ===== CONFETTI =====
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiPieces = [];
const confettiColors = ['#f9a8d4','#c4b5fd','#fed7aa','#fef08a','#bbf7d0','#bfdbfe','#fca5a5'];

function launchConfetti() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for(let i=0;i<120;i++) {
    confettiPieces.push({
      x: Math.random()*canvas.width,
      y: -20,
      r: 4+Math.random()*8,
      d: 2+Math.random()*3,
      color: confettiColors[Math.floor(Math.random()*confettiColors.length)],
      tilt: Math.random()*10-5,
      tiltSpeed: 0.1+Math.random()*0.2,
      angle: Math.random()*360,
      shape: Math.random()>0.5 ? 'rect' : 'circle'
    });
  }
  animateConfetti();
}

function animateConfetti() {
  if(!confettiPieces.length) { ctx.clearRect(0,0,canvas.width,canvas.height); return; }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiPieces.forEach((p,i) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle * Math.PI/180);
    ctx.fillStyle = p.color;
    if(p.shape==='rect') {
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r/2);
    } else {
      ctx.beginPath(); ctx.arc(0,0,p.r/2,0,Math.PI*2); ctx.fill();
    }
    ctx.restore();
    p.y += p.d;
    p.x += Math.sin(p.angle*0.02)*1.5;
    p.angle += p.tiltSpeed * 5;
    if(p.y > canvas.height+20) confettiPieces.splice(i,1);
  });
  if(confettiPieces.length) requestAnimationFrame(animateConfetti);
  else ctx.clearRect(0,0,canvas.width,canvas.height);
}

// ===== FIREWORKS =====
function showFirework(x, y) {
  const emojis = ['✨','🌸','💖','⭐','🎉','💫','🌺','💝'];
  for(let i=0;i<6;i++) {
    const el = document.createElement('div');
    el.className = 'firework';
    el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    el.style.left = (x - 20 + (Math.random()-0.5)*80) + 'px';
    el.style.top = (y - 20 + (Math.random()-0.5)*80) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }
}
function showFireworks() {
  for(let i=0;i<5;i++) {
    setTimeout(() => {
      showFirework(Math.random()*window.innerWidth, Math.random()*window.innerHeight*0.5);
    }, i*300);
  }
}

// ===== LOVE LETTER =====
const reasons = [
  "Cantik 🙂",
  "Emang jodoh, mau gimana lagi",
  "Suka panturas — selera bagus itu",
];
const reasonsUnlimited = true;

function getNextReason(n) {
  if (n < reasons.length) return reasons[n];
  return "MERAH";
}

let shownReasons = [];
let totalAdded = 0;

function openLetter() {
  document.getElementById('letter-closed').style.display = 'none';
  document.getElementById('letter-open').classList.add('show');
  if(shownReasons.length === 0) { addReason(); addReason(); addReason(); }
  launchConfetti();
}

function addReason() {
  const text = getNextReason(totalAdded);
  const n = totalAdded;
  totalAdded++;
  shownReasons.push(text);
  const div = document.createElement('div');
  div.className = 'reason-item';
  div.style.animationDelay = '0s';
  const isCapslockReason = n >= 3;
  div.innerHTML = `<div class="reason-num">${n + 1}</div><div style="${isCapslockReason ? 'font-size:1.1rem;letter-spacing:1px;color:#be185d;' : ''}">${text}</div>`;
  document.getElementById('reasons-list').appendChild(div);
  document.getElementById('reasons-list').lastChild.scrollIntoView({behavior:'smooth', block:'nearest'});
}

// ===== WISHES =====
const wishTexts = [
  ["⭐", "Semoga yang kamu kejar tahun ini nyampe. Beneran deh."],
  ["🌟", "Semoga sehat terus, karena kalau sakit ribet banget 😅"],
  ["💫", "Semoga kerjaannya lancar dan nggak bikin stress berlebihan"],
  ["✨", "Semoga dikelilingin orang-orang yang emang worth it buat ada di hidupmu"],
  ["🌙", "Semoga bisa tidur cukup dan hidup lebih santai 🙂"]
];
const allWishes = [
  "Sehat terus, itu yang paling penting",
  "Semoga nggak banyak drama tahun ini 😄",
  "Semoga kerjaannya lancar dan rejekinya nggak macet",
  "Semoga cepet kaya 💰",
  "Semoga ada banyak hal kecil yang bikin hari-harimu menyenangkan",
  "Semoga cowo kamu tambah ganteng 😏",
];

function makeWish(idx) {
  const [emoji, text] = wishTexts[idx];
  const display = document.getElementById('wish-display');
  display.innerHTML = `<div style="font-size:2rem; margin-bottom:8px;">${emoji}</div>${text}`;
  display.style.background = 'linear-gradient(135deg, #fef9c3, #fce7f3)';
  showFirework(window.innerWidth*0.5, window.innerHeight*0.4);
  launchConfetti();
}

window.addEventListener('load', () => {
  const container = document.getElementById('all-wishes');
  if(container) allWishes.forEach((w,i) => {
    const div = document.createElement('div');
    div.className = 'reason-item';
    div.style.animationDelay = (i*0.1)+'s';
    div.innerHTML = `<div class="reason-num">${i+1}</div><div>${w}</div>`;
    container.appendChild(div);
  });
});

// ===== GAME =====
let gameRunning = false, gameScore = 0, gameTimer = 30, gameInterval = null, timerInterval = null;
let hearts = 3, combo = 0, lastCatch = 0;
const gameItems = ['🐱','🐈','😺','😸','🐾','🐱'];
const badItems = ['🙀','😾','💢'];

function startGame() {
  if(gameRunning) return;
  gameRunning = true; gameScore = 0; hearts = 3; combo = 0; gameTimer = 30;
  updateHearts(); updateScore();
  document.getElementById('game-items').innerHTML = '';
  document.getElementById('game-msg').textContent = '🐱 Tangkap kucingnya!';
  document.getElementById('start-btn').disabled = true;
  document.getElementById('start-btn').textContent = '🐾 Sedang Bermain...';

  gameInterval = setInterval(spawnItem, 900);
  timerInterval = setInterval(() => {
    gameTimer--;
    document.getElementById('game-timer').textContent = `⏱ ${gameTimer} detik`;
    if(gameTimer <= 0) endGame();
  }, 1000);
}

function spawnItem() {
  if(!gameRunning) return;
  const area = document.getElementById('game-area');
  if(!area) return;
  const isBad = Math.random() < 0.25;
  const emojis = isBad ? badItems : gameItems;
  const emoji = emojis[Math.floor(Math.random()*emojis.length)];
  const el = document.createElement('div');
  el.className = 'game-star';
  el.textContent = emoji;
  el.dataset.bad = isBad ? '1' : '0';
  const areaW = area.clientWidth - 50, areaH = area.clientHeight - 50;
  el.style.left = (15 + Math.random()*(areaW)) + 'px';
  el.style.top = (15 + Math.random()*(areaH)) + 'px';
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    catchItem(el, isBad);
  });
  el.addEventListener('touchstart', (e) => {
    e.preventDefault(); e.stopPropagation();
    catchItem(el, isBad);
  }, {passive:false});
  area.querySelector('#game-items').appendChild(el);
  setTimeout(() => { if(el.parentNode) el.remove(); }, 2200);
}

function catchItem(el, isBad) {
  if(!gameRunning || !el.parentNode) return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
  el.remove();
  if(isBad) {
    hearts = Math.max(0, hearts-1);
    combo = 0;
    updateHearts();
    showScorePopup(cx, cy, '🙀 aduh!');
    document.getElementById('game-msg').textContent = '🙀 Bukan itu! Hindari yang marah!';
    if(hearts <= 0) endGame();
  } else {
    const now = Date.now();
    if(now - lastCatch < 1500) combo++;
    else combo = 1;
    lastCatch = now;
    const pts = combo >= 3 ? 3 : combo >= 2 ? 2 : 1;
    gameScore += pts;
    updateScore();
    showScorePopup(cx, cy, '+' + pts + ' 🐾');
    if(combo >= 3) {
      const badge = document.getElementById('combo-badge');
      badge.classList.add('show');
      badge.textContent = '😻 x' + combo + ' COMBO!';
      clearTimeout(badge._t);
      badge._t = setTimeout(() => badge.classList.remove('show'), 900);
    }
    document.getElementById('game-msg').textContent = combo>=3 ? `😻 COMBO x${combo}! Cepet banget!` : '🐱 Nice!';
  }
}

function showScorePopup(x, y, text) {
  const el = document.createElement('div');
  el.className = 'score-popup';
  el.textContent = text;
  el.style.left = (x - window.scrollX - 20) + 'px';
  el.style.top = (y - window.scrollY - 20) + 'px';
  el.style.position = 'fixed';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function updateScore() {
  document.getElementById('game-score').textContent = gameScore;
}
function updateHearts() {
  const h = ['🐾','🐾','🐾'].map((e,i) => i < hearts ? '🐾' : '🩶').join('');
  document.getElementById('hearts-bar').textContent = h;
}

function endGame() {
  gameRunning = false;
  clearInterval(gameInterval); clearInterval(timerInterval);
  document.getElementById('game-items').innerHTML = '';
  document.getElementById('start-btn').disabled = false;
  document.getElementById('start-btn').textContent = '🐾 Main Lagi!';
  let msg = '';
  if(gameScore >= 30) { msg = `😻 ${gameScore} poin! Kucing-kucing bangga sama kamu!`; launchConfetti(); showFireworks(); }
  else if(gameScore >= 15) { msg = `🐱 ${gameScore} poin! Lumayan nih, coba lagi!`; }
  else { msg = `🐾 ${gameScore} poin! Kucingnya kabur terus ya 😄`; }
  document.getElementById('game-msg').textContent = msg;
  document.getElementById('game-timer').textContent = '⏱ 30 detik';
}

function stopGame() {
  if(gameRunning) {
    gameRunning = false;
    clearInterval(gameInterval); clearInterval(timerInterval);
    document.getElementById('game-items').innerHTML = '';
    document.getElementById('start-btn').disabled = false;
    document.getElementById('start-btn').textContent = '🐾 Mulai Game';
    document.getElementById('game-msg').textContent = 'Tap tombol mulai untuk bermain!';
    document.getElementById('game-timer').textContent = '⏱ 30 detik';
    document.getElementById('game-score').textContent = '0';
    hearts = 3; updateHearts();
  }
}