import React, { useState } from "react";
import Row from "../Row";
import { StyleSheet, Text, View } from 'react-native';

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
            <div style={styles.menu}>

                {searchResults.map((res)=> {
                    <li>
                         <Item
                            hasCheckBox={true}
                            itemView={{res}}
                        />
                        
                    </li>
                })}

            </div>
            <div style = {styles.footer}>
                
            </div>
        
        </div>
    )
}


const styles = StyleSheet.create({
    container: {
      border: 0,
      borderColor: '#CCD6E0',
      position: "relative",
      width: 268,
      height: 177

    },
    footer: {
        color: '#CCD6E0',
    },
    menu: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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