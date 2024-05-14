import React, { useState, useEffect } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import dropdown from "./dropdown"
import CustomInputControl from "./CustomInputControl";

const Annotator = ({ options,
    bboxesData,
    pageSize,
    annotate_image,
    setbboxesData,
    selectedId,
    setselectedId,
    isDraggable,
    viewBboxes
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
    const [boxLevelData, setBoxLevelData] = useState([
        {
          id: "BRa2xX",
          groupName: "Google",
          rotationDegree: "10"
        },
        {
          id: "QtPJeW",
          groupName: "Mozilla",
          rotationDegree: "10"
        },
        {
          id: "czysBh",
          groupName: "IPsoft",
          rotationDegree: "10"
        },
        {
        id: "czvasSD",
        groupName: "1",
        rotationDegree: "10"
        }
      ])
    const onSelect = (id) => {
        console.log("selected",id)
        setselectedId(id); 
    };
    const onChange = (annotation) => { 
        const new_anno = [...annotation]
        if(!viewBboxes){
            setbboxesData(annotation)
        }
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
            inputElement={(annotation) => (
                <CustomInputControl
                    annotation={annotation}
                    onDelete={(id) => {
                        const newBboxesData = bboxesData.filter(
                            (item) => item.id!== selectedId
                        );
                        setbboxesData(newBboxesData);
                    }}
                    onNameChange={(id, newName) => {
                        console.log("thiis is the id to be renamed ,", id, newName)
                        const newBboxesData = bboxesData.map((item) =>
                            item.id === selectedId? {...item, comment: newName } : item
                        );
                        setbboxesData(newBboxesData);
                    }}
                    onGroupNameChange={(id, newGroupName) => {
                        const newBoxLevelData = boxLevelData.map((item) =>
                            item.id === selectedId? {...item, groupName: newGroupName } : item
                        );
                        setBoxLevelData(newBoxLevelData)
                        console.log("this is new box level ", newBoxLevelData)
                    }}
                    onRotationChange={(id, newRotationDegree) => {
                        const newBoxLevelData = boxLevelData.map((item) =>
                            item.id === selectedId? {...item, rotationDegree: newRotationDegree } : item
                        );
                        setBoxLevelData(newBoxLevelData)
                        console.log("this is new box level ", newBoxLevelData)
                    }}
                />
            )}
            />
        </div>
    );
};
  
  
export default Annotator;
