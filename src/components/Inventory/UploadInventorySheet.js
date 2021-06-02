import React, { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled, {css} from '@emotion/native';
import * as DocumentPicker from 'expo-document-picker';

import {useModal} from 'react-native-modalfy';
import { useTheme } from 'emotion-theming';
import OverlayDialog from '../common/Dialog/OverlayDialog';
import OverlayDialogContent from '../common/Dialog/OverlayContent';
import ConfirmationComponent from '../ConfirmationComponent';

import UploadIcon from '../../../assets/svg/uploadIcon';
import ImageUploading from '../../../assets/svg/imageUploading';
import FileUpload from '../../../assets/svg/fileUploadXLSX';
import IncorrectFormat from '../../../assets/svg/incorrectFileFormat';

import { uploadDocument } from '../../api/network';

function UploadInventorySheet({onCreated, onCancel}) {
    const modal = useModal();
    const theme = useTheme();

    const [fileId, setFileId] = useState(null);
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [isIncorrectFormat, setIsIncorrectFormat] = useState(false);

    const handleCloseDialog = () => {
        modal.closeModals('OverlayInfoModal');
        onCancel();
    };
    // Event functions

    const onClickUpload = () => {
        DocumentPicker.getDocumentAsync()
            .then((res) => {
                const testUri = (res.uri).match(/[^.]*$/g)[0] || '';
                const acceptedFormats = (testUri === 'xls') || (testUri === 'csv') || (testUri === 'XLS') || (testUri === 'CSV');
                if (res.type === 'success') {
                    if (acceptedFormats) {
                        console.log('Accepted Document rewsult', res);
                        setIsFileLoading(true);
                        uploadInventoryDocument(res);
                        // setFile(res);
                    } else {
                        setIsIncorrectFormat(true);
                        console.log('Rejected Document rewsult', res);
                    }
                }
            })
            .catch((err) => {
                console.log('Document error:', err);
            });
    };

    const uploadInventoryDocument = async doc => {
        const formData = new FormData();
        formData.append('file', doc);

        await uploadDocument(formData)
            .then(res => {
                console.log('Response for inventory doc upload', res);
                setFileId(res?.id);
            })
            .catch(err => {
                console.log('Error for inventory doc upload', err);
            })
            .finally(() => setIsFileLoading(false));
    };

    const updateInventoryItems = () => {
        console.log('UPDATE INVENTORY ITEMS');
        modal.closeModals('OverlayInfoModal');
        onCreated();
    };
    // View helper functions

    const uploadView = (
        <>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={onClickUpload}
            >
                <UploadIcon/>
            </TouchableOpacity>
            
            <Instructions theme={theme}>
                Click to Upload Inventory Lists
            </Instructions>
            <SubInstructions theme={theme}>
                Supports <Format theme={theme}>.xlsm</Format>, <Format theme={theme}>.xls</Format>, <Format theme={theme}>.csv</Format>
            </SubInstructions>
        </>
    );

    const incorrectFormatView = (
        <>
            <IncorrectFormat/>
            <UploadingText theme={theme}>Incorrect Format.</UploadingText>
            <TouchableOpacity onPress={() => { setIsIncorrectFormat(false); }}>
                <UploadLink>Re-upload file</UploadLink>
            </TouchableOpacity>
        </>
    );

    const loadingView = (
        <>
            <ImageUploading/>
            <UploadingText theme={theme} loading>Please wait...</UploadingText>
        </>
    );

    const successView = (
        <>
            <FileUpload/>
            <UploadingText theme={theme}>File Uploaded!</UploadingText>
            <TouchableOpacity onPress={() => { setFileId(); }}>
                <UploadLink>Re-upload file</UploadLink>
            </TouchableOpacity>
            
        </>
    );

    const renderView = () => {
        if (!fileId) {
            if (!isFileLoading) {
                if (isIncorrectFormat) return incorrectFormatView;
                return uploadView;
            }
            return loadingView;
        }
        return successView;
    };

    return (
        <View style={{width: 500, minHeight: 400}}>
            <OverlayDialog
                title="Update Inventory"
                onPositiveButtonPress={fileId && updateInventoryItems}
                onClose={handleCloseDialog}
                positiveText="UPDATE ITEMS"
                isButtonDisabled={!fileId}
            >
                
                <ContentWrapper theme={theme}>
                    {renderView()}
                </ContentWrapper>
        
            </OverlayDialog>
        </View>
        
    );
}

export default UploadInventorySheet;

const ContentWrapper = styled.View`
    /* min-height: 120px;
    width: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
`;

const Instructions = styled.Text`
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;

    color: ${ ({theme}) => theme.colors['--color-gray-600']};
    margin-top: ${ ({theme}) => theme.space['--space-14']};;
    margin-bottom: ${ ({theme}) => theme.space['--space-4']};
`;

const SubInstructions = styled.Text`
    font-family: Inter;
    font-style: normal;
    line-height: 14px;

    font-size: 10px;
    font-weight: 400;
    color: ${ ({theme}) => theme.colors['--color-gray-500']};
`;

const Format = styled.Text`
    font-weight: 700;
`;

const UploadingText = styled.Text`
    font-family: 'Inter';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    color: ${ ({theme, loading}) => (loading ? theme.colors['--color-blue-600'] : theme.colors['--color-gray-800'])};
    margin-top: ${ ({theme}) => theme.space['--space-12']};
`;

const UploadLink = styled.Text`
    font-family: 'Inter';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    text-decoration: underline;
    text-decoration-color: ${ ({theme}) => theme.colors['--color-blue-600']};

    color: ${ ({theme}) => theme.colors['--color-blue-600']};
    margin-top: ${ ({theme}) => theme.space['--space-16']};
`;
