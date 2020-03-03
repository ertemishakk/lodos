import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createYellowPagesPost, updatePost } from '../actions/postActions'
import {
    InputGroup, Input,
    Container, Form, Label, Button
} from 'reactstrap'
import Spinner from './Spinner'
import classnames from 'classnames'
import Autocomplete from 'react-google-autocomplete';
import PostImages from './PostImages'
import { getSpecificPost } from '../actions/postActions'
import DatePicker from 'reactstrap-date-picker'


class CreatePost extends Component {

    state = {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        price: '',
        make: '',
        modelname: '',
        odometer: '',
        condition: '',
        email: '',
        phonenumber: '',
        errors: {},
        selectedFile: null,
        fileError: '',
        city: '',
        state: '',
        town: '',
        buttonDisabled: false,
        updateDisabled: false,
        postUrl: '',
        often: 'monthly',
        salary: '',
        company: '',
        value: new Date().toISOString(),

    }

    componentDidMount() {
        if (this.state.category === '') {
            this.setState({
                buttonDisabled: true
            })
        }

        if (this.props.location.state !== undefined &&
            this.props.location.state.prevPath === 'updatepost') {
            this.props.getSpecificPost(this.props.location.state.category, this.props.location.state.postid)
            this.setState({
                postUrl: 'updatepost'
            })
        }
        else {
            this.setState({
                postUrl: 'createpost'
            })
        }

    }


    update = (e) => {

        this.setState({
            updateDisabled: true,

        })
        const updateData = new FormData();

        updateData.append('title', this.state.title)
        if (this.state.make !== '') {
            updateData.append('make', this.state.make)
        }
        if (this.state.modelname !== '') {
            updateData.append('model', this.state.modelname)
        }
        if (this.state.odometer !== '') {
            updateData.append('odometer', this.state.odometer)
        }
        if (this.state.price !== '') {
            updateData.append('price', this.state.price)
        }
        if (this.state.salary !== '') {
            updateData.append('salary', this.state.salary)
        }
        if (this.state.company !== '') {
            updateData.append('company', this.state.company)
        }
        if (this.state.often !== '') {
            updateData.append('often', this.state.often)
        }
        updateData.append('condition', this.state.condition)
        updateData.append('email', this.state.email)
        updateData.append('category', this.state.category)
        updateData.append('subcategory', this.state.subcategory)
        updateData.append('phonenumber', this.state.phonenumber)
        updateData.append('description', this.state.description)
        updateData.append('userid', this.props.auth.user.id)
        updateData.append('postid', this.props.location.state.postid)
        if (this.state.selectedFile !== null || '') {
            for (let i = 0; i < this.state.selectedFile.length; i++) {
                updateData.append('image', this.state.selectedFile[i]);
            };
        }
        this.props.updatePost(updateData)
    }


    onChange = (e) => {

        if (this.state.category.value !== '') {
            this.setState({
                buttonDisabled: false
            })
        }


        this.setState({
            [e.target.name]: e.target.value,

        })
    }

    maxSelectFile = (e) => {
        let files = e.target.files;

        if (files.length > 6) {
            this.setState({
                fileError: 'Max Photo 6'
            })
            return false;
        }
        return true;
    }

    fileChange = e => {
        if (this.maxSelectFile(e)) {
            this.setState({
                selectedFile: e.target.files
            })
        }
    }


