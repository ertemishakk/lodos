import React, { Component } from 'react'
import moment from 'moment'
import {
    Card, CardImg, CardBody, Button,
    CardTitle, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'

import ReactImageMagnify from 'react-image-magnify';

class PageLink extends Component {

    state = {
        bigimage: '',
        windowSize: '',
        dropdown: false,
        dropdownvalue: 'Contact',
    }
    dropdownToggle = () => {
        this.setState({
            dropdown: !this.state.dropdown
        })
    }

    componentDidMount() {
        this.setState({
            bigimage: this.props.history.location.state.links[0],

        })
    }

    ChangeBigImage = (e) => {
        // console.log(e.target.src)
        this.setState({
            bigimage: e.target.src
        })
    }

    render() {

        return (

            <Container>
                <Row className='pl-3 mb-2'>
                    <Button className='btn btn-light float-left border' onClick={this.props.history.goBack}
                    >
                        Back
                    </Button>
                </Row>
                <Card>

                    <CardTitle className='text-left h2 pl-3 pt-2'>{this.props.history.location.state.title}-
                 ${this.props.history.location.state.price} ({this.props.history.location.state.town})</CardTitle>



                    {/* <CardImg className='pl-3 pt-2 float-left'
                                style={{
                                    height: '300px',
                                    width: 'auto'
                                }}
                                src={this.state.bigimage} alt='forsalemainpost' /> */}

                    {window.innerWidth < 768 ? (
                        <ReactImageMagnify enlargedImagePosition='over' className='pl-3 img-fluid'  {...{
                            smallImage: {
                                alt: 'Main Photo',
                                isFluidWidth: true,

                                // width: 400,
                                // height: 400,

                                src: this.state.bigimage,

                            },
                            largeImage: {
                                src: this.state.bigimage,
                                width: 1200,
                                height: 1800,
                                isHintEnabled: true

                            }
                        }} />


                    ) : (<ReactImageMagnify enlargedImagePosition='over' className='pl-3 img-fluid'  {...{
                        smallImage: {
                            alt: 'Main Photo',
                            // isFluidWidth: false,

                            width: 400,
                            height: 400,

                            src: this.state.bigimage,

                        },
                        largeImage: {
                            src: this.state.bigimage,
                            width: 1200,
                            height: 1800,
                            isHintEnabled: true

                        }
                    }} />)}






                    <Row className='d-inline text-left pl-4 pt-1 '>


                        {
                            this.props.history.location.state.links.map((link, index) =>
                                <CardImg key={index} className='p-1' onClick={this.ChangeBigImage}
                                    style={{
                                        height: '50px',
                                        width: '50px'
                                    }}
                                    src={link} alt='forsalephotos' />
                            )}

                    </Row>

                    <Row className='d-inline text-left pl-4 pt-1 '>
                        <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary'>Make: {this.props.history.location.state.make}</span></h3>
                        <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary'>Model: {this.props.history.location.state.model}</span></h3>
                        <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary'>Odometer: {this.props.history.location.state.odometer}</span></h3>
                        <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary'>Condition: {this.props.history.location.state.condition}</span></h3>

                    </Row>
                    <h5 className='text-left pl-3 mt-3'>Description:</h5>
                    <CardBody className='text-left h5 pl-3 pt-2 border mx-3'>{this.props.history.location.state.description}</CardBody>
                    <small className='text-left pl-4 mb-2'>{moment(this.props.history.location.state.date).fromNow()}  </small>
                    <div className='mr-auto ml-2 mb-2'>
                        <Dropdown size='sm' className='btn-sm ' isOpen={this.state.dropdown} toggle={this.dropdownToggle}>
                            <DropdownToggle caret className=' bg-light text-dark'>
                                {this.state.dropdownvalue}
                            </DropdownToggle>
                            <DropdownMenu>


                                <DropdownItem onClick={this.callNewest} value='newest'>Phone number: {this.props.history.location.state.phonenumber} </DropdownItem>
                                <DropdownItem onClick={this.callNewest} value='newest'>Email: {this.props.history.location.state.email}</DropdownItem>

                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Card>

            </Container >
        )
    }
}




export default PageLink