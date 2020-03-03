import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EachQuickLinks extends Component {

    state = {
        hovered: false,

    }

    hoverin = (e) => {
        this.setState({
            hovered: true
        })

    }

    out = (e) => {
        this.setState({
            hovered: false
        })

    }

    render() {
        var styles;

        if (this.state.hovered === false) {
            styles = {

                cursor: 'pointer'
            }
        }
        else {
            styles = {
                color: 'grey',
                cursor: 'pointer'
            }
        }
        return (
            <React.Fragment>
                <Link to={this.props.link} className='text-center' style={styles} onMouseLeave={this.out}
                    onMouseEnter={this.hoverin}>
                    {this.props.name}
                </Link>
            </React.Fragment>
        )
    }
}
export default EachQuickLinks