import React, { Component } from 'react'
import { getHousingPosts } from '../actions/postActions'
import { connect } from 'react-redux'
import { Container, Card, CardTitle } from 'reactstrap'


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
                        <CardTitle className='font-weight-bold pt-2 text-left pl-5' style={{ fontSize: '20px' }}>{post.title}</CardTitle>
                        <CardTitle className=' pt-2 text-left pl-5' style={{ fontSize: '15px' }}>Posted by {post.name}</CardTitle>
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