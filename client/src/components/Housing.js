import React, { Component } from 'react'
import { getHousingPosts } from '../actions/postActions'
import { connect } from 'react-redux'
import { Container, Card } from 'reactstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'


class Housing extends Component {
    state = {
        housingposts: []
    }

    componentDidMount() {
        this.props.getHousingPosts()

    }


    componentDidUpdate(prevProps) {
        if (this.props.post.housingposts !== prevProps.post.housingposts) {
            this.setState({
                housingposts: this.props.post.housingposts
            })
        }

    }

    render() {
        return (
            <Container>
                <h2>Housing</h2>
                {this.state.housingposts.map((post, index) => (
                    <Card key={index}>
                        < Link to={{ pathname: `/housing/${post.title}` }}
                            className='pt-2 text-left pl-5 font-weight-bold' style={{ fontSize: '16px' }}>{post.title} - ${post.price}</Link>
                        <small className='text-left pl-5'>{moment(post.date).fromNow()} by {post.name} </small>
                    </Card>
                ))}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.form
})


export default connect(mapStateToProps, { getHousingPosts })(Housing)