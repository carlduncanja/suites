import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RoundedPaginator from '../Paginators/RoundedPaginator';
import SelectedMenuIconTab from '../../CaseFiles/SelectedMenuIconTab';
import FloatingActionButton from '../FloatingAction/FloatingActionButton';

export default class PaginationMenuBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginRight: 10}}>
                    <RoundedPaginator
                        currentPage={this.props.menuCurrentPage}
                        totalPages={this.props.menuTotalPages}
                    />
                </View>
                <FloatingActionButton
                    fillColor={this.props.fillColor}
                    backgroundColor={this.props.backgroundColor}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

});
