import React, {Component} from 'react';
import {View} from 'react-native';
import Svg,{Path, G, Defs, ClipPath, Rect} from 'react-native-svg'

export default class SvgIcon extends Component{
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
                icon === 'actions' ?
                    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M6.5 12.5C9.81371 12.5 12.5 9.81371 12.5 6.5C12.5 3.18629 9.81371 0.5 6.5 0.5C3.18629 0.5 0.5 3.18629 0.5 6.5C0.5 9.81371 3.18629 12.5 6.5 12.5Z" stroke="#3182CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M14.5002 14.5002L10.7422 10.7422" stroke="#3182CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'actionEdit' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M13 7L9 3" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M5.5 14.5L0.5 15.5L1.5 10.5L11.5 0.5L15.5 4.5L5.5 14.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'actionMenu' ?
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
                icon === 'stepComplete'?
                    <Svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5.6 6.4L1.6 4L0 5.6L5.6 12L16 1.6L14.4 0L5.6 6.4Z" fill="#48BB78"/>
                    </Svg>
                :
                icon === 'caseFilesComplete'?
                    <Svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M24.5 6L18.5 0H3.5C1.8425 0 0.5 1.3425 0.5 3V54C0.5 57.3135 3.1865 60 6.5 60H63.5C66.8135 60 69.5 57.3135 69.5 54V12C69.5 8.6865 66.8135 6 63.5 6H24.5Z" fill="#0CB0E7"/>
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M38 39H32C27.8585 39 24.5 42.3585 24.5 46.5C24.5 47.328 25.175 48 26.0105 48H43.9895C44.8235 48 45.5 47.3205 45.5 46.5C45.5 42.3585 42.1415 39 38 39Z" fill="white"/>
                        <Path d="M35 36C38.3137 36 41 33.3137 41 30C41 26.6863 38.3137 24 35 24C31.6863 24 29 26.6863 29 30C29 33.3137 31.6863 36 35 36Z" fill="white"/>
                        <Path d="M69.5 15H0.5V3C0.5 1.3425 1.8425 0 3.5 0H18.5L24.5 6H63.5C66.8135 6 69.5 8.6865 69.5 12V15Z" fill="#047FA8"/>
                    </Svg>
                :
                icon === 'patientSelectedNew' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 6C10.343 6 9 4.657 9 3C9 1.343 10.343 0 12 0C13.657 0 15 1.343 15 3C15 4.657 13.657 6 12 6Z" fill="#0CB0E7"/>
                        <Path d="M14 21H10C9.448 21 9 20.552 9 20V15H7V9C7 7.895 7.895 7 9 7H15C16.105 7 17 7.895 17 9V15H15V20C15 20.552 14.552 21 14 21Z" fill="#0CB0E7"/>
                        <Path d="M17 17.271V19.29C19.738 19.617 21.284 20.152 21.837 20.507C20.935 21.099 17.573 22 12 22C6.427 22 3.065 21.099 2.163 20.507C2.716 20.152 4.262 19.617 7 19.29V17.271C3.657 17.633 0 18.489 0 20.505C0 23.832 9.996 24 12 24C14.004 24 24 23.832 24 20.505C24 18.489 20.343 17.633 17 17.271Z" fill="#0CB0E7"/>
                    </Svg>
                :
                icon === 'patientNew' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 6C10.343 6 9 4.657 9 3C9 1.343 10.343 0 12 0C13.657 0 15 1.343 15 3C15 4.657 13.657 6 12 6Z" fill={fillColor}/>
                        <Path d="M14 21H10C9.448 21 9 20.552 9 20V15H7V9C7 7.895 7.895 7 9 7H15C16.105 7 17 7.895 17 9V15H15V20C15 20.552 14.552 21 14 21Z" fill={fillColor}/>
                        <Path d="M17 17.271V19.29C19.738 19.617 21.284 20.152 21.837 20.507C20.935 21.099 17.573 22 12 22C6.427 22 3.065 21.099 2.163 20.507C2.716 20.152 4.262 19.617 7 19.29V17.271C3.657 17.633 0 18.489 0 20.505C0 23.832 9.996 24 12 24C14.004 24 24 23.832 24 20.505C24 18.489 20.343 17.633 17 17.271Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'proceduresSelectedNew' ?
                    <Svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.46521 8.12109L0.29321 17.2931C-0.00679019 17.5931 -0.0847902 18.0501 0.0992098 18.4331C0.26721 18.7821 0.61921 19.0001 1.00021 19.0001C1.03721 19.0001 1.07421 18.9981 1.11121 18.9941L10.1112 17.9941C10.6172 17.9371 11.0002 17.5101 11.0002 17.0001V13.4141L12.8792 11.5351L9.46521 8.12109Z" fill="#81E6D9"/>
                        <Path d="M21.7024 0.92094C20.2174 -0.37706 17.7504 -0.16506 16.3564 1.22994C14.3594 3.22694 10.8794 6.70694 10.8794 6.70694L15.5864 11.4139C15.7814 11.6089 16.0374 11.7069 16.2934 11.7069C16.5494 11.7069 16.8054 11.6089 17.0004 11.4139L21.7764 6.63794C22.4294 5.98494 22.9004 5.14494 22.9974 4.22694C23.1294 2.96194 22.6534 1.75294 21.7024 0.92094Z" fill="#319795"/>
                    </Svg>
                :
                icon === 'proceduresDisabledNew' ?
                    <Svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.46521 8.12109L0.29321 17.2931C-0.00679019 17.5931 -0.0847902 18.0501 0.0992098 18.4331C0.26721 18.7821 0.61921 19.0001 1.00021 19.0001C1.03721 19.0001 1.07421 18.9981 1.11121 18.9941L10.1112 17.9941C10.6172 17.9371 11.0002 17.5101 11.0002 17.0001V13.4141L12.8792 11.5351L9.46521 8.12109Z" fill="#CCD6E0"/>
                        <Path d="M21.7024 0.92094C20.2174 -0.37706 17.7504 -0.16506 16.3564 1.22994C14.3594 3.22694 10.8794 6.70694 10.8794 6.70694L15.5864 11.4139C15.7814 11.6089 16.0374 11.7069 16.2934 11.7069C16.5494 11.7069 16.8054 11.6089 17.0004 11.4139L21.7764 6.63794C22.4294 5.98494 22.9004 5.14494 22.9974 4.22694C23.1294 2.96194 22.6534 1.75294 21.7024 0.92094Z" fill="#A0AEC0"/>
                    </Svg>
                :
                icon === 'medicalTeamSelectedNew' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M21.1667 7.83333H16.1667V2.83333C16.1667 2.33333 15.8333 2 15.3333 2H8.66667C8.16667 2 7.83333 2.33333 7.83333 2.83333V7.83333H2.83333C2.33333 7.83333 2 8.16667 2 8.66667V15.3333C2 15.8333 2.33333 16.1667 2.83333 16.1667H7.83333V21.1667C7.83333 21.6667 8.16667 22 8.66667 22H15.3333C15.8333 22 16.1667 21.6667 16.1667 21.1667V16.1667H21.1667C21.6667 16.1667 22 15.8333 22 15.3333V8.66667C22 8.16667 21.6667 7.83333 21.1667 7.83333Z" fill="#E53E3E"/>
                        <Path d="M16.1666 7.83331H21.1666C21.6666 7.83331 21.9999 8.16665 21.9999 8.66665V15.3333C21.9999 15.8333 21.6666 16.1666 21.1666 16.1666H16.1666V21.1666C16.1666 21.6666 15.8333 22 15.3333 22H8.66659C8.16659 22 7.83325 21.6666 7.83325 21.1666V16.1666L16.1666 7.83331Z" fill="#E53E3E"/>
                    </Svg>
                :
                icon === 'medicalTeamDisabledNew' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M21.1667 7.83333H16.1667V2.83333C16.1667 2.33333 15.8333 2 15.3333 2H8.66667C8.16667 2 7.83333 2.33333 7.83333 2.83333V7.83333H2.83333C2.33333 7.83333 2 8.16667 2 8.66667V15.3333C2 15.8333 2.33333 16.1667 2.83333 16.1667H7.83333V21.1667C7.83333 21.6667 8.16667 22 8.66667 22H15.3333C15.8333 22 16.1667 21.6667 16.1667 21.1667V16.1667H21.1667C21.6667 16.1667 22 15.8333 22 15.3333V8.66667C22 8.16667 21.6667 7.83333 21.1667 7.83333Z" fill="#CBD5E0"/>
                        <Path d="M16.1668 7.83331H21.1668C21.6668 7.83331 22.0002 8.16665 22.0002 8.66665V15.3333C22.0002 15.8333 21.6668 16.1666 21.1668 16.1666H16.1668V21.1666C16.1668 21.6666 15.8335 22 15.3335 22H8.66683C8.16683 22 7.8335 21.6666 7.8335 21.1666V16.1666L16.1668 7.83331Z" fill="#CBD5E0"/>
                    </Svg>
                :
                icon === 'checkbox' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill={fillColor} stroke={strokeColor}/>
                    </Svg>
                :
                icon === 'checkboxTick' ?
                    <Svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.4001 1.99998L8.0001 0.599976L4.0001 4.59998L2.0001 2.59998L0.600098 3.99998L4.0001 7.39998L9.4001 1.99998Z" fill="#48BB78"/>
                    </Svg>
                :
                icon === 'partialCheck' ?
                    <Svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8 2H0V0H8V2Z" fill="#718096"/>
                    </Svg>
                :
                icon === 'dropdown' ?
                <Svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M6.0001 7.40001L0.600098 2.00001L2.0001 0.600006L6.0001 4.60001L10.0001 0.600006L11.4001 2.00001L6.0001 7.40001Z" fill="#718096"/>
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
                icon === 'invoices' ?
                    <Svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V1H9L12 5H23V19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H19" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 8V22" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M15.375 10.219C13.754 9.328 8.648 8.663 8.648 11.732C8.648 15.406 15.132 14.109 15.132 17.351C15.132 20.593 10.918 20.349 8 19.3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
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
                icon === 'listItemActionEdit' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M13 7L9 3" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M5.5 14.5L0.5 15.5L1.5 10.5L11.5 0.5L15.5 4.5L5.5 14.5Z" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'logo' ?
                    <Svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <G filter="url(#filter0_d_15909_306659)">
                        <G clip-path="url(#clip0_15909_306659)">
                            <Rect x="2" y="1" width="48" height="48" rx="24" fill="white"/>
                            <Path d="M1.21582 36.7496H16.8651L20.4534 11.9997L25.7767 34.8053L31.7893 11.9997L35.2258 36.93L51.357 36.93" stroke="#346DB5" stroke-width="3.58878" stroke-miterlimit="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                        </G>
                            <Rect x="2.8972" y="1.8972" width="46.2056" height="46.2056" rx="23.1028" stroke="white" stroke-width="1.79439"/>
                        </G>
                        <Defs>
                        <G filter id="filter0_d_15909_306659" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        </G>
                        <ClipPath id="clip0_15909_306659">
                        <Rect x="2" y="1" width="48" height="48" rx="24" fill="white"/>
                        </ClipPath>
                        </Defs>
                    </Svg>
                
                
                :
                icon === 'more' ?
                    <Svg width="22" height="4" viewBox="0 0 22 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M11 4C12.1046 4 13 3.10457 13 2C13 0.89543 12.1046 0 11 0C9.89543 0 9 0.89543 9 2C9 3.10457 9.89543 4 11 4Z" fill={fillColor}/>
                        <Path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z" fill={fillColor}/>
                        <Path d="M20 4C21.1046 4 22 3.10457 22 2C22 0.89543 21.1046 0 20 0C18.8954 0 18 0.89543 18 2C18 3.10457 18.8954 4 20 4Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'notificationsSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.6364 11V8C19.6364 6.14348 18.8318 4.36301 17.3997 3.05025C15.9676 1.7375 14.0253 1 12 1C9.97471 1 8.03237 1.7375 6.60028 3.05025C5.16818 4.36301 4.36364 6.14348 4.36364 8V11C4.36364 14.3 1.09091 15.1 1.09091 17C1.09091 18.7 5.34546 20 12 20C18.6545 20 22.9091 18.7 22.9091 17C22.9091 15.1 19.6364 14.3 19.6364 11Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M9.74864 22.4498C10.468 22.4831 11.2178 22.5 12 22.5C12.7822 22.5 13.532 22.4831 14.2514 22.4498C14.0867 22.6583 13.8857 22.845 13.653 23.0017C13.1778 23.3216 12.5987 23.497 12 23.497C11.4013 23.497 10.8222 23.3216 10.3471 23.0017C10.1144 22.845 9.91329 22.6583 9.74864 22.4498Z" stroke={strokeColor}/>
                    </Svg>
                :
                icon === 'notifications' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.6364 11V8C19.6364 6.14348 18.8318 4.36301 17.3997 3.05025C15.9676 1.7375 14.0253 1 12 1C9.97471 1 8.03237 1.7375 6.60027 3.05025C5.16818 4.36301 4.36364 6.14348 4.36364 8V11C4.36364 14.3 1.09091 15.1 1.09091 17C1.09091 18.7 5.34545 20 12 20C18.6545 20 22.9091 18.7 22.9091 17C22.9091 15.1 19.6364 14.3 19.6364 11Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M9.74862 22.4498C10.468 22.4831 11.2178 22.5 12 22.5C12.7822 22.5 13.532 22.4831 14.2514 22.4498C14.0867 22.6583 13.8857 22.845 13.653 23.0017C13.1778 23.3216 12.5987 23.497 12 23.497C11.4013 23.497 10.8222 23.3216 10.347 23.0017C10.1143 22.845 9.91327 22.6583 9.74862 22.4498Z" stroke={strokeColor}/>
                    </Svg>
                :
                icon === 'notificationFolder' ?
                    <Svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M4.809 0H0V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H10C10.5304 11 11.0391 10.7893 11.4142 10.4142C11.7893 10.0391 12 9.53043 12 9V2H5.809L4.809 0Z" fill="#90CDF4"/>
                    </Svg>
                :
                icon === 'notificationClose' ?
                    <Svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M10.7071 0.29297C10.5196 0.105499 10.2652 0.000183105 10.0001 0.000183105C9.73492 0.000183105 9.48061 0.105499 9.29308 0.29297L6.00008 3.58597L2.70708 0.29297C2.51848 0.110812 2.26588 0.0100172 2.00368 0.0122956C1.74148 0.014574 1.49067 0.119743 1.30526 0.305151C1.11985 0.490559 1.01469 0.741372 1.01241 1.00357C1.01013 1.26577 1.11092 1.51837 1.29308 1.70697L4.58608 4.99997L1.29308 8.29297C1.19757 8.38522 1.12139 8.49556 1.06898 8.61757C1.01657 8.73957 0.988985 8.87079 0.987831 9.00357C0.986677 9.13635 1.01198 9.26803 1.06226 9.39092C1.11254 9.51382 1.18679 9.62547 1.28069 9.71936C1.37458 9.81326 1.48623 9.88751 1.60913 9.93779C1.73202 9.98807 1.8637 10.0134 1.99648 10.0122C2.12926 10.0111 2.26048 9.98348 2.38249 9.93107C2.50449 9.87866 2.61483 9.80248 2.70708 9.70697L6.00008 6.41397L9.29308 9.70697C9.48168 9.88913 9.73429 9.98992 9.99648 9.98764C10.2587 9.98536 10.5095 9.8802 10.6949 9.69479C10.8803 9.50938 10.9855 9.25857 10.9878 8.99637C10.99 8.73417 10.8892 8.48157 10.7071 8.29297L7.41408 4.99997L10.7071 1.70697C10.8946 1.51944 10.9999 1.26513 10.9999 0.99997C10.9999 0.734805 10.8946 0.480497 10.7071 0.29297Z" fill="white"/>
                    </Svg>
                :
                icon === 'orders' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 1H4V16H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M6 23C7.10457 23 8 22.1046 8 21C8 19.8954 7.10457 19 6 19C4.89543 19 4 19.8954 4 21C4 22.1046 4.89543 23 6 23Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M21 23C22.1046 23 23 22.1046 23 21C23 19.8954 22.1046 19 21 19C19.8954 19 19 19.8954 19 21C19 22.1046 19.8954 23 21 23Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M23 1H8V12H23V1Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M8 5H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'paginationNext' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5 3L11 8.5L5 14" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'paginationPrev' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M10.5 13.5L4.5 8L10.5 2.5" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'patientsSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M18.999 17.8571C20.851 18.4021 22 19.1611 22 20.0001C22 21.6571 17.523 23.0001 12 23.0001C6.477 23.0001 2 21.6571 2 20.0001C2 19.1611 3.149 18.4021 5 17.8581" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M14 20H10V15H8V10C8 8.895 8.895 8 10 8H14C15.105 8 16 8.895 16 10V15H14V20Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 6C10.895 6 10 5.105 10 4C10 2.895 10.895 2 12 2C13.105 2 14 2.895 14 4C14 5.105 13.105 6 12 6Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'patients' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M18.999 17.8571C20.851 18.4021 22 19.1611 22 20.0001C22 21.6571 17.523 23.0001 12 23.0001C6.477 23.0001 2 21.6571 2 20.0001C2 19.1611 3.149 18.4021 5 17.8581" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M14 20H10V15H8V10C8 8.895 8.895 8 10 8H14C15.105 8 16 8.895 16 10V15H14V20Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 6C10.895 6 10 5.105 10 4C10 2.895 10.895 2 12 2C13.105 2 14 2.895 14 4C14 5.105 13.105 6 12 6Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'procedures' ?
                    <Svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 6.98138L2 16.9814L11 15.9814L12 12.9814L15 9.98138" stroke={strokeColor} stroke-miterlimit="10"/>
                        <Path d="M16 10.9814L12 6.98138L17.153 1.82838C18.256 0.725375 20.047 0.722375 21.153 1.82838C22.258 2.93338 22.258 4.72338 21.153 5.82838L16 10.9814Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'quickMenu' ?
                    <Svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 7H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M1 1H23" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M1 13H11" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M1 19H11" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M19 12V20" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M23 16H15" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'doctorArrow' ?
                    <Svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.5 8.5L4.5 8.5C2.291 8.5 0.5 6.709 0.5 4.5L0.500001 0.499999" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M9.5 13.5L14.5 8.5L9.5 3.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'scheduleMonthLeft' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M10.5 0.5L5.5 8L10.5 15.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'scheduleMonthRight' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5.5 0.5L10.5 8L5.5 15.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'scheduleSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15 20L17 22L22 17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10 22H1V4H23V12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M7 1V4" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M17 1V4" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M1 8H23" stroke={strokeColor} stroke-miterlimit="10"/>
                    </Svg>
                :
                icon === 'schedule' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15 20L17 22L22 17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10 22H1V4H23V12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M7 1V4" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M17 1V4" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M1 8H23" stroke={strokeColor} stroke-miterlimit="10"/>
                    </Svg>
                :
                icon === 'searchClose' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M13.5 2.5L2.5 13.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M2.5 2.5L13.5 13.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'searchExit' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M11 5L5 11" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M5 5L11 11" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'exit'?
                    <Svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M7.5 0.5L0.5 7.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M0.5 0.5L7.5 7.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'search' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M15.5 15.4999L11.742 11.7419" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'staffDoctor' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8 16V23H20V17" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M20 17C21.6569 17 23 15.6569 23 14C23 12.3431 21.6569 11 20 11C18.3431 11 17 12.3431 17 14C17 15.6569 18.3431 17 20 17Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M11 2H13.8C14.4 2 14.9 2.5 14.8 3.1L13.2 14.2C13.1 15.2 12.2 15.9 11.2 15.9H4.70001C3.70001 15.9 2.90001 15.2 2.70001 14.2L1.20001 3.1C1.10001 2.5 1.50001 2 2.20001 2H5.00001" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M5 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M11 1V3" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'staffNurse' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M5 12V16C5 19.9 8.1 23 12 23C15.9 23 19 19.9 19 16V12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M19 12H5V4L12 2L19 4V12Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 5V9" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10 7H14" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'staff' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 10V14" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M10 12H14" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M8 6V2H16V6" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M23 6H1V18H23V6Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M22 18V22H2V18" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'storage' ?
                    <Svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 14H4V21H12V14Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M20 14H12V21H20V14Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M16 7H8V14H16V7Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M1 6L12 1L23 6" stroke={strokeColor} stroke-miterlimit="10"/>
                        <Path d="M12 7V9" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M16 14V16" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M8 14V16" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                    </Svg>
                :
                icon === 'rightCorner'?
                <Svg width={12} height={12} viewBox="0 0 12 12" style={{alignSelf:"flex-end"}}>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M12 12V0C12 6.62742 6.62742 12 0 12H12Z" fill= {fillColor}/>
                </Svg>
                :
                icon === 'leftCorner' ?
                    <Svg width="12" height="12" viewBox="0 0 12 12" style={{alignSelf:"flex-end"}}>
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M12 0H0C6.62742 0 12 5.37258 12 12V0Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'tabLeft' ?
                    <Svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M8 8V0C8 4.41828 4.41828 8 0 8H8Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'tabRight' ?
                    <Svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H8C3.58172 8 0 4.41828 0 0V8Z" fill={fillColor}/>
                    </Svg>
                :
                icon === 'theatresSelected' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Rect x="4" y="21.5" width="16" height="2" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                        <Rect x="10" y="17" width="4" height="4.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                        <Path d="M2 17V13H22V17H2Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                        <Path d="M8 5.5C8 4.39543 8.89543 3.5 10 3.5H14C15.1046 3.5 16 4.39543 16 5.5V6.5H8V5.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 3V1" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'theatres' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Rect x="4" y="21.5" width="16" height="2" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                        <Rect x="10" y="17" width="4" height="4.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                        <Path d="M2 17V13H22V17H2Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
                        <Path d="M8 5.5C8 4.39543 8.89543 3.5 10 3.5H14C15.1046 3.5 16 4.39543 16 5.5V6.5H8V5.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="square"/>
                        <Path d="M12 3V1" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'chargeSheetButtonClosed' ?
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.1667 13.3333H0.833333C0.3725 13.3333 0 13.7058 0 14.1666V19.1666C0 19.6275 0.3725 20 0.833333 20H19.1667C19.6275 20 20 19.6275 20 19.1666V14.1666C20 13.7058 19.6275 13.3333 19.1667 13.3333ZM5 17.5H2.5V15.8333H5V17.5ZM17.5 17.5H8.33333V15.8333H17.5V17.5Z" fill="#CCD6E0"/>
                        <Path d="M3.33333 5V11.6667H16.6667V2.91667C16.6667 1.30833 15.3583 0 13.75 0H2.91667C1.30833 0 0 1.30833 0 2.91667V4.16667C0 4.6275 0.3725 5 0.833333 5H3.33333ZM1.66667 2.91667C1.66667 2.2275 2.2275 1.66667 2.91667 1.66667H11.115C10.9342 2.04583 10.8333 2.47 10.8333 2.91667V3.33333H1.66667V2.91667Z" fill="#E3E8EF"/>
                    </Svg>
                :
                icon === 'chargeSheetButtonOpen' ?
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.1667 13.3333H0.833333C0.3725 13.3333 0 13.7058 0 14.1666V19.1666C0 19.6275 0.3725 20 0.833333 20H19.1667C19.6275 20 20 19.6275 20 19.1666V14.1666C20 13.7058 19.6275 13.3333 19.1667 13.3333ZM5 17.5H2.5V15.8333H5V17.5ZM17.5 17.5H8.33333V15.8333H17.5V17.5Z" fill="#3182CE"/>
                        <Path d="M3.33333 5V11.6667H16.6667V2.91667C16.6667 1.30833 15.3583 0 13.75 0H2.91667C1.30833 0 0 1.30833 0 2.91667V4.16667C0 4.6275 0.3725 5 0.833333 5H3.33333ZM1.66667 2.91667C1.66667 2.2275 2.2275 1.66667 2.91667 1.66667H11.115C10.9342 2.04583 10.8333 2.47 10.8333 2.91667V3.33333H1.66667V2.91667Z" fill="#90CDF4"/>
                    </Svg>
                :
                icon === 'procedureButtonClosed'?
                    <Svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.46472 8.12097L0.292722 17.293C-0.00727847 17.593 -0.0852785 18.05 0.0987215 18.433C0.266722 18.782 0.618722 19 0.999722 19C1.03672 19 1.07372 18.998 1.11072 18.994L10.1107 17.994C10.6167 17.937 10.9997 17.51 10.9997 17V13.414L12.8787 11.535L9.46472 8.12097Z" fill="#CCD6E0"/>
                        <Path d="M21.7019 0.921001C20.2169 -0.376999 17.7499 -0.164999 16.3559 1.23C14.3589 3.227 10.8789 6.707 10.8789 6.707L15.5859 11.414C15.7809 11.609 16.0369 11.707 16.2929 11.707C16.5489 11.707 16.8049 11.609 16.9999 11.414L21.7759 6.638C22.4289 5.985 22.8999 5.145 22.9969 4.227C23.1289 2.962 22.6529 1.753 21.7019 0.921001Z" fill="#A0AEC0"/>
                    </Svg>          
                :
                icon === 'procedureButtonOpen'?
                    <Svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9.46472 8.12097L0.292722 17.293C-0.00727847 17.593 -0.0852785 18.05 0.0987215 18.433C0.266722 18.782 0.618722 19 0.999722 19C1.03672 19 1.07372 18.998 1.11072 18.994L10.1107 17.994C10.6167 17.937 10.9997 17.51 10.9997 17V13.414L12.8787 11.535L9.46472 8.12097Z" fill="#81E6D9"/>
                        <Path d="M21.7019 0.921001C20.2169 -0.376999 17.7499 -0.164999 16.3559 1.23C14.3589 3.227 10.8789 6.707 10.8789 6.707L15.5859 11.414C15.7809 11.609 16.0369 11.707 16.2929 11.707C16.5489 11.707 16.8049 11.609 16.9999 11.414L21.7759 6.638C22.4289 5.985 22.8999 5.145 22.9969 4.227C23.1289 2.962 22.6529 1.753 21.7019 0.921001Z" fill="#319795"/>
                    </Svg>      
                :
                icon === 'medicalHistoryButtonClosed' ?
                    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M20 14H2V5H0V19C0 19.7956 0.31607 20.5587 0.87868 21.1213C1.44129 21.6839 2.20435 22 3 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5H20V14Z" fill="#CCD6E0"/>
                        <Path d="M5 2H17V13H19V1C19 0.734784 18.8946 0.48043 18.7071 0.292893C18.5196 0.105357 18.2652 0 18 0H4C3.73478 0 3.48043 0.105357 3.29289 0.292893C3.10536 0.48043 3 0.734784 3 1V13H5V2Z" fill="#E3E8EF"/>
                        <Path d="M15 5H7V7H15V5Z" fill="#E3E8EF"/>
                        <Path d="M15 9H7V11H15V9Z" fill="#E3E8EF"/>
                    </Svg>
                :
                icon === 'medicalHistoryButtonOpen' ?
                    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M20 14H2V5H0V19C0 19.7956 0.31607 20.5587 0.87868 21.1213C1.44129 21.6839 2.20435 22 3 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V5H20V14Z" fill="#5A67D8"/>
                        <Path d="M5 2H17V13H19V1C19 0.734784 18.8946 0.48043 18.7071 0.292893C18.5196 0.105357 18.2652 0 18 0H4C3.73478 0 3.48043 0.105357 3.29289 0.292893C3.10536 0.48043 3 0.734784 3 1V13H5V2Z" fill="#A3BFFA"/>
                        <Path d="M15 5H7V7H15V5Z" fill="#A3BFFA"/>
                        <Path d="M15 9H7V11H15V9Z" fill="#A3BFFA"/>
                    </Svg>
                :
                icon === 'medicalStaffButtonClosed' ?
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.1667 5.83333H14.1667V0.833333C14.1667 0.333333 13.8333 0 13.3333 0H6.66667C6.16667 0 5.83333 0.333333 5.83333 0.833333V5.83333H0.833333C0.333333 5.83333 0 6.16667 0 6.66667V13.3333C0 13.8333 0.333333 14.1667 0.833333 14.1667H5.83333V19.1667C5.83333 19.6667 6.16667 20 6.66667 20H13.3333C13.8333 20 14.1667 19.6667 14.1667 19.1667V14.1667H19.1667C19.6667 14.1667 20 13.8333 20 13.3333V6.66667C20 6.16667 19.6667 5.83333 19.1667 5.83333Z" fill="#CBD5E0"/>
                    </Svg>
                :
                icon === 'medicalStaffButtonOpen' ?
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19.1667 5.83333H14.1667V0.833333C14.1667 0.333333 13.8333 0 13.3333 0H6.66667C6.16667 0 5.83333 0.333333 5.83333 0.833333V5.83333H0.833333C0.333333 5.83333 0 6.16667 0 6.66667V13.3333C0 13.8333 0.333333 14.1667 0.833333 14.1667H5.83333V19.1667C5.83333 19.6667 6.16667 20 6.66667 20H13.3333C13.8333 20 14.1667 19.6667 14.1667 19.1667V14.1667H19.1667C19.6667 14.1667 20 13.8333 20 13.3333V6.66667C20 6.16667 19.6667 5.83333 19.1667 5.83333Z" fill="#E53E3E"/>
                    </Svg>
                :
                icon === 'patientButtonClosed' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 6C10.343 6 9 4.657 9 3C9 1.343 10.343 0 12 0C13.657 0 15 1.343 15 3C15 4.657 13.657 6 12 6Z" fill="#CBD5E0"/>
                        <Path d="M14 21H10C9.448 21 9 20.552 9 20V15H7V9C7 7.895 7.895 7 9 7H15C16.105 7 17 7.895 17 9V15H15V20C15 20.552 14.552 21 14 21Z" fill="#CBD5E0"/>
                        <Path d="M17 17.271V19.29C19.738 19.617 21.284 20.152 21.837 20.507C20.935 21.099 17.573 22 12 22C6.427 22 3.065 21.099 2.163 20.507C2.716 20.152 4.262 19.617 7 19.29V17.271C3.657 17.633 0 18.489 0 20.505C0 23.832 9.996 24 12 24C14.004 24 24 23.832 24 20.505C24 18.489 20.343 17.633 17 17.271Z" fill="#E2E8F0"/>
                    </Svg>
                :
                icon === 'patientButtonOpen' ?
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12 6C10.343 6 9 4.657 9 3C9 1.343 10.343 0 12 0C13.657 0 15 1.343 15 3C15 4.657 13.657 6 12 6Z" fill="#0CB0E7"/>
                        <Path d="M14 21H10C9.448 21 9 20.552 9 20V15H7V9C7 7.895 7.895 7 9 7H15C16.105 7 17 7.895 17 9V15H15V20C15 20.552 14.552 21 14 21Z" fill="#0CB0E7"/>
                        <Path d="M17 17.271V19.29C19.738 19.617 21.284 20.152 21.837 20.507C20.935 21.099 17.573 22 12 22C6.427 22 3.065 21.099 2.163 20.507C2.716 20.152 4.262 19.617 7 19.29V17.271C3.657 17.633 0 18.489 0 20.505C0 23.832 9.996 24 12 24C14.004 24 24 23.832 24 20.505C24 18.489 20.343 17.633 17 17.271Z" fill="#64D8FF"/>
                    </Svg>
                :
                icon === 'archiveItem' ?
                    <Svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2.5 0.5H13.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M11.5 6.5V8.5H4.5V6.5" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M15.5 3.5H0.5V14.5H15.5V3.5Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'newItem' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M8 4V12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M4 8H12" stroke={strokeColor} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'signsAndSymptoms' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15.207 8.79301L9.707 3.29301C9.316 2.90201 8.684 2.90201 8.293 3.29301L1.293 10.293C1.165 10.421 1.074 10.582 1.03 10.757L0.0299995 14.757C-0.0550005 15.098 0.0449995 15.458 0.293 15.707C0.483 15.897 0.737999 16 0.999999 16C1.081 16 1.162 15.99 1.243 15.97L5.243 14.97C5.419 14.926 5.579 14.835 5.707 14.707L12 8.41401L13.086 9.50001L9.793 12.793C9.402 13.184 9.402 13.816 9.793 14.207C10.184 14.598 10.816 14.598 11.207 14.207L15.207 10.207C15.598 9.81601 15.598 9.18401 15.207 8.79301Z" fill="#4299E1"/>
                        <Path d="M11.1211 1.879L14.1211 4.879L15.3791 3.621C16.2071 2.793 16.2071 1.449 15.3791 0.621C14.5511 -0.207 13.2071 -0.207 12.3791 0.621L11.1211 1.879Z" fill="#4299E1"/>
                    </Svg>
                :
                icon === 'examinations' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15.707 13.293L13 10.586C13.63 9.536 14 8.311 14 7C14 3.14 10.859 0 7 0C3.141 0 0 3.14 0 7C0 10.86 3.141 14 7 14C8.312 14 9.536 13.631 10.586 13L13.293 15.707C13.488 15.902 13.744 16 14 16C14.256 16 14.512 15.902 14.707 15.707L15.707 14.707C16.098 14.316 16.098 13.684 15.707 13.293ZM7 12C4.239 12 2 9.761 2 7C2 4.239 4.239 2 7 2C9.761 2 12 4.239 12 7C12 9.761 9.761 12 7 12Z" fill="#38B2AC"/>
                    </Svg>                
                :
                icon === 'laboratoryInvestigations' ?
                    <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14 14H0V16H14V14Z" fill="#38B2AC"/>
                        <Path d="M14 13H6V16H14V13Z" fill="#38B2AC"/>
                        <Path d="M4.54379 12.1163C4.54379 10.8637 3.52447 9.84438 2.27189 9.84438H1.5146C1.5146 8.17529 2.2772 6.64933 3.57672 5.64894L6.49383 9.73684C6.73162 10.0701 7.20191 10.1602 7.55026 9.91329L10.016 8.15409C10.3561 7.91099 10.4356 7.43844 10.1925 7.0969L5.3541 0.316807C5.11176 -0.0224627 4.63845 -0.101979 4.29842 0.140356L1.8319 1.89956C1.49188 2.1419 1.41236 2.61596 1.65545 2.95599L2.69901 4.41909C1.00039 5.70347 0 7.67926 0 9.84438V10.6017V15.1455H4.54379V12.1163Z" fill="#38B2AC"/>
                    </Svg>
                :
                icon === 'diagnosticEvaluations' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M2 2H5V0H1C0.447 0 0 0.447 0 1V5H2V2Z" fill="#5A67D8"/>
                        <Path d="M15 0H11V2H14V5H16V1C16 0.447 15.553 0 15 0Z" fill="#5A67D8"/>
                        <Path d="M14 14H11V16H15C15.553 16 16 15.553 16 15V11H14V14Z" fill="#5A67D8"/>
                        <Path d="M2 11H0V15C0 15.553 0.447 16 1 16H5V14H2V11Z" fill="#5A67D8"/>
                        <Path d="M4 10V12H12V10C12 10 11 8 8 8C5 8 4 10 4 10Z" fill="#5A67D8"/>
                        <Path d="M8 7C9.10457 7 10 6.10457 10 5C10 3.89543 9.10457 3 8 3C6.89543 3 6 3.89543 6 5C6 6.10457 6.89543 7 8 7Z" fill="#5A67D8"/>
                    </Svg>
                :
                icon === 'provisionalDiagnosis' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15 1H12V3H14V14H2V3H4V1H1C0.4 1 0 1.4 0 2V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V2C16 1.4 15.6 1 15 1Z" fill="#ED8936"/>
                        <Path d="M11 0H5V4H11V0Z" fill="#ED8936"/>
                        <Path d="M11 8H9V6H7V8H5V10H7V12H9V10H11V8Z" fill="#ED8936"/>
                    </Svg>
                :
                icon === 'finalDiagnosis' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M6.3 11.7L4.3 9.7C3.9 9.3 3.9 8.7 4.3 8.3C4.7 7.9 5.3 7.9 5.7 8.3L7 9.6L10.3 6.3C10.7 5.9 11.3 5.9 11.7 6.3C12.1 6.7 12.1 7.3 11.7 7.7L7.7 11.7C7.3 12.1 6.8 12.2 6.3 11.7Z" fill="#48BB78"/>
                        <Path d="M15 1H12V3H14V14H2V3H4V1H1C0.4 1 0 1.4 0 2V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V2C16 1.4 15.6 1 15 1Z" fill="#48BB78"/>
                        <Path d="M11 0H5V4H11V0Z" fill="#48BB78"/>
                    </Svg>
                :
                icon === 'medicationPrescribed' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.4 1.5999C12.3 -0.500098 8.90002 -0.500098 6.80002 1.5999L1.60002 6.7999C-0.499976 8.8999 -0.499976 12.2999 1.60002 14.3999C3.70002 16.4999 7.10002 16.4999 9.20002 14.3999L14.4 9.1999C16.5 7.0999 16.5 3.6999 14.4 1.5999ZM7.80002 12.9999C6.50002 14.2999 4.30002 14.2999 3.00002 12.9999C1.70002 11.6999 1.70002 9.4999 3.00002 8.1999L4.90002 6.2999L9.70002 11.0999C9.70002 11.0999 9.10002 11.6999 7.80002 12.9999ZM13 7.7999L11.1 9.6999L6.30002 4.8999L8.20002 2.9999C8.90002 2.2999 9.70003 1.9999 10.6 1.9999C11.5 1.9999 12.3 2.2999 13 2.9999C14.3 4.2999 14.3 6.4999 13 7.7999Z" fill="#F56565"/>
                    </Svg>
                :
                icon === 'implantedDevices' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16 6V4H14V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H12V0H10V2H6V0H4V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V4H0V6H2V10H0V12H2V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H4V16H6V14H10V16H12V14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V12H16V10H14V6H16ZM12 12H4V4H12V12Z" fill="#3182CE"/>
                        <Path d="M10 6H6V10H10V6Z" fill="#3182CE"/>
                    </Svg>
                :
                icon === 'bmiIndicator' ?
                    <Svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <G clip-Path="url(#clip0)">
                            <Path d="M12.3335 2.00006H1.33354C1.24248 2.0001 1.15315 2.025 1.07521 2.07209C0.997266 2.11917 0.93366 2.18665 0.891257 2.26723C0.848854 2.34782 0.829263 2.43846 0.8346 2.52936C0.839936 2.62027 0.869997 2.70799 0.921538 2.78306L6.42154 10.7831C6.46749 10.8499 6.529 10.9045 6.60078 10.9423C6.67256 10.98 6.75244 10.9998 6.83354 10.9998C6.91464 10.9998 6.99452 10.98 7.0663 10.9423C7.13807 10.9045 7.19959 10.8499 7.24554 10.7831L12.7455 2.78306C12.7971 2.70799 12.8271 2.62027 12.8325 2.52936C12.8378 2.43846 12.8182 2.34782 12.7758 2.26723C12.7334 2.18665 12.6698 2.11917 12.5919 2.07209C12.5139 2.025 12.4246 2.0001 12.3335 2.00006Z" fill="#104587"/>
                        </G>
                        <Defs>
                            <ClipPath id="clip0">
                                <Rect x="0.833496" y="6.10352e-05" width="12" height="12" fill="white"/>
                            </ClipPath>
                        </Defs>
                    </Svg>
                :
                icon === 'riskLevel' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M9 6H7V10H9V6Z" fill={fillColor}/>
                        <Path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill={fillColor}/>
                        <Path d="M15 16H1.00002C0.653016 16 0.332016 15.82 0.149016 15.525C-0.0339842 15.23 -0.0499843 14.862 0.105016 14.552L7.10502 0.551957C7.44502 -0.126043 8.55402 -0.126043 8.89402 0.551957L15.894 14.552C16.049 14.862 16.033 15.23 15.85 15.525C15.667 15.82 15.347 16 15 16ZM2.61802 14H13.382L8.00002 3.23596L2.61802 14Z" fill={fillColor}/>
                    </Svg>
                :   
                icon === 'medicalStaff' ?
                    <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M11.311 9.52706C10.15 9.13406 9.461 8.70206 9.168 8.35206C10.268 7.63906 11 6.40606 11 5.00006V4.00006C11 1.79406 9.206 6.10352e-05 7 6.10352e-05C4.794 6.10352e-05 3 1.79406 3 4.00006V5.00006C3 6.40606 3.732 7.63906 4.832 8.35206C4.54 8.70206 3.851 9.13406 2.69 9.52706C1.081 10.0701 0 11.5701 0 13.2601V16.0001H14V13.2601C14 11.5701 12.919 10.0701 11.311 9.52706ZM5 4.00006C5 2.89706 5.897 2.00006 7 2.00006C8.103 2.00006 9 2.89706 9 4.00006V5.00006C9 6.10306 8.103 7.00006 7 7.00006C5.897 7.00006 5 6.10306 5 5.00006V4.00006ZM12 14.0001H2V13.2601C2 12.4291 2.534 11.6911 3.33 11.4221C5.175 10.7981 6.33 9.98606 6.782 9.00006H7.218C7.67 9.98606 8.825 10.7981 10.671 11.4221C11.466 11.6901 12 12.4291 12 13.2601V14.0001Z" fill={fillColor}/>
                    </Svg>                
                :
                icon === 'allergies' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16 8.00006C16 7.06445 14.4655 6.2688 12.9283 5.95868C13.796 4.65247 14.3184 3.00476 13.6569 2.3432C12.9953 1.68158 11.3476 2.20404 10.0414 3.07172C9.73126 1.53454 8.93561 6.10352e-05 8 6.10352e-05C7.06439 6.10352e-05 6.26874 1.53454 5.95862 3.07172C4.6524 2.20404 3.0047 1.68158 2.34314 2.3432C1.68158 3.00476 2.20404 4.65246 3.07172 5.95868C1.53448 6.2688 0 7.06445 0 8.00006C0 8.93561 1.53448 9.73132 3.07166 10.0414C2.20398 11.3477 1.68158 12.9954 2.34314 13.6569C3.0047 14.3184 4.65241 13.796 5.95862 12.9283C6.26874 14.4656 7.06439 16.0001 8 16.0001C8.93561 16.0001 9.73126 14.4656 10.0414 12.9283C11.3476 13.796 12.9953 14.3184 13.6569 13.6569C14.3184 12.9954 13.796 11.3477 12.9283 10.0414C14.4655 9.73132 16 8.93561 16 8.00006ZM8 10.0001C6.89545 10.0001 6 9.10461 6 8.00006C6 6.89545 6.89545 6.00006 8 6.00006C9.10455 6.00006 10 6.89545 10 8.00006C10 9.10461 9.10455 10.0001 8 10.0001Z" fill="#9F7AEA"/>
                    </Svg>
                :       
                icon === 'preExistingConditions' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M15 1.00006H12V3.00006H14V14.0001H2V3.00006H4V1.00006H1C0.4 1.00006 0 1.40006 0 2.00006V15.0001C0 15.6001 0.4 16.0001 1 16.0001H15C15.6 16.0001 16 15.6001 16 15.0001V2.00006C16 1.40006 15.6 1.00006 15 1.00006Z" fill="#ED8936"/>
                        <Path d="M11 6.10352e-05H5V4.00006H11V6.10352e-05Z" fill="#ED8936"/>
                        <Path d="M11 8.00006H9V6.00006H7V8.00006H5V10.0001H7V12.0001H9V10.0001H11V8.00006Z" fill="#ED8936"/>
                    </Svg>
                :         
                icon === 'immunisations' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12.8 5.10002L13.8 4.10002L14.3 4.60002C14.7 5.00002 15.3 5.00002 15.7 4.60002C16.1 4.20002 16.1 3.60002 15.7 3.20002L12.8 0.300024C12.4 -0.0999756 11.8 -0.0999756 11.4 0.300024C11 0.700024 11 1.30002 11.4 1.70002L11.9 2.20002L10.9 3.20002L7.9 0.200024C7.5 -0.199976 6.9 -0.199976 6.5 0.200024C6.1 0.600024 6.1 1.20002 6.5 1.60002L8.2 3.30002L2.2 9.50002C1.8 9.90002 1.8 10.5 2.2 10.9L3 11.6L0.3 14.3C-0.1 14.7 -0.1 15.3 0.3 15.7C0.7 16.1 1.3 16.1 1.7 15.7L4.4 13L5.1 13.7C5.5 14.1 6.1 14.1 6.5 13.7L12.6 7.60002L14.3 9.30002C14.7 9.70002 15.3 9.70002 15.7 9.30002C16.1 8.90003 16.1 8.30002 15.7 7.90002L12.8 5.10002Z" fill="#667EEA"/>
                    </Svg>                
                :
                icon === 'medications' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M14.3999 1.60002C12.2999 -0.499976 8.8999 -0.499976 6.7999 1.60002L1.5999 6.80002C-0.500098 8.90002 -0.500098 12.3 1.5999 14.4C3.6999 16.5 7.0999 16.5 9.1999 14.4L14.3999 9.20002C16.4999 7.10002 16.4999 3.70002 14.3999 1.60002ZM7.7999 13C6.4999 14.3 4.2999 14.3 2.9999 13C1.6999 11.7 1.6999 9.50002 2.9999 8.20002L4.8999 6.30002L9.6999 11.1C9.6999 11.1 9.0999 11.7 7.7999 13ZM12.9999 7.80002L11.0999 9.70002L6.2999 4.90002L8.1999 3.00002C8.8999 2.30002 9.6999 2.00002 10.5999 2.00002C11.4999 2.00002 12.2999 2.30002 12.9999 3.00002C14.2999 4.30002 14.2999 6.50002 12.9999 7.80002Z" fill="#F56565"/>
                    </Svg>                
                :
                icon === 'overlayProcedures' ?
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M11.4002 8.99997L6.7002 5.89997L10.0002 1.19997C10.9002 -3.39746e-05 12.6002 -0.400034 13.9002 0.499966C15.2002 1.39997 15.6002 3.19997 14.7002 4.49997L11.4002 8.99997Z" fill="#718096"/>
                        <Path d="M8.5 9.5L5.6 7.5L0 15.4L8 13L7.5 11L8.5 9.5Z" fill="#718096"/>
                    </Svg>                
                :
                icon === 'familyPreExistingConditions' ?
                    <Svg width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <Path d="M14.8642 10.2159L12.3072 9.57695C12.2153 9.55391 12.1317 9.5052 12.0664 9.4365C12.0011 9.36781 11.9566 9.28195 11.9382 9.18895L11.7472 8.22594C12.2698 7.98713 12.7128 7.60328 13.0235 7.12004C13.3343 6.6368 13.4997 6.07448 13.5002 5.49995V4.12595C13.5123 3.33039 13.2165 2.56093 12.6746 1.97838C12.1327 1.39583 11.3866 1.04526 10.5922 0.999945C10.0719 0.984694 9.55652 1.1051 9.09681 1.34934C8.63709 1.59357 8.24884 1.95322 7.97021 2.39295C8.62935 3.15223 8.99475 4.12249 9.00022 5.12794C8.94073 5.98726 9.14444 6.8443 9.58421 7.58495C9.69143 7.75669 9.76277 7.94835 9.79393 8.1484C9.82509 8.34845 9.81544 8.55273 9.76554 8.74895C9.71565 8.94516 9.62655 9.12925 9.50361 9.29011C9.38067 9.45097 9.22644 9.58528 9.05022 9.68495L9.18722 9.72495C9.70907 9.87579 10.1679 10.1919 10.4948 10.6257C10.8217 11.0595 10.9991 11.5877 11.0002 12.1309V14.4999C10.9986 14.6707 10.9674 14.8398 10.9082 14.9999H15.5002C15.6328 14.9999 15.76 14.9473 15.8538 14.8535C15.9475 14.7597 16.0002 14.6326 16.0002 14.4999V11.6709C16.0002 11.3365 15.8884 11.0116 15.6825 10.748C15.4767 10.4844 15.1887 10.2971 14.8642 10.2159Z" fill="#ED8936"/>
                        <Path d="M8.912 10.6889L6.755 10.0729C6.67639 10.0505 6.60447 10.0092 6.54554 9.9525C6.48661 9.89584 6.44248 9.8256 6.417 9.74792L6.247 9.22592C7.0346 9.27791 7.8232 9.14076 8.547 8.82592C8.60858 8.79401 8.66284 8.74964 8.70634 8.69562C8.74985 8.64161 8.78164 8.57914 8.79969 8.51217C8.81775 8.44521 8.82168 8.37523 8.81123 8.30666C8.80078 8.2381 8.77618 8.17246 8.739 8.11392C8.19967 7.21596 7.94223 6.17681 8 5.13092C8.01158 4.33951 7.71932 3.57378 7.18339 2.99134C6.64746 2.40891 5.90864 2.05409 5.119 1.99992C4.71514 1.98389 4.3122 2.04963 3.93437 2.1932C3.55655 2.33677 3.21163 2.5552 2.92033 2.83539C2.62902 3.11558 2.39734 3.45175 2.23919 3.8237C2.08104 4.19566 1.99968 4.59574 2 4.99992C2.07676 6.08891 1.82003 7.17545 1.264 8.11492C1.22702 8.17349 1.20262 8.2391 1.19233 8.3076C1.18204 8.3761 1.1861 8.44599 1.20425 8.51283C1.22239 8.57968 1.25423 8.64203 1.29774 8.69592C1.34125 8.74982 1.39548 8.79409 1.457 8.82592C2.1808 9.14076 2.96941 9.27791 3.757 9.22592L3.587 9.74792C3.56152 9.8256 3.51739 9.89584 3.45846 9.9525C3.39953 10.0092 3.32761 10.0505 3.249 10.0729L1.092 10.6889C0.777864 10.7777 0.501269 10.9666 0.304192 11.2268C0.107115 11.487 0.000314708 11.8045 0 12.1309L0 14.4999C0 14.6325 0.0526784 14.7597 0.146447 14.8535C0.240215 14.9472 0.367392 14.9999 0.5 14.9999H9.5C9.63261 14.9999 9.75979 14.9472 9.85355 14.8535C9.94732 14.7597 10 14.6325 10 14.4999V12.1309C9.99993 11.805 9.89371 11.488 9.6974 11.2278C9.5011 10.9676 9.22539 10.7784 8.912 10.6889Z" fill="#ED8936"/>
                    </Svg>
                :
                icon === 'drugUse' ?
                    <Svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M13.3002 12.7L9.0002 7.6V4H10.0002C10.6002 4 11.0002 3.6 11.0002 3V1C11.0002 0.4 10.6002 0 10.0002 0H4.0002C3.4002 0 3.0002 0.4 3.0002 1V3C3.0002 3.6 3.4002 4 4.0002 4H5.0002V7.6L0.700195 12.7C0.200195 13.3 0.100195 14.1 0.400195 14.8C0.700195 15.5 1.4002 16 2.2002 16H11.9002C12.7002 16 13.4002 15.6 13.7002 14.8C14.0002 14.1 13.9002 13.3 13.3002 12.7Z" fill="#9F7AEA"/>
                    </Svg>                
                :
                icon === 'alcoholUse'?
                    <Svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M7 0H3V2H7V0Z" fill="#F56565"/>
                        <Path d="M7 7V4H3V7C1.3 7 0 8.3 0 10V15C0 15.6 0.4 16 1 16H9C9.6 16 10 15.6 10 15V10C10 8.3 8.7 7 7 7Z" fill="#F56565"/>
                    </Svg>
                :
                icon === 'tobaccoUse' ?
                    <Svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M8 8V14C10.1217 14 12.1566 13.1571 13.6569 11.6569C15.1571 10.1566 16 8.12173 16 6V0C13.8783 0 11.8434 0.842855 10.3431 2.34315C8.84285 3.84344 8 5.87827 8 8Z" fill="#718096"/>
                        <Path d="M0 5V8C0 9.5913 0.632141 11.1174 1.75736 12.2426C2.88258 13.3679 4.4087 14 6 14V11C6 9.4087 5.36786 7.88258 4.24264 6.75736C3.11742 5.63214 1.5913 5 0 5H0Z" fill="#718096"/>
                    </Svg>                
                :
                icon === 'hideProcedure' ?
                    <Svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 1H7" stroke="#3182CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                :
                icon === 'showProcedure' ?
                    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M6 3V9" stroke="#3182CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M3 6H9" stroke="#3182CE" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
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
