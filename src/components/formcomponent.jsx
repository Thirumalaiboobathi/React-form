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
      <form onSubmit={handleSubmit} className="form-container">
        <h1 style={{ color: 'white', marginLeft: '9px' }}>Form</h1>
        <label style={{ color: 'white' }}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label style={{ color: 'white' }}>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </label>

        <br></br>
        <br></br>
        <label style={{ color: 'white' }}>
          Ratio:
          <input type="text" name="ratio" value={formData.ratio} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <label style={{ color: 'white' }}>
          DOB:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleExit} style={{ marginLeft: '50px' }}>
          Clear
        </button>
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
