import { useEffect, useRef } from 'react';
import * as S from './style';

export default function Canvas({ subject, room }) {
  let canvasRef = useRef(null);
  let imgRef = useRef(null);
  let rangeRef = useRef(null);
  let spanRef = useRef(null);
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
      imgRef.current.src = lee();
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
        imgRef.current.src = lee();
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
    canvasRef.current.width = 700;
    canvasRef.current.height = 500;
    //eslint-disable-next-line
    ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = '2.5';
    rangeRef.current.value = 2.5;
  }, []);
  function mousedown(e) {
    painting = true;
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
    //ia 를 소켓에다 보낼 것임.
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
    }
    try {
      imgRef.current.src = lee();
    } catch (e) {
      console.log(e)
    }
  }
  return <S.Canvas>
    <canvas ref={canvasRef}
      onMouseDown={e => mousedown(e)}
      onMouseUp={e => mouseup(e)}
      onMouseMove={e => mouseMove(e)}>
    </canvas>
    <div className='div'>
      <div className='tools'>
        <div className='icons'>
          <span ref={spanRef}>brush mode</span>
          <div>
            <svg onClick={e => {
              ctx.strokeStyle = '#000000';
              spanRef.current.innerText = 'Brush mode';
            }} width="60" height="50" viewBox="0 0 51 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="16.7255" y="48.1173" width="9.26196" height="48.8086" transform="rotate(-141.459 16.7255 48.1173)" fill="#F17631" />
              <rect x="14.8474" y="46.6211" width="4.45946" height="48.8086" transform="rotate(-141.459 14.8474 46.6211)" fill="#80350B" />
              <path d="M4.45694 56.0858L9.57629 42.2692L16.7795 48.0073L4.45694 56.0858Z" fill="#FFD79A" />
              <path d="M4.15877 56.4601L7.10321 48.7112L11.0534 51.8579L4.15877 56.4601Z" fill="black" />
              <rect x="47.1371" y="9.94116" width="9.26196" height="4.78516" transform="rotate(-141.459 47.1371 9.94116)" fill="white" />
            </svg>
          </div>
          <div onClick={e => {
            ctx.strokeStyle = '#eeeeee';
            spanRef.current.innerText = 'Erase mode';
          }} >
            <svg width="60" height="50" viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="43.3735" height="43.3735" rx="3" fill="white" />
              <rect y="16.6265" width="43.3735" height="43.3735" rx="3" fill="#00CEFB" />
            </svg>
          </div>
          <svg onClick={e => {
            spanRef.current.innerText = 'Fill mode';
          }} width="60" height="50" viewBox="0 0 42 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="24.1111" width="42" height="27.2222" fill="#919191" />
            <ellipse cx="21" cy="23.5278" rx="21" ry="10.3056" fill="white" />
            <ellipse cx="21" cy="51.5278" rx="21" ry="10.3056" fill="#919191" />
            <path d="M41.5 22.75C41.5 35.0768 32.2849 45 21 45C9.71509 45 0.5 35.0768 0.5 22.75C0.5 10.4232 9.71509 0.5 21 0.5C32.2849 0.5 41.5 10.4232 41.5 22.75Z" stroke="#919191" />
            <ellipse cx="26.9231" cy="34.0278" rx="5.92308" ry="9.91667" fill="white" />
          </svg>
          <svg onClick={e => {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            imgRef.current.src = lee();
          }
          } width="60" height="50" viewBox="0 0 54 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.474494 2.38954C0.228896 1.15271 1.17522 0 2.43619 0H51.5329C52.804 0 53.7526 1.17015 53.4897 2.41371L41.6497 58.4137C41.4542 59.3384 40.6381 60 39.6929 60H13.5562C12.6018 60 11.7804 59.3257 11.5945 58.3895L0.474494 2.38954Z" fill="#919191" />
            <path d="M19 11V47" stroke="white" stroke-width="3" stroke-linecap="round" />
            <path d="M27 11V46" stroke="white" stroke-width="3" stroke-linecap="round" />
            <path d="M36 12V47" stroke="white" stroke-width="3" stroke-linecap="round" />
          </svg>
        </div>
        <div className='slidebar'>
          <input ref={rangeRef} type='range' min={2.5} max={30} onChange={e => {
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
    <img ref={imgRef} alt='img' />
  </S.Canvas >;
}