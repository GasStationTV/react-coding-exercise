import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    render: function() {
        return (
            <div className="text-xs-center">
                <h1>GSTV React Coding Exercise</h1>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
});
