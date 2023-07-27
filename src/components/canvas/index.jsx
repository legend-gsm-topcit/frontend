import { useEffect, useRef } from 'react';
import * as S from './style';
import * as SVG from '../../assets/svgs';

export default function Canvas({ subject, img, whoDrawing }) {
  let canvasRef = useRef(null);
  let rangeRef = useRef(null);
  let spanRef = useRef(null);
  let toolRef = useRef(null);
  let canvaslist = [];
  let pointer = -1;
  let ctx;
  let painting = false;
  let keystack = [];
  function undo() {
    pointer--;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const img = new Image();
    img.src = canvaslist[pointer];
    img.onload = e => {
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }
  function redo() {
    if (pointer + 1 < canvaslist.length) {
      pointer++;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const img = new Image();
      img.src = canvaslist[pointer];
      img.onload = e => {
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }
  window.addEventListener('keydown', e => {
    keystack.push(e.key);
    if (keystack[keystack.length - 2] === "Control" && keystack[keystack.length - 1] === 'z') {
      undo();
    } else if ((keystack[keystack.length - 2] === "Control" && keystack[keystack.length - 1] === 'y')
      || (keystack[keystack.length - 3] === "Control" && keystack[keystack.length - 2] === 'Shift' && keystack[keystack.length - 1] === 'Z')) {
      redo();
    }
  })
  useEffect(e => {
    if (whoDrawing === localStorage.getItem('nickname')) { //나 일 경우
      toolRef.current.style.display = 'flex'
    } else {
      toolRef.current.style.display = 'none';
    }
  }, [whoDrawing]);
  useEffect(e => {
    canvasRef.current.width = 700;
    canvasRef.current.height = 450;
    //eslint-disable-next-line
    ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = '2.5';
    rangeRef.current.value = 2.5;

    localStorage.setItem('nickname', '홍길동')
  }, []);
  function mousedown(e) {
    if (whoDrawing === localStorage.getItem('nickname')) { // 나 일 경우만
      painting = true;
    }
  }

  function lee() {
    const le = canvasRef.current.toDataURL("image/png");
    const byteString = atob(le.split(',')[1]);
    const mimeString = le.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    //img 를 소켓에다 보낼 것임.
    img = { ab: ab, mimeString: mimeString };
    console.log(img)

    const bb = new Blob([ab], { "type": mimeString });
    const createdobject = window.URL.createObjectURL(bb);

    return createdobject;
  }

  function mouseup(e) {
    painting = false;
    pointer++;
    canvaslist.splice(pointer, canvaslist.length);
    canvaslist.push(lee());
  }
  function mouseMove(e) {
    ctx = canvasRef.current.getContext('2d');
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    } lee();
  }
  return <S.Canvas>
    <div className='subject'>
      제시어: {whoDrawing === localStorage.getItem('nickname') && subject}
    </div>
    <canvas ref={canvasRef}
      onMouseDown={e => mousedown(e)}
      onMouseUp={e => mouseup(e)}
      onMouseMove={e => mouseMove(e)}>
    </canvas>
    <div className='div' ref={toolRef}>
      <div className='tools'>
        <div className='icons'>
          <span ref={spanRef}>brush mode</span>
          <div onClick={e => {
            ctx.strokeStyle = '#000000';
            spanRef.current.innerText = 'Brush mode';
          }}>
            <SVG.Brush />
          </div>
          <div onClick={e => {
            ctx.strokeStyle = '#eeeeee';
            spanRef.current.innerText = 'Erase mode';
          }} >
            <SVG.Eraser />
          </div>
          <div onClick={e => {
            spanRef.current.innerText = 'Fill mode';
          }} >
            <SVG.Bucket />
          </div>
          <div onClick={e => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }}>
            <SVG.TrashCan />
          </div>
        </div>
        <div className='slidebar'>
          <input ref={rangeRef} type='range' min={2.5} max={80} onChange={e => {
            ctx.lineWidth = e.target.value;
          }} />
        </div>
      </div>
      <div className='color'>
        <div className='red' onClick={e => ctx.strokeStyle = "#FF0000"} />
        <div className='orange' onClick={e => ctx.strokeStyle = "orange"} />
        <div className='yellow' onClick={e => ctx.strokeStyle = "yellow"} />
        <div className='green' onClick={e => ctx.strokeStyle = "green"} />
        <div className='skyblue' onClick={e => ctx.strokeStyle = "skyblue"} />
        <div className='navy' onClick={e => ctx.strokeStyle = "navy"} />
        <div className='purple' onClick={e => ctx.strokeStyle = "purple"} />
        <div className='black' onClick={e => ctx.strokeStyle = "black"} />
        <div className='white' onClick={e => ctx.strokeStyle = "white"} />
      </div></div>
  </S.Canvas >;
}