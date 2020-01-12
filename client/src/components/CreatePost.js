import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createHousingPost, createForSalePost } from '../actions/postActions'
import {
    InputGroup, InputGroupAddon, InputGroupText, Input,
    Container, Form, Label
} from 'reactstrap'
import Spinner from './Spinner'
import classnames from 'classnames'
import Autocomplete from 'react-google-autocomplete';



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
        language: '',
        errors: {},
        selectedFile: null,
        fileError: '',
        address: '',
        city: '',
        state: '',
        town: '',

    }

    // handleChange = address => {
    //     this.setState({ address });
    // };

    // handleSelect = address => {
    //     this.setState({ address });
    //     geocodeByAddress(address)
    //         .then(results => getLatLng(results[0]))
    //         .then(latLng => console.log('Success', latLng))
    //         .catch(error => console.error('Error', error));
    // };

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

        if (this.props.post.postError !== prevProps.post.postError) {
            this.setState({
                errors: this.props.post.postError,
            })
        }
        if (this.props.post.postError === prevProps.post.postError) {

            if (this.props.post.post !== prevProps.post.post) {

                let baseURL = this.state.category.toLowerCase().replace(/\s+/g, '')
                this.props.history.push({
                    pathname: `/${baseURL}` + `/${this.state.title}`,
                    state: {
                        title: this.props.post.post.title,
                        links: this.props.post.post.links,
                        price: this.props.post.post.price,
                        date: this.props.post.post.date,
                        description: this.props.post.post.description,
                        model: this.props.post.post.model,
                        make: this.props.post.post.make,
                        condition: this.props.post.post.condition,
                        email: this.props.post.post.email,
                        town: this.props.post.post.town,
                        phonenumber: this.props.post.post.phonenumber,
                        odometer: this.props.post.post.odometer,
                        url: 'createpost'
                    }
                })
            }

        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault()

        const { user } = this.props.auth

        if (this.state.category === 'For Sale') {

            const data = new FormData();

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
            data.append('phonenumber', this.state.phonenumber)
            data.append('language', this.state.language)
            data.append('description', this.state.description)
            data.append('price', this.state.price)
            data.append('postedby', user.name)
            data.append('userid', user.id)
            if (this.state.selectedFile !== null || '') {
                for (let i = 0; i < this.state.selectedFile.length; i++) {
                    data.append('image', this.state.selectedFile[i]);
                };
            }
            this.props.createForSalePost(data)
        }
        if (this.state.category === 'Housing') {
            const postData = {
                title: this.state.title,
                location: this.state.location,
                description: this.state.description,
                postedby: user.name,
                userid: user.id,
                category: this.state.category,
                email: this.state.email,
                phonenumber: this.state.phonenumber,
                language: this.state.language,
                postcode: this.state.postcode,
                price: this.state.price

            }
            // console.log(postData)
            this.props.createHousingPost(postData)
        }
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



    render() {

        const { errors } = this.state


        console.log(this.state)
        return (
            <Container>

                <Form onSubmit={this.onSubmit} className='mt-5 ' encType="multipart/form-data">
                    <h3>Create a posting</h3>

                    <InputGroup className='my-2 mt-3'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="post title" onChange={this.onChange} value={this.state.name} name='title' className={classnames('', { 'is-invalid': errors.title })} />
                        <div className='invalid-feedback'>{errors.title}</div>
                    </InputGroup>
                    <InputGroup className='my-2'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type='select' onChange={this.onChange} value={this.state.category} name='category' >
                            <option hidden>category</option>
                            <option value='Housing'>Housing</option>
                            <option value='For Sale'>For Sale</option>
                            <option value='Jobs'>Jobs</option>
                            <option value='Events'>Events</option>
                            <option value='Services'>Services</option>
                            <option value='Discussion Groups'>Discussion Groups</option>
                            <option value='Classess'>Classess</option>
                            <option value='Volunteers'>Volunteers</option>
                            <option value='Garage Sale'>Garage Sale</option>
                            <option value='Free'>Free</option>
                            <option value='Education'>Education</option>
                            <option value='Legal Services'>Legal Services</option>
                            <option value='Rentals'>Rentals</option>
                            <option value='Lost and Found'>Lost and Found</option>
                            <option value='Function Spaces'>Function Spaces</option>


                        </Input>
                    </InputGroup>

                    {this.state.category === 'For Sale' ? (


                        <InputGroup className='my-2'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input type='select' onChange={this.onChange} value={this.state.subcategory} name='subcategory' >
                                <option hidden>sub-category</option>
                                <option value='Applicances'>Applicances</option>
                                <option value='Books'>Books</option>
                                <option value='Business'>Business</option>
                                <option value='Cars'>Cars</option>
                                <option value='Electronics'>Electronics</option>
                                <option value='Free'>Free</option>
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





                    {this.state.category === 'For Sale' || 'Housing' ? (
                        <InputGroup className='my-2'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="price" onChange={this.onChange} value={this.state.price} name='price' className={classnames('', { 'is-invalid': errors.price })} />
                            <div className='invalid-feedback'>{errors.price}</div>
                        </InputGroup>

                    ) : null}


                    {this.state.subcategory === 'Cars' || this.state.subcategory === 'Motorcycles' ? (
                        <InputGroup className='my-2'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="make" onChange={this.onChange} value={this.state.make} name='make' className={classnames('', { 'is-invalid': errors.make })} />
                            <div className='invalid-feedback'>{errors.make}</div>
                        </InputGroup>
                    ) : null}

                    {this.state.subcategory === 'Cars' || this.state.subcategory === 'Motorcycles' ? (
                        <InputGroup className='my-2'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="model year" onChange={this.onChange} value={this.state.modelname} name='modelname' className={classnames('', { 'is-invalid': errors.model })} />
                            <div className='invalid-feedback'>{errors.nodel}</div>
                        </InputGroup>
                    ) : null}
                    {this.state.subcategory === 'Cars' || this.state.subcategory === 'Motorcycles' ? (
                        <InputGroup className='my-2'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="odometer" onChange={this.onChange} value={this.state.odometer} name='odometer' className={classnames('', { 'is-invalid': errors.odometer })} />
                            <div className='invalid-feedback'>{errors.odometer}</div>
                        </InputGroup>
                    ) : null}
                    {this.state.category === 'For Sale' ? (
                        <InputGroup className='my-2'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
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

                    <InputGroup className='my-2'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type='select' onChange={this.onChange} value={this.state.language} name='language' className={classnames('', { 'is-invalid': errors.language })} >
                            <option hidden>language of posting</option>
                            <option value='new'>english</option>
                            <option value='as new'>turkish</option>

                        </Input>
                        <div className='invalid-feedback'>{errors.language}</div>
                    </InputGroup>


                    <InputGroup className='my-2'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="email" onChange={this.onChange} value={this.state.email} name='email' className={classnames('', { 'is-invalid': errors.email })} />
                        <div className='invalid-feedback'>{errors.email}</div>
                    </InputGroup>

                    <InputGroup className='my-2'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="phone number" onChange={this.onChange} value={this.state.phonenumber} name='phonenumber' className={classnames('', { 'is-invalid': errors.phonenumber })} />
                        <div className='invalid-feedback'>{errors.phonenumber}</div>
                    </InputGroup>

                    <InputGroup className='my-2'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>

                        <Autocomplete
                            placeholder='city'
                            className='form-control'
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                            componentRestrictions={{ country: "aus" }}
                        />
                    </InputGroup>


                    <InputGroup className='my-2'>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" rows='8' placeholder="description" onChange={this.onChange} value={this.state.description} name='description' className={classnames('', { 'is-invalid': errors.description })} />
                        <div className='invalid-feedback'>{errors.description}</div>
                    </InputGroup>

                    <InputGroup>
                        <Label for="exampleFile">Attach photos</Label>
                        <Input type="file" name="image" id="exampleFile" multiple onChange={this.fileChange} className={classnames('', { 'is-invalid': errors.image })} />
                        {this.state.fileError !== '' ? (
                            <div className='invalid-feedback'>{this.state.fileError}</div>
                        ) : (
                                <div className='invalid-feedback'>{errors.image}</div>
                            )}

                    </InputGroup>
                    {this.props.post.loading ? (<Spinner />) : ''}
                    <Input type='submit' value='Publish' className='btn btn-info btn-block mt-4 p-2' />


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

export default connect(mapStateToProps, { createHousingPost, createForSalePost, })(CreatePost)