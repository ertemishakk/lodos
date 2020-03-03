import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Row, Col, InputGroup, Input, Button, Form,
    ListGroup, ListGroupItem, Container, Modal, ModalHeader, ModalBody, ModalFooter,

} from 'reactstrap';
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import {
    postQuestion, getQuestions, updateViews, clearQuestions,
    updatePosition, setQuery
} from '../actions/questionActions'
import { stopComponentReload } from '../actions/checkActions'
import Flip from 'react-reveal/Flip';
// import reklam from '/Users/ishakertem/Desktop/projecs/lodos/server/client/src/images/reklam.jpg'
// import reklam2 from '/Users/ishakertem/Desktop/projecs/lodos/server/client/src/images/reklam2.jpg'
import InfiniteScroll from 'react-infinite-scroll-component';
import SidePosts from './SidePosts';
import QuickLinks from './QuickLinks';
import SideQuestions from './SideQuestions'

class Feed extends Component {

    state = {
        title: '',
        hasMoreItems: true,
        modal: false,
        dropdownOpen: false
    }
    toggle = (e) => {
        this.setState({
            dropwdownOpen: !this.state.dropdownOpen
        })
    }

    searchChange = (e) => {
        this.props.setQuery(e.target.value)
    }
    callSearch = (e) => {
        e.preventDefault()
        this.props.updatePosition(0)
        this.props.getQuestions(0, this.props.question.searchQuery)

    }

    fetchData = () => {
        console.log('here')
        if (this.props.question.searchQuery !== '') {
            this.props.getQuestions(this.props.question.position, this.props.question.searchQuery)

        } else {
            this.props.getQuestions(this.props.question.position)
        }
    }



    componentDidUpdate = (prevProps) => {
        if (this.props.question.postquestion !== prevProps.question.postquestion) {
            this.props.history.push(`/question/${this.props.question.postquestion.title.replace(/[^A-Z0-9]+/ig, "-")}/${this.props.question.postquestion._id}`)
        }

        if (this.props.question.questionfetchingfinished !== prevProps.question.questionfetchingfinished) {
            this.setState({
                hasMoreItems: false,
            })
        }
        if (this.props.question.searchQuery !== prevProps.question.searchQuery) {
            if (this.props.question.allquestions !== prevProps.question.allquestions) {
                this.props.updatePosition(0)
            }
        }
        if (this.props.question.allquestions !== prevProps.question.allquestions) {
            this.props.updatePosition(this.props.question.position + 1)
            if (this.props.question.allquestions.length < 12) {
                this.setState({
                    hasMoreItems: false,
                })
            }
            if (this.props.question.allquestions.length === 12) {
                this.setState({
                    hasMoreItems: true
                })
            }

        }




        if (this.props.question.questionfetchingfinished !== prevProps.question.questionfetchingfinished) {
            if (this.props.question.allquestions.length === 0) {
                this.props.stopComponentReload()
            }
        }

    }



    componentDidMount() {
        if (!this.props.check.stopComponentReload && !this.props.question.questionfetchingfinished) {
            this.props.getQuestions(this.props.question.position)
            if (this.props.question.allquestions.length !== 0) {
                this.setState({
                    hasMoreItems: true,
                })
            }
        }
    }

    setQuestion = (e) => {

        this.setState({
            [e.target.name]: e.target.value

        })
    }
    submitQuestion = (e) => {
        e.preventDefault()
        if (this.props.auth.isAuthenticated) {
            const data = {
                title: this.state.title,
                user: this.props.auth.user.id
            }
            this.props.postQuestion(data)
        }
        else {
            this.props.history.push('/login')
        }



    }

    setViews = (questionid, ) => {



        if (this.props.auth.isAuthenticated) {
            const data = {

                questionid,
                loggedinuser: this.props.auth.user.id
            }
            this.props.updateViews(data)
        }
    }

