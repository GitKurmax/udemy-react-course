import styled from 'styled-components';

export const Title = styled.h2`
    font-size: 38px;
    margin: 0 auto 30px;
`

export const ItemsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;

    @media (max-width: 800px) {
        grid-template-columns: repeat(2, minmax(130px, 1fr));
        grid-gap: 10px;
    }
`

export const CollectionPageContainer =  styled.div`
    display: flex;
    flex-direction: column;
` 