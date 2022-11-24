import React, { useState } from "react";
import Row from "../Row";
import MultipleSelectionsField from "./MultipleSelectionsField";
import InputField2 from "../common/Input Fields/InputField2";
import FieldContainer from "../FieldContainerComponent";
import Search from "../Search";

function SearchWithInput(props){

    const [isOpen, setIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
      
      if (searchInput.length > 0) {
          props.data.filter((category) => {
          console.log(category);
          setSearchResults(category);
      });
      }

    return (
       props.open && <div className="popup">
            <Row>
                <input
                    type="text"
                    //placeholder="Search here"
                    onChange={handleChange}
                    value={searchInput} 
                />
            </Row>

            {searchResults.map((res)=> {
                <li>
                    {res}
                </li>
            })}
        
        </div>
    )
}

export default SearchWithInput;