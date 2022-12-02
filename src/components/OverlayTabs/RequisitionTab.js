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
import InvoiceFullPageView from '../../page/Suppliers/InvoiceFullPageView';
import InvoiceDetailsPage from '../../page/Suppliers/InvoiceDetailsPage';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import {generateDocumentLink, uploadDocument, updateInvoiceDocument, updatePurchaseOrderDetails, getPurchaseOrderById } from '../../api/network';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import axios from 'axios';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import { ScrollView } from 'react-native-gesture-handler';

const PageWrapper = styled.View`
width: 100%;
height: 100%;
`;
const ContentWrapper = styled.View`
width: 100%;
height: 200px;
margin-bottom: 200px;
`;


const RequisitionTab = ({ order = {}, selectedSupplierName = 'Test', updateSuppliers  }) => {
    const navigation = useNavigation();
    const theme = useTheme();
    const modal = useModal();
    const tabs = ['Details'];
    // const { invoiceItem = {}, selectedSupplierName = '', updateSuppliers } = route.params;
    // const [invoiceObj, setInvoiceObj] = useState(invoiceItem?.invoice || {});
    const [pageState, setPageState] = useState({});
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [invoiceImage, setInvoiceImage] = useState();
    const [canPreview, setCanPreview] = useState(true);
    const [isUploadingDoc, setIsUploadingDoc] = useState(false);
    const [isDocSelected, setIsDocSelected] = useState(false);
    const [canUpdateDoc, setCanUpdateDoc] = useState(false);
    const [isImageUpdating, setIsImageUpdating] = useState(false);

    const {isEditMode = false} = pageState;

    useEffect(() => {
        if (!isEditMode && isDocSelected) {
            console.log('Document selected and "DONE" pressed, so upload can happen');
            uploadImage(invoiceImage);
        }
    }, [isEditMode])

    const fetchPurchaseOrder = () => {
        // getPurchaseOrderById(invoiceItem?._id)
        //     .then(res => {
        //         const {invoice} = res;
        //         // setInvoiceObj(invoice || {});
        //     })
        //     .catch(err => {
        //         console.log('Unable to fetch purchase order')
        //     })
    }

    useEffect(() => {
        fetchPurchaseOrder();
    }, []);

    const handleDocument = (fetchFn, successMsg, errorMsg, docId, purchaseOrderId, finalFn = () => {}) => {
        const docObj = {
            documentId : docId
        };

        fetchFn(purchaseOrderId, docObj)
            .then(res =>{
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => { modal.closeAllModals(); }}
                            onAction={() => { modal.closeAllModals(); }}
                            message={successMsg}
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(err => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => { modal.closeAllModals(); }}
                            onAction={() => { modal.closeAllModals(); }}
                            message={errorMsg}
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => { updateSuppliers(), finalFn() })
    }

    const updatePurchaseOrderWithDocument = (purchaseOrderId, docId) => {

        handleDocument(
            updateInvoiceDocument,
            'Document added successfully',
            "Document could not be added to order.",
            docId,
            purchaseOrderId
        );
    };

    const updateDocumentId = (purchaseOrderId, docId) => {
        setIsImageUpdating(true);
        setTimeout(() => {
            handleDocument(
                updateInvoiceDocument,
                "Document has been updated",
                "Document could not be updated",
                docId,
                purchaseOrderId,
                () => { fetchPurchaseOrder(); setInvoiceImage(); setIsImageUpdating(false); }
            );
        }, 200)
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
                // if (invoiceObj.documentId) {
                //     console.log('Update response: ', res);
                //     // updateDocumentId(invoiceItem?._id, res?.id)
                // } else {
                //     // updatePurchaseOrderWithDocument(invoiceItem?._id, res?.id)
                // }

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
                console.log("test")
                const testUri = (result.uri).match(/[^.]*$/g)[0] || '';
                const acceptedFormats = (testUri === 'jpg') || (testUri === 'JPG') || (testUri === 'png') || (testUri === 'PNG') || (testUri === 'pdf') || (testUri === 'PDF');
                // const rejectedPreviewFormats = (testUri === 'pdf') || (testUri === 'PDF');
                if (acceptedFormats) {
                 
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
        //  if (invoiceObj.documentId) {
        //     setCanUpdateDoc(true);
        //     onImageUpload();
        // }
        setInvoiceImage();

    };

    return (
        <ScrollView>
        <PageWrapper>
                    {

                        isUploadingDoc ? <LoadingIndicator/> : (
                            <ContentWrapper>
                            <InvoiceDetailsPage
                                onImageUpload={onImageUpload}
                                removeInvoice={removeInvoice}
                                openFullView={openFullView}
                                isImageUploading={isImageUploading}
                                isImageUpdating={isImageUpdating}
                                invoiceImage={invoiceImage}
                                canPreview={canPreview}
                                // purchaseOrderNumber={invoiceItem?.purchaseOrderNumber}
                                // invoice={invoiceObj}
                                canUpdateDoc={canUpdateDoc}
                                frameName={"Requisition"}
                                invoice = {{documentId: order.requisitionDocId }}
                            />
                             </ContentWrapper> 
                        )
                    }

                
                            <ContentWrapper>
                            <InvoiceDetailsPage
                                onImageUpload={onImageUpload}
                                removeInvoice={removeInvoice}
                                openFullView={openFullView}
                                isImageUploading={isImageUploading}
                                isImageUpdating={isImageUpdating}
                                // invoiceImage={invoiceImage}
                                // purchaseOrderNumber={invoiceItem?.purchaseOrderNumber}
                                // invoice={invoiceObj}
                                canUpdateDoc={canUpdateDoc}
                                frameName={"Quotation"}
                                frameText={"Add the quotation recieved from the supplier for the requisition above."}
                                frameSecondaryText={"Add quotation"}
                            />
                            </ContentWrapper> 
                        
                   
                            
        </PageWrapper>
        </ScrollView>
    );
};

export default RequisitionTab;
