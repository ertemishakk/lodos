const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateData(data) {
    let errors = {}



    data.title = !isEmpty(data.title) ? data.title : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
    data.subcategory = !isEmpty(data.subcategory) ? data.subcategory : '';
    if (data.category !== 'jobs' && data.category !== 'garagesale' && data.category !== 'free' && data.category !== 'classes' &&
        data.category !== 'lostandfound' &&
        data.category !== 'events' &&
        data.category !== 'volunteers' &&
        data.category !== 'volunteers') {
        data.price = !isEmpty(data.price) ? data.price : '';

    }
    if (data.category === 'jobs') {
        data.salary = !isEmpty(data.salary) ? data.salary : '';
        if (!Validator.isNumeric(data.salary)) {
            errors.salary = 'Please enter a number'
        }
    }


    if (data.category !== 'forsale' && (data.subcategory === 'Cars' || data.subcategory === 'Motorcycles')) {
        data.odometer = !isEmpty(data.odometer) ? data.odometer : '';
        data.make = !isEmpty(data.make) ? data.make : '';
        data.model = !isEmpty(data.model) ? data.model : '';

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
    }


    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title is required'
    }
    if (!Validator.isLength(data.title, { min: 5, max: 120 })) {
        errors.title = 'Title must be between 5 and 120 characters'
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description is required'
    }
    if (data.category !== 'jobs' && data.category !== 'garagesale' && data.category !== 'free' &&
        data.category !== 'classes' &&
        data.category !== 'lostandfound' &&
        data.category !== 'events' &&
        data.category !== 'volunteers' &&
        data.category !== 'services' &&
        Validator.isEmpty(data.price)) {
        errors.price = 'Price is required'
    }
    if (data.category !== 'jobs' && data.category !== 'garagesale' && data.category !== 'free' &&
        data.category !== 'classes' &&
        data.category !== 'lostandfound' &&
        data.category !== 'events' &&
        data.category !== 'volunteers' &&
        data.category !== 'services' &&
        !Validator.isNumeric(data.price)) {
        errors.price = 'Please enter a number'
    }
    if (data.category === 'forsale' && Validator.isEmpty(data.condition)) {
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


    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}