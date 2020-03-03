import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
class NotFound extends Component {
    render() {
        return (
            <Container className=' align-items-center justify-content-center mt-5'>
                <Row >
                    <Col className=''
                    >
                        <h1 >404</h1>
                        <h3 >PAGE NOT FOUND</h3>
                        <h5>Looks like there is nothing here. Try going back.</h5>

                    </Col>
                </Row>
            </Container>

        )
    }
}

export default NotFound