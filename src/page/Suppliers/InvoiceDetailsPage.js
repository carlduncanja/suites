import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from '../../contexts/PageContext';
import Record from '../../components/common/Information Record/Record';
import Footer from '../../components/common/Page/Footer';
import ImageUpload from '../../../assets/svg/imageUpload';
import ImageUploading from '../../../assets/svg/imageUploading';
import DeleteIcon from '../../../assets/svg/wasteIcon';
import TestImage from '../../../assets/test_image.png';
import IconButton from '../../components/common/Buttons/IconButton';
import { useSafeArea } from 'react-native-safe-area-context';
import { getFiletData, getDocumentById } from '../../api/network';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import { View } from 'react-native';
import { Image } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'
import ImgToBase64 from 'react-native-image-base64';
const InvoiceDetailsPage = ({
    onImageUpload = () => { },
    removeInvoice = () => { },
    openFullView = () => { },
    isImageUploading = false,
    isImageUpdating = false,
    canUpdateDoc = false,
    invoiceImage,
    canPreview = true,
    purchaseOrderNumber = '',
    invoice = {},
    frameName,
    frameText = "Click to upload",
    frameSecondaryText
}) => {
    const theme = useTheme();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    const [isPageLoading, setIsPageLoading] = useState(false);
    const [documentImageData, setDocumentImageData] = useState();
    const [uri, setUri] = useState('');
    const [canDocumentPreview, setCanDocumentPreview] = useState(canPreview);
    const [isPdf, setPdf] = useState();
    
    const getDocumentData = async () => {
        setIsPageLoading(true);
        getFiletData(invoice?.documentId)
            .then(res => {
                // console.log('Res: ', res);
                setDocumentImageData(res.data);
                if (res?.data?.metadata?.extension === 'pdf' || res?.data?.metadata?.extension === 'PDF') {
                    setCanDocumentPreview(false);
                    setPdf(true);
                } else {
                    setCanDocumentPreview(true);
                }
            })
            .catch(err => {
                console.log('Retrieve Document error: ', err);
            })
            .finally(_ => setIsPageLoading(false))
    }

    useEffect(() => {
        if (invoice?.documentId) {
            getDocumentData(invoice?.documentId)
        }
    }, []);

    useEffect(() => {
        if (invoice?.documentId) {
            setUri(`https://influx.smssoftwarestudio.com/insight/document-management-service/api/documents/${invoice?.documentId}`);
            getDocumentData();
        }
    }, [invoice?.documentId])

    useEffect(() => {
        if (invoiceImage) {
            const testUri = (invoiceImage.uri).match(/[^.]*$/g)[0] || '';
            const rejectedPreviewFormats = (testUri === 'pdf') || (testUri === 'PDF');
            if (rejectedPreviewFormats) {
                setCanDocumentPreview(false);
            } else {
                setCanDocumentPreview(true);
            }
        }
    }, [invoiceImage])

    const uploadContent = (
        <ImageContainer>
        <ImageTitleContainer theme={theme}>
                <PageText
                    theme={theme}
                    font="--text-sm-medium"
                    textColor="--color-blue-600"
                >{canUpdateDoc ? '' : frameName}</PageText>
                {
                    isEditMode && (
                        <IconConatiner>
                            <IconButton
                                Icon={<DeleteIcon />}
                                onPress={() => removeImage()}
                            />
                        </IconConatiner>
                    )
                }
            </ImageTitleContainer>
            <InvoiceUploadContainer
            theme={theme}
            activeOpacity={0.7}
            disabled={!isEditMode}
            onPress={() => onImageUpload()}
        >
            {
                isImageUploading ? <ImageUploading /> : <ImageUpload strokeColor={isEditMode ? theme.colors['--color-blue-600'] : theme.colors['--color-gray-600']} />
            }
            <PageText
                textColor={isEditMode ? '--color-blue-600' : '--color-gray-600'}
                font="--text-sm-regular"
                style={css`padding-top: 10px;`}
            >
                {
                    isImageUploading ? 'Please wait...' : frameText
                }
            </PageText>
            <PageText
                textColor="--color-blue-600"
                font="--text-sm-regular"
                style={css`padding-top: 10px;`}
            >
                {frameSecondaryText}
            </PageText>
            <PageText
                textColor="--color-gray-500"
                font="--cart-text"
            >
                Supports JPG, PNG PDF
            </PageText>
        </InvoiceUploadContainer>
        </ImageContainer>
        
    );

    // const imageName = documentImageData ? documentImageData?.metadata?.originalname || '' : invoiceImage?.name || '';

    const removeImage = () => {
        if (invoice?.documentId) {
            setDocumentImageData();
        }
        removeInvoice();
    }

    const content = () => {
        if (!canDocumentPreview) {
            return (
                <RejectedPreviewContainer theme={theme}>
                    <PageText
                        font="--text-lg-bold"
                        textColor="--color-blue-600"
                    >
                        Document/Image format cannot be previewed/viewed in full screen
                    </PageText>
                </RejectedPreviewContainer>
            )
            } else if (documentImageData) {
                return (
                    <ViewImageContainer>
                        <PreviewImage
                            source={{uri: canUpdateDoc ? `` : uri}}
                        />
                    </ViewImageContainer>
                )
        }
        else {
            return (
                <UploadedImageContainer
                    activeOpacity={0.6}
                    onPress={() => openFullView()}
                >
                    <PreviewImage
                        source={{ uri: invoiceImage?.uri }}
                    />
                </UploadedImageContainer>

            )
        }
    }

    const imageContent = (
        <ImageContainer theme={theme}>
            <ImageTitleContainer theme={theme}>
                <PageText
                    theme={theme}
                    font="--text-sm-medium"
                    textColor="--color-blue-600"
                >{canUpdateDoc ? '' : frameName}</PageText>
                {
                    isEditMode && (
                        <IconConatiner>
                            <IconButton
                                Icon={<DeleteIcon />}
                                onPress={() => removeImage()}
                            />
                        </IconConatiner>
                    )
                }
            </ImageTitleContainer>
            {
                isImageUpdating ? <LoadingIndicator /> : content()
            }
        </ImageContainer>
    );

    return (
        
        <PageWrapper>
            {
                isPageLoading ? <LoadingIndicator /> : (
                    <InvoiceWrapper>
                        {
                            (invoiceImage || documentImageData) ? imageContent : uploadContent
                        }
                    </InvoiceWrapper>
                )
            }
        </PageWrapper>
    )
}

