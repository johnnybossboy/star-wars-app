import React, { Component } from 'react';

class Navbar extends Component {
    render(){
        return(
            <div className="container-fluid color-primary-bg navbar navbar--fixed">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <h1 className="text-uppercase text--title color-white">LabelA Proefopdracht</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
