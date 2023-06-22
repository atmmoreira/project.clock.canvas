const canvas = document.getElementById('canvas');
const facedColor = document.getElementById('faced');
const borderColor = document.getElementById('border');
const numberColor = document.getElementById('number');
const largeHandColor = document.getElementById('large_hand');
const secondHandColor = document.getElementById('second_hand');

function clock() {
  const now = new Date();
  const ctx = canvas.getContext('2d');

  // Setup Canvas
  // Save the Default State
  ctx.save();
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // Put 0, 0 in the  middle
  ctx.rotate(-Math.PI / 2); // Rotate Clock -90deg

  // Set Default Styles
  ctx.strokeStyle = '#34495e';
  ctx.fillStyle = facedColor.value;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // Draw Clock Face/Border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = borderColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw Hour Lines
  ctx.save();
  ctx.strokeStyle = numberColor.value;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw Minutes Lines
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = numberColor.value;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get Current Time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // Draw Hour Hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Draw Minutes Hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(115, 0);
  ctx.stroke();
  ctx.restore();

  // Draw Seconds Hand
  ctx.save();
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  // Restore Default State
  ctx.restore();
  requestAnimationFrame(clock);
}
requestAnimationFrame(clock);

document.getElementById('save-image').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();
});
