import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./seach.css"

export default function Search(){
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/product/search/${values.keyword}`
        );
        setValues({ ...values, results: data });
        navigate("/search");
      } catch (error) {
        console.log(error);
      }
      
    };
    return (
       
        <form
          role="search"
          onSubmit={handleSubmit}
          className='search'
        >
            
          <input
            type="search"
            placeholder="Ecommerce Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
           <button className="searchIcon">
                <SearchIcon/>
            </button>
           
        </form>
       
    );
}