    componentDidUpdate(prevProps) {

        if (this.props.post.post !== prevProps.post.post) {
            if (this.props.history.location.state) {
                this.setState({
                    title: this.props.post.post.title,
                    category: this.props.post.post.category,
                    subcategory: this.props.post.post.subcategory,
                    description: this.props.post.post.description,
                    price: this.props.post.post.price,
                    make: this.props.post.post.make === undefined ? ('') : (this.props.post.post.make),
                    modelname: this.props.post.post.model === undefined ? ('') : (this.props.post.post.model),
                    odometer: this.props.post.post.odometer === undefined ? ('') : (this.props.post.post.odometer),
                    condition: this.props.post.post.condition,
                    email: this.props.post.post.email,
                    phonenumber: this.props.post.post.phonenumber,
                    salary: this.props.post.post.salary === undefined ? ('') : (this.props.post.post.salary),
                    company: this.props.post.post.company === undefined ? ('') : (this.props.post.post.company),
                    value: this.props.post.post.when === undefined ? ('') : (this.props.post.post.when),


                })
            }
            else {
                let baseURL = this.state.category.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")
                if (this.state.subcategory !== '') {
                    this.props.history.push({
                        pathname: '/' + baseURL + '/' + this.state.subcategory + '/' + this.state.title.replace(/[^A-Z0-9]+/ig, "-") + '/' + this.props.post.post._id,
                        state: {
                            url: this.state.postUrl
                        }
                    })
                }
                else {
                    this.props.history.push({
                        pathname: '/' + baseURL + '/' + this.state.title.replace(/[^A-Z0-9]+/ig, "-") + '/' + this.props.post.post._id,
                        state: {
                            url: this.state.postUrl
                        }
                    })
                }
            }
        }

        if (this.props.post.postError !== prevProps.post.postError) {
            this.setState({
                errors: this.props.post.postError,
                buttonDisabled: false,
                updateDisabled: false
            })
        }


        if (this.props.history.location.state && this.props.history.location.state.prevPath &&
            this.props.post.updateSuccess !== prevProps.post.updateSuccess) {
            let baseURL = this.state.category.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")
            if (this.props.post.post.subcategory) {
                this.props.history.push({
                    pathname: '/' + baseURL + '/' + this.state.subcategory + '/' + this.state.title.replace(/[^A-Z0-9]+/ig, "-") + '/' + this.props.post.post._id,
                    state: {
                        url: this.state.postUrl
                    }
                })
            }
            else {
                this.props.history.push({
                    pathname: '/' + baseURL + '/' + this.state.title.replace(/[^A-Z0-9]+/ig, "-") + '/' + this.props.post.post._id,
                    state: {
                        url: this.state.postUrl
                    }
                })
            }


        }
    }




