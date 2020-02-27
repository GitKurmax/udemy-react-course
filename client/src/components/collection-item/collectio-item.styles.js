import styled, {css} from 'styled-components';
import CustomButton from '../custom-button/custom-button';

const backgroundImageUrl = props => {
    return `background-image: url(${props.url})`
}

export const StyledButton = styled(CustomButton)`
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;

    @media screen and (max-width: 800px) {
        display: block;
        position: static;
        width: 80%;
        height: 40px;
        line-height: 40px;
    }
`

export const BackgroundImageElem = styled.div`
    width: 100%;
    height: 95%;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;

    @media screen and (max-width: 800px) {
        margin-bottom: 10px;
    }
    ${backgroundImageUrl} 
` 

export const CollectionItemElem = styled.div`
    width: ${props => props.width || "22%"};
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;

    &:hover ${BackgroundImageElem} {
          opacity: 0.8;
        }
    &:hover ${StyledButton} {
        opacity: 0.85;
        display: flex;
    }

    @media screen and (max-width: 800px) {
        width: 100%
    }
`

export const CollectionFooter = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;

    .name {
        width: 90%;
        margin-bottom: 15px;
    }

    .price {
        width: 10%;
    }

    @media screen and (max-width: 800px) {
        font-size: 14px;
        width: 80%;
        height: auto;
        .name {
            margin-bottom: 10px;
        }
    }
`