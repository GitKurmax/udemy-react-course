import React from 'react'
import { withRouter } from 'react-router-dom';

import { 
    MenuItemContainer, 
    BackgroundImageElem,
    ContentContainer,
    Title,
    Span
 } from './menu-item.styles';

const MenuItem = ({title, imageUrl, size, linkUrl, history, match}) => {
    return (
        <MenuItemContainer large={size}>
            <BackgroundImageElem url={imageUrl}/>
            <ContentContainer onClick={() => history.push(`${match.path}${linkUrl}`)}>
                <Title>{title}</Title>
                <Span>SHOP NOW</Span>
            </ContentContainer>
        </MenuItemContainer>
    )
}

export default withRouter(MenuItem)
