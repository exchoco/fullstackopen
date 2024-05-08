import React, { useState, useEffect } from "react";
import Annotator from "./components/Annotator"
import "./styles.css";
import {
    Form,
    Input,
    Button,
    List,
    ListItem,
    ListHandler,
    ListContent,
    Menu,
    Segment,
    Container,
    Icon
} from 'semantic-ui-react'
import InputField from './components/InputField'
import Draggable from "react-draggable";
import StackerMenu from "./components/StackerMenu"


const App = ({options, idata, annotate_image}) => {
    const[pageSize, setPageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const [currentBboxAdjustment, setcurrentBboxAdjustment]= useState({
        bboxHeight: null,
        bboxWidth: null,
        bbox_x: null,
        bbox_y: null
    })
    const [bboxesData, setbboxesData] = useState(idata)
    const [selectedId, setselectedId] = useState(null)
    const [id, setId] = useState(null)
    const [isDraggable, setIsDraggable] = useState(false)
    const [isShifted, setisShifted] = useState(false)
    const [deltaAdjustment, setdeltaAdjustment] = useState({
        bboxHeight: 0,
        bboxWidth: 0,
        bbox_x: 0,
        bbox_y: 0
    })
    const updateCurrentBbboxAdjustment = () => {
        const newAdjustment = {
            bboxHeight: null,
            bboxWidth: null,
            bbox_x: null,
            bbox_y: null
        }
        const currentBbox = bboxesData.find(data=>data.id === selectedId)
        if(currentBbox !== undefined){
            console.log("this is the currentbox ", currentBbox)
            newAdjustment.bboxHeight = parseInt(currentBbox.mark.height)
            newAdjustment.bboxWidth = parseInt(currentBbox.mark.width)
            newAdjustment.bbox_x = parseInt(currentBbox.mark.x)
            newAdjustment.bbox_y = parseInt(currentBbox.mark.y)
        }
        setcurrentBboxAdjustment(newAdjustment)
    }

    const updateBboxesData = (event) => {
        const index = bboxesData.findIndex(item => item.id === selectedId)
        const updatedBboxesData = [...bboxesData]
        console.log("copied bboxes data ", updatedBboxesData)
        if(event.target.id === "height"){
            updatedBboxesData[index] = {
                ...bboxesData[index],
                mark:{
                    ...bboxesData[index].mark,
                    height: Number(event.target.value)
                }
            }
        } else if (event.target.id === "width"){
            updatedBboxesData[index] = {
                ...bboxesData[index],
                mark:{
                    ...bboxesData[index].mark,
                    width: Number(event.target.value)
                }
            }
        } else if (event.target.id === "x") {
            updatedBboxesData[index] = {
                ...bboxesData[index],
                mark:{
                    ...bboxesData[index].mark,
                    x: Number(event.target.value)
                }
            }
        } else {
            updatedBboxesData[index] = {
                ...bboxesData[index],
                mark:{
                    ...bboxesData[index].mark,
                    y: Number(event.target.value)
                }
            }
        }
        setbboxesData(updatedBboxesData)
    }

    const updateParametersData = (event) =>{

    }


    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const idParam = params.get('id')
        const idParam2 = params.get('id2')

        setId(idParam)
        console.log("this is id param ", idParam)
        console.log("tjis is id 2 param ", idParam2)
    }, []);

    useEffect(()=>{updateCurrentBbboxAdjustment(selectedId)}, [bboxesData, selectedId])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Control') {
                setIsDraggable(true)
                event.preventDefault()
            } else if (event.shiftKey && event.key === "ArrowRight"){
                setisShifted(true)
                const new_anno = [...bboxesData]
                bboxesData.map((bbox)=>{
                    const currCond = new_anno.findIndex(data => data.id === bbox.id)
                    new_anno[currCond] = {...new_anno[currCond],
                        mark: {
                            ...new_anno[currCond].mark,
                            x: new_anno[currCond].mark.x+1
                        }
                    }
                })
                setbboxesData(new_anno)
            } else if (event.shiftKey && event.key === "ArrowLeft"){
                setisShifted(true)
                const new_anno = [...bboxesData]
                bboxesData.map((bbox)=>{
                    const currCond = new_anno.findIndex(data => data.id === bbox.id)
                    new_anno[currCond] = {...new_anno[currCond],
                        mark: {
                            ...new_anno[currCond].mark,
                            x: new_anno[currCond].mark.x-1
                        }
                    }
                })
                setbboxesData(new_anno)
            } else if (event.shiftKey && event.keyCode === 38){
                setisShifted(true)
                const new_anno = [...bboxesData]
                bboxesData.map((bbox)=>{
                    const currCond = new_anno.findIndex(data => data.id === bbox.id)
                    new_anno[currCond] = {...new_anno[currCond],
                        mark: {
                            ...new_anno[currCond].mark,
                            y: new_anno[currCond].mark.y-1
                        }
                    }
                })
                setbboxesData(new_anno)
            } else if (event.shiftKey && event.keyCode === 40){
                setisShifted(true)
                const new_anno = [...bboxesData]
                bboxesData.map((bbox)=>{
                    const currCond = new_anno.findIndex(data => data.id === bbox.id)
                    new_anno[currCond] = {...new_anno[currCond],
                        mark: {
                            ...new_anno[currCond].mark,
                            y: new_anno[currCond].mark.y+1
                        }
                    }
                })
                setbboxesData(new_anno)
            }
        }
        const handleKeyUp = (event) => {
            if (event.key === 'Control') {
                setIsDraggable(false)
                setbboxesData(bboxesData.filter(data => data.comment !== undefined))
            } else if (event.key === 'Shift') {
                setisShifted(false)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [bboxesData])

    // const [shapes, setShapes] = useState([
    //     {color: 'blue', enabled: true, opacity: 0.2},
    //     {color: 'green', enabled: true, opacity: 0.2},
    //     {color: 'red', enabled: true, opacity: 0.2}
    // ])
    // const [canvasDataURL, setCanvasDataURL] = useState('')
    // useEffect(() => {
    //     const canvas = document.createElement('canvas')
    //     const ctx = canvas.getContext('2d')
    //     ctx.clearRect(0,0,canvas.width, canvas.height)

    //     shapes.forEach((shape, index) => {
    //         if(shape.enabled) {
    //             ctx.globalAlpha = shape.opacity
    //             ctx.fillStyle = shape.color
    //             ctx.fillRect(index * 15 + 70, index * 15 + 50, 100, 50)
    //         }
    //     })

    //     const dataURL = canvas.toDataURL()
    //     console.log("this is canvas data url ", dataURL)
    //     setCanvasDataURL(dataURL)
    // }, [shapes])

    const [shapes, setShapes] = useState([
        { src: 'https://source.unsplash.com/cat/800x600', enabled: true, opacity: 0.2 },
        { src: 'https://source.unsplash.com/random/800x600', enabled: true, opacity: 0.2 },
        { src: 'https://source.unsplash.com/random/800x600', enabled: true, opacity: 0.2 }
    ]);

    const [canvasDataURL, setCanvasDataURL] = useState('');
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate maximum width and height among images
        const maxWidth = Math.max(...shapes.map(shape => shape.width || 800));
        const maxHeight = Math.max(...shapes.map(shape => shape.height || 600));

        // Set canvas size
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        setCanvasWidth(maxWidth);
        setCanvasHeight(maxHeight);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const loadImages = async () => {
            await Promise.all(shapes.map(async (shape) => {
                if (shape.enabled) {
                    const img = new Image();
                    img.crossOrigin = "anonymous"; // To prevent CORS issues
                    img.src = shape.src;
                    await new Promise(resolve => {
                        img.onload = () => resolve();
                    });
                    ctx.globalAlpha = shape.opacity;

                    // Position images in the middle
                    const imageX = centerX - img.width / 2;
                    const imageY = centerY - img.height / 2;
                    ctx.drawImage(img, imageX, imageY, img.width, img.height);
                }
            }));

            const dataURL = canvas.toDataURL();
            setCanvasDataURL(dataURL);
        };

        loadImages();
    }, [shapes]);

    const handleToggle = (index) => {
        setShapes(prevShapes => {
            const updatedShapes = [...prevShapes]
            updatedShapes[index].enabled = !updatedShapes[index].enabled
            return updatedShapes
        })
    }

    const handleOpacityChange = (index, opacity) => {
        setShapes(prevShapes => {
            const updatedShapes = [...prevShapes]
            updatedShapes[index].opacity = opacity
            return updatedShapes
        })
    }
    return (
        <div className="App">
            <div className="AnnotatorBorder" style={{ width: 2/3*pageSize.width, height: 2/3*pageSize.height}}>
                <Draggable
                disabled={!isDraggable}
                bounds={{left: -1/3*pageSize.width, top: -1/3*pageSize.height, right: 0, bottom: 0}}
                defaultPosition={{x: -1/6*pageSize.width, y: -1/6*pageSize.height}}>
                    <div>
                        <Annotator
                            options={options}
                            pageSize={pageSize}
                            annotate_image={canvasDataURL}
                            bboxesData={bboxesData}
                            setbboxesData={setbboxesData}
                            selectedId={selectedId}
                            setselectedId={setselectedId}
                            isDraggable={isDraggable}
                            setdeltaAdjustment={setdeltaAdjustment}
                        />
                    </div>
                </Draggable>
            </div>

            <Draggable disabled = {!isDraggable}>
                <div className="BboxSpecForm" style={isDraggable ? {cursor:'grab'}: {cursor: 'default'}}>
                    <InputField
                        id="height"
                        value={currentBboxAdjustment.bboxHeight}
                        inputChangeHandler={updateBboxesData}
                    />
                    <InputField
                        id="width"
                        value={currentBboxAdjustment.bboxWidth}
                        inputChangeHandler={updateBboxesData}
                    />
                    <InputField
                        id="x"
                        value={currentBboxAdjustment.bbox_x}
                        inputChangeHandler={updateBboxesData}
                    />
                    <InputField
                        id="x"
                        value={currentBboxAdjustment.bbox_y}
                        inputChangeHandler={updateBboxesData}
                    />
                </div>
            </Draggable>
            <Draggable disabled = {!isDraggable}>
                <div className="BboxList" style={isDraggable ? {cursor:'grab'}: {cursor: 'default'}}>
                    <Segment style={{overflow: 'auto', height: '100%', background: '#f6e6f9'}}>
                        <Menu vertical style={{width:'100%'}}>
                            {bboxesData.map((data)=>(
                                <Menu.Item key={data.id} onClick={()=>{return setselectedId(data.id)}}>
                                    <Icon name='dropbox'/>
                                    {data.comment}
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Segment>
                </div>
            </Draggable>
            <Draggable disabled = {!isDraggable}>
                <div className="ParametersMenu" style={isDraggable ? {cursor:'grab'}: {cursor: 'default'}}>
                    <Segment style={{overflow: 'auto', height: '100%', background: '#b5a9d9'}}>
                        <Menu vertical style={{width:'100%'}}>
                            {
                                [...Array(20).keys()].map((data) =>(
                                    <Menu.Item key={data}>
                                        <InputField
                                        id={'Item '+(data+1)}
                                        value={(data+1) * 100000}
                                        inputChangeHandler={updateParametersData}
                                        inputWidth={'100px'}
                                        labelWidth={'50px'}
                                        />
                                    </Menu.Item>
                                ))
                            }
                        </Menu>
                    </Segment>
                </div>
            </Draggable>
            <Draggable disabled = {!isDraggable}>
                <div className="adjuster-menu-container" style={isDraggable ? {cursor:'grab'}: {cursor: 'default'}}>
                    <StackerMenu
                        shapes={shapes}
                        onToggle={handleToggle}
                        onOpacityChange={handleOpacityChange}
                    />
                </div>
            </Draggable>
        </div>
    );
}


export default App
