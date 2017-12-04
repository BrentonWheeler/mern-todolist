import Autosuggest from "react-autosuggest";
import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import getTodoItemsAction from "../redux/actions/getTodoItemsAction";
// import getTrelloListItemsAction from "../redux/actions/getTrelloListItemsAction";
import styled from "styled-components";

const SearchInputStyledDiv = styled.div`
    body {
        font-family: Helvetica, sans-serif;
    }

    .react-autosuggest__container {
        position: relative;
    }

    .react-autosuggest__input {
        width: 240px;
        height: 30px;
        padding: 10px 20px;
        font-family: Helvetica, sans-serif;
        font-weight: 300;
        font-size: 16px;
        border: 1px solid #aaa;
        border-radius: 4px;
    }

    .react-autosuggest__input--focused {
        outline: none;
    }

    .react-autosuggest__input--open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .react-autosuggest__suggestions-container {
        display: none;
    }

    .react-autosuggest__suggestions-container--open {
        display: block;
        position: absolute;
        top: 51px;
        width: 280px;
        border: 1px solid #aaa;
        background-color: #fff;
        font-family: Helvetica, sans-serif;
        font-weight: 300;
        font-size: 16px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        z-index: 2;
    }

    .react-autosuggest__suggestions-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .react-autosuggest__suggestion {
        cursor: pointer;
        padding: 10px 20px;
    }

    .react-autosuggest__suggestion--highlighted {
        background-color: #ddd;
    }
`;

class SearchInput extends Component {
    constructor () {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            suggestions: []
        };
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
    }

    // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    escapeRegexCharacters (str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    getSuggestions (value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());

        if (escapedValue === "") {
            return [];
        }

        const regex = new RegExp("^" + escapedValue, "i");

        return this.props.githubIssues.filter(issue =>
            regex.test(issue.title + "/" + issue.repoName + "/" + issue.repoOwner)
        );
    }

    getSuggestionValue (suggestion) {
        return suggestion.title + "/" + suggestion.repoName + "/" + suggestion.repoOwner;
    }

    renderSuggestion (suggestion) {
        return <span>{suggestion.title + "/" + suggestion.repoName + "/" + suggestion.repoOwner}</span>;
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested ({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested () {
        this.setState({
            suggestions: []
        });
    }

    render () {
        const { suggestions } = this.state;
        const { value } = this.props;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: "<issue title>/<repository name>/<owner name>",
            value,
            onChange: this.props.onChange
        };

        return (
            <SearchInputStyledDiv className="row center-align">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
            </SearchInputStyledDiv>
        );
    }
}

export default SearchInput;
