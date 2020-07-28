import React from 'react'

const downvoteButton = (props) => {
    return(
        <span style={props.blue ? {color: '#7193ff'} : {color: 'black'}}>
            <i className='fas fa-arrow-down'></i>
            <span> {props.downvotes}</span>
        </span>
    )
}

export default downvoteButton