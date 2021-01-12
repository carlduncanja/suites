import React, { useState, useEffect } from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {useNavigation} from '@react-navigation/native';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import { View, Text } from 'react-native';
import Record from '../../components/common/Information Record/Record';
import Footer from '../../components/common/Page/Footer';
import ImageUpload from '../../../assets/svg/imageUpload';
import ImageUploading from '../../../assets/svg/imageUploading';

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
    border: ${({theme}) => `2.3px dashed ${theme.colors['--color-blue-200']}`};
    background-color: ${({theme}) => theme.colors['--color-blue-100']};

    align-items: center;
    justify-content: center;
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
    const tabs = ['Details'];
    const { invoiceItem = {}, selectedSupplierName = '' } = route.params;
    const [pageState, setPageState] = useState({});
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [invoiceImage, setInvoiceImage] = useState();

    const {isEditMode} = pageState;

    const onImageUpload = () => {
        setIsImageUploading(true);

        setTimeout(() => {
            setIsImageUploading(false);
        }, 1500);
    };

    const content = (
        <PageWrapper>
            <PurchaseOrderContainer theme={theme}>
                <Record
                    recordTitle="Purchase Order ID"
                    recordValue={invoiceItem.order}
                />
            </PurchaseOrderContainer>
            <InvoiceWrapper>
                <InvoiceUploadContainer
                    theme={theme}
                    activeOpacity={0.7}
                    onPress={() => onImageUpload()}
                >
                    {
                        isImageUploading ? <ImageUploading/> : <ImageUpload/>
                    }
                    <PageText
                        textColor="--color-blue-600"
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
