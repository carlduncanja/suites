import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from '../../contexts/PageContext';
import ImageUpload from '../../../assets/svg/imageUpload';
import ImageUploading from '../../../assets/svg/imageUploading';
import DeleteIcon from '../../../assets/svg/wasteIcon';
import IconButton from '../../components/common/Buttons/IconButton';
import { getFiletData } from '../../api/network';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import PdfReader from 'rn-pdf-reader-js';
import * as FileSystem from 'expo-file-system';

const InvoiceDetailsPage = ({
    onImageUpload = () => { },
    removeDocument = () => { },
    openFullView = () => { },
    handleDocumentLoaded = () => {},
    isImageUploading = false,
    isImageUpdating = false,
    canUpdateDoc = false,
    canDelete = false,
    previewImage,
    canPreview = true,
    documentId,
    frameName,
    frameText = "Click to upload",
    frameSecondaryText,
}) => {
    const theme = useTheme();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    const [isFetching, setIsFetching] = useState(false);
    const [uri, setUri] = useState('');
    const [canDocumentPreview, setCanDocumentPreview] = useState(canPreview);
    const [isPdf, setPdf] = useState(false);

    useEffect(() => {
        if (documentId) {
            getDocumentData(documentId)
            .then( result => {
                setUri(result);
                setIsFetching(false)
            })
        }
    }, [documentId]);

    const getDocumentData =  () => {
        return new Promise((resolve) => {
            setIsFetching(true)
            getFiletData(documentId)
            .then(async (res) => {
                setCanDocumentPreview(true);
                if (res?.data?.metadata?.extension === 'pdf' || res?.data?.metadata?.extension === 'PDF') {
                    setPdf(true)
                    let image;
                    try {
                        const { uri } = await FileSystem.downloadAsync(
                            `https://influx.smssoftwarestudio.com/insight/document-management-service/api/documents/${documentId}`,
                            `${FileSystem.cacheDirectory}${frameName.replace(/\s/g, '')}`
                        );

                        image = await FileSystem.readAsStringAsync(uri, {
                            encoding: 'base64',
                        });
                        await FileSystem.deleteAsync(`${FileSystem.cacheDirectory}${frameName.replace(/\s/g, '')}`);
                        resolve(`data:application/pdf;base64,${image}`);
                    } catch (err) {
                        console.log("An error occured whilst converting to base 64", err);
                    }
                } else {
                    resolve(`https://influx.smssoftwarestudio.com/insight/document-management-service/api/documents/${documentId}`);
                }
                
            })
            .catch(err => {
                setCanDocumentPreview(false);
                console.log("An error occured whilst getting document data", err);
            })
        });
      
    }


    const uploadContent = (
        <ImageContainer>
            <ImageTitleContainer theme={theme}>
                <PageText
                    theme={theme}
                    font="--text-sm-medium"
                    textColor="--color-blue-600"
                >{frameName}</PageText>
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
                    font="--text-lg-regular"
                    style={css`padding-top: 10px;`}
                >
                    {
                        isImageUploading ? 'Please wait...' : frameText
                    }
                </PageText>
                <PageText
                    textColor="--color-blue-600"
                    font="--text-lg-regular"
                    style={css`padding-top: 10px;`}
                >
                    {frameSecondaryText}
                </PageText>
                <PageText
                    textColor="--color-gray-500"
                    font="--text-lg-regular"
                    paddingTop={20}
                >
                    Supports JPG, PNG & PDF
                </PageText>
            </InvoiceUploadContainer>
        </ImageContainer>

    );

    const removeImage = () => {
        removeDocument();
    }

    const content = () => {
        if (previewImage) {
            if (previewImage.mimeType === "application/pdf") {
                return (

                    <ContentContainer onPress={() => openFullView(frameName, true, previewImage.uri)}>
                        <PdfReader
                            source={{
                                base64: previewImage.uri
                            }}
                        />
                    </ContentContainer>
                )
            } else {
                return (
                    <UploadedImageContainer
                        activeOpacity={0.6}
                        onPress={() => openFullView(frameName, false, previewImage.uri)}
                    >
                        <PreviewImage
                            source={{ uri: previewImage.uri }}
                        />
                    </UploadedImageContainer>
                )
            }
        }
        else if (isPdf && uri) {
            return (
                <ContentContainer onPress={() => openFullView(frameName, true, uri)}>
                    <PdfReader
                        source={{
                            base64: uri
                        }}
                        onLoad={()=> {handleDocumentLoaded()}}
                    />
                </ContentContainer>

            )
        }
        else if (uri) {
            return (
                <ViewImageContainer onPress={() => openFullView(frameName, false, uri)}>
                    <PreviewImage
                        source={{ uri: canUpdateDoc ? `` : uri }}
                    />
                </ViewImageContainer>
            )
        } else {
            return (
                <RejectedPreviewContainer theme={theme}>
                    <PageText
                        font="--text-lg-bold"
                        textColor="--color-blue-600"
                        paddingTop={150}
                    >
                        {"Document not available" }
                    </PageText>
                </RejectedPreviewContainer>
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
                >{frameName}</PageText>
                {
                    (canDelete && isEditMode) && (
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
            <InvoiceWrapper>
                {
                canUpdateDoc ? !previewImage ? uploadContent : imageContent : imageContent
                }
            </InvoiceWrapper>
        </PageWrapper>
    )
}

const PageWrapper = styled.View`
    margin: 0;
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
    height: 92.5%;
`;

const ImageContainer = styled.View`
    width: 100%;
    height: 600px;
    border: ${({ theme }) => `1px solid ${theme.colors['--color-gray-400']}`};
    background-color: ${({ theme }) => theme.colors['--color-gray-300']};
    border-radius: 4px;
`;

const ContentContainer = styled.TouchableOpacity`
    width: 100%;
    height: 92.5%;
    margin: 0px;
    padding: 0px;
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

const ViewImageContainer = styled.TouchableOpacity`
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

const PageText = styled.Text(({ theme, textColor = '--color-gray-600', font = '--confirm-title', paddingTop = 2 }) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: paddingTop,
    lineHeight: 16,
    textAlign: 'center'
}));


export default InvoiceDetailsPage;
