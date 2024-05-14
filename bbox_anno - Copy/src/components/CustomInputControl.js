import React, { useState } from "react";

const CustomInputControl = ({ annotation, onDelete, onNameChange, onGroupNameChange, onRotationChange }) => {
  const [name, setName] = useState(annotation.comment || "");
  const [groupName, setGroupName] = useState(annotation.groupName || "");
  const [rotation, setRotation] = useState(annotation.rotation || 0);

  const handleSelect = () => {
    // Handle selection logic here
  };

  const handleDelete = () => {
    onDelete(annotation.id);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    onNameChange(annotation.id, newName);
  };

  const handleGroupNameChange = (event) => {
    const newGroupName = event.target.value;
    setGroupName(newGroupName);
    onGroupNameChange(annotation.id, newGroupName);
  };

  const handleRotationChange = (event) => {
    const newRotation = event.target.value;
    setRotation(newRotation);
    onRotationChange(annotation.id, newRotation);
  };

  return (
    <div className="custom-input-control">
      <div className="selection-box" onClick={handleSelect}></div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter annotation name..."
      />
      <input
        type="text"
        value={groupName}
        onChange={handleGroupNameChange}
        placeholder="Enter group name..."
      />
      <select value={rotation} onChange={handleRotationChange}>
        <option value={0}>0 degrees</option>
        <option value={90}>90 degrees</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CustomInputControl;