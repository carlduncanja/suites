import React, { useState } from "react";
import Row from "../Row";
import { StyleSheet, Text, View } from 'react-native';
import MultipleSelectionsField from "./MultipleSelectionsField";
import InputField2 from "../common/Input Fields/InputField2";
import FieldContainer from "../FieldContainerComponent";
import Search from "../Search";
import Footer from "../Page/Footer";

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
       <div style={styles.container}>
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

            <div style = {styles.footer}>

            </div>
        
        </div>
    )
}


const styles = StyleSheet.create({
    container: {
      border: 0,
      borderColor: CCD6E0,
    },
    footer: {
        color: CCD6E0,
    }
    // bigBlue: {
    //   color: 'blue',
    //   fontWeight: 'bold',
    //   fontSize: 30,
    // },

    // red: {
    //   color: 'red',
    // },
  });

export default SearchWithInput;