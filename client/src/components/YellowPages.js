import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import Left from './Left'
import Right from './Right'
import Middle from './Middle'
import {
    Row, Col,
} from 'reactstrap';

class YellowPages extends Component {
    render() {
        return (
            <Row>
                <Col></Col>
                <Col sm='3' className='p-0 my-0 d-none d-sm-block'><Fade><Left /></Fade></Col>
                <Col sm='3' className='p-1 my-0'><Fade><Middle /></Fade></Col>
                <Col sm='4' className='p-1 my-0 d-none d-sm-block'><Fade><Right /></Fade></Col>
            </Row>
        )
    }
}
export default YellowPages