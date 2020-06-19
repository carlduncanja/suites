import React, {  useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Table from '../../../common/Table/Table';
import SvgIcon from '../../../../../assets/SvgIcon'
import { withModal } from 'react-native-modalfy';
import { formatDate, currencyFormatter } from '../../../../utils/formatter';
import Item from '../../../common/Table/Item';
import ReportPreview from '../../Reports/ReportPreview';


const reportTestData = {
    billing : {
        billedTo: {
            name : 'Julie Melissa Brown',
            address : {
                line1 : "23 Bedford Avenue",
                line2 : "Kingston 8",
                line3 : "JMKN08"
            }
        },
        billedFor : "Medical Services",
        date : new Date(2019,11,12),
        charges : {
            subTotal : 178167.21,
            discount : 30002.25,
            tax : 0.2
        }
    },
    billedItems : {
        physicians : [
            {
                name : "Dr. Mansingh",
                cost : 64000.45
            }
        ],
        procedures : [
            {
                name : 'Coronary Bypass Graft',
                cost : 48000.00
            },
            {
                name : 'Coronary Artery Graft',
                cost : 48000.00
            }
        ],
        equipments : [
            {
                name : 'Blood Glasses',
                amount : 2,
                unitPrice : 16000.45
            },
            {
                name : 'Stethoscope 4',
                amount : 3,
                unitPrice : 15000.50
            }
        ],
        inventories : [
            {
                name : 'Agents',
                amount : 15,
                unitPrice : 5000.62
            },
            {
                name : 'Atracurium',
                amount : 5,
                unitPrice : 4128.45
            },
            {
                name : 'GU Tower',
                amount : 10,
                unitPrice : 5055.20
            },
            {
                name : 'Gauze',
                amount : 20,
                unitPrice : 500.00
            }
        ]
    }
}

const Quotations = ({tabDetails, reportDetails, modal, handleQuotes}) => {
    // console.log("Deta:", reportDetails)
    const [checkBoxList, setCheckBoxList] = useState([])

    const headers = [
        {
            name: "Quotation",
            alignment : "flex-start"
        },
        {
            name: "Date",
            alignment : "flex-start"
        },
        {
            name: "Status",
            alignment : "flex-start"
        },
        {
            name: "Value",
            alignment : "center"
        },
        {
            name: "Actions",
            alignment : "flex-end"
        }
    ]

    const openModal = (item) => () => {
        modal.openModal('ReportPreviewModal', {
            content: <ReportPreview
                type = "Quotation"
                details = {tabDetails[0]}
                reportDetails = {reportDetails}
            />
        })
    }


    const listItem = (item) => {

        const { quotationNumber = "", amountDue = 0, dateGenerated ="" } = item
        return(

            <>
                <View style={styles.item}>
                    <Text style={[styles.itemText]}>{quotationNumber}</Text>
                </View>
                <View style={[styles.item,{alignItems:'flex-start'}]}>
                    <Text style={styles.itemText}>{formatDate(dateGenerated,'DD/MM/YYYY')}</Text>
                </View>
                <View style={[styles.item,{alignItems:'flex-start'}]}>
                    <Text style={styles.itemText}>{item.status}</Text>
                </View>
                <View style={[styles.item,{alignItems:'center'}]}>
                    <Text style={styles.itemText}>{`$ ${currencyFormatter(amountDue)}`}</Text>
                </View>
                <View style={[styles.item,{alignItems:'flex-end', marginRight:10}]}>
                    <SvgIcon iconName = "actions"/>
                </View>
            </>

        )
    }


    const toggleCheckbox = (item) => () => {
        // console.log('Item:', item)
        let updatedQuotes = [...checkBoxList];

        if (updatedQuotes.includes(item)) {
            updatedQuotes = updatedQuotes.filter(quote => quote !== item)
        } else {
            updatedQuotes.push(item);
        }
        setCheckBoxList(updatedQuotes);
        handleQuotes(updatedQuotes)
        // console.log('Quotes:', updatedQuotes)
    }

    const toggleHeaderCheckbox = () =>{

        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== tabDetails.length;
        if(indeterminate){
            const selectedAllIds = [...tabDetails.map( item => item )]
            setCheckBoxList(selectedAllIds)
        }else{
            setCheckBoxList([])
        }
        // checkBoxList.length > 0 ?
        //     setCheckBoxList([])
        //     :
        //     setCheckBoxList(tabDetails)
    }

    const renderListFn = (item) => {
        return <Item
            hasCheckBox = {true}
            isChecked = {checkBoxList.includes(item)}
            onCheckBoxPress = {toggleCheckbox(item)}
            onItemPress = {openModal(item)}
            itemView = {listItem(item)}
        />
    }

    return (
        <ScrollView>
            <Table
                isCheckbox = {true}
                data = {tabDetails}
                listItemFormat = {renderListFn}
                headers = {headers}
                toggleHeaderCheckbox = {toggleHeaderCheckbox}
                itemSelected = {checkBoxList}
            />
        </ScrollView>
    );
}

export default withModal(Quotations);

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        padding:10,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        marginBottom:10
    },
    dataContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:"flex-start",
        justifyContent:"space-between"
    },
    item:{
        flex:1,
        // alignItems:"flex-start",
        // justifyContent:'center',
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
    headersContainer:{
        //flex:1,
        marginLeft:10,
        flexDirection:'row',
        //width:'100%'
    },
    headerItem:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerText:{
        fontSize:12,
        color:'#718096'
    }
})
