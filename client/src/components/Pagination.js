import React from 'react'
import { Link } from 'react-router-dom'



const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='ml-auto'>
            {pageNumbers.map((number, index) => (

                <Link key={index} to="#" className='mx-auto  p-1' style={{ marginleft: '50%' }} onClick={() => paginate(number)}>{number} </Link>

            ))}
        </div>
    )
}
export default Pagination