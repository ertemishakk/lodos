import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {
    Container, InputGroup, InputGroupAddon, InputGroupText, Input,
    Col, Row, Card, Button, Modal, ModalHeader, ModalBody, ModalFooter, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap'

import { createHousingPost, createForSalePost } from '../actions/postActions'

class Dashboard extends Component {

    state = {
        modal: false,
        title: '',
        category: '',
        location: '',
        description: '',
        price: '',
        posts: []
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    setModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { user } = this.props.auth

        if (this.state.category === 'For Sale') {
            const postData = {
                title: this.state.title,
                location: this.state.location,
                description: this.state.description,
                price: this.state.price,
                postedby: user.name

            }

            this.props.createForSalePost(postData)
        }
        else {
            const postData = {
                title: this.state.title,
                location: this.state.location,
                description: this.state.description,
                postedby: user.name

            }
            if (this.state.category === 'housing') {
                this.props.createHousingPost(postData)
            }


        }



        // console.log(this.state.category)

    }

    componentDidUpdate(prevProps) {
        if (this.props.post.posts !== prevProps.post.posts) {
            this.setState({
                posts: this.props.post.posts
            })
        }
    }

    componentDidMount() {
        // this.props.getPosts()
        //     this.setState({ posts: this.props.post })

    }




    render() {

        const { user } = this.props.auth;
        var date = new Date(user.date)
        // console.log(this.state.posts)
        return (

            < Container >
                <Row>
                    <Col md='3'>
                        <Card>
                            <CardBody>
                                <CardTitle className='font-weight-bold'><h2>{user.name}</h2></CardTitle>
                                <CardSubtitle>Location : {user.city}</CardSubtitle>
                                <CardSubtitle>Member since : {date.getFullYear()}</CardSubtitle>
                                <CardText></CardText>
                                <Button color="danger" onClick={this.setModal}>Create posting</Button>

                                <Modal isOpen={this.state.modal} toggle={this.setModal}>
                                    <form onSubmit={this.onSubmit}>
                                        <ModalHeader>Create a post</ModalHeader>
                                        <ModalBody>

                                            <InputGroup className='my-2'>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>@</InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="post title" onChange={this.onChange} value={this.state.name} name='title' />
                                            </InputGroup>
                                            <InputGroup className='my-2'>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>@</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type='select' onChange={this.onChange} value={this.state.category} name='category' >
                                                    <option hidden>category</option>
                                                    <option value='housing'>Housing</option>
                                                    <option value='For Sale'>For Sale</option>
                                                    <option value='Jobs'>Jobs</option>
                                                    <option value='Events'>Events</option>
                                                    <option value='Services'>Services</option>
                                                    <option value='Discussion Groups'>Discussion Groups</option>
                                                    <option value='Classess'>Classess</option>
                                                    <option value='Volunteers'>Volunteers</option>
                                                    <option value='Garage Sale'>Garage Sale</option>
                                                    <option value='Free'>Free</option>
                                                    <option value='Education'>Education</option>
                                                    <option value='Legal Services'>Legal Services</option>
                                                    <option value='Rentals'>Rentals</option>
                                                    <option value='Lost and Found'>Lost and Found</option>
                                                    <option value='Function Spaces'>Function Spaces</option>


                                                </Input>
                                            </InputGroup>
                                            {this.state.category === 'For Sale' ? (
                                                <InputGroup className='my-2'>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>@</InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="price" onChange={this.onChange} value={this.state.price} name='price' />
                                                </InputGroup>

                                            ) : null}

                                            <InputGroup className='my-2'>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>@</InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="location" onChange={this.onChange} value={this.state.location} name='location' />
                                            </InputGroup>

                                            <InputGroup className='my-2'>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>@</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="textarea" rows='8' placeholder="description" onChange={this.onChange} value={this.state.description} name='description' />
                                            </InputGroup>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" >Submit</Button>{' '}
                                            <Button color="secondary" onClick={this.setModal} >Cancel</Button>
                                        </ModalFooter>
                                    </form>
                                </Modal>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs='9'>

                    </Col>
                </Row>
            </Container >
        )
    }
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.form
})

export default connect(mapStateToProps, { createHousingPost, createForSalePost })(Dashboard)