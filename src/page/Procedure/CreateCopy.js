import React,{ useState, useEffect} from "react";
import { View, Text, Alert } from "react-native";
import InputField2 from "../../components/common/Input Fields/InputField2";
import SearchableOptionsField from "../../components/common/Input Fields/SearchableOptionsField";
import DateInputField from "../../components/common/Input Fields/DateInputField";
import Row from '../../components/common/Row'
import FieldContainer from '../../components/common/FieldContainerComponent';

import {getCaseFiles, getTheatres, getProcedures} from "../../api/network";

function CreateCopy({ navigation }){

    const dialogTabs = ['Details','Location'];
    const selectedIndex = 0;

    // Theatres Search
    const [searchTheatreValue, setSearchTheatreValue] = useState();
    const [searchTheatreResults, setSearchTheatreResult] = useState([]);
    const [searchTheatreQuery, setSearchTheatreQuery] = useState({});

    // Procedures Search
    const [searchProcedureValue, setSearchProcedureValue] = useState();
    const [searchProcedureResults, setSearchProcedureResult] = useState([]);
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({});

    // Category Search
    const [searchCaseValue, setSearchCaseValue] = useState();
    const [searchCaseResults, setSearchCaseResult] = useState([]);
    const [searchCaseQuery, setSearchCaseQuery] = useState({});

    useEffect(() => {

        if (!searchTheatreValue) {
            // empty search values and cancel any out going request.
            setSearchTheatreResult([]);
            if (searchTheatreQuery.cancel) searchTheatreQuery.cancel();
            return;
        }
        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchTheatres, 300);

        setSearchTheatreQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchTheatreValue]);

    useEffect(() => {

        if (!searchProcedureValue) {
            // empty search values and cancel any out going request.
            setSearchProcedureResult([]);
            if (searchProcedureQuery.cancel) searchProcedureQuery.cancel();
            return;
        }
        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProcedures, 300);

        setSearchProcedureQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchProcedureValue]);

    useEffect(() => {

        if (!searchCaseValue) {
            // empty search values and cancel any out going request.
            setSearchCaseResult([]);
            if (searchCaseQuery.cancel) searchCaseQuery.cancel();
            return;
        }
        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchCases, 300);

        setSearchCaseQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchCaseValue]);

    const fetchProcedures = () =>{
        getProcedures(searchProcedureValue, 5)
            .then((results = {}) => {
                const { data = [], pages = 0 } = results
                console.log("Results: ", data)
                setSearchProcedureResult(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get procedures");
                Alert.alert("Failed", "Unable to retrieve list of procedures")
                setSearchProcedureResult([]);
            })
    }

    const fetchTheatres = () =>{
        getTheatres(searchTheatreValue, 5)
            .then((results = {}) => {
                const { data = [], pages = 0 } = results
                console.log("Results: ", data)
                setSearchTheatreResult(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                Alert.alert("Failed", "Unable to retrieve list of theatres")
                setSearchTheatreResult([]);
            })
    }

    const fetchCases = () =>{
        getCaseFiles(searchCaseValue, 5)
            .then((results = {}) => {
                const { data = [], pages = 0 } = results
                console.log("Results: ", data)
                setSearchCaseResult(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get cases");
                Alert.alert("Failed", "Unable to retrieve list of cases")
                setSearchCaseResult([]);
            })
    }

    const detailsTab = (
        <>
            <Row>
                <FieldContainer></FieldContainer>
                <FieldContainer></FieldContainer>
            </Row>
            <Row>
                <FieldContainer></FieldContainer>
                <FieldContainer></FieldContainer>
            </Row>
            <Row>
                <FieldContainer></FieldContainer>
                <FieldContainer></FieldContainer>
            </Row>
        </>
    )

    const locationsTab = <>

    </>

    const getDialogContent = (tab) =>{
        
    }

    return (
        <View>
            <Text>Create Copy</Text>
        </View>
    )
}

export default CreateCopy