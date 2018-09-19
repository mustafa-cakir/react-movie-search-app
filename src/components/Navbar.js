import React, {Component} from 'react'
import logo from "../logo.svg"
import FontAwesome from "react-fontawesome"
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.searchHandler = debounce(this.searchHandler, 300);
        this.bodyClassList = document.body.classList;

    }

    toggleSearchBar = () => {
        this.bodyClassList.remove('navbar-opened');
        this.bodyClassList.toggle('searchbar-opened');
        setTimeout(() => {
            if (this.bodyClassList.contains('searchbar-opened')) this.searchInput.focus();
        }, 500);
    };
    toggleNavBar = () => {
        this.bodyClassList.remove('searchbar-opened');
        this.bodyClassList.toggle('navbar-opened');
    };
    clearSearch = () => {
        if (this.searchInput.value.length > 3) {
            this.props.fetchAndRender({
                api: '/trending/movie/week',
                data: null
            });
        }
        this.searchInput.value = '';
        this.bodyClassList.remove('searchbar-opened');
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
    };

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col col-menu px-0">
                            <div className="ham-button" onClick={this.toggleNavBar}>
                                    <span className="ham-border ham-border-top">
                                         <span className="ham-border-inner ham-border-inner-top"></span>
                                    </span>
                                <span className="ham-border ham-border-bottom">
                                        <span className="ham-border-inner ham-border-inner-bottom"></span>
                                    </span>
                            </div>
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
                <ul className="nav-list">
                    <li className="logo"><a href="/">LOGO</a></li>
                    <li><a href="/test">Menu 1</a></li>
                    <li><a href="/test">Menu 2</a></li>
                    <li><a href="/test">Menu 3</a></li>
                    <li><a href="/test">Menu 4</a></li>
                    <li><a href="/test">SubMenu 1</a></li>
                    <li><a href="/test">SubMenu 2</a></li>
                    <li><a href="/test">SubMenu 3</a></li>
                </ul>
                {/*<section className="sidebar">*/}
                {/*<nav className="nav-bar">*/}
                {/*<ul className="links mb-4">*/}
                {/*<li><a href="/test">Menu 1</a></li>*/}
                {/*<li><a href="/test">Menu 2</a></li>*/}
                {/*<li><a href="/test">Menu 3</a></li>*/}
                {/*<li><a href="/test">Menu 4</a></li>*/}
                {/*</ul>*/}
                {/*<ul className="sub-links">*/}
                {/*<li><a href="/test">SubMenu 1</a></li>*/}
                {/*<li><a href="/test">SubMenu 2</a></li>*/}
                {/*<li><a href="/test">SubMenu 3</a></li>*/}
                {/*<li><a href="/test">SubMenu 4</a></li>*/}
                {/*</ul>*/}
                {/*</nav>*/}
                {/*</section>*/}
                {/*<AnimateHeight*/}
                {/*duration={350}*/}
                {/*height={this.state.searchHeight}*/}
                {/*animateOpacity={true}*/}
                {/*onAnimationEnd={this.animationEnds}>*/}
                {/*<section className="search container px-0">*/}
                {/*<input*/}
                {/*ref={(input) => {*/}
                {/*this.searchInput = input;*/}
                {/*}}*/}
                {/*placeholder="Search..."*/}
                {/*className="search-input"*/}
                {/*onChange={this.onChangeHandler}*/}
                {/*/>*/}
                {/*<div className={this.state.showSearchClear ? '' : 'd-none'}>*/}
                {/*<button className="header-btn clear-search-btn" onClick={this.clearSearch}>*/}
                {/*<FontAwesome name="times"/>*/}
                {/*</button>*/}
                {/*</div>*/}
                {/*</section>*/}
                {/*</AnimateHeight>*/}
                <section className="searchbar">
                    <div className="container px-0 position-relative">
                        <FontAwesome name="search search-icon"/>
                        <input
                            ref={(input) => {
                                this.searchInput = input;
                            }}
                            placeholder="Search..."
                            className="search-input"
                            onChange={this.onChangeHandler}
                        />
                        <button className="header-btn search-clear-btn" onClick={this.clearSearch}>
                            <div className="close-icon"></div>
                        </button>
                    </div>
                </section>
            </header>
        )
    }
}

const debounce = (callback, delay) => {
    let timeout;
    return function () {
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

export default Navbar
