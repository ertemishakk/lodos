import React, { Component } from 'react'
import {
    Button
} from 'reactstrap'
import { withRouter } from 'react-router-dom'

class UpdatePost extends Component {
    UpdateRedirect = (e) => {
        this.props.history.push({
            pathname: '/createpost',
            state: {
                postid: this.props.postid,
                category: this.props.category,
                prevPath: 'updatepost'
            }
        })
    }
    render() {
        // console.log(this.props.postid)
        return (
            <React.Fragment>
                <Button onClick={this.UpdateRedirect} className='float-right mr-1' size="sm" outline color="info">Update</Button>
            </React.Fragment>
        )
    }
}
export default withRouter(UpdatePost)