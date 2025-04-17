import { styled } from "styled-components";

function Header() {
    return(
        <HeaderStyle>
            <h1>Book Store</h1>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
    background-color : #333;
    h1{
        color: white;
    }
`;

export default Header;