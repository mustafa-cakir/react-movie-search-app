import React, {Component} from 'react'
import logo from "../logo.svg"
import FontAwesome from "react-fontawesome"
import AnimateHeight from "react-animate-height"
import './Navbar.css'

class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchHeight: 0,
            showSearchClear: false
        };
    }
    
    componentDidMount() {
        this.searchHandler = debounce(this.searchHandler, 300)
    }

    toggleSearchBar = () => {
        this.setState({
            searchHeight: this.state.searchHeight === 0 ? 'auto' : 0,
        })
    };

    toggleNavBar = () => {
          document.body.classList.toggle('sidebar-open');
    };

    clearSearch = () => {
        this.searchInput.value = '';
        this.setState({
            searchHeight: 0,
            showSearchClear: false
        });
        this.props.fetchAndRender({
            api: '/trending/movie/week',
            data: null
        })
    };

    animationEnds = () => {
        if (this.state.searchHeight === 'auto') this.searchInput.focus();
    };

    onChangeHandler = event => {
        const searchTerm = event.target.value.toLowerCase();
        this.searchHandler(searchTerm);
    };

    searchHandler = searchTerm => {
        if (searchTerm.length > 3) {
            this.props.fetchAndRender({
                api: '/search/movie',
                data: {
                    query: searchTerm
                }
            });
        }
        this.setState({
            showSearchClear: (searchTerm.length > 0)
        });
    };

    render() {
        return (
            <div>
                <header className="header">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col col-menu px-0">
                                <button className="header-btn" onClick={this.toggleNavBar}>
                                    <FontAwesome name="bars"/>
                                </button>
                            </div>
                            <div className="col text-center">
                                <img src={logo} className="logo" alt="Movie Search"/>
                                <h1 className="header-title pl-0"><a href="/" title="Movie Search">Movie Search</a></h1>
                            </div>
                            <div className="col col-search px-0">
                                <button className="header-btn" onClick={this.toggleSearchBar}>
                                    <FontAwesome name="search"/>
                                </button>
                            </div>


                        </div>
                    </div>
                </header>
                <section className="sideBar">
                    <nav className="nav-bar">
                        <ul className="links mb-4">
                            <li><a href="/test">Menu 1</a></li>
                            <li><a href="/test">Menu 2</a></li>
                            <li><a href="/test">Menu 3</a></li>
                            <li><a href="/test">Menu 4</a></li>
                        </ul>
                        <ul className="sub-links">
                            <li><a href="/test">SubMenu 1</a></li>
                            <li><a href="/test">SubMenu 2</a></li>
                            <li><a href="/test">SubMenu 3</a></li>
                            <li><a href="/test">SubMenu 4</a></li>
                        </ul>
                    </nav>
                </section>
                <AnimateHeight
                    duration={350}
                    height={this.state.searchHeight}
                    animateOpacity={true}
                    onAnimationEnd={this.animationEnds}>
                    <section className="search container px-0">
                        <input
                            ref={(input) => {
                                this.searchInput = input;
                            }}
                            placeholder="Search..."
                            className="search-input"
                            onChange={this.onChangeHandler}
                        />
                        <div className={this.state.showSearchClear ? '' : 'd-none'}>
                            <button className="header-btn clear-search-btn" onClick={this.clearSearch}>
                                <FontAwesome name="times"/>
                            </button>
                        </div>
                    </section>
                </AnimateHeight>
            </div>
        )
    }
}

const debounce = (callback, delay) => {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            timeout = null;
            callback.apply(context, args);
        }, delay);
    }
};

export default MyHeader
