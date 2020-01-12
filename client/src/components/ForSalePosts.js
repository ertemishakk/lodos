import React from 'react'
import { Card } from 'reactstrap'

import { Link } from 'react-router-dom'
import moment from 'moment'
import PostImages from './PostImages'


const ForSalePosts = ({ forsaleposts }) => {



    return (
        forsaleposts.map((post, index) => (


            < Card key={index} >

                <div className='d-inline text-left pl-4 pt-1'>

                    {

                        post.links.map((link, index) =>


                            <PostImages src={link} key={index} />

                        )
                    }
                </div>

                < Link to={{
                    pathname: `/forsale/${post.title}`, state: {
                        title: `${post.title}`, links: post.links, price: post.price, date: post.date,
                        description: post.description, model: post.model, make: post.make, condition: post.condition, email: post.email, town: post.town,
                        phonenumber: post.phonenumber
                    }
                }} className='pt-2 text-left pl-4 font-weight-bold' style={{ fontSize: '16px' }}>{post.title} - ${post.price}</Link>
                <small className='text-left pl-4'>  {post.location}</small>
                <small className='text-left pl-4'>{moment(post.date).fromNow()} by {post.name} </small>
            </Card >
        ))

    )
}
export default ForSalePosts