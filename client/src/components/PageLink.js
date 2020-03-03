import React, { Component } from 'react'
import moment from 'moment'
import {
    Card, CardImg, CardBody, Col, Alert,
    CardTitle, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import Fade from 'react-reveal/Fade';
import ReactImageMagnify from 'react-image-magnify';
import { getSpecificPost, clearPost } from '../actions/postActions'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import SideQuestions from './SideQuestions'
import QuickLinks from './QuickLinks'

class PageLink extends Component {

    state = {
        bigimage: '',
        windowSize: '',
        dropdown: false,
        dropdownvalue: 'Contact',
        category: ''
    }
    dropdownToggle = () => {
        this.setState({
            dropdown: !this.state.dropdown
        })
    }

    componentDidMount() {
        this.setState({
            category: window.location.pathname.split('/').slice(1, 2).toString()
        }, () => this.props.getSpecificPost(this.state.category, this.props.match.params.forsaleid)
        )
    }
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.getSpecificQuestion(this.props.match.params.forsaleid)

        }
        if (this.props.post.post !== prevProps.post.post && this.state.category !== 'jobs') {
            this.setState({
                bigimage: this.props.post.post.links[0]
            })
        }
    }

    componentWillUnmount() {
        this.props.clearPost()
    }

    ChangeBigImage = (e) => {
        this.setState({
            bigimage: e.target.src
        })
    }

    goDashboard = (e) => {
        this.props.history.push('/dashboard')
    }



    render() {

        return (
            <Fade>
                <Container>

                    {this.props.history.location.state && this.props.history.location.state.url === 'createpost' && (

                        <Alert color="success" className='mx-auto'>
                            Congratulations. Your post has been published.
                        </Alert>


                    )}

                    {this.props.history.location.state && this.props.history.location.state.url === 'updatepost' && (

                        <Alert color="info" className='mx-auto'>
                            Congratulations. Your post has been updated.
                        </Alert>


                    )}
                    {!this.props.post.loading ? (
                        <Row>
                            <Col md='8'>
                                <Card style={{ border: 0 }}>

                                    <CardTitle className='text-left h2 pl-3 pt-2'>{this.props.post.post.title}-
                                    {this.state.category === 'free' && (
                                            <span className='text-success'>
                                                free
                                        </span>
                                        )}
                                        {this.state.category !== 'jobs' && this.state.category !== 'garagesale' && this.state.category !== 'free' &&
                                            this.state.category !== 'volunteers' &&
                                            this.state.category !== 'classes' &&
                                            this.state.category !== 'events' &&
                                            this.state.category !== 'lostandfound' &&
                                            this.state.category !== 'services' && '$' + this.props.post.post.price} (
                                                {this.props.post.post.town === 'undefined' ? this.props.post.post.city : this.props.post.post.town}
                                                )</CardTitle>


                                    {this.props.post.post.links && (this.props.post.post.links.length !== undefined && window.innerWidth < 768 && (this.props.post.post.links.length !== 0)) &&
                                        this.state.category !== 'jobs' && (
                                            <ReactImageMagnify enlargedImagePosition='over' className='pl-3 img-fluid'  {...{
                                                smallImage: {
                                                    alt: 'Main Photo 1',
                                                    isFluidWidth: true,
                                                    src: this.state.bigimage,

                                                },
                                                largeImage: {
                                                    src: this.state.bigimage,
                                                    width: 1200,
                                                    height: 1800,
                                                    isHintEnabled: true

                                                }
                                            }} />


                                        )}


                                    {this.props.post.post.links && (window.innerWidth > 768 && this.props.post.post.links.length !== 0) &&
                                        this.state.category !== 'jobs' && (
                                            (<ReactImageMagnify enlargedImagePosition='over' className='pl-3 img-fluid'  {...{
                                                smallImage: {
                                                    alt: 'Main Photo 2',
                                                    // isFluidWidth: false,
                                                    width: 500,
                                                    height: 400,
                                                    src: this.state.bigimage,

                                                },
                                                largeImage: {
                                                    src: this.state.bigimage,
                                                    width: 1200,
                                                    height: 1800,
                                                    isHintEnabled: true

                                                }
                                            }} />)
                                        )}








                                    {this.props.post.post.links && this.props.post.post.links.length !== 0 && (
                                        <Row className='d-inline text-left pl-4 pt-1 '>


                                            {
                                                this.props.post.post.links.map((link, index) =>
                                                    <CardImg key={index} className='p-1' onClick={this.ChangeBigImage}
                                                        style={{
                                                            height: '50px',
                                                            width: '50px'
                                                        }}
                                                        src={link} alt='forsalephotos' />
                                                )}

                                        </Row>
                                    )}

<Row className='d-inline text-left pl-4 pt-1 '>
                                {this.props.post.post.category === 'forsale' && (
                                    <React.Fragment>
                                       
                                        <div className='mt-2'>
                                            <h3 className="ml-2 mr-1 float-left "><span className='badge badge-secondary text-break'>Condition: {this.props.post.post.condition}</span></h3>
                                        </div>
                                    </React.Fragment>
                                )}

                                {(this.props.post.post.subcategory === 'Cars' || this.props.post.post.subcategory === 'Motorcycles') && (
                                    <React.Fragment>

                                        <div className='mt-2'>
                                            <h3 className="ml-2 mr-1  float-left"><span className='badge badge-secondary '>Make: {this.props.post.post.make}</span></h3>
                                            <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary '>Model: {this.props.post.post.model}</span></h3>
                                            <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary '>Odometer: {this.props.post.post.odometer}</span></h3>
                                        </div>
                                    </React.Fragment>

                                )}

                                {this.props.post.post.category === 'housing' && (
                                    <React.Fragment>
                                       
                                        <div className='mt-2'>
                                            <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary'>Rental type: {this.props.post.post.often}</span></h3>
                                        </div>
                                    </React.Fragment>

                                )}
                                {this.props.post.post.category === 'jobs' && (
                                    <React.Fragment>

                                       
                                        <div className='mt-2 '>
                                            <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary'>Salary: {this.props.post.post.salary}</span></h3>
                                            <h3 className="ml-2 mr-1 float-left "><span className='badge badge-secondary'>Company: {this.props.post.post.company}</span></h3>

                                        </div>
                                    </React.Fragment>

                                )}

                                {this.props.post.post.category === 'garagesale' && (
                                    <React.Fragment>

                                       
                                        <div className='mt-2'>
                                            <h3 className="ml-2 mr-1 float-left"><span className='badge badge-secondary '>Date: {moment(this.props.post.post.when).format("MMMM Do YYYY")}</span></h3>
                                        </div>
                                    </React.Fragment>

                                )}

                               


                                </Row>


                                    <h5 className='text-left pl-3 mt-3'>Description:</h5>
                                    <CardBody style={{ whiteSpace: 'pre-line' }} className='text-left pl-3 pt-2 border mx-3'>{this.props.post.post.description}</CardBody>
                                    <small className='text-left pl-4 mb-2'>{moment(this.props.post.post.date).fromNow()}  </small>
                                    <div className='mr-auto ml-2 mb-2'>
                                        <Dropdown size='sm' className='btn-sm ' isOpen={this.state.dropdown} toggle={this.dropdownToggle}>
                                            <DropdownToggle caret className=' bg-light text-dark'>
                                                {this.state.dropdownvalue}
                                            </DropdownToggle>
                                            <DropdownMenu>


                                                <DropdownItem value='newest'>Phone number: {this.props.post.post.phonenumber} </DropdownItem>
                                                <DropdownItem value='newest'>Email: {this.props.post.post.email}</DropdownItem>

                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </Card>

                            </Col>
                            <Col md='4'>
                                <QuickLinks/>
                                <SideQuestions/>
                            </Col>
                        </Row>

                    ) : (
                            <Spinner />
                        )}


                </Container >
            </Fade>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.form,
    question: state.question

})

export default connect(mapStateToProps, { getSpecificPost, clearPost })(PageLink)