import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    ListGroupItem,

} from 'reactstrap'
import Flip from 'react-reveal/Flip';
import { connect } from 'react-redux'



class ProfileQuestions extends Component {



    render() {
        return (
            <div>
                {this.props.profileQuestions.map(pq => (
                    <Flip top key={pq._id}>
                        <ListGroupItem className='text-left' >
                            < Link to={{
                                pathname: `/question/${pq.title.replace(/[^A-Z0-9]+/ig, "-")}/${pq._id}`,
                            }} className='pt-2 text-left pl-4 font-weight-bold' style={{ fontSize: '14px' }}>
                                {pq.title}</Link>




                        </ListGroupItem>
                    </Flip>
                ))

                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.form,
})



export default connect(mapStateToProps, {})(ProfileQuestions)
