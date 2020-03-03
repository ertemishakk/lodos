const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateFilters = (data) => {

    let errors = {}

    data.state = !isEmpty(data.state) ? data.state : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.minprice = !isEmpty(data.minprice) ? data.minprice : '';
    data.maxprice = !isEmpty(data.maxprice) ? data.maxprice : '';
    data.make = !isEmpty(data.make) ? data.make : '';
    data.minyear = !isEmpty(data.minyear) ? data.minyear : '';
    data.maxyear = !isEmpty(data.maxyear) ? data.maxyear : '';
    data.minkm = !isEmpty(data.minkm) ? data.minkm : '';
    data.maxkm = !isEmpty(data.maxkm) ? data.maxkm : '';
    data.subcategory = !isEmpty(data.subcategory) ? data.subcategory : '';


    if (Validator.isEmpty(data.subcategory)) {
        errors.subcategory = 'subcategory is empty'
    }
    if (Validator.isEmpty(data.state)) {
        errors.state = 'state is empty'
    }

    if (Validator.isEmpty(data.city)) {
        errors.city = 'city is empty'
    }

    if (Validator.isEmpty(data.minprice)) {
        errors.minprice = 'minimum price is empty'
    }

    if (Validator.isEmpty(data.maxprice)) {
        errors.maxprice = 'maximum price is empty'
    }

    if (Validator.isEmpty(data.make)) {
        errors.make = 'make is empty'
    }
    if (Validator.isEmpty(data.minyear)) {
        errors.minyear = 'minimum year is empty'
    }
    if (Validator.isEmpty(data.maxyear)) {
        errors.maxyear = 'maximum year is empty'
    }
    if (Validator.isEmpty(data.minkm)) {
        errors.minkm = 'minimum km is empty'
    }
    if (Validator.isEmpty(data.maxkm)) {
        errors.maxkm = 'maximum km is empty'
    }

    if (!Validator.isNumeric(data.minprice)) {
        errors.minpricenumber = 'Please enter a number'
    }
    if (!Validator.isNumeric(data.maxprice)) {
        errors.maxpricenumber = 'Please enter a number'
    }
    if (!Validator.isNumeric(data.minyear)) {
        errors.minyearnumber = 'Please enter a number'
    }
    if (!Validator.isNumeric(data.maxyear)) {
        errors.maxyearnumber = 'Please enter a number'
    }
    if (!Validator.isNumeric(data.minkm)) {
        errors.minkmnumber = 'Please enter a number'
    }
    if (!Validator.isNumeric(data.maxkm)) {
        errors.maxkmnumber = 'Please enter a number'
    }

    return {
        errors: errors
    }



}