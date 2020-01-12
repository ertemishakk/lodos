import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Container,
    Col, Row, Card, Button, CardText, CardBody,
    CardTitle, ListGroup, ListGroupItem
} from 'reactstrap'
import moment from 'moment'
// import classnames from 'classnames'
import { getProfilePosts } from '../actions/postActions'


class Dashboard extends Component {

    state = {
        profileposts: {},
        activeTab: '1',
      
    }

    tabClick = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    componentDidUpdate(prevProps) {
        if (this.props.post.profileposts !== prevProps.post.profileposts) {
            this.setState({
                profileposts: this.props.post.profileposts
            })

        }

        // console.log(this.props.post)
    }

    componentDidMount() {

        this.props.getProfilePosts(this.props.auth.user.id)
        // this.setState({ profileposts: this.props.post.profileposts })



    }

    deletePost = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            console.log('call delete post')
        }
    }
 
    toCreatePost = () => {
        this.props.history.push('/createpost')

    }

    render() {
        
        const { user } = this.props.auth;

        return (

            < Container >
                <Row>
                    <Col md='3'>
                        <Card>
                            <CardBody>
                                <CardTitle className='font-weight-bold'><h5>{user.name}</h5></CardTitle>
                                <small>Location : {user.city}</small><br />
                                <small>Joined : {moment(user.date).format('YYYY')}</small>
                            </CardBody>
                            <CardText>
                                <Button color="danger btn-sm mb-2" onClick={this.toCreatePost} >Create posting</Button>

                            </CardText>
                        </Card>
                    </Col>
                    <Col xs='9'>


                        <div className='text-left'>
                            <h5>Your Posts</h5>
                            <ListGroup>
                                {Object.keys(this.state.profileposts).length === 0 ? (<ListGroupItem>You havent posted anything yet</ListGroupItem>) : ''}

                                 {Object.keys(this.state.profileposts).map(numbers =>
                                    <ListGroupItem key={numbers}>
                                        <Link to='#'> {this.state.profileposts[numbers].posts.title}</Link>
                                    </ListGroupItem>)} 

                            </ListGroup>
                        </div>





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

export default connect(mapStateToProps, { getProfilePosts })(Dashboard)