import React from 'react'
import Left from './Left'
import Right from './Right'
import Middle from './Middle'
import { Container, Row, Col } from 'reactstrap';


const MainPage = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs='3' className='p-0 m-0'><Left /></Col>
                    <Col xs='3' className='p-1 m-0'><Middle /></Col>
                    <Col xs='4' className='p-1 m-0'><Right /></Col>
                </Row>
            </Container>
        </div>

    )
}

export default MainPage
