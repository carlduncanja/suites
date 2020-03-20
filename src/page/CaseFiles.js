import React, { useState, useEffect } from 'react';
import Page from '../components/common/Page/Page';

const CaseFiles = (props) => {
    const [textInput, setTextInput] = useState("") 
    const changeText = (text) =>{
        setTextInput(text)
    }
    const routeName = props.navigation.state.routeName
    return (
        <Page
            pageTitle = {routeName}
            placeholderText = {"Search by any heading or entry below"}
            changeText = {changeText}
            inputText = {textInput}
            routeName = {routeName}
        />
    );
}

export default CaseFiles;