    toggleModal = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }


    render() {
        // const { classes } = this.props;
        return (
            <div>
                <Container>


                    <Row>
                        <Col sm='12' md='8' className='' id='list'>
                            <Row className='mb-1'>
                                <h1 className='h6 mr-auto text-muted'>All Questions</h1>


                                <div>
                                    <Button onClick={this.toggleModal} className='ml-auto btn-sm' outline color="secondary">Ask Question</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                                        <ModalHeader toggle={this.toggleModal}>Ask Question</ModalHeader>
                                        <ModalBody>
                                            <ListGroupItem>
                                                Make sure your question hasn't been asked already
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                Keep your question short and to the point
                                                </ListGroupItem>
                                            <ListGroupItem>
                                                Double-check grammar and spelling
                                            </ListGroupItem>

                                            <Form>
                                                <InputGroup className='my-2 mt-3'>
                                                    <Input placeholder="Start your question with 'What', 'How, 'Why', etc."
                                                        name='title' value={this.state.title} onChange={this.setQuestion} />

                                                </InputGroup>

                                            </Form>


                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={this.submitQuestion} outline color="success">Ask</Button>{' '}
                                            <Button onClick={this.toggleModal} outline color="danger">Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                                <div className='mx-auto container-fluid my-1'>
                                    <Form onSubmit={this.callSearch}>
                                        <Input className='text-center'
                                            name='searchInput'
                                            placeholder='Search questions..'
                                            value={this.state.searchInput}
                                            onChange={this.searchChange}

                                        />
                                    </Form>
                                </div>
                            </Row>
                            {this.props.question.allquestions.map((eachquestion) => (
                                <Flip top key={eachquestion._id} >
                                    <Row className='border mb-2' >

                                        <Col xs='3' className='my-auto mx-auto'>
                                            <Row >
                                                <small className='pl-2' >{eachquestion.views.length}</small>
                                                <small className='pl-2'>Views</small>
                                            </Row>
                                            <Row className={eachquestion.answers.length > 0 && 'text-success'}>
                                                <small className='pl-2'>{eachquestion.answers.length}</small>
                                                <small className='pl-2'>Answers</small>
                                            </Row>

                                            <Row className={eachquestion.voteCount < 0 && ('text-danger')}>
                                                <small className='pl-2'>{eachquestion.voteCount}</small>
                                                <small className='pl-2'>Votes</small>
                                            </Row>


                                        </Col>



                                        <Col >
                                            <ListGroup className='text-left '>
                                                <ListGroupItem className='border-0 text-break'>
                                                    <Link to={{
                                                        pathname: `/question/${eachquestion.title.replace(/[^A-Z0-9]+/ig, "-")}/${eachquestion._id}`,
                                                        // state: {
                                                        //     voteType: eachquestion.upvotes.votes ? (eachquestion.upvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ?

                                                        //         (upvote) : ((eachquestion.downvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0) ? (downvote) : (null))) :

                                                        //         (eachquestion.downvotes.votes ? (eachquestion.downvotes.votesfilter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ? (downvote) :
                                                        //             (eachquestion.upvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ? (upvote) : null)) : null)


                                                        // }
                                                    }} className='py-1 text-left font-weight-bold'
                                                        onClick={(e) => { this.setViews(eachquestion._id) }}>



                                                        {eachquestion.title}</Link>
                                                    <Row>
                                                        <small className='pl-3'>{moment(eachquestion.date).fromNow()} by {eachquestion.user.name}</small>

                                                    </Row>
                                                </ListGroupItem>
                                            </ListGroup>

                                        </Col>
                                    </Row>
                                </Flip>
                            ))}

                            <InfiniteScroll
                                dataLength={this.props.question.allquestions.length} //This is important field to render the next data
                                next={this.fetchData}
                                hasMore={this.state.hasMoreItems}
                                loader={(!this.props.question.questionfetchingfinished) && <h1 className='h6 text-small text-muted'>Loading...</h1>}
                                endMessage={
                                    (this.props.question.questionfetchingfinished && this.props.question.allquestions.length === 0) && (
                                        this.props.question.searchQuery !== '' ? (
                                            <h1 className='h6 text-small text-muted'>Couldnt find anything</h1>

                                        ) : (
                                                <h1 className='h6 text-small text-muted'>No questions have been asked yet. Be first to ask</h1>

                                            )
                                    )}
                            >

                            </InfiniteScroll>
                            {(this.props.question.questionfetchingfinished && this.props.question.allquestions.length > 0) &&
                                <h1 className='h6 text-small text-muted '>You have seen it all</h1>

                            }
                        </Col>



                        <Col md='4' sm='12' >

                            <React.Fragment>
                                <QuickLinks />
                                <SidePosts />
                                <SideQuestions />
                            </React.Fragment>
                        </Col>
                    </Row>
                </Container>



            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.form,
    question: state.question,
    check: state.check
})
export default connect(mapStateToProps, {
    postQuestion, getQuestions, updateViews, stopComponentReload,
    clearQuestions, updatePosition,
    setQuery
})(withRouter(Feed))