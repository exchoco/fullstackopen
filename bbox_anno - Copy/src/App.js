import React, { useState, useRef, useEffect } from "react";
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
    Grid,
    GridColumn,
    Radio,
    Header,
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
    const [blendedImage, setBlendedImage] = useState(null)
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
        document.body.style.zoom = "100%"
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

    const KeyValue = ({keyName, value}) => {
        <div>
            <Header as='h4'>{keyName}</Header>
            <p>{value}</p>
        </div>
    }

    const [shapes, setShapes] = useState([
        { src: 'https://source.unsplash.com/reandom/1024x1024', enabled: true, opacity: 0.2, drawOrder: 0},
        { src: 'https://source.unsplash.com/random/1024x1024', enabled: true, opacity: 0.2, drawOrder: 1 },
        { src: 'https://source.unsplash.com/random/1024x1024', enabled: true, opacity: 0.2, drawOrder: 2 }
    ]);

    const [canvasDataURL, setCanvasDataURL] = useState('');
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const sortedShapes = shapes
            .slice()
            .sort((a, b) => b.opacity - a.opacity || a.drawOrder - b.drawOrder)
        const loadImages = async (sortedShapes, canvas) => {
            const ctx = canvas.getContext('2d')
            const enabledShapes = sortedShapes.filter(shape => shape.enabled)
            canvas.width = 1024
            canvas.height = 1024

            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            ctx.clearRect(0, 0, canvas.width, canvas,height)

            for (const shape of enabledShapes) {
                const image = new Image()
                image.src = shape.src
                image.crossOrigin = "anonymous"
                await new Promise((resolve, reject) => {
                    image.onload = resolve
                    image.onerror = reject
                })

                const x = centerX - image.width / 2
                const y = centerY - image.height / 2

                ctx.drawImage(image, x, y)
            }
            const dataURL = canvas.toDataURL()
            console.log("this is the data url of canvas, ", dataURL)
            setCanvasDataURL(dataURL)
        }
        loadImages(sortedShapes, canvas)

    }, [shapes]);

    const handleToggle = (index) => {
        setShapes(prevShapes => {
            const updatedShapes = [...prevShapes]
            updatedShapes[index].enabled = !updatedShapes[index].enabled
            if(updatedShapes[index].enabled){
                updatedShapes.forEach(shape => {
                    if(shape !== updatedShapes[index] && shape.drawOder > updatedShapes[index].drawOder){
                        shape.drawOrder=shape.drawOrder - 1
                    }
                })
            } else {
                updatedShapes[index].drawOder = -1
            }
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

    const [viewBboxes, setViewBboxes] = useState(false)
    return (
        <div className="App">
            <div className="AnnotatorBorder" style={{ width: 2/3*pageSize.width, height: 2/3*pageSize.height}}>
                <Draggable
                disabled={!isDraggable}
                bounds={{left: -1/3*pageSize.width, top: -1/3*pageSize.height, right: 0, bottom: 0}}
                defaultPosition={{x: -1/6*pageSize.width, y: -1/6*pageSize.height}}>
                    <div style={{position: 'relative'}}>
                        <Annotator
                            options={options}
                            pageSize={pageSize}
                            annotate_image={canvasDataURL}
                            bboxesData={!viewBboxes? bboxesData: []}
                            setbboxesData={setbboxesData}
                            selectedId={selectedId}
                            setselectedId={setselectedId}
                            isDraggable={isDraggable}
                            setdeltaAdjustment={setdeltaAdjustment}
                            viewBboxes={viewBboxes}
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
                    <Radio
                        toggle
                        onChange={(e, data) => setViewBboxes(data.checked)}
                        style={{position: 'relative', top: '-10px'}}
                    />
                    <Icon size="large" name="eye slash" style={{position: 'relative', top: '-15px', right: '-10px'}}/>
                    <Header as='h4' icon style={{position: 'realitive', top: '-15px', right: '-15px'}}>
                        Hide Bboxes
                    </Header>
                    <Segment style={{overflow: 'auto', height: '90%', background: '#f6e6f9', top: '-30px'}}>
                        <Menu vertical style={{width:'100%'}}>
                            {bboxesData.map((data)=>(
                                <Menu.Item key={data.id} onClick={()=>{return setselectedId(data.id)}}>
                                    <Icon name='object ungroup outline'/>
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
                <div className="HorizontalParametersMenu" style={isDraggable?{cursor:'grab'}: {cursor: 'default'}}>
                    <Segment style={{overflow: 'auto', height: '100%', width: '100%', background: '#b5a9d9'}}>
                        <Menu horizontal="true" style={{width: '100%'}} secondary >
                            {[...Array(20).keys()].map((data) => (
                                <Menu.Item key={data}>

                                    <Segment>
                                    <Header> Key_Name: </Header>
                                    <p>Value</p>
                                    </Segment>
                                </Menu.Item>
                            ))}
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