import  { useState } from 'react'
import Button from '../Button/button';

const Dynamicform = ({fields,onSubmit ,heading ,isEditMode}) => {

    const [formData , setFormData] = useState({});

    const handleInputChange = (e) =>{
        const {name ,value} =  e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit(formData);
        setFormData({});
    }
  return (
    <div>
           <form onSubmit={handleSubmit}>
      <div className="modal-form-heading">
        <h2>{heading}</h2>
      </div>

      <div className="modal-form-input-div">
        {fields.map((field) => (
          <div key={field.name} className="modal-form-input">
            <input
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              required={field.required}
            />
          </div>
        ))}
      </div>

      <div className="modal-form-btn-div">
        <Button type="submit"  text={isEditMode ? "Edit" : "Add"} className="modal-form-btn" />
       
      </div>
    </form>



    </div>
  )
}

export default Dynamicform