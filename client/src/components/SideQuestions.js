import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroupItem } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { popularQuestions } from '../actions/questionActions'
import { stopComponentReload } from '../actions/checkActions'

class SideQuestions extends Component {
    componentDidMount() {
        if (!this.props.check.stopComponentReload) {

            if (this.props.questionid) {

                this.props.popularQuestions(this.props.questionid)

            }
            else {
                this.props.popularQuestions()

            }
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
                {this.props.question.popularquestions.length !== 0 && (
                    <React.Fragment>
                        <h6 className='mt-2'>Popular Questions</h6>
                        <div className='border text-left text-break'>
                            {
                                this.props.question.popularquestions.map((question) => (
                                    <ListGroupItem key={question._id} style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                        <Link style={{ color: 'black' }} onClick={this.stopPreviousComponentReload} to={{
                                            pathname: `/question/${question.title.replace(/[^A-Z0-9]+/ig, "-")}/${question._id}`,
                                            // state: {
                                            //     title: question.title,
                                            //     description: question.description,
                                            //     user: question.user.name,
                                            //     date: question.date,
                                            //     answers: question.answers,
                                            //     views: question.views.length,
                                            //     votes: question.voteCount,
                                            //     questionid: question._id,
                                            //     voteType: question.upvotes.votes ? (question.upvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ?

                                            //         (upvote) : ((question.downvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0) ? (downvote) : (null))) :

                                            //         (question.downvotes.votes ? (question.downvotes.votesfilter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ? (downvote) :
                                            //             (question.upvotes.votes.filter(vote => vote.user.toString() === this.props.auth.user.id).length > 0 ? (upvote) : null)) : null)

                                            // }
                                        }}>
                                            <small>
                                                {question.title}
                                            </small>
                                        </Link>
                                    </ListGroupItem>
                                ))
                            }
                        </div>
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

export default connect(mapStateToProps, { popularQuestions, stopComponentReload })(withRouter(SideQuestions))