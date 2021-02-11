import React, { useState, useEffect, useContext } from 'react';
import styled, {css} from '@emotion/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import {useTheme} from 'emotion-theming';
import {useNavigation} from '@react-navigation/native';
import { useModal } from 'react-native-modalfy';
import { Image, View } from 'react-native';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import Record from '../../components/common/Information Record/Record';
import Footer from '../../components/common/Page/Footer';
import ImageUpload from '../../../assets/svg/imageUpload';
import ImageUploading from '../../../assets/svg/imageUploading';
import DeleteIcon from '../../../assets/svg/wasteIcon';
import TestImage from '../../../assets/test_image.png';
import InvoiceFullPageView from './InvoiceFullPageView';
import IconButton from '../../components/common/Buttons/IconButton';
import InvoiceDetailsPage from './InvoiceDetailsPage';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import {generateDocumentLink, uploadDocument, updateInvoiceDocument, updatePurchaseOrderDetails } from '../../api/network';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import axios from 'axios';

const PageWrapper = styled.View`
    margin: 0;
    height: 100%;
`;

const PurchaseOrderContainer = styled.View`
    height: 100px;
    border: ${({theme}) => `1px solid ${theme.colors['--color-gray-300']}`};
    margin-bottom: ${({theme}) => theme.space['--space-40']};
    border-width: 0 0 1px;
`;

const InvoiceWrapper = styled.View`
    display: flex;
`;

const InvoiceUploadContainer = styled.TouchableOpacity`
    width: 100%;
    height: 258px;
    border: ${({theme}) => `2.3px dashed ${theme.colors['--color-gray-200']}`};
    background-color: ${({theme}) => theme.colors['--color-gray-100']};

    align-items: center;
    justify-content: center;
`;

const ImageContainer = styled.View`
    width: 100%;
    height: 356px;
    border: ${({theme}) => `1px solid ${theme.colors['--color-gray-400']}`};
    background-color: ${({theme}) => theme.colors['--color-gray-300']};
    border-radius: 4px;
`;

const ImageTitleContainer = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background-color: ${({theme}) => theme.colors['--color-white']};
    padding: ${({theme}) => theme.space['--space-12']};
    border-color: ${({theme}) => theme.colors['--color-gray-400']};
    border-style: solid;
    border-width: 0 0 1px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const UploadedImageContainer = styled.TouchableOpacity`
    display: flex;
    flex:1;
    align-items: center;
    margin: 60px;
    margin-top: 0;
    margin-bottom: 0;
`;

const PreviewImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const RejectedPreviewContainer = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 120px;
`;

const IconConatiner = styled.View`
    flex: 1;
    align-items: flex-end;
    justify-content: flex-end;
`;
const UploadInstructions = styled.TouchableOpacity`
    background-color: yellow;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageText = styled.Text(({ theme, textColor = '--color-gray-600', font = '--confirm-title'}) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
    lineHeight: 16,
}));

