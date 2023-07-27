import { useEffect, useRef } from "react";
import * as S from "./style";
import * as SVG from "../../assets/svgs";

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
    img.onload = (e) => {
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      imgRef.current.src = lee();
    };
  }
  function redo() {
    if (pointer + 1 < canvaslist.length) {
      pointer++;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const img = new Image();
      img.src = canvaslist[pointer];
      img.onload = (e) => {
        ctx.drawImage(
          img,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        imgRef.current.src = lee();
      };
    }
  }
  window.addEventListener("keydown", (e) => {
    keystack.push(e.key);
    if (
      keystack[keystack.length - 2] === "Control" &&
      keystack[keystack.length - 1] === "z"
    ) {
      undo();
    } else if (
      (keystack[keystack.length - 2] === "Control" &&
        keystack[keystack.length - 1] === "y") ||
      (keystack[keystack.length - 3] === "Control" &&
        keystack[keystack.length - 2] === "Shift" &&
        keystack[keystack.length - 1] === "Z")
    ) {
      redo();
    }
  });
  useEffect((e) => {
    canvasRef.current.width = 1000;
    canvasRef.current.height = 600;
    //eslint-disable-next-line
    ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = "2.5";
    rangeRef.current.value = 2.5;
  }, []);
  function mousedown(e) {
    painting = true;
  }

  function lee() {
    const le = canvasRef.current.toDataURL("image/png");
    const byteString = atob(le.split(",")[1]);
    const mimeString = le.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    //ia 를 소켓에다 보낼 것임.
    const bb = new Blob([ab], { type: mimeString });
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
    ctx = canvasRef.current.getContext("2d");
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
      console.log(e);
    }
  }
  return (
    <S.Canvas>
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => mousedown(e)}
        onMouseUp={(e) => mouseup(e)}
        onMouseMove={(e) => mouseMove(e)}></canvas>

      <div className="div">
        <div className="tools">
          <div className="icons">
            <div
              onClick={(e) => {
                ctx.strokeStyle = "#000000";
                spanRef.current.innerText = "Brush mode";
              }}>
              <SVG.Brush />
            </div>
            <div
              onClick={(e) => {
                ctx.strokeStyle = "#eeeeee";
                spanRef.current.innerText = "Erase mode";
              }}>
              <SVG.Eraser />
            </div>
            <div
              onClick={(e) => {
                ctx.clearRect(
                  0,
                  0,
                  canvasRef.current.width,
                  canvasRef.current.height
                );
                imgRef.current.src = lee();
              }}>
              <SVG.TrashCan />
            </div>
          </div>
          <div className="slidebar">
            <input
              ref={rangeRef}
              type="range"
              min={2.5}
              max={20}
              onChange={(e) => {
                ctx.lineWidth = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="color">
          <div className="red" onClick={(e) => (ctx.strokeStyle = "#FF0000")} />
          <div
            className="orange"
            onClick={(e) => (ctx.strokeStyle = "orange")}
          />
          <div
            className="yellow"
            onClick={(e) => (ctx.strokeStyle = "yellow")}
          />
          <div className="green" onClick={(e) => (ctx.strokeStyle = "green")} />
          <div
            className="skyblue"
            onClick={(e) => (ctx.strokeStyle = "skyblue")}
          />
          <div className="navy" onClick={(e) => (ctx.strokeStyle = "navy")} />
          <div
            className="purple"
            onClick={(e) => (ctx.strokeStyle = "purple")}
          />
          <div className="black" onClick={(e) => (ctx.strokeStyle = "black")} />
          <div className="white" onClick={(e) => (ctx.strokeStyle = "white")} />
          <input
            type="color"
            onChange={(e) => {
              ctx.strokeStyle = e.target.value;
            }}
          />
        </div>
      </div>
      <img ref={imgRef} alt="img" />
    </S.Canvas>
  );
}
