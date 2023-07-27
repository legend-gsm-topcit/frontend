import React from 'react';
import ReactDOM from 'react-dom/client';
import Canvas from './components/canvas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Canvas whoDrawing={'홍길동'} subject={'네모바지 스폰지밥'} img={null} />
  </>
);
