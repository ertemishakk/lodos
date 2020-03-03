import React, { Component } from 'react'
import { Container, Row, Col, Alert, InputGroup, Input, Form } from 'reactstrap'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import io from 'socket.io-client'
import SidePosts from './SidePosts'
import SideQuestions from './SideQuestions'
import QuickLinks from './QuickLinks'
// import reklam from '/Users/ishakertem/Desktop/projecs/lodos/server/client/src/images/reklam.jpg'
// import reklam1 from '/Users/ishakertem/Desktop/projecs/lodos/server/client/src/images/reklam1.jpg'
import { getSpecificQuestion, clearSpecificQuestion, sendDeleteQuestion } from '../actions/questionActions'
import { stopComponentReload, restoreComponentReload } from '../actions/checkActions'
import Spinner from './Spinner'



class QuestionLink extends Component {


    state = {
        votedfor: null,
        totalVotes: '',
        showWarning: false,
        socket: null,
        answer: '',
        answers: [],
        question: {},
        showNoAnswersWarning: false,
        showDeleted: false
    }



    setAnswer = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

        })
    }


    onSubmit = (e) => {
        e.preventDefault()

        if (this.props.auth.user.id) {
            this.state.socket.emit('postanswer', {
                answer: this.state.answer,
                questionid: this.props.match.params.questionid,
                userid: this.props.auth.user.id,
                name: this.props.auth.user.name
            })
            this.setState({
                showNoAnswersWarning: false
            })

        }
        else {
            this.setState({
                showWarning: true
            })
        }


    }

    componentDidMount() {
        this.props.stopComponentReload()
        this.props.getSpecificQuestion(this.props.match.params.questionid)
        let socket = io('http://localhost:5000')
        this.setState({
            socket
        })



        socket.on('answerDownVoteUpdated', (data) => {
            console.log(data)
            this.setState({
                answers: data.updatedAnswers[0].answers
            })
        })

        socket.on('answerUpVoteUpdated', (data) => {
            console.log(data)
            this.setState({
                answers: data.updatedAnswers[0].answers
            })
        })

        socket.emit('getquestion', { questionid: this.props.match.params.questionid })

        socket.on('setquestion', (data) => {
            this.setState({
                question: data.post
            })
        })


        socket.emit('getanswers', { questionid: this.props.match.params.questionid })

        socket.on('setanswers', (data) => {
            if (data.answer[0]) {
                this.setState({
                    answers: data.answer[0].answers
                })
            }
            else {
                this.setState({
                    showNoAnswersWarning: true
                })
            }

        })

        socket.on('updatedQuestion', (data) => {
            this.setState({
                answers: data.question.answers
            })
            if (data.question.answers.length > 0) {
                this.setState({
                    showNoAnswersWarning: false
                })
            } else {
                this.setState({
                    showNoAnswersWarning: true
                })
            }
        })

        socket.on('updateanswerlist', (data) => {
            if (data.answer[0]) {
                this.setState({
                    answers: data.answer[0].answers,
                    answer: ''
                })
            }

        })





        socket.on('upvoteupdate', (upvoteupdate) => {
            this.setState({
                totalVotes: upvoteupdate.upvotedquestion.questionid.voteCount,

            })
        })

        socket.on('downvoteupdate', (downvoteupdate) => {

            this.setState({
                totalVotes: downvoteupdate.questionid.voteCount,

            })

        })



    }

    componentWillUnmount() {
        this.state.socket.disconnect()
        this.props.clearSpecificQuestion()
    }

    componentDidUpdate(prevProps) {

        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.getSpecificQuestion(this.props.match.params.questionid)

        }

        var upvote = 'upvote';
        var downvote = 'downvote';


        if (this.props.question.question !== prevProps.question.question) {
            this.setState({
                votedfor: this.props.question.question.upvotes.votes ? (this.props.question.question.upvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ?

                    (upvote) : ((this.props.question.question.downvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0) ? (downvote) : (null))) :

                    (this.props.question.question.downvotes.votes ? (this.props.question.question.downvotes.votesfilter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ? (downvote) :
                        (this.props.question.question.upvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ? (upvote) : null)) : null),

                totalVotes: this.props.question.question.voteCount

            })
        }
    }

    sendUpvote = (e) => {
        if (this.props.auth.user.id) {
            if (this.state.votedfor === null) {

                this.state.socket.emit('upvote', {
                    questionid: this.props.match.params.questionid,
                    userid: this.props.auth.user.id
                })
                this.setState({
                    votedfor: 'upvote'
                })

            }
            if (this.state.votedfor === 'upvote') {
                this.state.socket.emit('upvote', {
                    questionid: this.props.match.params.questionid,
                    userid: this.props.auth.user.id
                })
                this.setState({
                    votedfor: null
                })
            }
            if (this.state.votedfor === 'downvote') {
                this.state.socket.emit('upvote', {
                    questionid: this.props.match.params.questionid,
                    userid: this.props.auth.user.id
                })
                this.setState({
                    votedfor: 'upvote'
                })
            }






        }
        else {
            this.setState({
                showWarning: true
            })
        }
    }





    sendDownvote = (e) => {
        if (this.props.auth.user.id) {
            if (this.state.votedfor === null) {

                this.state.socket.emit('downvote', {
                    questionid: this.props.match.params.questionid,
                    userid: this.props.auth.user.id
                })
                this.setState({
                    votedfor: 'downvote'
                })

            }
            if (this.state.votedfor === 'downvote') {
                this.state.socket.emit('downvote', {
                    questionid: this.props.match.params.questionid,
                    userid: this.props.auth.user.id
                })
                this.setState({
                    votedfor: null
                })
            }

            if (this.state.votedfor === 'upvote') {
                this.state.socket.emit('downvote', {
                    questionid: this.props.match.params.questionid,
                    userid: this.props.auth.user.id
                })
                this.setState({
                    votedfor: 'downvote'
                })
            }



        }
        else {
            this.setState({
                showWarning: true
            })
        }
    }


    answerUpvote = (answerid) => {
        if (this.props.auth.user.id) {
            this.state.socket.emit('answerUpVoteClicked',
                {
                    answerid,
                    questionid: this.props.match.params.questionid,
                    userid: this.props.auth.user.id
                })
        }
        else {
            this.setState({
                showWarning: true
            })
        }
    }
    answerDownvote = (answerid) => {
        if (this.props.auth.user.id) {
            this.state.socket.emit('answerDownVoteClicked',
                {
                    answerid,
                    questionid: this.props.match.params.questionid,
                    userid: this.props.auth.user.id
                })
        }
        else {
            this.setState({
                showWarning: true
            })
        }

    }
    deleteQuestion = (e) => {
        this.props.sendDeleteQuestion(this.props.match.params.questionid)
        this.setState({
            showDeleted: true
        })
        this.props.restoreComponentReload()
        setTimeout(() => {
            this.props.history.push('/')
        }, 3000)


    }

    deleteAnswer = (answerid) => {
        this.state.socket.emit('deleteAnswer', {
            answerid,
            questionid: this.props.match.params.questionid,
        })
    }



    render() {
        // console.log(this.props.history.goBack)
        return (

            <Container>
                <Row>
                    {this.state.showWarning && (
                        <Col>
                            <Alert color="danger">
                                Please <Link to='/login'>login</Link> to vote or answer this question.
                </Alert>
                        </Col>)}
                    {this.state.showDeleted && (
                        <Col>
                            <Alert color="success">
                                Your post has been deleted. You're being redirected to homepage.
                </Alert>
                        </Col>)}
                </Row>

                <Row>
                    {/* 
                    <Col xs='2' >
                        <Card>
                            <CardImg width="100%" src={reklam} />

                        </Card>


                    </Col> */}

                    <Col sm='12' md='8' className='pl-4'>
                        {this.props.question.questionsLoading && (
                            <Spinner />
                        )}
                        {Object.keys(this.props.question.question).length > 0 && (

                            <Row className=''>
                                <Col xs='1' className='my-auto mx-auto' >
                                    <Row style={{ cursor: 'pointer' }} className='mx-auto'>
                                        {(this.state.votedfor === 'upvote' ?
                                            (

                                                <i className="fas fa-caret-up fa-2x" style={{ color: 'green' }} onClick={this.sendUpvote}></i>

                                            ) :
                                            (

                                                <i className="fas fa-caret-up fa-2x" onClick={this.sendUpvote}></i>
                                            )
                                        )}
                                    </Row>
                                    <Row className='ml-1'>{this.state.totalVotes}</Row>

                                    <Row style={{ cursor: 'pointer' }} className='mx-auto'>

                                        {
                                            (this.state.votedfor === 'downvote' ?
                                                (
                                                    <i className="fas fa-caret-down fa-2x" style={{ color: 'red' }} onClick={this.sendDownvote}></i>

                                                ) : (
                                                    <i className="fas fa-caret-down fa-2x" onClick={this.sendDownvote}></i>
                                                )


                                            )}



                                    </Row>

                                </Col>

                                <Col>
                                    <h1 className='text-left h5 mt-3 font-weight-bold text-break' >{this.props.question.question.title}</h1>
                                    <small className='float-left mt-4'>{moment(this.props.question.question.date).fromNow()} by  {this.props.question.question.user.name}</small><br /><br />
                                    {this.props.question.question.user.name === this.props.auth.user.name && (
                                        <React.Fragment>
                                            {/* <small className='float-left mt-1' style={{ cursor: 'pointer' }}>Edit</small> */}
                                            <small className='float-left mt-1 pl-2' style={{ cursor: 'pointer' }} onClick={this.deleteQuestion}>Delete</small>
                                        </React.Fragment>
                                    )}
                                </Col>
                            </Row>
                        )}




                        {Object.keys(this.props.question.question).length > 0 && this.state.answers.map(answer => (
                            <Row className='border my-2' key={answer._id} >
                                <Col xs='1' className='my-auto mx-auto' >
                                    <Row style={{ cursor: 'pointer' }} className='mx-auto' >

                                        {answer && answer.upvotes.length >= 0 && (answer.upvotes.filter(vote => vote.toString() === this.props.auth.user.id).length > 0 ?
                                            (
                                                <i className="fas fa-caret-up fa-2x" style={{ color: 'green' }} onClick={(e) => this.answerUpvote(answer._id)}></i>

                                            ) :
                                            (
                                                <i className="fas fa-caret-up fa-2x" onClick={(e) => this.answerUpvote(answer._id)}></i>

                                            )
                                        )}



                                    </Row>

                                    <Row className='ml-1'>{answer.answerVoteCount}</Row>

                                    <Row style={{ cursor: 'pointer' }} className='mx-auto'>

                                        {answer && answer.downvotes.length >= 0 && (answer.downvotes.filter(vote => vote.toString() === this.props.auth.user.id).length > 0 ?
                                            (
                                                <i className="fas fa-caret-down fa-2x" style={{ color: 'red' }} onClick={(e) => this.answerDownvote(answer._id)}></i>

                                            ) :
                                            (
                                                <i className="fas fa-caret-down fa-2x" onClick={(e) => this.answerDownvote(answer._id)}></i>

                                            )
                                        )}



                                    </Row>

                                </Col>

                                <Col >

                                    <h6 className='text-left pt-2 font-weight-normal text-break' style={{ whiteSpace: 'pre-line', fontFamily: 'monospace' }}>{answer.text}</h6>

                                    <small className='float-left mt-4 text-break'>{moment(answer.date).fromNow()} by {answer.name}</small><br /><br />

                                    {answer.name === this.props.auth.user.name && (
                                        <React.Fragment>
                                            {/* <small className='float-left mt-1' style={{ cursor: 'pointer' }}>Edit</small> */}
                                            <small className='float-left mt-1 pl-2' style={{ cursor: 'pointer' }} onClick={(e) => { this.deleteAnswer(answer._id) }}>Delete</small>
                                        </React.Fragment>
                                    )}
                                </Col>
                            </Row>
                        ))}

                        {Object.keys(this.props.question.question).length > 0 && this.state.showNoAnswersWarning && (
                            <Row >
                                <Col className='border-top  mx-auto mt-2 pt-2'>
                                    <i className="far fa-edit fa-2x "></i>
                                    <h1 className='h6 text-small'>no answers yet </h1>
                                </Col>


                            </Row>
                        )}

                        {Object.keys(this.props.question.question).length > 0 && (


                            <Row>
                                <Col className='border-top mt-2 px-0'>
                                    <Form onSubmit={this.onSubmit}>
                                        <InputGroup className='mt-2'>
                                            <Input style={{ fontFamily: 'monospace' }} type="textarea" rows='4' placeholder="Your answer..." value={this.state.answer} name='answer' onChange={this.setAnswer} />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input type='submit' value='Answer' className=' btn btn-sm float-left mt-1 btn-outline-success' />
                                        </InputGroup>
                                    </Form>
                                </Col>
                            </Row>

                        )}

                    </Col>



                    <Col className='' md='4' sm='12' >
                        <QuickLinks />
                        <SidePosts />
                        <SideQuestions questionid={this.props.match.params.questionid} />

                    </Col>

                </Row>
            </Container >

        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.form,
    question: state.question,
    check: state.check
})


export default connect(mapStateToProps, {
    getSpecificQuestion, restoreComponentReload,
    clearSpecificQuestion, stopComponentReload, sendDeleteQuestion
})(withRouter(QuestionLink))