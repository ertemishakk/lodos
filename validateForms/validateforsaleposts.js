const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateForSalePosts(data) {
    let errors = {}


    data.title = !isEmpty(data.title) ? data.title : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.make = !isEmpty(data.make) ? data.make : '';
    data.model = !isEmpty(data.model) ? data.model : '';
    data.language = !isEmpty(data.language) ? data.language : '';
    data.condition = !isEmpty(data.condition) ? data.condition : '';
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
    data.odometer = !isEmpty(data.odometer) ? data.odometer : '';


    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title is required'
    }
    if (!Validator.isLength(data.title, { min: 5, max: 40 })) {
        errors.title = 'Title must be between 5 and 40 characters'
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description is required'
    }
    if (Validator.isEmpty(data.price)) {
        errors.price = 'Price is required'
    }
    if (!Validator.isNumeric(data.price)) {
        errors.price = 'Please enter a number'
    }
    if (Validator.isEmpty(data.make)) {
        errors.make = 'Make is required'
    }
    if (Validator.isEmpty(data.model)) {
        errors.model = 'Model is required'
    }
    if (!Validator.isNumeric(data.model)) {
        errors.model = 'Please enter model number'
    }
    if (Validator.isEmpty(data.odometer)) {
        errors.odometer = 'Odometer is required'
    }
    if (!Validator.isNumeric(data.odometer)) {
        errors.odometer = 'Please enter odometer'
    }
    if (Validator.isEmpty(data.language)) {
        errors.language = 'Language is required'
    }
    if (Validator.isEmpty(data.condition)) {
        errors.condition = 'Condition is required'
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }
    if (Validator.isEmpty(data.phonenumber)) {
        errors.phonenumber = 'Phone number is required'
    }
    if (!Validator.isNumeric(data.phonenumber)) {
        errors.phonenumber = 'Please enter phone number'
    }
    console.log(errors)
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}