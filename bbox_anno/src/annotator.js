import React, { useState, useEffect } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Dropdowns from "./dropdown";
import Draggable from "react-draggable";

const Annotataor = props => {
  const [pageSize, setPageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [currentAnnotaion, setCurrentAnnotation] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  //const [selectedId, setSelectedId] = useState({ selectedId: "" });
  let selectedId = 0;
  const onResize = () => {
    setPageSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [selectedId]);

  const idata = [
    {
      id: "BRa2xX",
      mark: {
        x: 84.393063583815,
        y: 107.51445086705202,
        width: 211.56069364161849,
        height: 83.2369942196532,
        type: "RECT"
      },
      comment: "Google"
    },
    {
      id: "QtPJeW",
      mark: {
        x: 469.3641618497109,
        y: 86.70520231213872,
        width: 221.96531791907518,
        height: 149.1329479768786,
        type: "RECT"
      },
      comment: "Mozilla"
    },
    {
      id: "czysBh",
      mark: {
        x: 153.757225433526,
        y: 322.5433526011561,
        width: 201.15606936416185,
        height: 83.23699421965318,
        type: "RECT"
      },
      comment: "IPsoft"
    }
  ];

  const onSelect = id => (selectedId = id);
  const onChange = data => console.log("onChnageAnnotator", data);
  return (
        <div className="annotation">
        <ReactPictureAnnotation
            {...props}
            debugger

            image="https://source.unsplash.com/random/800x600"
            onSelect={onSelect}
            onChange={onChange}
            width={pageSize.width}
            height={pageSize.height}
            annotationData={idata}
            selectedId={selectedId ? selectedId : null}
        />
        </div>

  );
};

export default Annotataor;
