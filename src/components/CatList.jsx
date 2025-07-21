import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCats, getUsersCats, removeCat } from "../services/cats.service";
import "../css/CatList.css";
import { colorOptions } from '../assets/colorOptions';
import outline from '../assets/catOutline.png';
import features from '../assets/catFeatures.png';

import editIcon from '../assets/edit.png';
import viewIcon from '../assets/view.png';
import deleteIcon from '../assets/delete.png';

const Cat = ({ record, deleteRecord }) => {
  const tintColor = colorOptions[record.color] || '#ccc';

  return (
    <div className="cat-card">
      <h4 className="cat-name">{record.name}</h4>
      <p className="cat-age">Age: {record.age}</p>
      <div className="cat-image-stack">
        <img src={outline} alt="Cat Outline" className="cat-image outline" />
        <div
          className="cat-image-tint"
          style={{ backgroundColor: tintColor }}
        />
        <img src={features} alt="Cat Features" className="cat-image features" />
      </div>

      <div className="cat-card-actions">
        <Link className="cat-button edit" to={`/edit/${record._id}`}>
          <img src={editIcon} alt="Edit" className="cat-icon" />
        </Link>
        <Link className="cat-button view" to={`/pet/${record._id}`}>
          <img src={viewIcon} alt="View" className="cat-icon" />
        </Link>
        <button
          className="cat-button delete"
          onClick={() => deleteRecord(record._id)}
        >
          <img src={deleteIcon} alt="Delete" className="cat-icon" />
        </button>
      </div>
    </div>
  );
};

export default function CatList() {
  const [cats, setCats] = useState([]);

  // Fetch the cats from the GraphQL server on component mount
  useEffect(() => {
    async function fetchCats() {
      try {
        const data = await getUsersCats(); // CHANGE THIS TO SEE ALL CATS
        setCats(data); // store in state
      } catch (error) {
        console.error("Failed to load cats:", error);
      }
    }

    fetchCats();
  }, []); // run only on mount

  // This method runs when the delete button is pressed
  async function handleDelete(catId) {
    try {
      await removeCat(catId);
      setCats(prev => prev.filter(cat => cat._id !== catId));
    } catch (error) {
      console.error('Failed to delete cat:', error);
      alert('An error occurred while deleting the cat');
    }
  }

  return (
    <div className="page-container">
      <h3 className="page-heading">Your Cats:</h3>
      <div className="catlist-grid">
        {cats.map((cat) => (
          <Cat
            key={cat._id}
            record={cat}
            deleteRecord={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}