import React, { Component } from 'react'
import EachQuickLinks from './EachQuickLinks'
import { ListGroup, ListGroupItem } from 'reactstrap'


class QuickLinks extends Component {
    render() {
        return (
            <React.Fragment>
                <h6 className='mt-1'>Quick Links</h6>
                <ListGroup>


                    <div className='text-left '>
                        <ListGroupItem color='primary' style={{ lineHeight: '1em' }}>
                            <small>
                                <EachQuickLinks name='Home' link='/'/>


                            </small>
                        </ListGroupItem>
                        <ListGroupItem color='primary' style={{ lineHeight: '1em' }}>
                            <small>
                                <EachQuickLinks name='Yellow Pages' link='/' />


                            </small>
                        </ListGroupItem>
                        <ListGroupItem color='primary' style={{ lineHeight: '1em' }}>
                            <small>
                                <EachQuickLinks name='For Sale' link='/' />


                            </small>
                        </ListGroupItem>
                    </div>
                </ListGroup>
            </React.Fragment>
        )
    }
}
export default QuickLinks