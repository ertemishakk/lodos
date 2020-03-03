import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router-dom'


class MainPageCategories extends Component {

    state = {
        category: '',
        subcategory: ''
    }

    setCategory = (e) => {
        this.setState({
            category: e.target.getAttribute('value')
        }, () => {
            if (this.state.category === 'garagesale' || this.state.category === 'free' ||
                this.state.category === 'volunteers' || this.state.category === 'events' || this.state.category === 'classes'
                || this.state.category === 'lostandfound') {
                this.props.history.push(`/${this.state.category}`)
            }
        })

        if (this.state.category !== '') {
            this.setState({
                category: ''
            })
        }
    }

    setSub = (e) => {
        this.setState({
            subcategory: e.target.getAttribute('value')
        })
    }

    render() {
        let url = `/${this.state.category}/${this.state.subcategory}`

        return (
            <div>

                {this.state.category === '' ? (
                    <ListGroup style={{ color: '#61aaff' }}>
                        <ListGroupItem value='housing' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Housing</ListGroupItem>
                        <ListGroupItem value='forsale' onClick={this.setCategory} style={{ cursor: 'pointer' }}>For Sale</ListGroupItem>
                        <ListGroupItem value='jobs' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Jobs</ListGroupItem>
                        <ListGroupItem value='garagesale' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Garage Sale</ListGroupItem>
                        <ListGroupItem value='free' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Free</ListGroupItem>
                        <ListGroupItem value='services' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Services</ListGroupItem>
                        <ListGroupItem value='volunteers' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Volunteers</ListGroupItem>
                        <ListGroupItem value='classes' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Classes</ListGroupItem>
                        <ListGroupItem value='events' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Events</ListGroupItem>
                        <ListGroupItem value='lostandfound' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Lost and Found</ListGroupItem>
                        {/* <ListGroupItem value='functionspaces' onClick={this.setCategory} style={{ cursor: 'pointer' }}>Function Spaces </ListGroupItem> */}
                    </ListGroup>
                ) : (
                        <ListGroup>
                            {this.state.category === 'housing' && (
                                <React.Fragment>
                                    <ListGroupItem value='forlease' tag="a" href={url} onClick={this.setSub}>For Lease/Rent</ListGroupItem>
                                    <ListGroupItem value='forsale' tag="a" href={url} onClick={this.setSub}> For Sale</ListGroupItem>
                                    <ListGroupItem value='rooms' tag="a" href={url} onClick={this.setSub}>Rooms</ListGroupItem>
                                    <ListGroupItem value='office' tag="a" href={url} onClick={this.setSub}>Office/Commercial</ListGroupItem>
                                    <ListGroupItem value='parking' tag="a" href={url} onClick={this.setSub}>Parking/Storage</ListGroupItem>
                                </React.Fragment>
                            )}

                            {this.state.category === 'forsale' && (
                                <React.Fragment>
                                    <ListGroupItem onClick={this.setSub} value='Applicances' tag="a" href={url} >Applicances </ListGroupItem>
                                    <ListGroupItem value='Books' tag="a" href={url} onClick={this.setSub}>Books </ListGroupItem>
                                    <ListGroupItem value='Business' tag="a" href={url} onClick={this.setSub}>Business </ListGroupItem>
                                    <ListGroupItem value='Cars' tag="a" href={url} onClick={this.setSub}>Cars </ListGroupItem>
                                    <ListGroupItem value='Electronics' tag="a" href={url} onClick={this.setSub}>Electronics </ListGroupItem>
                                    <ListGroupItem value='Furniture' tag="a" href={url} onClick={this.setSub}>Furniture </ListGroupItem>
                                    <ListGroupItem value='Garage' tag="a" href={url} onClick={this.setSub}>Garage Sale </ListGroupItem>
                                    <ListGroupItem value='Household' tag="a" href={url} onClick={this.setSub}>Household </ListGroupItem>
                                    <ListGroupItem value='Jewelery' tag="a" href={url} onClick={this.setSub}>Jewelery </ListGroupItem>
                                    <ListGroupItem value='Motorcycles' tag="a" href={url} onClick={this.setSub}>Motorcycles </ListGroupItem>
                                    <ListGroupItem value='Tickets' tag="a" href={url} onClick={this.setSub}> Tickets </ListGroupItem>
                                    <ListGroupItem value='Others' tag="a" href={url} onClick={this.setSub}>Others </ListGroupItem>
                                </React.Fragment>


                            )}

                            {this.state.category === 'jobs' && (
                                <React.Fragment>
                                    <ListGroupItem value='all' tag="a" href={url} onClick={this.setSub}>All </ListGroupItem>
                                    <ListGroupItem value='accounting' tag="a" href={url} onClick={this.setSub}>Accounting/Finance </ListGroupItem>
                                    <ListGroupItem value='admin' tag="a" href={url} onClick={this.setSub}>Admin/Office </ListGroupItem>
                                    <ListGroupItem value='customer' tag="a" href={url} onClick={this.setSub}>Customer Services </ListGroupItem>
                                    <ListGroupItem value='general' tag="a" href={url} onClick={this.setSub}>General Labour</ListGroupItem>
                                    <ListGroupItem value='realestate' tag="a" href={url} onClick={this.setSub}>Real estate </ListGroupItem>
                                    <ListGroupItem value='human' tag="a" href={url} onClick={this.setSub}>Human Resources </ListGroupItem>
                                    <ListGroupItem value='legal' tag="a" href={url} onClick={this.setSub}>Legal/Parelegal </ListGroupItem>
                                    <ListGroupItem value='manufacturing' tag="a" href={url} onClick={this.setSub}> Manufacturing </ListGroupItem>
                                    <ListGroupItem value='marketing' tag="a" href={url} onClick={this.setSub}>Marketing </ListGroupItem>
                                    <ListGroupItem value='medical' tag="a" href={url} onClick={this.setSub}>Medical/Health </ListGroupItem>
                                    <ListGroupItem value='retail' tag="a" href={url} onClick={this.setSub}> Retail/Wholesale </ListGroupItem>
                                    <ListGroupItem value='information' tag="a" href={url} onClick={this.setSub}>Information Technology </ListGroupItem>
                                </React.Fragment>
                            )}


                            {this.state.category === 'services' && (
                                <React.Fragment>
                                    <ListGroupItem value='all' tag="a" href={url} onClick={this.setSub}>All </ListGroupItem>
                                    <ListGroupItem value='beauty' tag="a" href={url} onClick={this.setSub}>Beauty </ListGroupItem>
                                    <ListGroupItem value='cars' tag="a" href={url} onClick={this.setSub}>Cars/Automotive</ListGroupItem>
                                    <ListGroupItem value='electronics' tag="a" href={url} onClick={this.setSub}>Electronics</ListGroupItem>
                                    <ListGroupItem value='farm' tag="a" href={url} onClick={this.setSub}>Farm/Garden</ListGroupItem>
                                    <ListGroupItem value='financial' tag="a" href={url} onClick={this.setSub}>Financial</ListGroupItem>
                                    <ListGroupItem value='labour' tag="a" href={url} onClick={this.setSub}>Labour/Move</ListGroupItem>
                                    <ListGroupItem value='pet' tag="a" href={url} onClick={this.setSub}>Pet</ListGroupItem>
                                </React.Fragment>
                            )}
                            {
                                this.state.category === 'services' ||
                                    this.state.category === 'jobs' ||
                                    this.state.category === 'forsale' ||
                                    this.state.category === 'housing' ? (
                                        <ListGroupItem onClick={this.setCategory} style={{ color: '#61aaff', cursor: 'pointer' }}><i className="fas fa-undo pr-2"></i>Back</ListGroupItem>

                                    ) : null}
                        </ListGroup>
                    )}

            </div>
        )
    }
}
export default withRouter(MainPageCategories)