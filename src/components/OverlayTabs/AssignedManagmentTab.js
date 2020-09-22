import React, { useState } from 'react';
import { View } from 'react-native';
import { withModal } from "react-native-modalfy";
import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';
import DataItem from "../common/List/DataItem";
import Footer from "../common/Page/Footer";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Divider } from 'react-native-elements';


const Title = styled.Text`
font: ${({ theme }) => theme.font["--text-xl-medium"]}
margin:10px
margin-bottom:30px
`

const TableHeader = styled.Text`
font: ${({ theme }) => theme.font["--text-xs-medium"]}
color: ${({ theme }) => theme.colors["--color-gray-600"]}
`



function EquipmentGroupGeneralTab({ assignments = [] }) {


    const theme = useTheme();
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);




    return (
        <>
            <View style={{ height: '75%', padding: 10 }}>
                <Title theme={theme}>Currently Assigned</Title>

                <View style={{ width: '80%', height: 40, justifyContent: "space-between", flexDirection: "row", marginBottom: -10 }}>
                    <TableHeader>Assigned</TableHeader>
                    <TableHeader>From</TableHeader>
                    <TableHeader>Duration</TableHeader>
                </View>

                <Divider />


            </View>
            <Footer
                hasActionButton={false}
                isDisabled={true}
                hasPaginator={false}
                toggleActionButton={() => { }}
            />



        </>

    )
}

export default withModal(EquipmentGroupGeneralTab)
