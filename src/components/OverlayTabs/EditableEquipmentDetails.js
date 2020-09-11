import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import InputField2 from '../common/Input Fields/InputField2';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import OptionsField from '../common/Input Fields/OptionsField';
import InputUnitField from '../common/Input Fields/InputUnitFields';
import styled, { css } from '@emotion/native';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';

import { getPhysicians, getCategories } from "../../api/network";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import Row from "../common/Row";
import Record from "../common/Information Record/Record";
import { useTheme } from "emotion-theming";
import TextEditor from "../common/Input Fields/TextEditor";
import { forEach } from "lodash";
import { set } from "numeral";

const LabelText = styled.Text`
color:${({ theme }) => theme.colors["--color-gray-600"]};
font:${({ theme }) => theme.font["--text-base-regular"]};
`

const EditableEquipmentDetails = ({ fields, onFieldChange }) => {

    const theme = useTheme();

    // Physicians Search
    const [searchValue, setSearchValue] = useState();
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

    //Description
    const [descriptionValue, setDescriptionValue] = useState('');


    useEffect(() => {
        console.log("Description has:", descriptionValue);
    }, [descriptionValue])

    // Handle physicians search
    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysicians, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchValue]);

    useEffect(() => {

        if (!categorySearchValue) {
            // empty search values and cancel any out going request.
            setCategorySearchResult([]);
            if (categorySearchQuery.cancel) categorySearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchCategory, 300);

        setCategorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [categorySearchValue]);

    const fetchPhysicians = () => {
        getPhysicians(searchValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));
                console.log("Results: ", results)
                setSearchResult(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                setSearchValue([]);
            })
    };

    const fetchCategory = () => {
        getCategories(categorySearchValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    _id: item,
                    name: item
                }));
                setCategorySearchResult(results || [])
            })
            .catch(error => {
                console.log("failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled
            keyboardVerticalOffset={300}
            behavior={'padding'}
        >
            <>
                <Row>
                    <LabelText theme={theme}>Description</LabelText>
                </Row>
                <TextEditor
                    onFieldChange={(value) => setDescriptionValue(value)}
                />
            </>


        </KeyboardAvoidingView>


    )
}

EditableEquipmentDetails.propTypes = {};
EditableEquipmentDetails.defaultProps = {};

export default EditableEquipmentDetails

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    fieldWrapper: {
        flex: 1,
        marginRight: 35,
        marginBottom: 30,
        flexDirection: 'column'
    },
    inputWrapper: {
        height: 30,
        justifyContent: 'center'
    },
    title: {
        color: '#718096',
        fontSize: 16,
        // marginBottom:5
    },
})
