import React from 'react';
import styled from 'styled-components';
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";

interface Props{
    isChecked: boolean;
    onCheck: () => void;
}

function CheckIconButton({isChecked, onCheck} : Props) {
    return (
        <CheckIconButtonStyle onClick={onCheck}>
            {
                isChecked ? (<FaRegCircleCheck />)
                : <FaRegCircle />
            }
            
        </CheckIconButtonStyle>
    );
}

const CheckIconButtonStyle = styled.button``;

export default CheckIconButton;