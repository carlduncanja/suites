import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/native';

const Wrapper = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    z-index: ${({zIndex}) => zIndex};
    margin-right: 8px;
`


function InputWrapper({zIndex, ...props}) {
    return (
        <Wrapper zIndex={zIndex}>
            {props.children}
        </Wrapper>
    );
}

InputWrapper.propTypes = {};
InputWrapper.defaultProps = {};

export default InputWrapper;
