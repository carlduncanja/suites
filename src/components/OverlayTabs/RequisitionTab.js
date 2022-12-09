import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from '@emotion/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useTheme } from 'emotion-theming';
import { useNavigation } from '@react-navigation/native';
import { useModal } from 'react-native-modalfy';
import { Image, View } from 'react-native';
import { PageContext } from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import InvoiceFullPageView from '../../page/Suppliers/InvoiceFullPageView';
import InvoiceDetailsPage from '../../page/Suppliers/InvoiceDetailsPage';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { generateDocumentLink, uploadDocument, updateInvoiceDocument, updatePurchaseOrderDetails, getPurchaseOrderById, addDocumentToOrder } from '../../api/network';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import axios from 'axios';
import FrameCard from '../common/Frames/FrameCards/FrameCard';
import { ScrollView } from 'react-native-gesture-handler';

const PageWrapper = styled.View`
width: 100%;
height: 100%;
flex: 1;
`;
const Spacer = styled.View`
margin-bottom: 30px;
`;


const RequisitionTab = ({ order = {}, onUpdate }) => {
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
                addDocumentToOrder(order._id, { type: "quotation", documentId: res.id })
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
                        // resetState()
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
                    frameName={"Requisition"}
                    documentId={order.requisitionDocId}
                    handleDocumentLoaded={handleDocumentLoaded}
                />
                <Spacer />
                {
                    isUploadingDoc ? <LoadingIndicator /> :
                        // canPreview ?
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
                                    frameName={"Quotation"}
                                    frameText={"Add the quotation recieved from the supplier for the requisition above."}
                                    frameSecondaryText={"Add quotation"}
                                    documentId={canPreview && order.quotationDocId}
                                />
                            )
                            // : <></>
                }
            </PageWrapper>
        </ScrollView>
    );
};

export default RequisitionTab;
