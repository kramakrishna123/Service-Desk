import React from 'react';

class EmailCard extends React.Component{
    
    constructor(props){
        super(props)
        console.log(props)
    }

    render() {
        return(
            <div className ="bs-callout bs-callout-danger email-text">
                <p>
                    <b>From</b>: {this.props.email.from} <br/>
                    <b>Subject</b>: {this.props.email.subject}<br/>
                    <br/>{this.props.email.redacted.join('\n')}
                </p>
            </div>
        )
    }

}

export default EmailCard;