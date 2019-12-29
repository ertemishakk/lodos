import React from 'react'
import spinner from '../images/sp.gif'

const Spinner = () => {
    return (
        <div>
            <img style={{ width: '25px', height: '25px'}} src={spinner} alt='Loading' />
        </div>
    )
}

export default Spinner
