import Autosuggest from "react-autosuggest";
import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import getTodoItemsAction from "../redux/actions/getTodoItemsAction";
// import getTrelloListItemsAction from "../redux/actions/getTrelloListItemsAction";

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

        return this.props.githubIssues.filter(issue => regex.test(issue.title));
    }

    getSuggestionValue (suggestion) {
        return suggestion.title;
    }

    renderSuggestion (suggestion) {
        return <span>{suggestion.title}</span>;
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
            placeholder: "Seach by issue title",
            value,
            onChange: this.props.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default SearchInput;
