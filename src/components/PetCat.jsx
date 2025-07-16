import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCat } from "../services/cats.service";
import { colorOptions } from "../assets/colorOptions";
import outline from '../assets/catOutline.png';
import features from '../assets/catFeatures.png';
import '../css/PetCat.css';

export default function ViewCat() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    color: ''
  });

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
      } catch (err) {
        console.error('Failed to load cat:', err);
        navigate('/');
      }
    }
    fetchData();
  }, [params.id, navigate]);

  const tintColor = colorOptions[form.color] || '#ccc';

  const handleSendEmail = async () => {
    if (!email) {
      setError('Please enter an email address.');
      return;
    }

    setSending(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3000/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: `Here's your cat: ${form.name}`,
          text: `Meet ${form.name}, a ${form.age}-year-old cat!`,
        }),
      });

      if (!response.ok) throw new Error('Failed to send email.');

      setSuccess('Email sent!');
      setEmail('');
      setShowPopup(false);
    } catch (err) {
      setError(err.message || 'Unexpected error.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="view-cat-container">
      <h1 className="cat-name">{form.name}</h1>
      <p className="cat-age">Age: {form.age}</p>

      <div className="cat-image-stack">
        <img src={outline} alt="Outline" className="cat-image outline" />
        <div
          className="cat-image-tint"
          style={{ backgroundColor: tintColor }}
        />
        <img src={features} alt="Features" className="cat-image features" />
      </div>

      <input
        type="submit"
        value="Email Cat"
        className="submit-button"
        onClick={() => setShowPopup(true)}
      />

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Send this cat by email:</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <button onClick={handleSendEmail} disabled={sending}>
                {sending ? 'Sending...' : 'Send'}
              </button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
        </div>
      )}  
    </div>
  );
}