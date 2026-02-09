import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="card h-100 shadow-sm news-card">
                <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '1' }}>
                    <span className="badge rounded-pill bg-danger shadow-sm">{source}</span>
                </div>
                
                <div className="img-container">
                    <img 
                        src={imageUrl ? imageUrl : "https://via.placeholder.com/500"} 
                        className="card-img-top" 
                        alt="news" 
                        style={{ height: '220px', objectFit: 'cover' }} 
                    />
                </div>
                
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark" style={{ fontWeight: '700', lineHeight: '1.4' }}>
                        {title}...
                    </h5>
                    <p className="card-text text-secondary mb-4" style={{ fontSize: '0.95rem' }}>
                        {description}...
                    </p>
                    
                    <div className="mt-auto">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-light rounded-circle p-2 me-2" style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span className="text-uppercase fw-bold text-primary">{author ? author[0] : 'U'}</span>
                            </div>
                            <div className="small">
                                <p className="mb-0 fw-bold text-dark">{author ? author : "Anonymous"}</p>
                                <p className="mb-0 text-muted">{new Date(date).toLocaleDateString()} · 5 min read</p>
                            </div>
                        </div>
                        
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark w-100 read-more-btn shadow-sm">
                            Read Article
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems;