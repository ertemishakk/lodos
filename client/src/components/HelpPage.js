import React, { Component } from 'react'
import { Container, Col, Row, ListGroupItem, ListGroup } from 'reactstrap'

class HelpPage extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h4>Yellow Pages</h4>
                        <ListGroup>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                How to post?
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Are all ads free?
                            </ListGroupItem  >
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                How to edit or delete?
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Where is my posting?
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Where can I adverise my services?
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                User accounts
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Frequently asked questions
                            </ListGroupItem>
                        </ListGroup>

                        <h4 className='mt-2'>Legal, Copyright, Harassment</h4>
                        <ListGroup>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Law enforcement
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Copyright violation
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Personal Harassment
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Terms of Use
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col >
                        <h4>Paid Postings</h4>
                        <ListGroup >
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Vehicles by dealer fees
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Vehicles by owner fees
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Posting fees
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Lifespan of posts
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                How to submit a paid post
                            </ListGroupItem>
                        </ListGroup>

                        <h4 className='mt-2'>Avoiding Scams and Fraud</h4>
                        <ListGroup>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Spotting and avoiding scams
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                What is fishing?
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Who is posting ads in my account?
                            </ListGroupItem>
                            <ListGroupItem tag="a" href='#' style={{ lineHeight: '1em', backgroundColor: 'rgb(251, 242, 212)' }}>
                                Can I trust this great but odd deal?
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>

            </Container>
        )
    }
}
export default HelpPage