import React, { useState, useEffect } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Dropdowns from "./dropdown";
import Draggable from "react-draggable";
import  createBbox  from './reducers/bboxReducer'
import { useSelector, useDispatch } from 'react-redux'
import { cloneDeep } from 'lodash'; 
import html2canvas from "html2canvas";
const Annotator = ({ options, idata }) => {
    const [pageSize, setPageSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    });
    const initDiff = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,  
    }
    const test_redux = useSelector(state => state.bbox)
    const dispatch = useDispatch()
    const [shifted, setShifted] = useState(false)
    const [data, setData] = useState(idata);
    const [data_diff, setdata_diff] = useState(initDiff)
    const [selectedId, setSelectedId] = useState(null); // Initialize selectedId as null
  
    const onResize = () => {
      setPageSize({ width: window.innerWidth, height: window.innerHeight });
    };
  
    // useEffect(() => {
    //   window.addEventListener("resize", onResize);
    //   return () => window.removeEventListener("resize", onResize);
    // }, []);
  
    const onSelect = (id) => {
        console.log("selected",id)
        setSelectedId(id);
        if(id !== null && !shifted){
            const index = data.findIndex(data=>data.id === id)
            const index_victim = data.findIndex(data=>data.id === "QtPJeW")
            const newvictim = {
                x: data[index].mark.x - data[index_victim].mark.x,
                y: data[index].mark.y - data[index_victim].mark.y,
                width: data[index].mark.width - data[index_victim].mark.width,
                height: data[index].mark.height - data[index_victim].mark.height,  
            }
            setdata_diff(newvictim)
            console.log(data_diff)
        } 
    };
    const onChange = (updatedData) => { 
        if(selectedId!==null && shifted){
                const indexSelected = updatedData.findIndex(data=>data.id === selectedId)
                console.log("this is selected now, ", indexSelected)
                const index = updatedData.findIndex(data=>data.id ==="QtPJeW")
                console.log("this is victim now, ", index)
                if(indexSelected !== -1 && index !== -1){
                    const newdata = {...updatedData[index],
                                    mark:{
                                        ...updatedData[index].mark,
                                        x: updatedData[indexSelected].mark.x - data_diff.x,
                                        y: updatedData[indexSelected].mark.y - data_diff.y,
                                        width: updatedData[indexSelected].mark.width - data_diff.width,
                                        height: updatedData[indexSelected].mark.height - data_diff.height
                                    }
                    }
                    updatedData[index] = newdata
                    console.log("this is new data ,", updatedData)
                    // setData(newbbox)
                    console.log("this is old data ,", data)
                }
        }
        setData(updatedData)

        // const new_data = data
        // if(selectedId!==null && shifted){
        //     const index = data.findIndex(data=>data.id ==="QtPJeW")
        //     console.log("this is victim now, ", index)
        //     if(index !== -1 && index !== -1){
        //         const newdata = {...data[index],
        //                         mark:{
        //                             ...data[index].mark,
        //                             x: data[index].mark.x +1,
        //                             y: data[index].mark.y +1,
        //                             width: data[index].mark.width,
        //                             height: data[index].mark.height
        //                         }
        //         }
        //         new_data[index] = newdata
        //         console.log("this is new data ,", new_data)
        //         // setData(newbbox)
        //         console.log("this is old data ,", data)
        //         setData(new_data)
        //     }
        // }
        
      };
      
      const [blendedImage, setBlendedImage] = useState(null);

      useEffect(() => {
        async function blendImages() {
          const fetchImage = async (src) => {
            const response = await fetch(src);
            const blob = await response.blob();
            return URL.createObjectURL(blob);
          };
    
          const firstImageSrc = await fetchImage("https://source.unsplash.com/random/800x600");
          const secondImageSrc = await fetchImage("https://source.unsplash.com/random/400x300");
    
          const firstImage = new Image();
          firstImage.src = firstImageSrc;
          firstImage.crossOrigin = "anonymous";
    
          const secondImage = new Image();
          secondImage.src = secondImageSrc;
          secondImage.crossOrigin = "anonymous";
    
          // Ensure images are loaded before drawing them to the canvas
          await Promise.all([firstImage.decode(), secondImage.decode()]);
    
          const canvas = document.createElement("canvas");
          canvas.width = firstImage.width;
          canvas.height = firstImage.height;
    
          const ctx = canvas.getContext("2d");
          ctx.drawImage(firstImage, 0, 0);
          ctx.globalAlpha = 0.5; // Adjust the transparency of the second image
          ctx.drawImage(secondImage, 0, 0);
    
          // Set the blended image data URL
          setBlendedImage(canvas.toDataURL());
        }
    
        blendImages();
      }, []);
    useEffect(() => {
    // Update local state whenever the Redux store changes
    setData(cloneDeep(test_redux));
    }, [test_redux]);
    useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Control") {
        setShifted(true)
        console.log("control pressed")

      }
    };

    const handleKeyUp = (event) => {
        setShifted(false)
      if (event.key === "Control") {
        console.log("shift up triggered")
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [data, selectedId,data_diff]);
    const clonedData = cloneDeep(test_redux);
    return (
      <div className="annotation">
        <Draggable disabled={true}>
        <div>
        <ReactPictureAnnotation
          image={blendedImage}
          onSelect={onSelect}
          onChange={onChange}
          width={pageSize.width}
          height={pageSize.height}
          annotationData={data}
          selectedId={selectedId}
        />
        </div>
        </Draggable>
      </div>
    );
  };
  
  
export default Annotator;
