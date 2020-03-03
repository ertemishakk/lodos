import React from 'react'

import {
    Container, Row, Col, Badge,
} from 'reactstrap';
import { connect } from 'react-redux'
import { stopQuestionFetchingOnMount } from '../actions/questionActions'
import YellowPages from './YellowPages';
import Feed from './Feed';
import News from './News'



class MainPage extends React.Component {

    state = {
        showFeed: true,
        showYellowPages: false,
        showNews: false
    }

    feedSelected = (e) => {
        this.setState({
            showFeed: true,
            showYellowPages: false,
            showNews: false
        })
    }

    showYellowPages = (e) => {
        this.setState({
            showFeed: false,
            showYellowPages: true,
            showNews: false
        })


        this.props.stopQuestionFetchingOnMount();

    }

    showNews = (e) => {
        this.setState({
            showFeed: false,
            showYellowPages: false,
            showNews: true
        })
        this.props.stopQuestionFetchingOnMount();

    }
    render() {
        return (
            <div>
                <Container>

                    <Row>
                        <Col >

                            <h5 className='text-center'>
                                {this.state.showFeed ? (
                                    <span className='mr-1'><Badge color="secondary" style={{ cursor: 'pointer' }} onClick={this.feedSelected}>Feed</Badge></span>

                                ) : (
                                        <span className='mr-1'><Badge color="light" style={{ cursor: 'pointer' }} onClick={this.feedSelected}>Feed</Badge></span>

                                    )}
                                {this.state.showYellowPages ? (
                                    <span className='mr-1'>  <Badge color="dark" style={{ cursor: 'pointer' }} onClick={this.showYellowPages}>Yellow Pages</Badge></span>

                                ) : (
                                        <span className='mr-1'>  <Badge color="light" style={{ cursor: 'pointer' }} onClick={this.showYellowPages}>Yellow Pages</Badge></span>

                                    )}

                                {this.state.showNews ? (
                                    <span className='mr-1'>  <Badge color="dark" style={{ cursor: 'pointer' }} onClick={this.showNews}>News</Badge></span>

                                ) : (
                                        <span className='mr-1'>  <Badge color="light" style={{ cursor: 'pointer' }} onClick={this.showNews}>News</Badge></span>

                                    )}

                            </h5>

                        </Col>
                    </Row>



                    {this.state.showFeed && (
                        <Feed />
                    )}




                    {this.state.showYellowPages && (
                        <YellowPages />
                    )}

                    {this.state.showNews && (
                        <News />
                    )}

                </Container>
            </div>

        )
    }

}


const mapStateToProps = state => ({
    question: state.question
})

export default connect(mapStateToProps, { stopQuestionFetchingOnMount })(MainPage)
