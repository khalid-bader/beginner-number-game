const form = document.querySelector('#form');
const input = document.querySelector('#guess');
const message = document.querySelector('#message');
let secret;
let guesses = [];
let finished = false;
function newGame() {
  // random يولد قيمة من صفر إلى أقل من واحد، نحولها إلى 1..100.
  secret = Math.floor(Math.random() * 100) + 1;
  guesses = []; finished = false; form.reset(); input.disabled = false;
  document.querySelector('#submit').disabled = false;
  document.querySelector('#attempts').textContent = '0';
  document.querySelector('#history').textContent = 'لم تجرّب أي رقم بعد.';
  message.textContent = 'ابدأ بتخمينك الأول.';
}
form.addEventListener('submit', e => {
  e.preventDefault(); if (finished) return;
  const value = input.valueAsNumber;
  if (!Number.isInteger(value) || value < 1 || value > 100) { message.textContent = 'أدخل عددًا صحيحًا من 1 إلى 100.'; return; }
  if (guesses.includes(value)) { message.textContent = 'جرّبت هذا الرقم سابقًا. اختر رقمًا آخر.'; return; }
  guesses.push(value);
  document.querySelector('#attempts').textContent = guesses.length;
  document.querySelector('#history').textContent = 'تخميناتك: ' + guesses.join('، ');
  if (value === secret) {
    finished = true; message.textContent = 'ممتاز! اكتشفت الرقم في ' + guesses.length + ' محاولة.';
    input.disabled = true; document.querySelector('#submit').disabled = true;
  } else { message.textContent = value < secret ? 'الرقم المخفي أكبر ↑' : 'الرقم المخفي أصغر ↓'; input.select(); }
});
document.querySelector('#restart').addEventListener('click', () => { newGame(); input.focus(); });
newGame();
