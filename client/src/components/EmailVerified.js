import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verifyUser } from '../actions/formActions'
import {
    Alert
} from 'reactstrap';

class EmailVerified extends Component {
    componentDidMount() {
        this.props.verifyUser(this.props.match.params.code)
        setTimeout(() => {
            this.props.history.push('/login')
        }, 3000)


    }

    componentDidUpdate(prevProps) {
        if (!this.props.auth.verified) {
            this.props.history.push('/')
        }
    }


    render() {
        return (

            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <Alert>
                            Congratulations, your account has been verified. You are being redirected to login page.

            </Alert>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.form

})

export default connect(mapStateToProps, { verifyUser })(EmailVerified)
