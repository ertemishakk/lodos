import React, { Component } from 'react'
import { Alert, Container, Col, Row } from 'reactstrap'
import SidePosts from './SidePosts'
import QuickLinks from './QuickLinks'

class VerifyAccount extends Component {

    componentDidMount() {
        if (!this.props.location.state) {
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <Container>
                <Row>

                    <Col xs='8'>
                        <h3 className=' text-center font-weight-normal'>
                            {this.props.location.state && this.props.location.state.name && (

                                'Hi ' + this.props.location.state.name.toUpperCase()
                            )}</h3>
                        <h4 className='font-weight-light mb-3 '>
                            Welcome to Lodos</h4>
                        <Alert color='info'>
                            We're excited to have you get started. First, you need to confirm your account.
                            A code has been sent to your email. Please verify your account.
                        </Alert>

                    </Col>

                    <Col>
                        <SidePosts />
                        <QuickLinks />
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default VerifyAccount