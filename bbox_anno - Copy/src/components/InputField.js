import React from "react";
import {Input} from 'semantic-ui-react'

const InputField = ({id, value, inputChangeHandler, labelWidth, inputWidth}) => {
    const labelLength = (labelWidth == undefined)? '40px': labelWidth
    const inputLength = (inputWidth == undefined)? '140px': inputWidth
    return(
        <div>
            <Input
                id = {id}
                label={{basic: true, content: <span style = {{width: labelLength, display: 'inline-block'}}> {id} </span>, color:'pink'}}
                style={{width: inputLength}}
                labelPosition='left'
                maxLength="5"
                type="number"
                min="0"
                value={value === null? 'Select BBox to adjust...': value}
                disabled = {value === null}
                placeholder='Select BBox to adjust...'
                onChange = {inputChangeHandler}
            />
        </div>
    )
}
export default InputField