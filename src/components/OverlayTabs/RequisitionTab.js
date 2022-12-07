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


const RequisitionTab = ({ order = {} }) => {
    const modal = useModal();
    const [pageState, setPageState] = useState({});
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [content, setContent] = useState();
    const [canPreview, setCanPreview] = useState(true);
    const [isUploadingDoc, setIsUploadingDoc] = useState(false);
    const [isDocSelected, setIsDocSelected] = useState(false);
    const [canUpdateDoc, setCanUpdateDoc] = useState(false);
    const [isImageUpdating, setIsImageUpdating] = useState(false);

    const { isEditMode = false } = pageState;

    useEffect(() => {
        if (!isEditMode && isDocSelected) {
            console.log('Document selected and "DONE" pressed, so upload can happen');
            uploadContent(content)
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
                        order.quotationDocId = res.id;
                        successModal("Completed Successfully!")
                    })
                    .catch(_ => {
                        errorModal();
                    })
            })
            .catch(err => {
                console.log('Upload File Error: ', err);
                errorModal()
            })
            .finally(_ => setIsUploadingDoc(false));
    };

    const onImageUpload = async () => {
        setIsImageUploading(true);
        DocumentPicker.getDocumentAsync()
            .then(result => {
                const testUri = (result.uri).match(/[^.]*$/g)[0] || '';
                const acceptedFormats = (testUri === 'jpg') || (testUri === 'JPG') || (testUri === 'png') || (testUri === 'PNG') || (testUri === 'pdf') || (testUri === 'PDF');
                if (acceptedFormats) {
                    if (result.type === 'success') {
                        console.log('Invoice image: ', result);
                        setIsDocSelected(true);
                        setCanUpdateDoc(false);
                        setContent(result);
                    }
                } else {
                    errorModal("Document format selected is not supported");
                }
            })
            .catch(_ => {
                errorModal();
            })
            .finally(_ => {
                setIsImageUploading(false);
            });
    };

    const openFullView = (isPdf, source) => {
        modal.openModal('ReportPreviewModal', {
            content: <InvoiceFullPageView
                title={'Requisition'}
                isPdf={isPdf}
                source={source}
            />
        });
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
        setQuotation();

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

    return (
        <ScrollView>
            <PageWrapper>


                <InvoiceDetailsPage
                    removeInvoice={removeInvoice}
                    openFullView={openFullView}
                    isImageUploading={isImageUploading}
                    isImageUpdating={isImageUpdating}
                    canPreview={canPreview}
                    canUpdateDoc={false}
                    frameName={"Requisition"}
                    documentId={order.requisitionDocId}
                />
                <Spacer />
                {
                    isUploadingDoc ? <LoadingIndicator /> : (
                        <InvoiceDetailsPage
                            onImageUpload={onImageUpload}
                            removeInvoice={removeInvoice}
                            openFullView={openFullView}
                            isImageUploading={isImageUploading}
                            isImageUpdating={isImageUpdating}
                            canUpdateDoc={canUpdateDoc}
                            previewImage={content}
                            frameName={"Quotation"}
                            frameText={"Add the quotation recieved from the supplier for the requisition above."}
                            frameSecondaryText={"Add quotation"}
                            documentId={order.quotationDocId}
                        />
                    )
                }
            </PageWrapper>
        </ScrollView>
    );
};

export default RequisitionTab;
