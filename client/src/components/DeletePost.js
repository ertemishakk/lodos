import React, { Component } from 'react'
import {
    Button, Modal, ModalBody, ModalFooter
} from 'reactstrap'
import { deletePost } from '../actions/postActions'
import { connect } from 'react-redux'



class DeletePost extends Component {
    state = {
        modal: false
    }
    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }

    deletePost = (category, postid) => {
        const postinfo = {
            category: category,
            postid: postid,
            userid: this.props.auth.user.id,
        }

        this.props.deletePost(postinfo)
    }

    render() {
        return (
            <React.Fragment>
                <Button className='float-right' size="sm" outline color="danger" onClick={this.toggle}>Delete</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalBody>
                        Are you sure you want to permanently remove this post?
        </ModalBody>
                    <ModalFooter>
                        <Button color="danger" size='sm'
                            onClick={(e) => {

                                this.deletePost(
                                    this.props.category,
                                    this.props.postid,
                                )
                                this.toggle()
                            }} >Yes</Button>
                        <Button color="secondary" onClick={this.toggle} size='sm'>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.form
})

export default connect(mapStateToProps, { deletePost })(DeletePost)