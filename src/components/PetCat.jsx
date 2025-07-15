import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCat } from "../services/cats.service";

export default function ViewCat() {
    const [form, setForm] = useState({
        name: '', 
        age: '', 
        color: '' 
    });

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
          setForm(cat);;
        } catch (err) {
          console.error('Failed to load cat:', err);
          navigate('/');
        }
      }
      fetchData();
    }, [params.id, navigate]);

    
}