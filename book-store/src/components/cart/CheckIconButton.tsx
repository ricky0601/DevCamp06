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

const CheckIconButtonStyle = styled.button`
    background: none;
    border: 0;
    cursor: pointer;

    svg{
        width: 24px;
        height: 24px;
        color: ${({theme}) => theme.color.primary};
    }
`;

export default CheckIconButton;