import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

import ReportHeader from "../../../components/CaseFiles/Reports/ReportHeader";
import Logo from "../../../../assets/svg/logo";
import moment from "moment";
import SchedulesList from "../../../components/Schedule/SchedulesList";


const Rectangle = () => (
    <View
        style={{
            height: 1,
            backgroundColor: '#CCD6E0',
            marginBottom: 28,
            marginTop: 20
        }}
    />
);

/**
 * Print view for showing all appointments over a period.
 * @param appointments {array} : list of appointments.
 * @param startDate {Date} - Starting date range for period.
 * @param endDate {Date} - Ending date range for period.
 * @return {JSX.Element}
 * @constructor
 */
const PrintScheduleDayView = ({
                                  appointments,
                                  startDate = Date.now(),
                                  endDate = Date.now()
                              }) => {
    const theme = useTheme();

    const formattedStartDate = moment(startDate).format("DD/MM/YYYY")
    const formattedEndDate = moment(startDate).format("DD/MM/YYYY")

    return (
        <Wrapper>
            <Container theme={theme}>

                <ReportHeaderWrapper>
                    <HeaderContainer>
                        <LogoContainer theme={theme}>
                            <Logo height="50" width="50"/>
                        </LogoContainer>

                        <InformationContainer>

                            <InformationContentContainer align={'flex-start'}>
                            </InformationContentContainer>

                            <InformationContentContainer align="flex-end">
                                <InformationText>Schedule for the period:</InformationText>
                                <InformationText> {formattedStartDate} - {formattedEndDate} </InformationText>
                            </InformationContentContainer>

                        </InformationContainer>
                    </HeaderContainer>
                </ReportHeaderWrapper>

                <ContentWrapper theme={theme}>
                    <ContentContainer>

                        <ScheduleListWrapper>
                            <SchedulesList
                                showBorder={false}
                            />
                        </ScheduleListWrapper>

                    </ContentContainer>
                </ContentWrapper>

            </Container>
        </Wrapper>
    );
};

export default PrintScheduleDayView;


const ScheduleListWrapper = styled.View`
  flex: 1;
`

const InformationContainer = styled.View`
  flex: 1;
  height: 100%;
  justify-content: space-between;
  flex-direction: row;
  margin-left: 60px;
`;

const InformationContentContainer = styled.View`
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: ${({align}) => align};
`;

const InformationText = styled.Text(({theme}) => ({
    ...theme.font['--text-lg-regular'],
    color: theme.colors['--default-shade-white']
}));


const ReportHeaderWrapper = styled.View`
  width: 100%;
  height: 148px;
  padding: ${({theme}) => theme.space['--space-32']};
  background-color: ${({theme}) => theme.colors['--company']};
`;

const HeaderContainer = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.View`
  margin: 0;
  flex: 1;
`;

const Container = styled.ScrollView`
  height: 100%;
  width: 100%;
  background-color: ${({theme}) => theme.colors['--default-shade-white']};
`;

const ContentWrapper = styled.ScrollView`
  flex: 1;
  padding: ${({theme}) => `${theme.space['--space-30']} ${theme.space['--space-32']}`};
`;

const ContentContainer = styled.View`
  height: 100%;
  width: 100%;
`;

const ItemRow = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0px ${({theme}) => theme.space['--space-16']};
  height: 48px;
  align-items: center;
`;

const LogoContainer = styled.View`
  height: 56px;
  width: 56px;
  background-color: ${({theme}) => theme.colors['--default-shade-white']};
  border-radius: 28px;
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
    textContainer: {flex: 1},
    text: {
        color: '#4E5664',
        fontSize: 16
    }
});
