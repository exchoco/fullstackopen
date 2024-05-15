
import React, { useState } from "react";
import { Select, Input, Button, Label, Form } from "semantic-ui-react";

const CustomInputControl = ({ bboxesData, boxLevelData, selectedId, onDelete, onNameChange, onGroupNameChange, onRotationChange }) => {
  const [name, setName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [rotation, setRotation] = useState("");


  const handleDelete = () => {
    console.log("deleting ,", selectedId)
    onDelete(selectedId);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    onNameChange(newName);
  };

  const handleGroupNameChange = (event) => {
    const newGroupName = event.target.value;
    setGroupName(newGroupName);
    onGroupNameChange(newGroupName);
  };

  const handleRotationChange = (event, {value}) => {
    console.log("set new rotation value ", value)
    setRotation(value);
    onRotationChange(value);
  };

  return (
    <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '200px'}}>
      <div style={{display: 'flex', flexDirection:'column', gap:'10px'}}>
        <Form.Field>
            <Label>Bbox name</Label>
            <Input
                type="text"
                value={bboxesData.find(data=>data.id === selectedId) == undefined ? "null" : bboxesData.find(data=>data.id === selectedId).comment}
                onChange={handleNameChange}
                placeholder="Enter annotation name..."
                icon='id badge'
                iconPosition='left'
                style={{marginRight:'10px', borderRadius: '20px'}}
            />
        </Form.Field>
        <Form.Field>
            <Label>class</Label>
            <Input
                type="text"
                value={boxLevelData.find(data=>data.id === selectedId) == undefined ? "null" : boxLevelData.find(data=>data.id === selectedId).groupName}
                onChange={handleGroupNameChange}
                placeholder="Enter class name..."
                icon='object group outline'
                iconPosition='left'
                style={{marginRight:'10px', borderRadius: '20px'}}
            />
        </Form.Field>
      </div>
      <div style={{display: 'flex', flexDirection:'column', gap:'10px'}}>
        <Form.Field>
            <Label>rotation degree</Label>
            <Select
                value={boxLevelData.find(data=>data.id === selectedId) == undefined ? "null" : boxLevelData.find(data=>data.id === selectedId).rotationDegree}
                onChange={handleRotationChange}
                options={[
                    {key: '1', text: '10 degree', value: '10'},
                    {key: '90', text: '90 degree', value: '90'}
                ]}
            />
        </Form.Field>
        <Button
            onClick={handleDelete}
            color="purple"
            icon="trash alternate outline"
            content='Delete'
            style={{borderRadius:'20px', backgroundColor: '#9370DG', color:'white', padding:'10px 20px'}}
        />
      </div>
    </div>
  );
};

export default CustomInputControl;