    onSubmit = (e) => {

        e.preventDefault()

        this.setState({
            buttonDisabled: true
        })
        const { user } = this.props.auth

        const data = new FormData();


        if (this.state.category === 'forsale' && (this.state.subcategory === 'Cars'
            || this.state.subcategory === 'Motorcycles')) {

            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('make', this.state.make)
            data.append('model', this.state.modelname)
            data.append('odometer', this.state.odometer)
            data.append('condition', this.state.condition)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('subcategory', this.state.subcategory)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('price', this.state.price)
            data.append('postedby', user.name)
            data.append('userid', user.id)
            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        if (this.state.category === 'forsale' && (this.state.subcategory !== 'Cars'
            && this.state.subcategory !== 'Motorcycles')) {

            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('subcategory', this.state.subcategory)
            data.append('condition', this.state.condition)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('price', this.state.price)
            data.append('postedby', user.name)
            data.append('userid', user.id)
            data.append('image', this.state.selectedFile);
            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        if (this.state.category === 'housing') {

            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('subcategory', this.state.subcategory)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('price', this.state.price)
            data.append('postedby', user.name)
            data.append('userid', user.id)
            data.append('often', this.state.often)
            data.append('image', this.state.selectedFile);
            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        if (this.state.category === 'jobs') {
            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('subcategory', this.state.subcategory)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('salary', this.state.salary)
            data.append('postedby', user.name)
            data.append('userid', user.id)
            data.append('company', this.state.company)
        }

        if (this.state.category === 'garagesale') {
            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('subcategory', this.state.subcategory)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('value', this.state.value)
            data.append('postedby', user.name)
            data.append('userid', user.id)

            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        if (this.state.category === 'free') {
            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('postedby', user.name)
            data.append('userid', user.id)

            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        if (this.state.category === 'events') {
            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('postedby', user.name)
            data.append('userid', user.id)

            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        if (this.state.category === 'classes') {
            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('postedby', user.name)
            data.append('userid', user.id)

            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        if (this.state.category === 'volunteers') {
            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('postedby', user.name)
            data.append('userid', user.id)

            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        if (this.state.category === 'lostandfound') {
            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('postedby', user.name)
            data.append('userid', user.id)

            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }
        if (this.state.category === 'services') {
            data.append('title', this.state.title)
            data.append('town', this.state.town)
            data.append('city', this.state.city)
            data.append('state', this.state.state)
            data.append('email', this.state.email)
            data.append('category', this.state.category)
            data.append('phonenumber', this.state.phonenumber)
            data.append('description', this.state.description)
            data.append('postedby', user.name)
            data.append('userid', user.id)
            data.append('subcategory', this.state.subcategory)

            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
        }

        this.props.createYellowPagesPost(this.state.category, data)

    }


    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };

    getTown = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    onPlaceSelected = (place) => {

        // const address = place.formatted_address
        const addressArray = place.address_components
        const city = this.getCity(addressArray)
        const town = this.getTown(addressArray)
        const state = this.getState(addressArray)

        this.setState({
            city: city,
            town: town,
            state: state
        })
    };

    setDate(value) {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
        })
    }


    render() {
        const { errors } = this.state
        console.log(this.state)
        return (
            <Container>

                <Form onSubmit={this.onSubmit} className='mt-5 ' encType="multipart/form-data">
                    <h3>Create a posting</h3>

                    <InputGroup className='my-2 mt-3'>

                        <Input placeholder="post title" onChange={this.onChange} value={this.state.title} name='title' className={classnames('', { 'is-invalid': errors.title })} />
                        <div className='invalid-feedback'>{errors.title}</div>
                    </InputGroup>
                    <InputGroup className='my-2'>

                        <Input type='select' onChange={this.onChange} value={this.state.category} name='category' >
                            <option hidden>category</option>
                            <option value='housing'>Housing</option>
                            <option value='forsale'>For Sale</option>
                            <option value='jobs'>Jobs</option>
                            <option value='garagesale'>Garage Sale</option>
                            <option value='events'>Events</option>
                            <option value='services'>Services</option>
                            <option value='classes'>Classess</option>
                            <option value='volunteers'>Volunteers</option>
                            <option value='free'>Free</option>
                            <option value='lostandfound'>Lost and Found</option>
                            <option value='functionspaces'>Function Spaces</option>
                        </Input>
                    </InputGroup>

                    {this.state.category === 'garagesale' && (
                        <React.Fragment>
                            <InputGroup className='my-2'>
                                <DatePicker
                                    value={this.state.value}
                                    onChange={(v, f) => this.setDate(v, f)}
                                    showTodayButton={true}
                                />

                                {/* <Input type='select' onChange={this.onChange} value={this.state.subcategory} name='subcategory' >
                                    <option hidden>sub-category</option>
                                    <option value='forlease'>For Lease/Rent</option>
                                    <option value='housingforsale'>For Sale</option>
                                    <option value='rooms'>Rooms</option>
                                    <option value='officecommercial'>Office/Commercial</option>
                                    <option value='parkingstorage'>Parking/Storage</option>

                                </Input> */}
                            </InputGroup>
                        </React.Fragment>
                    )}
                    {this.state.category === 'services' && (
                        <React.Fragment>
                            <InputGroup className='my-2'>
                                <Input type='select' onChange={this.onChange} value={this.state.subcategory} name='subcategory' >
                                    <option hidden>sub-category</option>
                                    <option value='beauty'>Beauty</option>
                                    <option value='cars'>Cars/Automotive</option>
                                    <option value='electronics'>Electronics</option>
                                    <option value='farm'>Farm</option>
                                    <option value='financial'>Financial</option>
                                    <option value='labour'>Labour</option>
                                    <option value='pet'>Pet</option>


                                </Input>
                            </InputGroup>
                        </React.Fragment>
                    )}

                    {this.state.category === 'housing' && (
                        <React.Fragment>
                            <InputGroup className='my-2'>
                                <Input type='select' onChange={this.onChange} value={this.state.subcategory} name='subcategory' >
                                    <option hidden>sub-category</option>
                                    <option value='forlease'>For Lease/Rent</option>
                                    <option value='housingforsale'>For Sale</option>
                                    <option value='rooms'>Rooms</option>
                                    <option value='officecommercial'>Office/Commercial</option>
                                    <option value='parkingstorage'>Parking/Storage</option>

                                </Input>
                            </InputGroup>
                        </React.Fragment>
                    )}

                    {this.state.category === 'forsale' ? (


                        <InputGroup className='my-2'>
                            <Input type='select' onChange={this.onChange} value={this.state.subcategory} name='subcategory' >
                                <option hidden>sub-category</option>
                                <option value='Applicances'>Applicances</option>
                                <option value='Books'>Books</option>
                                <option value='Business'>Business</option>
                                <option value='Cars'>Cars</option>
                                <option value='Electronics'>Electronics</option>
                                <option value='Furniture'>Furniture</option>
                                <option value='Garage Sale'>Garage Sale</option>
                                <option value='Household'>Household</option>
                                <option value='Jewelery'>Jewelery</option>
                                <option value='Motorcycles'>Motorcycles</option>
                                <option value='Tickets'>Tickets</option>
                                <option value='Others'>Others</option>
                            </Input>
                        </InputGroup>
                    ) : null}


                    {this.state.category === 'jobs' && (


                        <InputGroup className='my-2'>
                            <Input type='select' onChange={this.onChange} value={this.state.subcategory} name='subcategory' >
                                <option hidden>sub-category</option>
                                <option value='accounting'>Accounting/Finance</option>
                                <option value='admin'>Admin/Office</option>
                                <option value='customer'>Customer Services</option>
                                <option value='general'>General Labour</option>
                                <option value='realestate'>Real estate</option>
                                <option value='human'>Human Resources</option>
                                <option value='legal'>Legal/Parelegal</option>
                                <option value='manufacturing'>Manufacturing</option>
                                <option value='marketing'>Marketing</option>
                                <option value='medical'>Medical/Health</option>
                                <option value='retail'>Retail/Wholesale</option>
                                <option value='information'>Information Technology</option>

                            </Input>
                        </InputGroup>
                    )}

                    {this.state.category === 'jobs' && (
                        <React.Fragment>
                            <InputGroup className='my-2'>
                                <Input placeholder="offered salary" onChange={this.onChange} value={this.state.salary} name='salary' className={classnames('', { 'is-invalid': errors.salary })} />
                                <div className='invalid-feedback'>{errors.salary}</div>

                            </InputGroup>

                            <InputGroup className='my-2'>
                                <Input placeholder="company" onChange={this.onChange} value={this.state.company} name='company' />
                            </InputGroup>
                        </React.Fragment>

                    )}





                    {this.state.category === 'forsale' || this.state.category === 'housing' ? (
                        <InputGroup className='my-2'>
                            <Input placeholder="price" onChange={this.onChange} value={this.state.price} name='price' className={classnames('', { 'is-invalid': errors.price })} />
                            {this.state.category === 'housing' && this.state.subcategory !== 'housingforsale' && (
                                <Input type='select' onChange={this.onChange} value={this.state.often} name='often' >
                                    <option value='monthly'>monthly</option>
                                    <option value='biweekly'>bi-weekly</option>
                                    <option value='weekly'>weekly</option>
                                    <option value='daily'>daily</option>
                                </Input>
                            )}
                        </InputGroup>

                    ) : null}


                    {(this.state.subcategory === 'Cars' || this.state.subcategory === 'Motorcycles') ? (
                        <InputGroup className='my-2'>
                            <Input placeholder="make" onChange={this.onChange} value={this.state.make} name='make' className={classnames('', { 'is-invalid': errors.make })} />
                            <div className='invalid-feedback'>{errors.make}</div>
                        </InputGroup>
                    ) : null}

                    {(this.state.subcategory === 'Cars' || this.state.subcategory === 'Motorcycles') ? (
                        <InputGroup className='my-2'>
                            <Input placeholder="model year" onChange={this.onChange} value={this.state.modelname} name='modelname' className={classnames('', { 'is-invalid': errors.model })} />
                            <div className='invalid-feedback'>{errors.model}</div>
                        </InputGroup>
                    ) : null}
                    {(this.state.subcategory === 'Cars' || this.state.subcategory === 'Motorcycles') ? (
                        <InputGroup className='my-2'>
                            <Input placeholder="odometer" onChange={this.onChange} value={this.state.odometer} name='odometer' className={classnames('', { 'is-invalid': errors.odometer })} />
                            <div className='invalid-feedback'>{errors.odometer}</div>
                        </InputGroup>
                    ) : null}
                    {this.state.category === 'forsale' ? (
                        <InputGroup className='my-2'>
                            <Input type='select' onChange={this.onChange} value={this.state.condition} name='condition' className={classnames('', { 'is-invalid': errors.condition })} >
                                <option hidden>condition</option>
                                <option value='new'>new</option>
                                <option value='as new'>as new</option>
                                <option value='excellent'>excellent</option>
                                <option value='good'>good</option>
                                <option value='fair'>fair</option>
                                <option value='salvage'>salvage</option>



                            </Input>
                            <div className='invalid-feedback'>{errors.condition}</div>
                        </InputGroup>
                    ) : null}

                    {/* <InputGroup className='my-2'>
                       
                        <Input type='select' onChange={this.onChange} value={this.state.language} name='language' className={classnames('', { 'is-invalid': errors.language })} >
                            <option hidden>language of posting</option>
                            <option value='new'>english</option>
                            <option value='as new'>turkish</option>

                        </Input>
                        <div className='invalid-feedback'>{errors.language}</div>
                    </InputGroup> */}


                    <InputGroup className='my-2'>

                        <Input placeholder="email" onChange={this.onChange} value={this.state.email} name='email' className={classnames('', { 'is-invalid': errors.email })} />
                        <div className='invalid-feedback'>{errors.email}</div>
                    </InputGroup>

                    <InputGroup className='my-2'>

                        <Input placeholder="phone number" onChange={this.onChange} value={this.state.phonenumber} name='phonenumber' className={classnames('', { 'is-invalid': errors.phonenumber })} />
                        <div className='invalid-feedback'>{errors.phonenumber}</div>
                    </InputGroup>


                    {Object.keys(this.props.post.post).length === 0 && (
                        <InputGroup className='my-2'>
                            <Autocomplete
                                placeholder='city'
                                className='form-control'
                                onPlaceSelected={this.onPlaceSelected}
                                types={['(regions)']}
                                componentRestrictions={{ country: "aus" }}
                            />
                        </InputGroup>
                    )}




                    <InputGroup className='my-2'>

                        <Input type="textarea" rows='8' placeholder="description" onChange={this.onChange} value={this.state.description} name='description' className={classnames('', { 'is-invalid': errors.description })} />
                        <div className='invalid-feedback'>{errors.description}</div>
                    </InputGroup>


                    {this.state.category !== 'jobs' && (


                        <InputGroup>
                            <Label for="exampleFile">Attach photos</Label>
                            <Input type="file" name="image" id="exampleFile" multiple onChange={this.fileChange} className={classnames('', { 'is-invalid': errors.image })} />



                            {(!this.props.post.post.links)
                                ? ('') : (

                                    <small>*Click on photos to delete</small>


                                )}




                            {this.state.fileError !== '' ? (
                                <div className='invalid-feedback'>{this.state.fileError}</div>
                            ) : (
                                    <div className='invalid-feedback'>{errors.image}</div>
                                )}

                        </InputGroup>
                    )}


                    {(!Object.keys(this.props.post.post).length > 0)
                        ? ('') : (
                            this.props.post.post.links &&
                            this.props.post.post.links.map((link, index) => (
                                <PostImages src={link} key={index}
                                    postid={this.props.post.post._id}
                                    category={this.props.post.post.category} />
                            ))

                        )}




                    {this.props.post.loading ? (<Spinner />) : ''}
                    {(this.props.location.state === undefined || this.props.location.state.prevPath !== 'updatepost') ? (
                        <Input disabled={this.state.buttonDisabled} type='submit' value='Publish' className='btn btn-info btn-block mt-4 p-2 mb-4 ' />

                    ) : (
                            <Button disabled={this.state.updateDisabled} onClick={this.update} className='btn btn-info btn-block mt-4 p-2 mb-4'>Update Post</Button>

                        )}


                </Form>

            </Container >
        )
    }
}


const mapStateToProps = state => ({
    post: state.post,
    auth: state.form
    // errors: state.errors
})

export default connect(mapStateToProps, { createYellowPagesPost, updatePost, getSpecificPost })(CreatePost)