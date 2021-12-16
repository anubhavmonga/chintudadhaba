import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { listProductsFilter } from "../actions/productActions";

function FilterSection() {
  const [cuisine, setCuisine] = useState([]);
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsFilter(cuisine, category));
  }, [cuisine, category, dispatch]);

  const handleCuisineChange = (e) => {
    if (e.target.checked) {
      setCuisine([...cuisine, e.target.value]);
    } else {
      setCuisine(cuisine.filter((a) => a !== e.target.value));
    }
  };

  const handleCategoryChange = (e) => {
    if (e.target.checked) {
      setCategory([...category, e.target.value]);
    } else {
      setCategory(category.filter((a) => a !== e.target.value));
    }
  };
  return (
    <div className="filter">
      <div className="dropdown">
        <ul>
          <li className="filter-heading">Type</li>
          <ul>
            <li>
              <input
                type="checkbox"
                className="input-checkbox"
                name="type"
                value="veg"
                onChange={handleCategoryChange}
                id="checkbox_veg"
              />
              <label htmlFor="checkbox_veg" className="checkbox_cuisine">
                Veg
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                name="type"
                value="nonveg"
                onChange={handleCategoryChange}
                id="checkbox_nonveg"
              />
              <label htmlFor="checkbox_nonveg" className="checkbox_cuisine">
                Non-Veg
              </label>
            </li>
          </ul>
          <li className="filter-heading">Cuisine</li>
          <ul>
            <li>
              <input
                type="checkbox"
                name="cuisine"
                value="Italian"
                onChange={handleCuisineChange}
                id="checkbox_italian"
              />
              <label htmlFor="checkbox_italian" className="checkbox_cuisine">
                Italian
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                name="cuisine"
                value="Chinese"
                onChange={handleCuisineChange}
                id="checkbox_chinese"
              />
              <label htmlFor="checkbox_chinese" className="checkbox_cuisine">
                Chinese
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                name="cuisine"
                value="Indian"
                onChange={handleCuisineChange}
                id="checkbox_indian"
              />
              <label htmlFor="checkbox_indian" className="checkbox_cuisine">
                Indian
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                name="cuisine"
                value="Breads"
                onChange={handleCuisineChange}
                id="checkbox_breads"
              />
              <label htmlFor="checkbox_breads" className="checkbox_cuisine">
                Breads
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                name="cuisine"
                value="Beverages"
                onChange={handleCuisineChange}
                id="checkbox_beverages"
              />
              <label htmlFor="checkbox_beverages" className="checkbox_cuisine">
                Beverages
              </label>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default FilterSection;
