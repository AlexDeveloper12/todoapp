import React from "react";

function FilterRadioButton({label,value,index,handleFilterChange}){
    return(
        <>
                <input type="radio"
                  id={`filter-value-cb-${index}`}
                  name="filter"
                  value={value}
                  className="filter-cb"
                  onChange={(e) => handleFilterChange(e)}
                />
                <label htmlFor={`filter-value-cb-${index}`}>{label}</label>
              </>
    )
}

export default FilterRadioButton;