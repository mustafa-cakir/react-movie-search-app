import React, {Component} from 'react';
import './App.css';
import $ from 'jquery';
import MovieRow from "./components/MovieRow";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchHeight: 0,
            mainContent: null
        };
    }

    componentDidMount() {
        this.fetchAndRender({
            api: '/trending/movie/week',
            data: null
        })
    }

    fetchAndRender = options => {
        this.loadingAbstractEl.classList.remove('d-none');
        options.data = options.data || {};
        options.data.api_key = 'b40a8893f21d8cc420d35a26b105ef12';
        let content = [];
        $.ajax({
            url: 'https://api.themoviedb.org/3' + options.api,
            data: options.data
        }).done((data) => {
            if (data.results && data.results.length > 0) {
                data.results.forEach((movie) => {
                    movie.poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path;
                    content.push(<MovieRow movie={movie} key={movie.id}/>)
                });
            } else {
                content.push(<div className="fetch-alert nothing" key={1}>Nothing found...</div>)
            }
            if (options.scrollToTop) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }).fail((xhr) => {
            content.push(<div className="fetch-alert error" key={1}><strong>Error!</strong> Something seriously gone
                wrong :( <p><br/><code><strong>{xhr.status || ""}</strong><br/>{xhr.responseText}</code></p></div>);
        }).always(() => {
            this.setState({mainContent: content});
            this.loadingAbstractEl.classList.add('d-none');
        });
    };

    render() {
        return (
            <div className="App">
                <Navbar fetchAndRender={this.fetchAndRender}/>
                <main className="main">
                    <div className="loadingAbstract d-none" ref={(element) => {
                        this.loadingAbstractEl = element;
                    }}>
                        <Loading/>
                    </div>
                    <div className="container stripe">
                        {this.state.mainContent}
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default App;