const PageWrapper = styled.View`
    margin: 0;
    height: 100%;
`;

const PurchaseOrderContainer = styled.View`
    height: 100px;
    border: ${({ theme }) => `1px solid ${theme.colors['--color-gray-300']}`};
    margin-bottom: ${({ theme }) => theme.space['--space-40']};
    border-width: 0 0 1px;
`;

const InvoiceWrapper = styled.View`
    display: flex;
`;

const InvoiceUploadContainer = styled.TouchableOpacity`
    width: 100%;
    height: 310px;
    background-color: ${({ theme }) => theme.colors['--color-gray-100']};
    align-items: center;
    justify-content: center;
`;

const ImageContainer = styled.View`
    width: 100%;
    height: 356px;
    border: ${({ theme }) => `1px solid ${theme.colors['--color-gray-400']}`};
    background-color: ${({ theme }) => theme.colors['--color-gray-300']};
    border-radius: 4px;
`;

const ImageTitleContainer = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors['--color-white']};
    padding: ${({ theme }) => theme.space['--space-12']};
    border-color: ${({ theme }) => theme.colors['--color-gray-400']};
    border-style: solid;
    border-width: 0 0 1px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const ViewImageContainer = styled.View`
    display: flex;
    flex:1;
    align-items: center;
    margin: 60px;
    margin-top: 0;
    margin-bottom: 0;
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
    margin: ${({ theme }) => theme.space['--space-40']}; 
    margin-top: 120px;
    margin-bottom: 0;
    text-align: center;
`;

const IconConatiner = styled.View`
    flex: 1;
    align-items: flex-end;
    justify-content: flex-end;
`;

const PageText = styled.Text(({ theme, textColor = '--color-gray-600', font = '--confirm-title' }) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
    lineHeight: 16,
    textAlign: 'center'
}));


export default InvoiceDetailsPage;