const SupplierInvoiceUpload = ({ route }) => {
    const navigation = useNavigation();
    const theme = useTheme();
    const modal = useModal();
    const tabs = ['Details'];
    const { invoiceItem = {}, selectedSupplierName = '', updateSuppliers } = route.params;
    const [pageState, setPageState] = useState({});
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [invoiceImage, setInvoiceImage] = useState();
    const [canPreview, setCanPreview] = useState(true);
    const [isUploadingDoc, setIsUploadingDoc] = useState(false);
    const [isDocSelected, setIsDocSelected] = useState(false);
    const [canUpdateDoc, setCanUpdateDoc] = useState(false);

    const {isEditMode = false} = pageState;

    // console.log('PageState: ', pageState);

    useEffect(() => {
        if (!isEditMode && isDocSelected) {
            console.log('Document selected and "DONE" pressed, so upload can happen');
            uploadImage(invoiceImage);
        }
    }, [isEditMode])

    const updatePurchaseOrderWithDocument = (purchaseOrderId, docId) => {
        const docObj = {
            documentId : docId
        };

        updateInvoiceDocument(purchaseOrderId, docObj)
            .then(res =>{ 
                console.log('Updated PO with document: ', res);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => { modal.closeAllModals(); }}
                            onAction={() => { modal.closeAllModals(); }}
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(err => {
                console.log('Error updating PO with document: ', err);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => { modal.closeAllModals(); }}
                            onAction={() => { modal.closeAllModals(); }}
                            message="Document could not be added to order."
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => updateSuppliers())
    };

    const updateDocumentId = (purchaseOrderId, docId) => {
        console.log('Update the id of the document');
        let updatedField = {
            invoice: {
                ...invoiceItem?.invoice,
                documentId: docId
            }
        }
        updatePurchaseOrderDetails(purchaseOrderId, updatedField)
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => { modal.closeAllModals(); }}
                            onAction={() => { modal.closeAllModals(); }}
                            message="Document has been updated"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => { modal.closeAllModals(); }}
                            onAction={() => { modal.closeAllModals(); }}
                            message="Document format selected is not supported"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => {

            })
    }

    const uploadImage = async image => {
        console.log('URI: ', image);
    
        const formData = new FormData();

        formData.append('file', image);
        setIsUploadingDoc(true);

        await uploadDocument(formData)
            .then(res => {
                console.log('Image Response: ', res);
                // console.log('Invoice item: ', invoiceItem);
                // setInvoiceImage(image);
                if (invoiceItem?.invoice?.documentId) {
                    console.log('Update response: ', res);
                    // updateDocumentId(invoiceItem?._id, res?.id)
                } else {
                    updatePurchaseOrderWithDocument(invoiceItem?._id, res?.id)
                }
                
            })
            .catch(err => {
                console.log('Upload File Error: ', err);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => { modal.closeAllModals(); }}
                            onAction={() => { modal.closeAllModals(); }}
                            message="Document could not be uploaded"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => setIsUploadingDoc(false));
    };

    const onImageUpload = async () => {
        setIsImageUploading(true);
        DocumentPicker.getDocumentAsync({})
            .then(result => {
                const testUri = (result.uri).match(/[^.]*$/g)[0] || '';
                const acceptedFormats = (testUri === 'jpg') || (testUri === 'JPG') || (testUri === 'png') || (testUri === 'PNG') || (testUri === 'pdf') || (testUri === 'PDF');
                const rejectedPreviewFormats = (testUri === 'pdf') || (testUri === 'PDF');
                if (acceptedFormats) {
                    if (rejectedPreviewFormats) {
                        // console.log('Rejected');
                        setCanPreview(false);
                    }
                    if (result.type === 'success') {
                        console.log('Invoice image: ', result);
                        setInvoiceImage(result);
                        setIsDocSelected(true);
                        setCanUpdateDoc(false);
                        // uploadImage(result);
                    }
                } else {
                    modal.openModal('ConfirmationModal', {
                        content: (
                            <ConfirmationComponent
                                isError={true}//boolean to show whether an error icon or success icon
                                isEditUpdate={false}
                                onCancel={() => { modal.closeAllModals(); }}
                                onAction={() => { modal.closeAllModals(); }}
                                message="Document format selected is not supported"
                            />
                        ),
                        onClose: () => {
                            console.log('Modal closed');
                        },
                    });
                }
            })
            .catch(err => {
                console.log('Document error: ', err);
            })
            .finally(_ => {
                setIsImageUploading(false);
            });
    };

    const openFullView = () => {
        const matchFormat = (invoiceImage?.uri).match(/[^.]*$/g)[0] || '';
        if (!((matchFormat === 'pdf') || (matchFormat === 'PDF'))) {
            modal.openModal('ReportPreviewModal', {
                content: <InvoiceFullPageView
                    title={invoiceImage?.name || ''}
                    sourceImage={invoiceImage?.uri}
                />
            });
        }
    };

    const removeInvoice = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    isError={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => { modal.closeAllModals(); }}
                    onAction={() => { modal.closeAllModals(); handleInvoiceUploadRemoval(); }}
                    message="Do you wish to delete this item?"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    const handleInvoiceUploadRemoval = () => {
        setInvoiceImage();
        if (invoiceItem?.invoice?.documentId) {
            setCanUpdateDoc(true);
            onImageUpload();
        }
    };

    return (
        <>
            <PageContext.Provider value={{pageState, setPageState}}>
                <DetailsPage
                    title={selectedSupplierName}
                    subTitle={invoiceItem?.invoice?.invoiceNumber}
                    onBackPress={() => navigation.goBack()}
                    pageTabs={(
                        <TabsContainer
                            tabs={tabs}
                            selectedTab="Details"
                        />
                    )}
                >
                    {
                        isUploadingDoc ? <LoadingIndicator/> : (
                            <InvoiceDetailsPage
                                onImageUpload={onImageUpload}
                                removeInvoice={removeInvoice}
                                openFullView={openFullView}
                                isImageUploading={isImageUploading}
                                invoiceImage={invoiceImage}
                                canPreview={canPreview}
                                purchaseOrderNumber={invoiceItem?.purchaseOrderNumber}
                                invoice={invoiceItem?.invoice}
                                canUpdateDoc={canUpdateDoc}
                            />
                        )
                    }

                </DetailsPage>
            </PageContext.Provider>
        </>
    );
};

export default SupplierInvoiceUpload;
