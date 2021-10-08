const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');

const jsRange = document.querySelector('#jsRange');
const colors = document.querySelectorAll('.controls__color');
const jsMode = document.querySelector('#jsMode');
const jsSave = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

ctx.fillStyle = '#FFF';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(event){
  painting = false;
}

function startPainting(event){
  painting = true;
}

function onMouseMove(event){
  // console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  }else{
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event){
  startPainting();

}

function onMouseUp(event){
  stopPainting();
}

function handleRange(event){
  ctx.lineWidth = jsRange.value;
}

function handleColorClick(event){
  ctx.strokeStyle = event.target.style.backgroundColor;
}

function handleModeClick(event){
  if(filling === true){
    filling = false;
    jsMode.innerText = 'FILL';
  }else{
    filling = true;
    jsMode.innerText = 'PAINT';    
  }
}

function handleCanvasClick(event){
  if(filling){
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleRightClick(event){
  event.preventDefault();
}

function handleSaveClick(event){
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'canvas.png';
  link.click();
}

if(canvas){
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

jsRange.addEventListener('input', handleRange);
Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
jsMode.addEventListener('click', handleModeClick);
canvas.addEventListener('click', handleCanvasClick);
canvas.addEventListener('contextmenu', handleRightClick);
jsSave.addEventListener('click', handleSaveClick);