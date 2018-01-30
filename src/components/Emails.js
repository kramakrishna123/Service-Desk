import React from 'react';
import {Divider} from 'antd';
import EmailCard from './EmailCard'



class EmailTab extends React.Component{
    constructor(props){
        super(props)
        this.renderEmails = this.renderEmails.bind(this);
    }

    renderEmails(email,index){
        return(
            <div>
            <EmailCard key = {index} email={email}/>
            </div>
        );
    }
    render() {
        return (
            <div style={{margin:'20px' , width:'80%'}}>
                {this.props.emails.map(this.renderEmails)}
            </div>
        );
    }
}




export default EmailTab;
