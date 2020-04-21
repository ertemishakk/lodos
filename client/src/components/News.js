import React, { Component } from 'react'
import Axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';
import Spinner from './Spinner'
class News extends Component {
    state = {
        news: [],
        fetching: false
    }

    async componentDidMount() {
        this.setState({
            fetching: true
        })
        Axios.get(`https://newsapi.org/v2/top-headlines?country=au&pageSize=25&apiKey=[YOUR_API_KEY]`)
            .then(res => {
                this.setState({
                    news: res.data.articles,
                    fetching: false
                })
            })

    }
    render() {
        return (
            <div className='container'>
                <div className='row  justify-content-center'>


                    <div>
                        {this.state.fetching && <Spinner />}
                        {this.state.news.map((eachNews, index) => (
                            <Card key={index} style={{ width: '70%' }} className='mx-auto p-4 my-2'>
                                <CardImg top width="100%" src={eachNews.urlToImage} alt="Card image cap" />
                                <CardTitle className='font-weight-bold pt-2' style={{ fontSize: '20px' }}>{eachNews.title}</CardTitle>
                                {/* <CardSubtitle className='text-muted'>Author: {eachNews.author}</CardSubtitle> */}
                                <CardBody>


                                    <CardText>{eachNews.description}</CardText>
                                    <Button href={eachNews.url}>Read More</Button>
                                </CardBody>
                            </Card>

                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default News
