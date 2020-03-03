import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
    getStates, getTowns
} from '../actions/postActions'

class SideFilter extends Component {

    state = {
        state: '',
        city: '',
        minprice: '',
        maxprice: '',
        make: '',
        minyear: '',
        maxyear: '',
        minkm: '',
        maxkm: '',
        often: 'monthly'
    }

    componentDidMount() {
        if (!this.props.check.stopComponentReload) {
            this.props.getStates(this.props.category)

        }
    }
    componentDidUpdate(prevProps) {

        if (this.props.post.states !== prevProps.post.states) {
            this.props.post.states.map((eachState, index) =>
                this.props.getTowns(this.props.category, eachState, index)
            )
        }
    }

    onChange = (e) => {
        this.setState({
            state: e.target.value,
            city: ''
        })
    }

    setCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    setFilters = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    Reset = (e) => {
        this.setState({
            state: '',
            city: '',
            minprice: '',
            maxprice: '',
            make: '',
            minyear: '',
            maxyear: '',
            minkm: '',
            maxkm: '',
            often: 'monthly'

        })
        this.props.resetFilters()

    }

    Update = (e) => {
        const filter = {
            state: this.state.state,
            city: this.state.city,
            minprice: this.state.minprice,
            maxprice: this.state.maxprice,
            make: this.state.make,
            minyear: this.state.minyear,
            maxyear: this.state.maxyear,
            minkm: this.state.minkm,
            maxkm: this.state.maxkm,
            often: this.state.often
        }
        this.props.getFilters(filter)
    }

    render() {
        return (
            <Form className='pb-2' >
                <FormGroup >

                    <Input style={{ fontSize: '12px' }} type="select" name='select' value={this.state.state} onChange={this.onChange}>
                        <option hidden>State</option>
                        {this.props.post.states.map((eachState, index) =>
                            <option value={eachState} key={index} stateid={index}>{eachState}</option>
                        )}
                    </Input>
                </FormGroup>

                <FormGroup >

                    <Input style={{ fontSize: '12px' }} onChange={this.setCity} type="select" name="select" value={this.state.city}>
                        <option hidden>City</option>
                        {this.props.post[this.state.state] ? (

                            this.props.post[this.state.state].map((city, index) =>
                                <option value={city} key={index}>{city}</option>
                            )

                        ) : null}


                    </Input>
                </FormGroup>
                {this.props.category === 'housing' && (
                    <FormGroup >

                        <Input style={{ fontSize: '12px' }} onChange={this.setFilters} type="select" name="often" value={this.state.often}>
                            <option value='monthly' >Monthly</option>
                            <option value='biweekly'>Bi-weekly</option>
                            <option value='weekly'>Weekly</option>
                            <option value='daily'>Daily</option>
                        </Input>
                    </FormGroup>
                )}




                <Row form className='pt-2'>
                    {(this.props.category !== 'garagesale'
                        && this.props.category !== 'free'
                        && this.props.category !== 'lostandfound'
                        && this.props.category !== 'events'
                        && this.props.category !== 'volunteers'
                        && this.props.category !== 'classes'
                        && this.props.category !== 'services') && (
                            <React.Fragment>
                                <Col md='6' >
                                    <FormGroup>
                                        {this.props.category === 'jobs' ? (
                                            <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" type='text' placeholder='Min Salary' name='minprice' value={this.state.minprice} />

                                        ) : (
                                                <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" type='text' placeholder='Min Price' name='minprice' value={this.state.minprice} />

                                            )}

                                    </FormGroup>
                                </Col>
                                <Col md='6'  >
                                    <FormGroup >
                                        {this.props.category === 'jobs' ? (
                                            <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" type='text' placeholder='Max Salary' name='maxprice' value={this.state.maxprice} />

                                        ) : (
                                                <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" type='text' placeholder='Max Price' name='maxprice' value={this.state.maxprice} />

                                            )}


                                    </FormGroup>
                                </Col>
                            </React.Fragment>

                        )}
                </Row>
                {(this.props.subcategory === 'Cars' || this.props.subcategory === 'Motorcycles') && (

                    <div>

                        <FormGroup >
                            <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" className='text-center' type='text' placeholder='Make' name='make' value={this.state.make.toLowerCase(

                            )} />
                        </FormGroup>

                        <Row form className='pt-2'>
                            <Col md='6' >
                                <FormGroup>
                                    <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" type='text' placeholder='Min Year' name='minyear' value={this.state.minyear} />

                                </FormGroup>
                            </Col>
                            <Col md='6' >
                                <FormGroup >
                                    <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" type='text' placeholder='Max Year' name='maxyear' value={this.state.maxyear} />

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row form className='pt-2'>
                            <Col md='6'>
                                <FormGroup>
                                    <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" type='text' placeholder='Min Km' name='minkm' value={this.state.minkm} />

                                </FormGroup>
                            </Col>
                            <Col md='6'>
                                <FormGroup >
                                    <Input onChange={this.setFilters} style={{ fontSize: '10px' }} bsSize="sm" type='text' placeholder='Max Km' name='maxkm' value={this.state.maxkm} />

                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                )}
                <div className='mb-2 '>
                    <Button onClick={this.Reset} className='mr-2' outline size="sm" color="secondary">Reset</Button>
                    <Button onClick={this.Update} outline size="sm" color="primary">Update</Button>
                </div>

            </Form>
        )
    }
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.form,
    check: state.check
})


export default connect(mapStateToProps, {
    getStates, getTowns
})(SideFilter)