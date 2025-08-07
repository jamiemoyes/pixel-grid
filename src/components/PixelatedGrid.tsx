import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Pause } from "./icons/Pause";
import { Play } from "./icons/Play";
import { type Figure, FIGURES, FIGURE_LIST } from "./figures";

function PixelatedGrid() {
  const [figure, setFigure] = useState<Figure>(FIGURES.runner);

  const switchFigure = () => {
    setFigure((prevFigure) => {
      const currentIndex = FIGURE_LIST.indexOf(prevFigure);
      console.log({ currentIndex });
      if (currentIndex >= FIGURE_LIST.length - 1) {
        return FIGURE_LIST[0];
      }
      return FIGURE_LIST[currentIndex + 1];
    });
  };

  const gridList = figure.split("");
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let interval: number;
    let type: "increase" | "decrease" = "increase";
    if (playing) {
      const handler = () => {
        if (gridRef.current) {
          const existingVal =
            gridRef.current.style.getPropertyValue("--cell-count") || 80;
          const num = Number(existingVal);
          if (num >= 85) {
            type = "decrease";
          } else if (num <= 50) {
            switchFigure();

            type = "increase";
          }
          const updatedVal = type === "increase" ? num + 1 : num - 1;

          gridRef.current.style.setProperty("--cell-count", `${updatedVal}`);
        }
      };

      interval = setInterval(handler, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gridRef, playing]);

  const toggleState = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  return (
    <div className={styles.mediaBox}>
      <div ref={gridRef} className={styles.grid}>
        {gridList.map((val) => (
          <div
            className={val === "1" ? styles.populated : styles.unpopulated}
          />
        ))}
      </div>
      <div className={styles.controls}>
        <p></p>
        <button onClick={toggleState}>{playing ? <Pause /> : <Play />}</button>
      </div>
    </div>
  );
}

export { PixelatedGrid };
