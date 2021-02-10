import React, { useContext, useEffect, useState } from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {PageContext} from '../../contexts/PageContext';
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
    margin: ${({theme}) => theme.space['--space-40']}; 
    margin-top: 120px;
    margin-bottom: 0;
    text-align: center;
`;

const IconConatiner = styled.View`
    flex: 1;
    align-items: flex-end;
    justify-content: flex-end;
`;

const PageText = styled.Text(({ theme, textColor = '--color-gray-600', font = '--confirm-title'}) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
    lineHeight: 16,
    textAlign: 'center'
}));

const InvoiceDetailsPage = ({
    onImageUpload = () => {},
    removeInvoice = () => {},
    openFullView = () => {},
    isImageUploading = false,
    invoiceImage,
    canPreview = true,
    purchaseOrderNumber = '',
    invoice = {}
}) => {
    const theme = useTheme();
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    const [isPageLoading, setIsPageLoading] = useState(false);
    const [documentImage, setDocumentImage] = useState();

    const getDocumentData = () => {
        setIsPageLoading(true);
        getFiletData(invoice?.documentId)
            .then(res => {
                setDocumentImage(res?.data || {});
                console.log('Repsonse: ', res);
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

    const uploadContent = (
        <InvoiceUploadContainer
            theme={theme}
            activeOpacity={0.7}
            disabled={!isEditMode}
            onPress={() => onImageUpload()}
        >
            {
                isImageUploading ? <ImageUploading/> : <ImageUpload strokeColor={isEditMode ? theme.colors['--color-blue-600'] : theme.colors['--color-gray-600'] }/>
            }
            <PageText
                textColor={isEditMode ? '--color-blue-600' : '--color-gray-600'}
                font="--text-sm-regular"
                style={css`padding-top: 10px;`}
            >
                {
                    isImageUploading ? 'Please wait...' : 'Click to Upload Invoice'
                }
            </PageText>
            <PageText
                textColor="--color-gray-500"
                font="--cart-text"
            >
                Supports JPG, PNG PDF
            </PageText>
        </InvoiceUploadContainer>
    );

    const imageContent = (
        <ImageContainer theme={theme}>
            <ImageTitleContainer theme={theme}>
                <PageText
                    theme={theme}
                    font="--text-sm-medium"
                    textColor="--color-blue-600"
                >{invoiceImage?.name || ''}</PageText>
                {
                    isEditMode && (
                        <IconConatiner>
                            <IconButton
                                Icon={<DeleteIcon/>}
                                onPress={() => removeInvoice()}
                            />
                        </IconConatiner>
                    )
                }
            </ImageTitleContainer>
            {
                canPreview ?
                    (
                        <UploadedImageContainer
                            activeOpacity={0.6}
                            onPress={() => openFullView()}
                        >
                            <PreviewImage
                                source={{ uri: invoiceImage?.uri }}
                            />
                        </UploadedImageContainer>
                    ) :
                    (
                        <RejectedPreviewContainer theme={theme}>
                            <PageText
                                font="--text-lg-bold"
                                textColor="--color-blue-600"
                            >
                                Document/Image format cannot be previewed/viewed in full screen
                            </PageText>
                        </RejectedPreviewContainer>
                    )
            }
            
        </ImageContainer>
    );

    return (
        <PageWrapper>
            <PurchaseOrderContainer theme={theme}>
                <Record
                    recordTitle="Purchase Order ID"
                    recordValue={purchaseOrderNumber}
                    valueColor="--color-blue-600"
                />
            </PurchaseOrderContainer>
            {
                isPageLoading ? <LoadingIndicator/> : (
                    <InvoiceWrapper>
                        {
                            (invoiceImage || invoice?.documentId) ? imageContent : uploadContent
                        }
                    </InvoiceWrapper>
                )
            }
            <Footer
                hasActions={false}
                hasPaginator={false}
            />
        </PageWrapper>
    )
}

export default InvoiceDetailsPage;
