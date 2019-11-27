import React, {Component} from 'react';
import {View} from 'react-native';
import Svg,{Path, G, Defs, ClipPath, Rect} from 'react-native-svg'

export default class Svg extends Component{
    render(){
        const getSvg = (icon, fillColor, strokeColor) =>{
            return icon === 'actionDelete' ?
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M8 4.5C11.5899 4.5 14.5 3.60457 14.5 2.5C14.5 1.39543 11.5899 0.5 8 0.5C4.41015 0.5 1.5 1.39543 1.5 2.5C1.5 3.60457 4.41015 4.5 8 4.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M1.5 5.5V13.5C1.5 14.605 4.41 15.5 8 15.5C11.59 15.5 14.5 14.605 14.5 13.5V5.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M5.5 7.5L10.5 12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M10.5 7.5L5.5 12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                </Svg>
                :
                icon === 'actionEdit' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M13 7L9 3" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M5.5 14.5L0.5 15.5L1.5 10.5L11.5 0.5L15.5 4.5L5.5 14.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'actionMenuClosed' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15 0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V1C16 0.4 15.6 0 15 0ZM14 14H2V2H14V14Z" fill={fillColor}/>
                        <Path d="M12 5H4V7H12V5Z" fill={fillColor}/>
                        <Path d="M12 9H4V11H12V9Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'actionMenuOpen' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15 0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V1C16 0.4 15.6 0 15 0ZM14 14H2V2H14V14Z" fill={fillColor}/>
                        <Path d="M12 5H4V7H12V5Z" fill={fillColor}/>
                        <Path d="M12 9H4V11H12V9Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'caseFilesSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 9H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M21 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V2H9L11 5H23V20C23 20.5304 22.7893 21.0391 22.4142 21.4142C22.0391 21.7893 21.5304 22 21 22Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'caseFiles' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 9H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M21 22H3C2.46957 22 1.96086 21.7893 1.58579 21.4142C1.21071 21.0391 1 20.5304 1 20V2H9L11 5H23V20C23 20.5304 22.7893 21.0391 22.4142 21.4142C22.0391 21.7893 21.5304 22 21 22Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'caseBannerIcon' ?
                    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <G opacity="0.4">
                            <Path d="M35.5 35.488C40.922 36.561 44.5 38.405 44.5 40.5C44.5 43.814 35.546 46.5 24.5 46.5C13.454 46.5 4.5 43.814 4.5 40.5C4.5 38.413 8.052 36.575 13.441 35.5" stroke={strokeColor} stroke-miterlimit="10"/>
                            <Path d="M28.5 40.5H20.5L19.5 30.5L15.5 29.5V21.5C15.5 19.291 17.291 17.5 19.5 17.5H29.5C31.709 17.5 33.5 19.291 33.5 21.5V29.5L29.5 30.5L28.5 40.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                            <Path d="M24.5 12.5C21.739 12.5 19.5 10.261 19.5 7.5C19.5 4.739 21.739 2.5 24.5 2.5C27.261 2.5 29.5 4.739 29.5 7.5C29.5 10.261 27.261 12.5 24.5 12.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        </G>
                    </Svg>
                :
                icon === 'caseBmiArrow' ?
                    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M11.5 2H0.500011C0.40895 2.00004 0.319627 2.02494 0.241683 2.07203C0.163739 2.11911 0.100133 2.18659 0.0577301 2.26717C0.015327 2.34776 -0.0042634 2.4384 0.00107308 2.5293C0.00640957 2.62021 0.0364703 2.70793 0.0880112 2.783L5.58801 10.783C5.63396 10.8498 5.69548 10.9045 5.76725 10.9422C5.83903 10.98 5.91891 10.9997 6.00001 10.9997C6.08111 10.9997 6.16099 10.98 6.23277 10.9422C6.30455 10.9045 6.36606 10.8498 6.41201 10.783L11.912 2.783C11.9636 2.70793 11.9936 2.62021 11.999 2.5293C12.0043 2.4384 11.9847 2.34776 11.9423 2.26717C11.8999 2.18659 11.8363 2.11911 11.7583 2.07203C11.6804 2.02494 11.5911 2.00004 11.5 2Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'caseChargeSheetSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M21.1667 15.3333H2.83333C2.3725 15.3333 2 15.7058 2 16.1666V21.1666C2 21.6275 2.3725 22 2.83333 22H21.1667C21.6275 22 22 21.6275 22 21.1666V16.1666C22 15.7058 21.6275 15.3333 21.1667 15.3333ZM7 19.5H4.5V17.8333H7V19.5ZM19.5 19.5H10.3333V17.8333H19.5V19.5Z" fill={fillColor}/>
                        <Path d="M5.33333 7V13.6667H18.6667V4.91667C18.6667 3.30833 17.3583 2 15.75 2H4.91667C3.30833 2 2 3.30833 2 4.91667V6.16667C2 6.6275 2.3725 7 2.83333 7H5.33333ZM3.66667 4.91667C3.66667 4.2275 4.2275 3.66667 4.91667 3.66667H13.115C12.9342 4.04583 12.8333 4.47 12.8333 4.91667V5.33333H3.66667V4.91667Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'caseChargeSheet' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M21.1667 15.3333H2.83333C2.3725 15.3333 2 15.7058 2 16.1666V21.1666C2 21.6275 2.3725 22 2.83333 22H21.1667C21.6275 22 22 21.6275 22 21.1666V16.1666C22 15.7058 21.6275 15.3333 21.1667 15.3333ZM7 19.5H4.5V17.8333H7V19.5ZM19.5 19.5H10.3333V17.8333H19.5V19.5Z" fill={fillColor}/>
                        <Path d="M5.33333 7V13.6667H18.6667V4.91667C18.6667 3.30833 17.3583 2 15.75 2H4.91667C3.30833 2 2 3.30833 2 4.91667V6.16667C2 6.6275 2.3725 7 2.83333 7H5.33333ZM3.66667 4.91667C3.66667 4.2275 4.2275 3.66667 4.91667 3.66667H13.115C12.9342 4.04583 12.8333 4.47 12.8333 4.91667V5.33333H3.66667V4.91667Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'casePatientSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 6C10.343 6 9 4.657 9 3C9 1.343 10.343 0 12 0C13.657 0 15 1.343 15 3C15 4.657 13.657 6 12 6Z" fill={fillColor}/>
                        <Path d="M14 21H10C9.448 21 9 20.552 9 20V15H7V9C7 7.895 7.895 7 9 7H15C16.105 7 17 7.895 17 9V15H15V20C15 20.552 14.552 21 14 21Z" fill={fillColor}/>
                        <Path d="M17 17.271V19.29C19.738 19.617 21.284 20.152 21.837 20.507C20.935 21.099 17.573 22 12 22C6.427 22 3.065 21.099 2.163 20.507C2.716 20.152 4.262 19.617 7 19.29V17.271C3.657 17.633 0 18.489 0 20.505C0 23.832 9.996 24 12 24C14.004 24 24 23.832 24 20.505C24 18.489 20.343 17.633 17 17.271Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'casePatient' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 6C10.343 6 9 4.657 9 3C9 1.343 10.343 0 12 0C13.657 0 15 1.343 15 3C15 4.657 13.657 6 12 6Z" fill={fillColor}/>
                        <Path d="M14 21H10C9.448 21 9 20.552 9 20V15H7V9C7 7.895 7.895 7 9 7H15C16.105 7 17 7.895 17 9V15H15V20C15 20.552 14.552 21 14 21Z" fill={fillColor}/>
                        <Path d="M17 17.271V19.29C19.738 19.617 21.284 20.152 21.837 20.507C20.935 21.099 17.573 22 12 22C6.427 22 3.065 21.099 2.163 20.507C2.716 20.152 4.262 19.617 7 19.29V17.271C3.657 17.633 0 18.489 0 20.505C0 23.832 9.996 24 12 24C14.004 24 24 23.832 24 20.505C24 18.489 20.343 17.633 17 17.271Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'caseProcedureSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <G clip-path="url(#clip0)">
                            <Path d="M10.465 10.121L1.29297 19.293C0.992966 19.593 0.914966 20.05 1.09897 20.433C1.26697 20.782 1.61897 21 1.99997 21C2.03697 21 2.07397 20.998 2.11097 20.994L11.111 19.994C11.617 19.937 12 19.51 12 19V15.414L13.879 13.535L10.465 10.121Z" fill={fillColor}/>
                            <Path d="M22.7019 2.921C21.2169 1.623 18.7499 1.835 17.3559 3.23C15.3589 5.227 11.8789 8.707 11.8789 8.707L16.5859 13.414C16.7809 13.609 17.0369 13.707 17.2929 13.707C17.5489 13.707 17.8049 13.609 17.9999 13.414L22.7759 8.638C23.4289 7.985 23.8999 7.145 23.9969 6.227C24.1289 4.962 23.6529 3.753 22.7019 2.921Z" fill={fillColor}/>
                        </G>
                        <Defs>
                            <ClipPath id="clip0">
                                <Rect width="24" height="24" fill="white"/>
                            </ClipPath>
                        </Defs>
                    </Svg>

                :
                icon === 'caseStaffSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M21.1667 7.83333H16.1667V2.83333C16.1667 2.33333 15.8333 2 15.3333 2H8.66667C8.16667 2 7.83333 2.33333 7.83333 2.83333V7.83333H2.83333C2.33333 7.83333 2 8.16667 2 8.66667V15.3333C2 15.8333 2.33333 16.1667 2.83333 16.1667H7.83333V21.1667C7.83333 21.6667 8.16667 22 8.66667 22H15.3333C15.8333 22 16.1667 21.6667 16.1667 21.1667V16.1667H21.1667C21.6667 16.1667 22 15.8333 22 15.3333V8.66667C22 8.16667 21.6667 7.83333 21.1667 7.83333Z" fill={fillColor}/>
                        <Path d="M16.1666 7.83331H21.1666C21.6666 7.83331 21.9999 8.16665 21.9999 8.66665V15.3333C21.9999 15.8333 21.6666 16.1666 21.1666 16.1666H16.1666V21.1666C16.1666 21.6666 15.8333 22 15.3333 22H8.66659C8.16659 22 7.83325 21.6666 7.83325 21.1666V16.1666L16.1666 7.83331Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'caseStaff' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M21.1667 7.83333H16.1667V2.83333C16.1667 2.33333 15.8333 2 15.3333 2H8.66667C8.16667 2 7.83333 2.33333 7.83333 2.83333V7.83333H2.83333C2.33333 7.83333 2 8.16667 2 8.66667V15.3333C2 15.8333 2.33333 16.1667 2.83333 16.1667H7.83333V21.1667C7.83333 21.6667 8.16667 22 8.66667 22H15.3333C15.8333 22 16.1667 21.6667 16.1667 21.1667V16.1667H21.1667C21.6667 16.1667 22 15.8333 22 15.3333V8.66667C22 8.16667 21.6667 7.83333 21.1667 7.83333Z" fill={fillColor}/>
                        <Path d="M16.1668 7.83331H21.1668C21.6668 7.83331 22.0002 8.16665 22.0002 8.66665V15.3333C22.0002 15.8333 21.6668 16.1666 21.1668 16.1666H16.1668V21.1666C16.1668 21.6666 15.8335 22 15.3335 22H8.66683C8.16683 22 7.8335 21.6666 7.8335 21.1666V16.1666L16.1668 7.83331Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'deliverySelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M20 20V23H16V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M8 20V23H4V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M20 12V1H4V12L2 14V20H22V14L20 12Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M7.5 11.5V8.5H16.5V11.5H7.5Z" fill={fillColor} stroke={strokeColor}/>
                        <Path d="M1 8V10" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M23 8V10" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M6.5 16C6.5 16.2761 6.27614 16.5 6 16.5C5.72386 16.5 5.5 16.2761 5.5 16C5.5 15.7239 5.72386 15.5 6 15.5C6.27614 15.5 6.5 15.7239 6.5 16Z" fill={fillColor} stroke={strokeColor}/>
                        <Path d="M18.5 16C18.5 16.2761 18.2761 16.5 18 16.5C17.7239 16.5 17.5 16.2761 17.5 16C17.5 15.7239 17.7239 15.5 18 15.5C18.2761 15.5 18.5 15.7239 18.5 16Z" fill={fillColor} stroke={strokeColor}/>
                        <Path d="M4 5H20" stroke={strokeColor} stroke-miterlimit="10"/>
                    </Svg>
                :
                icon === 'delivery' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M20 20V23H16V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M8 20V23H4V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M20 12V1H4V12L2 14V20H22V14L20 12Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M7.5 11.5V8.5H16.5V11.5H7.5Z" fill={strokeColor} stroke={strokeColor}/>
                        <Path d="M1 8V10" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M23 8V10" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M6.5 16C6.5 16.2761 6.27614 16.5 6 16.5C5.72386 16.5 5.5 16.2761 5.5 16C5.5 15.7239 5.72386 15.5 6 15.5C6.27614 15.5 6.5 15.7239 6.5 16Z" fill={fillColor} stroke={strokeColor}/>
                        <Path d="M18.5 16C18.5 16.2761 18.2761 16.5 18 16.5C17.7239 16.5 17.5 16.2761 17.5 16C17.5 15.7239 17.7239 15.5 18 15.5C18.2761 15.5 18.5 15.7239 18.5 16Z" fill={fillColor} stroke={strokeColor}/>
                        <Path d="M4 5H20" stroke={strokeColor} stroke-miterlimit="10"/>
                    </Svg>
                :
                icon === 'equipmentSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M7.81519 16V23H19.8152V17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M19.8152 17C21.472 17 22.8152 15.6569 22.8152 14C22.8152 12.3431 21.472 11 19.8152 11C18.1583 11 16.8152 12.3431 16.8152 14C16.8152 15.6569 18.1583 17 19.8152 17Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10.8152 2H13.6152C14.2152 2 14.7152 2.5 14.6152 3.1L13.0152 14.2C12.9152 15.2 12.0152 15.9 11.0152 15.9H4.51521C3.51521 15.9 2.71521 15.2 2.51521 14.2L1.01521 3.1C0.915206 2.5 1.31521 2 2.01521 2H4.81521" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M4.81519 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10.8152 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'equipment' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M7.8152 16V23H19.8152V17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M19.8152 17C21.4721 17 22.8152 15.6569 22.8152 14C22.8152 12.3431 21.4721 11 19.8152 11C18.1583 11 16.8152 12.3431 16.8152 14C16.8152 15.6569 18.1583 17 19.8152 17Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10.8152 2H13.6152C14.2152 2 14.7152 2.5 14.6152 3.1L13.0152 14.2C12.9152 15.2 12.0152 15.9 11.0152 15.9H4.51521C3.51521 15.9 2.71521 15.2 2.51521 14.2L1.01521 3.1C0.915206 2.5 1.31521 2 2.01521 2H4.81521" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M4.8152 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10.8152 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'genderFemale' ?
                    <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M4.125 10.6875V7.5625" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M2.875 9.4375H5.375" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M4.125 7.5625C5.85089 7.5625 7.25 6.16339 7.25 4.4375C7.25 2.71161 5.85089 1.3125 4.125 1.3125C2.39911 1.3125 1 2.71161 1 4.4375C1 6.16339 2.39911 7.5625 4.125 7.5625Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'genderMale' ?
                    <Svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5.9375 0.9375H9.0625V4.0625" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M9.06252 0.9375L5.73877 4.26125" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M3.75 9.0625C5.3033 9.0625 6.5625 7.8033 6.5625 6.25C6.5625 4.6967 5.3033 3.4375 3.75 3.4375C2.1967 3.4375 0.9375 4.6967 0.9375 6.25C0.9375 7.8033 2.1967 9.0625 3.75 9.0625Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'inventorySelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M22 1H2V23H22V1Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 1V23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 15H2" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M6 19H8" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M17 5V8" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'inventory' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M22 1H2V23H22V1Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 1V23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 15H2" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M6 19H8" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M17 5V8" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'listItemActionDelete' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8 4.5C11.5899 4.5 14.5 3.60457 14.5 2.5C14.5 1.39543 11.5899 0.5 8 0.5C4.41015 0.5 1.5 1.39543 1.5 2.5C1.5 3.60457 4.41015 4.5 8 4.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M1.5 5.5V13.5C1.5 14.605 4.41 15.5 8 15.5C11.59 15.5 14.5 14.605 14.5 13.5V5.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M5.5 7.5L10.5 12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M10.5 7.5L5.5 12.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                null
        }
        return(
            <View>
                {getSvg(this.props.iconName, this.props.fillColor, this.props.strokeColor)}
            </View>
 
        )
    }
}