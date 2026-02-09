import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pagesize: 6,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0 
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - GlobalPulse`;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    updateNews = async () => {
        // SECURE: Fetching API Key from environment variables
        const apiKey = process.env.REACT_APP_NEWS_API; 
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            articles: parsedData.articles || [],
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 }, this.updateNews);
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 }, this.updateNews);
    }

    render() {
        return (
            <div className='container my-3' style={{ marginTop: '90px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4 pt-5">
                    <div>
                        <h1 className="fw-bold" style={{ letterSpacing: '-1px' }}>
                            Top <span className="text-primary">{this.capitalizeFirstLetter(this.props.category)}</span> Headlines
                        </h1>
                        <p className="text-muted">Discover what's happening around the world right now.</p>
                    </div>
                    <div className="text-end d-none d-md-block">
                        <span className="badge bg-light text-dark border p-2">
                           {new Date().toDateString()}
                        </span>
                    </div>
                </div>

                {this.state.loading && <Spinner />}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 mb-4" key={element.url}>
                            <NewsItems
                                title={element.title ? element.title.slice(0, 45) : ""}
                                description={element.description ? element.description.slice(0, 88) : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                                source={element.source.name}
                            />
                        </div>
                    })}
                </div>

                <div className="container d-flex justify-content-center my-5">
                    <nav aria-label="Page navigation">
                        <ul className="pagination pagination-lg">
                            <li className={`page-item ${this.state.page <= 1 ? 'disabled' : ''}`}>
                                <button className="page-link shadow-sm text-dark" onClick={this.handlePreviousClick}>&laquo; Previous</button>
                            </li>
                            <li className="page-item disabled">
                                <span className="page-link text-dark fw-bold">{this.state.page}</span>
                            </li>
                            <li className={`page-item ${this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize) ? 'disabled' : ''}`}>
                                <button className="page-link shadow-sm text-dark" onClick={this.handleNextClick}>Next &raquo;</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default News