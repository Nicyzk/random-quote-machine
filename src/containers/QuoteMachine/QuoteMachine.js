import React, { Component } from 'react';
import classes from './QuoteMachine.module.css';
import Button from '../../components/QuoteMachine/Button/Button';
import 'font-awesome/css/font-awesome.min.css';
import axios from "../../axios-instances/axios-quotemachine";
import Spinner from "../../components/UI/Spinner/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./transition.css";

class QuoteMachine extends Component {
    state = {
        colors: ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"],
        quotes: [],
        loading: true,
        loaded: false,
        error: false,
        errorMessage: "",
        quoteId: null
    }

    componentDidMount() {
        axios.get("/quotes.json")
        .then(response => {
            this.setState({
                loading: false,
                quotes: response.data,
                quoteId: Math.floor(Math.random()*this.state.quotes.length)
            })
        })
        .catch(error => {
            console.log(error.message);
            this.setState({
                loading: false,
                error: true,
                errorMessage: error.message
            })
        })
    }

    newQuoteGenerator = () => {
        let quoteId = Math.floor(Math.random()*this.state.quotes.length);
        while (quoteId === this.state.quoteId) {
            quoteId = Math.floor(Math.random()*this.state.quotes.length);
        }
        this.setState({
            quoteId: quoteId
        })
    }

    render () {
        const currentColor = this.state.colors[Math.floor(Math.random()*12)];
        let quoteMachine = <Spinner/>;
        if (this.state.loading) { 
            quoteMachine = <Spinner/>
        }
        else {
            if (!this.state.error) {
                const currentQuote = this.state.quotes[this.state.quoteId];
                quoteMachine = (
                    <CSSTransition in={true} timeout={300} appear={true} classNames="fade">
                        <div className = {classes.container} id="quote-box" >
                            <TransitionGroup>
                                <CSSTransition timeout={300} key={this.state.quoteId} classNames="fade">
                                    <section className = {classes.quotesection} style = {{color: currentColor}}>
                                        <p id ="text" className = {classes.quotestyle}>"{currentQuote.quote}"</p>
                                        <p id ="author" className = {classes.author}>-{currentQuote.author}</p>
                                    </section>
                                </CSSTransition>
                            </TransitionGroup>
                            <section className = {classes.buttonsection}>
                                <div className = {classes.iconsection}>
                                    <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="blank">
                                        <Button backgroundcolor = {currentColor}>
                                            <i className="fa fa-twitter"></i>
                                        </Button>
                                    </a>
                                    <a id="tumblr" href="https://tumblr.com" target="blank">
                                        <Button backgroundcolor = {currentColor}>
                                            <i className="fa fa-tumblr"></i>
                                        </Button>
                                    </a>
                                </div>
                                <Button 
                                className = {classes.button}
                                backgroundcolor = {currentColor}
                                clicked = {this.newQuoteGenerator}
                                id="new-quote"
                                >New quote</Button>
                            </section>
                        </div>
                    </CSSTransition>
                    );
            }
    
            if (this.state.error) {
                quoteMachine = <div style = {{
                    textAlign: "center",
                    color: "white",
                    width: "100%",
                    fontSize: "1.2rem"
                    }}>{this.state.errorMessage}</div>
            }
        }

        return (
            <div className = {classes.background} style = {{backgroundColor: currentColor}}>
                {quoteMachine}
            </div>
        );
    }
}

export default QuoteMachine;