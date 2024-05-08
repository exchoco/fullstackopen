import React from "react";
import {Button, FormInput, GridColumn, Grid} from 'semantic-ui-react'

const StackerMenu = ({shapes, onToggle, onOpacityChange}) => {
    return(
        <div>
            <Grid columns={Object.keys(shapes).length} divided>
                {shapes.map((shape, index) => (
                    <div key={index}>
                        <GridColumn>
                            <Button
                                toggle
                                active={shape.enabled}
                                onClick={()=>onToggle(index)}>
                                    <span style={{width: 100, display:'inline-block'}}>{index}</span>
                            </Button>
                            <FormInput
                                type="range"
                                mins="0.1"
                                max="1"
                                step="0.1"
                                value={shape.opacity}
                                onChange={(e) => onOpacityChange(index, parseFloat(e.target.value))}
                                />
                        </GridColumn>
                    </div>
                ))}

            </Grid>
        </div>
    )
}
export default StackerMenu