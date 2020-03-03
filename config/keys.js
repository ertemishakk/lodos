if (process.env.NODE_ENV === 'production') {
    module.exports = require('./key_prod')
}
else {
    module.exports = require('./keys_dev')
}