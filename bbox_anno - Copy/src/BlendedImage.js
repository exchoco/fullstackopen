import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { fabric } from "fabric";

const BlendedImage = ({ firstImage, secondImage, opacity }) => {
  const canvasRef = useRef(null);
  const [blendedImage, setBlendedImage] = useState(null);

  useEffect(() => {
    async function loadImages() {
      const canvas = new fabric.StaticCanvas(canvasRef.current);
      const firstImageInstance = new fabric.Image();
      const secondImageInstance = new fabric.Image();

      await firstImageInstance.setSrc(firstImage);
      await secondImageInstance.setSrc(secondImage);

      firstImageInstance.selectable = false;
      secondImageInstance.selectable = false;

      canvas.setBackgroundImage(firstImageInstance, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / firstImageInstance.width,
        scaleY: canvas.height / firstImageInstance.height,
      });

      canvas.add(secondImageInstance);
      canvas.setActiveObject(secondImageInstance);
      secondImageInstance.setOpacity(opacity);

      canvas.renderAll();

      const dataUrl = canvas.toDataURL();
      setBlendedImage(dataUrl);
    }

    if (firstImage && secondImage) {
      loadImages();
    }
  }, [firstImage, secondImage, opacity]);

  return <canvas ref={canvasRef} width="800" height="600" style={{ display: "none" }} />;
};

export default BlendedImage;