import styled, {css} from 'styled-components';

const menuItemLarge = css`
    height: 380px;
    
    @media screen and (max-width: 800px) {
        height: 240px;
    }
`
const menuItemLargeStyles = props => {
    return props.large ? menuItemLarge : null;
}

const backgroundImageUrl = props => {
    return `background-image: url(${props.url})`
}

const backgroundImageResize = () => {
    return `transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);`
}

export const BackgroundImageElem = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    ${backgroundImageUrl}    
` 

export const MenuItemContainer = styled.div`
    min-width: 30%;
    height: 240px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    overflow: hidden;
        &:first-child {
            margin-right: 7.5px;
        }
        &:hover {
            cursor: pointer;
        }

        &:hover ${BackgroundImageElem}{
            ${backgroundImageResize}
        }
    ${menuItemLargeStyles}
`

export const ContentContainer = styled.div`
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: #fff;
    opacity: 0.7;
    position: absolute;
`

export const Title = styled.h1`
    font-weight: bold;
    margin-bottom: 6px;
    font-size: 22px;
    color: #4a4a4a;
`
export const Span = styled.span`
    font-weight: lighter;
    font-size: 16px;
`







