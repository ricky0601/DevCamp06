import styled from "styled-components";
import { FaSpinner } from "react-icons/fa6";

function Loading(){
    return(
        <LoadingStyle>
            <FaSpinner />
        </LoadingStyle>
    )
}

const LoadingStyle = styled.div`
    padding: 40px;
    text-align: center;

    @keyframes rotate{
        100%{
            transform: rotate(360deg);
        }
    }

    svg{
        width: 70px;
        height: 70px;
        fill: #ccc;
        animation: rotate 1.4s ease-in-out infinite;
    }
`;

export default Loading;