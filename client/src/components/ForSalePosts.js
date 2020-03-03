import React from 'react'
import { Card } from 'reactstrap'
import { stopComponentReload } from '../actions/checkActions'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PostImages from './PostImages'
import Flip from 'react-reveal/Flip';
import { connect } from 'react-redux'




class ForSalePosts extends React.Component {

    stopLoadOnMount = (e) => {
        // this.props.stopFetchingOnLoad()
        if (!this.props.check.stopComponentReload) {
            this.props.stopComponentReload()

        }
    }

    render() {
        return (

            this.props.yellowpages.map((post) => (
                <Flip top key={post._id}>
                    < Card className='my-1'>
                        <div className='d-inline text-left pl-4 pt-1'>
                            {
                                this.props.category !== 'jobs' && post.links.map((link, index) =>
                                    <PostImages src={link} key={index} />
                                )
                            }
                        </div>
                        {post.subcategory ? (


                            < Link onClick={this.stopLoadOnMount} to={{
                                pathname: `/${post.category}/${post.subcategory}/${post.title.replace(/[^A-Z0-9]+/ig, "-")}/${post._id}`
                            }} className='pt-2 text-left pl-4 font-weight-bold text-break' style={{ fontSize: '16px' }}>{post.title}{
                                    this.props.category !== 'services'
                                    && ('- $')} {this.props.category === 'jobs' ? post.salary : post.price} ({post.town==='undefined'? post.city : post.town})</Link>
                        ) : (
                                < Link onClick={this.stopLoadOnMount} to={{
                                    pathname: `/${post.category}/${post.title.replace(/[^A-Z0-9]+/ig, "-")}/${post._id}`
                                }} className='pt-2 text-left pl-4 font-weight-bold text-break' style={{ fontSize: '16px' }}>{post.title}{
                                        (this.props.category !== 'garagesale' &&
                                            this.props.category !== 'services' &&
                                            this.props.category !== 'volunteers' &&
                                            this.props.category !== 'classes' &&
                                            this.props.category !== 'events' &&
                                            this.props.category !== 'lostandfound') && ('- $')} {this.props.category === 'jobs' ? post.salary : post.price} 
                                            ({post.town==='undefined'? post.city : post.town})</Link>

                            )}
                        <small className='text-left pl-4'>  {post.location}</small>
                        {(post.subcategory === 'Cars' || post.subcategory === 'Motorcycles') && (
                            <small className='text-left pl-4'>Km: {post.odometer} </small>

                        )}
                        {this.props.category === 'jobs' && (
                            <small className='text-left pl-4 d-inline-block text-truncate'>
                                {post.description}
                            </small>
                        )}
                        <small className='text-left pl-4'>{moment(post.date).fromNow()} by {this.props.category === 'jobs' ? post.company : post.name} </small>
                    </Card >
                </Flip >
            ))

        )
    }
}


const mapStateToProps = state => ({
    check: state.check
    // post: state.post,
    // auth: state.form,
    // question: state.question

})


export default connect(mapStateToProps, { stopComponentReload })(ForSalePosts)
