  
import React, { Component } from 'react';
import {StyleSheet,Text,View,Platform} from 'react-native';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';

const TextEditor2 = () =>{
    const onEditorInitialized = () => {
        setFocusHandlers();
        getHTML();
    }

    const setFocusHandlers =() =>{
        richtext.setTitleFocusHandler(() => {
            console.log("Title focus")
          //alert('title focus');
        });
        richtext.setContentFocusHandler(() => {
            console.log("Content Focus")
          //alert('content focus');
        });
      
    }

    const getHTML = async () => {
        const titleHtml = await this.richtext.getTitleHtml();
        const contentHtml = await this.richtext.getContentHtml();
        console.log("Title, Content: ", titleHtml, contentHtml)
    }
    

    return (
        <View style={styles.container}>
          <RichTextEditor
              ref={(r)=>richtext = r}
              style={styles.richText}
              initialTitleHTML={'Title!!'}
              initialContentHTML={''}
              editorInitializedCallback={() => onEditorInitialized()}
          />
          <RichTextToolbar
            getEditor={() => richtext}
          />
          {/* {Platform.OS === 'ios' && <KeyboardSpacer/>} */}
        </View>
    )
}

export default TextEditor2

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      paddingTop: 40
    },
    richText: {
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  });