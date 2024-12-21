import { useRef } from "react";
import "./App.scss";

function App() {
  const carouselRef = useRef<HTMLDivElement>(null);
  let isDragging: boolean = false;
  let startX: number;
  let initialX: number;
  let currentTranslate: number = 0; // Переменная для отслеживания текущего значения трансляции
  const dragStart = (e: MouseEvent): void => {
    isDragging = true;
    startX = e.clientX;
    initialX = startX; // Сохраняем начальную позицию
    // console.log(e.pageX);
    console.log(e.clientX);
    // console.log(e.scrollLeft);
    // carouselRef.current.style.transform = `translate3d(-100px, 0, 0)`;
    // console.log(startX, "startX dragStart");
  };

  const dragging = (e: MouseEvent): void => {
    if (isDragging) {
      const moveX: number = e.clientX - startX; // Вычисляем смещение

      // console.log(e.clientX, "clientX dragging");
      console.log(moveX, "moveX dragging");

      const translateX: number = currentTranslate + moveX; // Добавляем смещение к текущему значению

      // console.log(currentTranslate, "currentTranslate dragging");
      // console.log(translateX, "translateX dragging");
      if (carouselRef.current && translateX <= 0) {
        carouselRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }
    }
  };

  const dragEnd = (e: MouseEvent): void => {
    if (isDragging) {
      isDragging = false;
      const endPoint: number = e.clientX - startX; // Вычисляем конечное смещение
      // console.log(e.clientX, "e.clientX dragEnd");
      // console.log(endPoint, "endPoint dragEnd");

      currentTranslate += endPoint; // Сохраняем текущее значение трансляции
    }
  };

  const handleMouseDown = (el: MouseEvent): void => {
    if (carouselRef.current) {
      // dragStart(el);
      carouselRef.current.addEventListener("mousedown", dragStart);
      document.addEventListener("mousemove", dragging);
      document.addEventListener("mouseup", dragEnd);
    }
  };
  return (
    <>
      <main className="container">
        <div
          onMouseDown={handleMouseDown}
          ref={carouselRef}
          className="carousel"
        >
          <div className="slider">1</div>
          <div className="slider">2</div>
          <div className="slider">3</div>
          <div className="slider">4</div>
          <div className="slider">5</div>
          <div className="slider">6</div>
        </div>
      </main>
    </>
  );
}

export default App;
