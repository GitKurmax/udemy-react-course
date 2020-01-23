import React from 'react'
import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss'

const MenuItem = ({title, imageUrl, size, linkUrl,history, match}) => {
    return (
        <div className={`${size} menu-item`}>
            <div className="background-image" style={{
                 backgroundImage: `url(${imageUrl})`
             }}/>
             <div className="content" onClick={() => history.push(`${match.path}${linkUrl}`)}>
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
}

export default withRouter(MenuItem)