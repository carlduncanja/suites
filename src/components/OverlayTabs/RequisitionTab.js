import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from '@emotion/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useModal } from 'react-native-modalfy';
import { PageContext } from '../../contexts/PageContext';
import InvoiceFullPageView from '../../page/Suppliers/InvoiceFullPageView';
import InvoiceDetailsPage from '../../page/Suppliers/InvoiceDetailsPage';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { uploadDocument, addDocumentToOrder } from '../../api/network';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import axios from 'axios';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import { ScrollView } from 'react-native-gesture-handler';
import { ORDER_TYPES } from '../../const';

const PageWrapper = styled.View`
width: 100%;
height: 100%;
flex: 1;
`;
const Spacer = styled.View`
margin-bottom: 30px;
`;


const RequisitionTab = ({ order = {}, onUpdate, type }) => {
    const modal = useModal();
    const { pageState, setPageState } = useContext(PageContext);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [content, setContent] = useState();
    const [canPreview, setCanPreview] = useState(false);
    const [isUploadingDoc, setIsUploadingDoc] = useState(false);
    const [isDocSelected, setIsDocSelected] = useState(false);
    const [canUpdateDoc, setCanUpdateDoc] = useState(false);
    const [isImageUpdating, setIsImageUpdating] = useState(false);

    const { isEditMode = false } = pageState;

    useEffect(() => {
        if (!isEditMode && isDocSelected) {
            confirmationComponent(content);
        }
    }, [isEditMode])



    const uploadContent = async content => {
        const formData = new FormData();
        formData.append('file', content);
        setIsUploadingDoc(true);
        await uploadDocument(formData)
            .then(res => {
                addDocumentToOrder(order._id, { type : type === ORDER_TYPES.REQUISITION ? "quotation" : "invoice", documentId: res.id })
                    .then(_ => {
                        successModal("Completed Successfully!")
                    })
                    .catch(_ => {
                        errorModal();
                    })
            })
            .catch(_ => {
                errorModal()
            })
            .finally(_ => {
                setIsUploadingDoc(false);
                onUpdate();
            });
    };

    const onImageUpload = async () => {
        setIsImageUploading(true);
        DocumentPicker.getDocumentAsync()
            .then(async (result) => {
                if (result.type === "success") {
                    const testUri = (result.uri).match(/[^.]*$/g)[0] || '';
                    const acceptedFormats = (testUri === 'jpg') || (testUri === 'JPG') || (testUri === 'png') || (testUri === 'PNG') || (testUri === 'pdf') || (testUri === 'PDF');

                    if (acceptedFormats) {
                        if (result.mimeType === "application/pdf") {
                            const document = await FileSystem.readAsStringAsync(result.uri, {
                                encoding: 'base64',
                            });
                            setContent({ ...result, uri: `data:application/pdf;base64,${document}` })
                        } else {
                            setContent(result);
                        }
                        setIsDocSelected(true);
                        setCanUpdateDoc(false);
                    }
                    else {
                        errorModal("Document format selected is not supported");
                    }

                }
            })
            .catch(error => {
                errorModal();
            })
            .finally(_ => {
                setIsImageUploading(false);
            });
    };

    const openFullView = (title, isPdf, source) => {
        modal.openModal('ReportPreviewModal', {
            content: <InvoiceFullPageView
                title={title}
                isPdf={isPdf}
                source={source}
            />
        });
    };

    const removeDocument = () => {
        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    isWarning={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                    }}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        onImageUpload();
                    }}
                    message={`By removing this document, we'll request that you upload a new one.`}
                    secondaryMessage={'Do you wish to continue?'}
                    type={'binary'}
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    const errorModal = (message) => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    message={message}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    }

    const successModal = (message) => {
        modal.openModal(
            'ConfirmationModal', {
            content: <ConfirmationComponent
                isError={false}
                isEditUpdate={false}
                onAction={() => {
                    modal.closeModals('ConfirmationModal');
                }}
                onCancel={() => {
                    modal.closeModals('ConfirmationModal');
                }}
                message={message}
            />,
            onClose: () => {
                modal.closeModal('ConfirmationModal')
            }
        }
        );
    }

    const confirmationComponent = (content) => {
        modal.openModal(
            'ConfirmationModal', {
            content:
                <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => {
                        setContent('');
                        setPageState({ ...pageState, isEditMode: false });
                        modal.closeAllModals();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        uploadContent(content);
                    }}
                    message="Do you want to save these changes?"
                    action="Yes"
                />
        });



    }

    const handleDocumentLoaded = () => {
        setCanPreview(true)
    }

    return (
        <ScrollView>
            <PageWrapper>


                <InvoiceDetailsPage
                    openFullView={openFullView}
                    isImageUploading={isImageUploading}
                    isImageUpdating={isImageUpdating}
                    canPreview={canPreview}
                    canUpdateDoc={false}
                    canDelete={false}
                    frameName={type === ORDER_TYPES.REQUISITION ? "Requisition" : "Purchase Order"}
                    documentId={type === ORDER_TYPES.REQUISITION ? order.requisitionDocId : order.purchaseOrderDocId}
                    handleDocumentLoaded={handleDocumentLoaded}
                />
                <Spacer />
                {
                    isUploadingDoc ? <LoadingIndicator /> :
                            (
                                <InvoiceDetailsPage
                                    onImageUpload={onImageUpload}
                                    removeDocument={removeDocument}
                                    openFullView={openFullView}
                                    isImageUploading={isImageUploading}
                                    isImageUpdating={isImageUpdating}
                                    canUpdateDoc={isEditMode}
                                    previewImage={content}
                                    canDelete={false}
                                    frameName={type === ORDER_TYPES.REQUISITION ? "Quotation" : "Invoice"}
                                    frameText={`Add the ${type === ORDER_TYPES.REQUISITION ? "quotation" : "invoice"} recieved from the supplier for the ${type === ORDER_TYPES.REQUISITION ? "requisition" : "purchase order"} above.`}
                                    frameSecondaryText={`Add ${type === ORDER_TYPES.REQUISITION ? "quotation" : "invoice"}`}
                                    documentId={canPreview && (type === ORDER_TYPES.REQUISITION ? order.quotationDocId : order.invoiceDocId)}
                                />
                            )
                }
            </PageWrapper>
        </ScrollView>
    );
};

export default RequisitionTab;
