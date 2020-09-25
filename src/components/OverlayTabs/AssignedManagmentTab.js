import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { withModal } from "react-native-modalfy";
import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';
import DataItem from "../common/List/DataItem";
import Footer from "../common/Page/Footer";
import styled, { css } from '@emotion/native';
import moment from 'moment';
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

const SectionWrapper = styled.View`
height:40%;
padding:10px;
`

const HeaderContainer = styled.View`
width:80%;
height:40px;
justifyContent:space-between;
flex-direction:row;
margin-bottom:-10px
`

function EquipmentGroupGeneralTab({ assignments = [] }) {


    const theme = useTheme();
    const today = new Date();

    console.log("Assignments are", assignments)




    return (
        <>
            <SectionWrapper>
                <Title theme={theme}>Currently Assigned</Title>

                <HeaderContainer>
                    <TableHeader>Assigned</TableHeader>
                    <TableHeader>From</TableHeader>
                    <TableHeader>Duration</TableHeader>
                </HeaderContainer>

                <Divider />
                {assignments.map(item => {

                    const date = new Date(item.startTime)
                    if (date.setDate(date.getHours() + item.duration) > today) {
                        console.log('This is current', item);
                        return (
                            <View style={{ flexDirection: "row", width: "100%", height: "100%", marginTop: 20 }}>
                                <Text style={{ flex: .65 }}> {item.type === "physician" ? item.physician : item.theatre}  </Text>
                                <Text style={{ marginLeft: 50 }}>{`${moment(date).format('MM/DD/YYYY')}-${moment(date).format(' h:mm a')}`}</Text>
                                <Text style={{ marginLeft: 80 }}> {`${item.duration} hrs`} </Text>

                            </View>)
                    }

                })}




            </SectionWrapper>
            <Title theme={theme}>Completed</Title>
            <HeaderContainer>
                <TableHeader>Change</TableHeader>
                <TableHeader>From</TableHeader>
                <TableHeader>Released</TableHeader>
            </HeaderContainer>

            <Divider />

            {assignments.map(item => {
                let addedDuration = new Date()
                const date = new Date(item.startTime);
                addedDuration.setDate(date.getHours() + item.duration)

                if (date.setDate(date.getHours() + item.duration) < today) {
                    console.log('This is current', item);
                    return (
                        <View style={{ flexDirection: "row", width: "100%", height: "100%", marginTop: 20 }}>
                            <Text style={{ flex: .75 }}> {item.type === "physician" ? item.physician : item.theatre}  </Text>
                            <Text style={{ marginLeft: 50 }}>{`${moment(date).format('MM/DD/YYYY')}-${moment(date).format(' h:mm a')}`}</Text>
                            <Text style={{ marginLeft: 80 }}> {`${moment(addedDuration).format('MM/DD/YYYY h:mm a')}`} </Text>

                        </View>)
                }

            })}
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
