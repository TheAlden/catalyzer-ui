import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addCat, updateCat, getCat } from "../services/cats.service";
import '../css/CreateCat.css';
import { colorOptions } from '../assets/colorOptions';

export default function CreateCat() {
  const [form, setForm] = useState({
    name: '', 
    age: '', 
    color: '' 
  });

  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString();
      if (!id) return;
      try {
        const cat = await getCat(id);
        if (!cat) {
          console.warn('Cat not found');
          return navigate('/');
        }
        setForm(cat);
        setIsNew(false);
      } catch (err) {
        console.error('Failed to load cat:', err);
        navigate('/');
      }
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (isNew) {
        await addCat(form);
      } else {
        await updateCat(params.id, form);
      }
      
      setForm({ name: '', age: 0, color: '' });
      navigate('/cats');
    } catch (err) {
      console.error('Failed to save cat:', err);
      alert('Failed to save cat. Please check the form or try again.')
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="create-heading">Create a Cat:</h3>
      <form onSubmit={onSubmit} className="create-form">
        <div className="form-section">
          <div>
            <h2 className="section-title">Cat Info</h2>
            <p className="section-description">Make the cat of your dreams!</p>
          </div>

          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-input"
                placeholder="e.g., Bingo"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="text"
                name="age"
                id="age"
                className="form-input"
                placeholder="e.g., 3"
                value={form.age}
                onChange={(e) => updateForm({ age: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Color</label>
              <div className="color-grid">
                {Object.entries(colorOptions).map(([name, value]) => (
                  <div
                    key={name}
                    className={`color-swatch ${form.color === name ? 'selected' : ''}`}
                    style={{ backgroundColor: value }}
                    onClick={() => updateForm({ color: name })}
                    title={name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <input type="submit" value="Save Cat" className="submit-button" />
      </form>
    </>
  );
}