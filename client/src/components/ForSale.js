import React, { Component } from 'react'
import { getForSalePosts } from '../actions/postActions'
import { connect } from 'react-redux'
import { Container, Card, CardTitle, CardSubtitle } from 'reactstrap'


class Housing extends Component {
    state = {
        forsaleposts: []
    }

    componentDidMount() {
        this.props.getForSalePosts()

    }


    componentDidUpdate(prevProps) {
        if (this.props.post.forsaleposts !== prevProps.post.forsaleposts) {
            this.setState({
                forsaleposts: this.props.post.forsaleposts
            })
        }

    }

    render() {

        const date = new Date()

        return (
            <Container>
                <h2>For Sale</h2>
                {this.state.forsaleposts.map((post, index) => (




                    <Card key={index}>
                        {/* {post.date}
                        {date.getMinutes(post.date)} */}
                        <CardTitle className='font-weight-bold pt-2 text-left pl-5' style={{ fontSize: '20px' }}>{post.title}</CardTitle>
                        <CardSubtitle className='pt-2 pl-5 text-left'>${post.price}</CardSubtitle>
                        {/* <CardSubtitle className='pt-2 pl-5 text-left mt-2'> {date.getHours(post.date) > 24 ? (<small>Posted {date.getDay(post.date)} day ago</small>)
                            : (<small>Posted {(date.getHours(post.date) - date.getHours())} hours ago</small>)}  </CardSubtitle>
                        <CardTitle className=' pt-2 text-left pl-5' style={{ fontSize: '15px' }}>Posted by {post.name}</CardTitle> */}

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


export default connect(mapStateToProps, { getForSalePosts })(Housing)