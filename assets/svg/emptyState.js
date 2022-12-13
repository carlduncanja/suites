
import React from 'react';
import Svg, { Path, G, Rect, Circle } from "react-native-svg";
import { View } from "react-native";

const EmptyState = ({ strokeColor }) => (<View>
    <Svg width="342" height="232" viewBox="0 0 342 232" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx="172.524" cy="116" r="113.024" stroke="#D3D9DE" stroke-width="5" />
        <G filter="url(#filter0_d_15426_291598)">
            <Rect x="8" y="58.2378" width="180.408" height="50.6408" rx="6.3301" fill="white" shape-rendering="crispEdges" />
            <Rect x="26.9903" y="77.228" width="142.427" height="12.6602" fill="#A6CEF2" />
            <Rect x="8.5" y="58.7378" width="179.408" height="49.6408" rx="5.8301" stroke="#EDF0F2" shape-rendering="crispEdges" />
        </G>
        <Rect opacity="0.5" x="87.1262" y="146.859" width="53.0146" height="12.6602" rx="1.58252" fill="#A6CEF2" />
        <Rect opacity="0.5" x="216.893" y="77.228" width="53.0146" height="12.6602" rx="1.58252" fill="#A6CEF2" />
        <G filter="url(#filter1_d_15426_291598)">
            <Rect x="153.592" y="127.869" width="180.408" height="50.6408" rx="6.3301" fill="white" shape-rendering="crispEdges" />
            <Rect x="172.582" y="146.859" width="142.427" height="12.6602" fill="#A6CEF2" />
            <Rect x="154.092" y="128.369" width="179.408" height="49.6408" rx="5.8301" stroke="#EDF0F2" shape-rendering="crispEdges" />
        </G>
    </Svg>
</View>
);

EmptyState.propTypes = {};
EmptyState.defaultProps = {};

export default EmptyState;
