import { useEffect } from "react";
import Konva from "konva";

const Canvas = () => {
  useEffect(() => {
    const stage = new Konva.Stage({
      container: "container", // id of container <div>
      width: 500,
      height: 500,
      color: "red",
      backgroundColor: "blue",
    });

    const layer = new Konva.Layer();
    const circle = new Konva.Circle({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
    });

    layer.add(circle);
    stage.add(layer);
    layer.draw();

    // Cleanup function
    return () => {
      stage.destroy();
    };
  }, []);

  return <div id="container" className="bg-red-50"></div>;
};

export default Canvas;
