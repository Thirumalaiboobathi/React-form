import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    ratio: '',
    dob: '',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? e.target.checked : value });
  };
  

  const handleEdit = (index) => {
    const editedData = submittedData[index];
    setFormData(editedData);
    setEditRowIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1);
    setSubmittedData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentSubmissionData = { ...formData };

    if (editRowIndex !== null) {
      
      const updatedData = [...submittedData];
      updatedData[editRowIndex] = currentSubmissionData;
      setSubmittedData(updatedData);
      setEditRowIndex(null);
    } else {
    
      setSubmittedData([...submittedData, currentSubmissionData]);
    }

    setFormData({
      name: '',
      gender: '',
      ratio: '',
      dob: '',
    });
  };

  const handleExit = () => {
    setFormData({
      name: '',
      gender: '',
      ratio: '',
      dob: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h1 style={{ color: 'white', marginLeft: '70px' }}>Enter the Details</h1>
        <label style={{ color: 'white', marginBottom: '10px', marginLeft: '90px'  }}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} pattern="[A-Za-z]+" title="Please enter only letters" required />
        </label>
        <label style={{ color: 'white', marginBottom: '10px', marginLeft: '90px' }}>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="select">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <label style={{ color: 'white', marginBottom: '10px', marginLeft: '90px' }}>
          Ratio:
          <input type="number" name="ratio" value={formData.ratio} onChange={handleChange} step="0.01" required/>

        </label>
        <label style={{ color: 'white', marginBottom: '10px', marginLeft: '90px' }}>
          DOB:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </label>
        <div style={{ marginTop: '10px', marginLeft: '130px' }}>
          <button type="submit">Add</button>
          <button type="button" onClick={handleExit} style={{ marginLeft: '10px' }}>
            Clear
          </button>
        </div>
      </form>


      {submittedData.length > 0 && (
        <table style={{ borderCollapse: 'collapse', border: '1px solid black', marginLeft: '10px' }}>
          <thead style={{ background: '#264653', color: 'white' }}>
            <tr>
              {Object.keys(submittedData[0]).map((key) => (
                <th key={key} style={{ border: '1px solid black', padding: '8px' }}>
                   {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                {Object.values(data).map((value, index) => (
                  <td key={index} style={{ border: '1px solid black', padding: '8px' }}>
                    {value}
                  </td>
                ))}
                 <td style={{ border: '1px solid black', padding: '8px' }}>
                  <button onClick={() => handleEdit(index)} style={{ marginRight: '4px' }}>Edit</button>
                  <button onClick={() => handleDelete(index)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormComponent;
