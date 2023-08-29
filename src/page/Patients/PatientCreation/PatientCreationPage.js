import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useModal} from 'react-native-modalfy';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import moment from 'moment';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import Snackbar from 'react-native-paper/src/components/Snackbar';



function PatientCreationPage({navigation, addCaseFile, saveDraft, removeDraft, route}){
   return(
    <View>

    </View>
   )
} 

export default PatientCreationPage