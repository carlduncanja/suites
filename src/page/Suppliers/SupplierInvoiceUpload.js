import React, { useState, useEffect } from 'react';
import styled, {css} from '@emotion/native';
import * as DocumentPicker from 'expo-document-picker';
import {useTheme} from 'emotion-theming';
import {useNavigation} from '@react-navigation/native';
import { useModal } from 'react-native-modalfy';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import Record from '../../components/common/Information Record/Record';
import Footer from '../../components/common/Page/Footer';
import ImageUpload from '../../../assets/svg/imageUpload';
import ImageUploading from '../../../assets/svg/imageUploading';
import DeleteIcon from '../../../assets/svg/wasteIcon';
import { Image, View } from 'react-native';
import TestImage from '../../../assets/test_image.png';
import InvoiceFullPageView from './InvoiceFullPageView';

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
    align-items: center;
    margin: 60px;
    margin-top: 0;
    margin-bottom: 0;
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
    const { invoiceItem = {}, selectedSupplierName = '' } = route.params;
    const [pageState, setPageState] = useState({});
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [invoiceImage, setInvoiceImage] = useState();

    const {isEditMode = false} = pageState;
    const hasImage = false;

    console.log('Obj: ', invoiceItem);

    const onImageUpload = async () => {
        let result = {};
        setIsImageUploading(true);
        result = await DocumentPicker.getDocumentAsync({});
        console.log(result.uri);

        setTimeout(() => {
            setIsImageUploading(false);
            setInvoiceImage(result);
        }, 1500);
    };

    const openFullView = () => {
        modal.openModal('ReportPreviewModal', {
            content: <InvoiceFullPageView
                title={invoiceImage?.name || ''}
            />
        });
    };

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
                    isEditMode && <DeleteIcon/>
                }
            </ImageTitleContainer>
            <UploadedImageContainer
                activeOpacity={0.6}
                onPress={() => openFullView()}
            >
                <Image
                    // source={require('../../../assets/test_image.png')}
                    source={{ uri: '/Containers/Data/Application/A78AFDDA-8ACD-4FDF-8A54-A841F2C85A8E/Library/Caches/ExponentExperienceData/%2540anonymous%252Fsmsja-suites-b6d632e9-39b6-4802-9e28-8ee5f8211016/DocumentPicker/75178AFB-139F-4FEF-9493-CFB6EF47F67F.jpg' }}
                />
            </UploadedImageContainer>
        </ImageContainer>
    );

    const content = (
        <PageWrapper>
            <PurchaseOrderContainer theme={theme}>
                <Record
                    recordTitle="Purchase Order ID"
                    recordValue={invoiceItem.purchaseOrderNumber}
                    valueColor="--color-blue-600"
                />
            </PurchaseOrderContainer>
            <InvoiceWrapper>
                {
                    invoiceImage ? imageContent : uploadContent
                }
            </InvoiceWrapper>
            <Footer
                hasActions={false}
                hasPaginator={false}
            />
        </PageWrapper>
    );
    return (
        <>
            <PageContext.Provider value={{pageState, setPageState}}>
                <DetailsPage
                    title={selectedSupplierName}
                    subTitle={invoiceItem.invoiceNumber}
                    onBackPress={() => navigation.goBack()}
                    pageTabs={(
                        <TabsContainer
                            tabs={tabs}
                            selectedTab="Details"
                        />
                    )}
                >
                    {content}
                </DetailsPage>
            </PageContext.Provider>
        </>
    );
};

export default SupplierInvoiceUpload;
