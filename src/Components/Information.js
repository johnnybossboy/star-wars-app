import React, { Component } from 'react';
import {connect} from 'react-redux';
import store from './../Redux/Store';

// I don't get how Redux can help here. I need to set the received data in the reducer, but how?
// Later, I found out I could dispatch an action when data is received from API call.

class Information extends Component {
    componentDidMount(){
        this.getPersons();
    }

    getPersons(){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://swapi.co/api/people/", true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    store.dispatch({
                        type: "LIST_PEOPLE_RECEIVED",
                        payload: JSON.parse(xhr.responseText).results,
                        errorMessage: ""
                    });
                } else {
                    store.dispatch({
                        type: "LIST_PEOPLE_RECEIVED",
                        payload: "",
                        errorMessage: xhr.status + ": " + xhr.statusText
                    });
                }
            }
        };

        xhr.send(null);
    }

    render(){
        return(
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-sm-offset-3 mt-navbar">
                    <div className="card">
                        <h2 className="text--bold">Search for persons from Star Wars</h2>
                        <form onSubmit={this.props.onSubmitSearchForm}>
                            <input
                                className="input--wide"
                                type="text"
                                placeholder="Search for persons..."
                                onChange={this.props.onChangeInputSearch}
                                ref={(input) => {this.inputSearch = input}}
                            />
                            <button
                                className="btn btn--primary btn--wide"
                                onClick={this.props.onSubmitSearchForm}
                            >
                                Search
                            </button>
                        </form>

                        <div className={this.props.searchResults.length === 0 ? "hidden" : "row"}>
                            <div className="col-xs-12 mt-small">
                                <p className="no-margin">Did you mean...?</p>
                                <ul className="list no-margin">
                                    {this.props.searchResults.map((result) => {
                                        return (
                                            <li key={result.name}>{result.name}</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        <hr style={{marginLeft: -40, width: 'calc(100% + 80px)'}} />

                        <div className="row">
                            <div className="col-xs-12 no-padding">
                                <button
                                    className="btn btn--secondary btn--wide-xs"
                                    onClick={() => {this.props.onClickSort(this.props.sortDirection)}}
                                >Sort {this.props.sortDirection}
                                <i className="fa fa-arrow-down"></i>
                                </button>
                            </div>
                            
                        </div>

                        <h3 className="stripe--below__small">List of persons in Star Wars</h3>
                        <ul className="list">
                            {this.props.results.map((result, index) => {
                                return (
                                    <li key={"result" + index}>{result.name}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        results: state.informationReducer.names,
        sortDirection: state.informationReducer.sortDirection,
        searchResults: state.informationReducer.searchResults
    }
}

function mapDispatchToProps(dispatch){
    return {
        onChangeInputSearch: (event) => {
            console.log(event.target.value);
            dispatch({
                type: "SEARCH_INPUT_CHANGED",
                payload: event.target.value
            });
        },
        onSubmitSearchForm: (event) => {
            event.preventDefault();

            dispatch({
                type: "LIST_PEOPLE_SEARCH"
            });
        },
        onClickSort: (sortDirection) => {
            dispatch({
                type: "LIST_PEOPLE_SORT"
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Information);
