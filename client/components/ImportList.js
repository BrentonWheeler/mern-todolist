import React, { Component } from "react";
//import PropTypes from "prop-types";

import axios from "axios";

class ImportList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            importText: "",
            listsList: null
        };
        this.importClicked = this.importClicked.bind(this);
        this.importInputChange = this.importInputChange.bind(this);
    }

    importClicked () {
        // window.open(
        //     "https://trello.com/1/authorize?expiration=1day&name=Mern%20Todolist&key=6700238c98b4f952412a711c04dc12ec"
        // );
        // axios.get(process.env.BASE_URL + "/trello/login").then(res => {
        //     console.log(res);
        // });.
        location.href = process.env.BASE_URL + "/trello/login";
        // let trelloBoard = JSON.parse(this.state.importText);
        // let listList = trelloBoard.lists.map(list => {
        //     console.log(list.name);
        // });
        // this.setState((listList = listList), () => {
        //     console.log(this.state.listsList);
        // });
    }

    importInputChange (e) {
        this.setState({
            importText: e.target.value
        });
    }

    render () {
        let selectListElement = <div />;
        if (this.state.listsList !== null) {
            selectListElement = (
                <select className="col s6 offset-s3 center-align browser-default">
                    <option value="" disabled selected>
                        Select a list from that board
                    </option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            );
        }
        return (
            <div className="row">
                <div className="col s6 offset-s3 center-align">
                    <div className="input-field inline">
                        <button onClick={this.importClicked} className="waves-effect waves-light btn ">
                            {" "}
                            import from Trello{" "}
                        </button>
                        <input
                            placeholder="Verification code"
                            onChange={this.importInputChange}
                            value={this.state.importText}
                            style={{ width: "auto", marginLeft: "10px" }}
                            type="text"
                        />
                    </div>
                </div>
                {selectListElement}
            </div>
        );
    }
}

// ImportList.propTypes = {
// };

export default ImportList;
