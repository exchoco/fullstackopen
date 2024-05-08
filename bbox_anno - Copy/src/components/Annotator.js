import React, { useState, useEffect } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";

const Annotator = ({ options,
    bboxesData,
    pageSize,
    annotate_image,
    setbboxesData,
    selectedId,
    setselectedId,
    isDraggable
 }) => {
    const IShapeStyle = {
        padding: 5,
        fontSize:12,
        fontColor: "#333333",
        fontBackground: "#ead2d2",

        lineWidth: 2,
        shapeBackground: "hsla(210, 16%, 93%, 0.2)",
        shapeStrokeStyle: "#ead2d2",
        shadowBlur: 10,
        shapeShadowStyle: "hsla(210, 9%, 31%, 0.35)",

        transformerBackground: "#5c7cfa",
        transformerSize: 10
    }
  
    const onSelect = (id) => {
        console.log("selected",id)
        setselectedId(id); 
    };
    const onChange = (annotation) => { 
        const new_anno = [...annotation]
        setbboxesData(annotation)
      };
      
    const CustomInputElement = ({value, onChange, onBlur}) => {
        return (
            <textarea
                value = {value}
                onChange = {onChange}
                onBlur = {onBlur}
                placeholder="Enter annotation text..."
                style={{border: '1px solid #ccc', padding: '5px', borderRadius: '3px'}}
            />
        )
    }
    return (
        <div id="AnnotationWorkArea" className="AnnotationWorkArea" style={isDraggable ? {cursor: 'grab'}: {cursor: 'default'}}>
            <ReactPictureAnnotation
            debugger
            image={annotate_image}
            onSelect={onSelect}
            onChange={onChange}
            width={pageSize.width}
            height={pageSize.height}
            annotationData={bboxesData}
            selectedId={selectedId}
            annotationStyle={IShapeStyle}
            />
        </div>
    );
};
  
  
export default Annotator;
