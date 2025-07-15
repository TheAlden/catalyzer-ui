import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCats, removeCat } from "../services/cats.service";
import "./CatList.css";
import { colorOptions } from '../assets/colorOptions';

const Cat = (props) => (
  <tr className="cat-row">
    <td className="cat-cell">{props.record.name}</td>
    <td className="cat-cell">{props.record.age}</td>
    <td className="cat-cell">
      <div
        className="cat-color-swatch"
        style={{ backgroundColor: colorOptions[props.record.color] || '#ccc' }}
        title={props.record.color}
      />
    </td>
    <td className="cat-cell">
      <div className="cat-actions">
        <Link className="cat-button edit" to={`/edit/${props.record._id}`}>
          Edit
        </Link>
        <Link className="cat-button edit" to={`/pet/${props.record._id}`}>
          View
        </Link>
        <button
          className="cat-button delete"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function CatList() {
  const [cats, setCats] = useState([]);

  // Fetch the cats from the GraphQL server on component mount
  useEffect(() => {
    async function fetchCats() {
      try {
        const data = await getCats();
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
      alert('An error occurred while deleting the cat.');
    }
  }

  // This method will map out the cats into table rows
  function catList() {
    return cats.map((cat) => (
      <Cat
        record={cat}
        deleteRecord={() => handleDelete(cat._id)}
        key={cat._id}
      />
    ));
  }

  return (
    <div className="catlist-container">
      <h3 className="catlist-heading">Cats</h3>
      <div className="catlist-table-wrapper">
        <table className="catlist-table">
          <thead>
            <tr className="cat-header-row">
              <th className="cat-header-cell">Name</th>
              <th className="cat-header-cell">Age</th>
              <th className="cat-header-cell">Color</th>
              <th className="cat-header-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {catList()}
          </tbody>
        </table>
      </div>
    </div>
  );
}