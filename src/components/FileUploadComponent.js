import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styled, {css} from '@emotion/native';
import * as DocumentPicker from 'expo-document-picker';

import {useModal} from 'react-native-modalfy';
import {useTheme} from 'emotion-theming';
import OverlayDialog from './common/Dialog/OverlayDialog';

import UploadIcon from '../../assets/svg/uploadIcon';
import ImageUploading from '../../assets/svg/imageUploading';
import FileUpload from '../../assets/svg/fileUploadXLSX';
import IncorrectFormat from '../../assets/svg/incorrectFileFormat';

import {emptyFn} from "../const";

/**
 * Component used for upload operations.
 *
 * @param {function} onCreated - callback function fired when file upload is finished.
 * @param {function} onCancel - callback function fired when operation is cancelled.
 * @param {function(formData): Promise} sendFilePromise
 * @param {string} title - tile message for display modal
 */
function FileUploadComponent({
                                  onCreated = emptyFn,
                                  onCancel = emptyFn,
                                  sendFilePromise,
                                  title = "Click to Upload File",
                              }) {
    const modal = useModal();
    const theme = useTheme();

    const [formData, setFormData] = useState(null);
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
                const acceptedFormats = (testUri === 'xlsx') || (testUri === 'csv') || (testUri === 'XLS') || (testUri === 'CSV');
                if (res.type === 'success') {
                    if (acceptedFormats) {
                        console.log('Accepted Document result', res);
                        uploadInventoryDocument(res);
                    } else {
                        setIsIncorrectFormat(true);
                        console.log('Rejected Document result', res);
                    }
                }
            })
            .catch((err) => {
                console.log('Document error:', err);
            });
    };

    const uploadInventoryDocument = doc => {
        const formData = new FormData();
        formData.append('upload', doc);

        setFormData(formData);
    };

    const sendFile = async () => {
        if (!formData && isFileLoading)
            return;

        setIsFileLoading(true);
        await sendFilePromise(formData)
            .then(res => {
                console.log('Response for file upload', res);
                modal.closeModals('OverlayInfoModal');
                onCreated();
            })
            .catch(err => {
                console.log('Error for inventory doc upload', err);
                Alert.alert("Failed to upload file.", err.message);
            })
            .finally(() => setIsFileLoading(false));
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
                {title}
            </Instructions>
            <SubInstructions theme={theme}>
                Supports <Format theme={theme}>.xlsm</Format>, <Format theme={theme}>.xlsx</Format>, <Format
                theme={theme}>.csv</Format>
            </SubInstructions>
        </>
    )

    const incorrectFormatView = (
        <>
            <IncorrectFormat/>
            <UploadingText theme={theme}>Incorrect Format.</UploadingText>
            <TouchableOpacity onPress={() => {
                setIsIncorrectFormat(false);
            }}>
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
            <TouchableOpacity onPress={() => {
                setFormData();
            }}>
                <UploadLink>Re-upload file</UploadLink>
            </TouchableOpacity>

        </>
    );

    const renderView = () => {
        if (!formData && !isFileLoading) {
            if (isIncorrectFormat) return incorrectFormatView;
            return uploadView;
        }

        if (isFileLoading)
            return loadingView;

        return successView;
    };

    return (
        <View style={{width: 500, minHeight: 400}}>
            <OverlayDialog
                title="Update Inventory"
                onPositiveButtonPress={sendFile}
                onClose={handleCloseDialog}
                positiveText="UPDATE ITEMS"
                isButtonDisabled={!formData || isFileLoading}
            >

                <ContentWrapper theme={theme}>
                    {renderView()}
                </ContentWrapper>

            </OverlayDialog>
        </View>

    );
}

export default FileUploadComponent;

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

  color: ${({theme}) => theme.colors['--color-gray-600']};
  margin-top: ${({theme}) => theme.space['--space-14']};;
  margin-bottom: ${({theme}) => theme.space['--space-4']};
`;

const SubInstructions = styled.Text`
  font-family: Inter;
  font-style: normal;
  line-height: 14px;

  font-size: 10px;
  font-weight: 400;
  color: ${({theme}) => theme.colors['--color-gray-500']};
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

  color: ${({theme, loading}) => (loading ? theme.colors['--color-blue-600'] : theme.colors['--color-gray-800'])};
  margin-top: ${({theme}) => theme.space['--space-12']};
`;

const UploadLink = styled.Text`
  font-family: 'Inter';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors['--color-blue-600']};

  color: ${({theme}) => theme.colors['--color-blue-600']};
  margin-top: ${({theme}) => theme.space['--space-16']};
`;
