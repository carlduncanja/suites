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
import Data from '../common/Table/Data';
import { isEmpty } from 'lodash';
import ActionItem from '../common/ActionItem';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import EditIcon from '../../../assets/svg/editIcon';
import AssignIcon from '../../../assets/svg/assignIcon';
import AddIcon from '../../../assets/svg/addIcon';

const BorderView = styled.View`
width:630px;
border:.8px solid ${({ theme }) => theme.colors["--color-gray-400"]};
margin:50px 5px;
position:static;
height:1px;
left:0px;
top:0px;
`
const HeaderView = styled.View`
width:622px;
height:46px;
background-color:${({ theme }) => theme.colors["--color-gray-100"]};
flex-direction:row;
border: 1px solid ${({ theme }) => theme.colors["--color-gray-400"]};
border-radius: 8px 8px 0px 0px;
padding:5px;
`;

const ItemBorder = styled.View`
width:592px;
height:0px;
border:1px solid ${({ theme }) => theme.colors["--color-gray-300"]};
margin-left:9px;
margin-top:8px;
margin-right:16px;

`
const TableBorderView = styled.View`
height:185px;
width:622px;
padding:5px;
border:1px solid ${({ theme }) => theme.colors["--color-gray-400"]};
border-radius:0px 0px 9px 9px;
box-sizing:border-box;
`
const TableDetailsView = styled.View`
height:50px;
width:623px;
padding:5px;
flex-direction:row;
border-left-color: ${({ theme }) => theme.colors["--color-gray-400"]};
border-left-width:1px;
border-bottom-color:${({ theme }) => theme.colors["--color-gray-400"]};
border-bottom-width:1px;
border-right-color:${({ theme }) => theme.colors["--color-gray-400"]};
border-right-width:1px;
border-radius:0px 0px 6px 6px;

`

function EquipmentGroupGeneralTab({ equipmentGroup = {}, equipments = [], suppliers = [], modal, goToAddEquipment }) {


    const theme = useTheme();
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const { description = "", unitPrice } = equipmentGroup
    const categories = equipmentGroup?.categories || [];
    let equipmentToDisplay = [...equipments]
    let supplierToDisplay = [...suppliers]

    console.log('categories', categories);

    const getCategories = () => {
        categories.map(item => {
            return item._id
        })
    }


    const getFabActions = () => {
        const editGroup = (
            <ActionItem
                title={"Edit Group"}
                icon={<EditIcon />}
                onPress={() => { }}
            />
        );
        const assignEquipment = (
            <ActionItem
                title={"Add Equipment"}
                icon={<AddIcon />}
                onPress={goToAddEquipment}
            />
        );

        return (
            <ActionContainer
                floatingActions={[
                    editGroup,
                    assignEquipment,

                ]}
                title={"EQUIPMENT ACTIONS"}
            />
        );
    }

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "EQUIPMENT ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };



    const getSuppliers = () => {
        supplierToDisplay.map(item => {
            return item.name
        })
    }





    return (

        <>
            <Row>
                <Record
                    recordTitle="Description"
                    recordValue={description}
                    flex={0.8}

                />
            </Row>
            <View style={{ width: 250, flexDirection: "row" }}>
                <Row>
                    <Record
                        recordTitle="Unit Price"
                        recordValue={`$ ${unitPrice}`}
                        flex={0.8}
                    />
                </Row>
            </View>
            <Row>
                <Record
                    recordTitle="Supplier"
                    recordValue={isEmpty(getSuppliers()) ? "--" : getSuppliers()}
                    flex={0.8}
                    valueColor="--color-blue-600"
                />
            </Row>
            <Footer
                hasActionButton={true}
                hasPaginator={false}
                toggleActionButton={toggleActionButton}
            />

        </>



    )
}

export default withModal(EquipmentGroupGeneralTab)
