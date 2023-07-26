import { useEffect, useRef } from 'react';
import * as S from './style';

export default function Canvas({ subject, room }) {
  let canvasRef = useRef(null);
  let canvaslist = [];
  let pointer = -1;
  let imgRef = useRef(null);
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
  window.addEventListener('keydown', e => {
    keystack.push(e.key);
    if (keystack[keystack.length - 2] === "Control" && keystack[keystack.length - 1] === 'z') {
      undo();
    }
  })
  useEffect(e => {
    canvasRef.current.width = 700;
    canvasRef.current.height = 500;
    //eslint-disable-next-line
    ctx = canvasRef.current.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = '2.5';
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
      // imgRef.current.src = lee();
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
      {/* <img ref={imgRef} alt='img' /> */}
      <div className='color'>
        <div className='red' onClick={e => ctx.strokeStyle = "#FF0000"} />
      </div>
      <button onClick={e => undo()}>undo</button>
    </div>
  </S.Canvas>;
}