import React from 'react'
// import { Link } from 'react-router-dom'
import { ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux'



class Left extends React.Component {
    render() {
        let createposturl = ''

        if (this.props.auth.isAuthenticated) {
            createposturl = '/createpost'
        }
        else {
            createposturl = '/login'
        }
        return (
            <div className='container border mt-1' >
                {/* <span style={{ fontSize: '25px' }}>Lodos AU</span> */}

                < ListGroupItem style={{ border: 0 }} tag="a" href={createposturl}> create a posting</ListGroupItem >
                <ListGroupItem style={{ border: 0 }} tag="a" href="/login">my account</ListGroupItem>


                <div className="input-group px-3 ">

                    <input type="text" className="form-control text-center" placeholder="Search" />
                </div>

                <ListGroupItem style={{ border: 0 }} tag="a" href="/help">help, faq, abuse, legal</ListGroupItem>
                <ListGroupItem style={{ border: 0 }} tag="a" href="/avoidscams">avoid scams, fraud</ListGroupItem>
                <ListGroupItem style={{ border: 0 }} tag="a" href="#">personal safety tips</ListGroupItem>
                <ListGroupItem style={{ border: 0 }} tag="a" href="#">terms of use</ListGroupItem>

                {/* <ListGroupItem style={{ border: 0 }} tag="a" href="#">privacy policy</ListGroupItem> */}
                
                {/* <ListGroupItem style={{ border: 0 }} tag="a" href="#">about lodos</ListGroupItem> */}
                <ListGroupItem style={{ border: 0 }} tag="a" href="#">careers</ListGroupItem>
                <ListGroupItem style={{ border: 0 }} tag="a" href="#">feedback</ListGroupItem> 
                <ListGroupItem style={{ border: 0 }} tag="a" href="#">contact us</ListGroupItem>





            </div >

        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.form,

})

export default connect(mapStateToProps)(Left)
