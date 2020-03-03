import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    Container,
    Col, Row, Card, Button, CardText, CardBody,
    CardTitle, ListGroup, ListGroupItem, CardImg,

} from 'reactstrap'
import moment from 'moment'
// import classnames from 'classnames'
import { getProfilePosts, deletePost } from '../actions/postActions'
import ProfileImage from '../images/profileimage.jpg'
import Paginate from './Pagination'
import Spinner from './Spinner'
import DeletePost from './DeletePost'
import UpdatePost from './UpdatePost'
import Flip from 'react-reveal/Flip';
import ProfileQuestions from './ProfileQuestions'
import PaginatePosts from './PaginatePosts'
import { getProfileQuestions } from '../actions/questionActions'



class Dashboard extends Component {

    state = {
        currentPage: 1,
        postsPerPage: 5,
        currentPostsPage: 1,
        postsPerPagePosts: 5
    }

    componentDidUpdate(prevProps) {
        if (this.props.post.profileposts !== prevProps.post.profileposts) {
            this.setState({
                profileposts: this.props.post.profileposts
            })
        }
    }

    componentDidMount() {
        this.props.getProfilePosts(this.props.auth.user.id)
        this.props.getProfileQuestions(this.props.auth.user.id)

    }
    toCreatePost = () => {
        this.props.history.push('/createpost')

    }

    paginate = (pageNumber) => this.setState({ currentPage: pageNumber });
    paginatePosts = (pageNumber) => this.setState({ currentPostsPage: pageNumber });



    render() {

        const { user } = this.props.auth;

        const indexOfLastPost = this.state.currentPostsPage * this.state.postsPerPagePosts;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPagePosts;
        let currentPosts = Object.keys(this.props.post.profileposts).slice(indexOfFirstPost, indexOfLastPost)


        const indexOfLastQuestion = this.state.currentPage * this.state.postsPerPage
        const indexOfFirstQuestion = indexOfLastQuestion - this.state.postsPerPage;
        const currentQuestions = this.props.question.profilequestions.slice(indexOfFirstQuestion, indexOfLastQuestion)


        return (

            < Container >
                <Row>
                    {this.props.post.loading && (
                        <Col xs='12'>
                            <Spinner />
                        </Col>
                    )}
                    <Col sm='3'>


                        <Card>
                            <CardBody>
                                <CardImg src={ProfileImage} />
                                <CardTitle className='font-weight-bold'><h5>{user.name}</h5></CardTitle>

                                <small>Joined : {moment(user.date).format('YYYY')}</small>
                            </CardBody>
                            <CardText>
                                <Button color="danger btn-sm mb-2" onClick={this.toCreatePost} >Create posting</Button>

                            </CardText>
                        </Card>




                    </Col>
                    <Col xs='9'>


                        <div>

                            {(Object.keys(this.props.post.profileposts).length !== 0) && (
                                <h5>Your Posts</h5>

                            )}

{!this.props.post.loading&&(Object.keys(this.props.post.profileposts).length === 0) && (
                                <h5>You dont have any posts yet.</h5>

                            )}

                            <ListGroup className='text-left'>
                                {
                                    currentPosts.map(numbers => (
                                        <Flip top key={numbers}>
                                            <ListGroupItem  >

                                                {this.props.post.profileposts[numbers].posts.subcategory ? (

                                                    < Link to={{
                                                        pathname: `/${this.props.post.profileposts[numbers].posts.category}/${this.props.post.profileposts[numbers].posts.subcategory}/${this.props.post.profileposts[numbers].posts.title.replace(/[^A-Z0-9]+/ig, "-")}/${this.props.post.profileposts[numbers].posts.postid}`
                                                    }} className='pt-2 text-left pl-4 font-weight-bold text-break' style={{ fontSize: '14px' }}>
                                                        {this.props.post.profileposts[numbers].posts.title}</Link>
                                                ) : (
                                                        < Link to={{
                                                            pathname: `/${this.props.post.profileposts[numbers].posts.category}/${this.props.post.profileposts[numbers].posts.title.replace(/[^A-Z0-9]+/ig, "-")}/${this.props.post.profileposts[numbers].posts.postid}`
                                                        }} className='pt-2 text-left pl-4 font-weight-bold  text-break' style={{ fontSize: '14px' }}>
                                                            {this.props.post.profileposts[numbers].posts.title}</Link>

                                                    )}


                                                <DeletePost postid={this.props.post.profileposts[numbers].posts.postid} category={this.props.post.profileposts[numbers].posts.category} />

                                                <UpdatePost
                                                    postid={this.props.post.profileposts[numbers].posts.postid}
                                                    category={this.props.post.profileposts[numbers].posts.category}
                                                />

                                            </ListGroupItem>
                                        </Flip>
                                    ))}
                            </ListGroup>


                            <div className='ml-auto'>
                                {Object.keys(this.props.post.profileposts).length !== 0 &&
                                    Object.keys(this.props.post.profileposts).length > 5 && (
                                        <PaginatePosts postsPerPage={this.state.postsPerPagePosts}
                                            totalPosts={Object.keys(this.props.post.profileposts).length} paginate={this.paginatePosts} />
                                    )}
                            </div>
                        </div>
                    </Col>
                </Row>


                <Row>

                    {this.props.question.questionsLoading && (
                        <Col>
                            <Spinner />
                        </Col>
                    )}

                    {this.props.question.profilequestions.length !== 0 && (
                        <React.Fragment>

                            <Col xs='3'></Col>
                            <Col>
                                <h5>Your Questions</h5>



                                {!this.props.question.questionsLoading && this.props.question.profilequestions.length === 0 && (
                                    (
                                        <ListGroupItem>You haven't asked any questions yet.</ListGroupItem>

                                    )
                                )}

                                <ProfileQuestions profileQuestions={currentQuestions} />

                                <div className='ml-auto'>
                                    {this.props.question.profilequestions.length !== 0 &&
                                        this.props.question.profilequestions.length > 5 && (
                                            <Paginate postsPerPage={this.state.postsPerPage}
                                                totalPosts={this.props.question.profilequestions.length} paginate={this.paginate} />
                                        )}
                                </div>
                            </Col>
                        </React.Fragment>
                    )}


                </Row>
            </Container >
        )
    }
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.form,
    question: state.question

})

export default connect(mapStateToProps, { getProfilePosts, deletePost, getProfileQuestions })(Dashboard)