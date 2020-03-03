import React, { Component } from 'react'
import { connect } from 'react-redux'
import { randomPosts } from '../actions/questionActions'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { stopComponentReload } from '../actions/checkActions'


class SidePosts extends Component {
    componentDidMount() {
        if (!this.props.check.stopComponentReload && this.props.question.randomposts.length === 0) {
            this.props.randomPosts()
        }
    }

    stopPreviousComponentReload = (e) => {
        if (!this.props.check.stopComponentReload) {
            this.props.stopComponentReload()
        }
    }
    render() {
        return (
            <React.Fragment >
                {this.props.question.randomposts.length !== 0 && (

                    <React.Fragment>
                        <h6>Recent Yellow Pages</h6>
                        <ListGroup>


                            <div className='text-left text-break' >
                                {
                                    this.props.question.randomposts.map((randompost) => (
                                        <ListGroupItem key={randompost._id} style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>

                                            <small>
                                                {randompost.post.subcategory ? (
                                                    <Link style={{ color: 'black' }} to={{
                                                        pathname: `/${randompost.post.category}/${randompost.post.subcategory}/${randompost.post.title.replace(/[^A-Z0-9]+/ig, "-")}/${randompost.post.postid}`,

                                                    }} onClick={this.stopPreviousComponentReload}>
                                                        {randompost.post.title}

                                                    </Link>
                                                ) : (
                                                        <Link style={{ color: 'black' }} to={{
                                                            pathname: `/${randompost.post.category}/${randompost.post.title.replace(/[^A-Z0-9]+/ig, "-")}/${randompost.post.postid}`,

                                                        }} onClick={this.stopPreviousComponentReload}>
                                                            {randompost.post.title}

                                                        </Link>
                                                    )}


                                            </small></ListGroupItem>
                                    ))
                                }

                            </div>
                        </ListGroup>
                    </React.Fragment>
                )}

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.form,
    question: state.question,
    post: state.post,
    check: state.check

})

export default connect(mapStateToProps, { randomPosts, stopComponentReload })(SidePosts)