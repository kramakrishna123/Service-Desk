import React from 'react';
import ReactCenter from 'react-center';
import {Card,Switch ,Row,Col, Button, Icon} from 'antd';
import Frm from './Sample';



class Summary extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return(
            <div style={{width:'99%'}}>
                <Row gutter={10}>
                    <Col span={10}>
                        <div style = {{margin:'20px'}}>
                            <IntentCard email={this.props.data.emails[this.props.data.intent.index]} intent={this.props.data.intent}/>
                            <MsgCard email={this.props.data.emails[0]} />
                           
                        </div>
                    </Col>
                    <Col span={14}>
                        <div style={{minHeight:'200px', width:'98%', margin:'20px'}}>
                            <RequestCard approve={this.props.approve} data={this.props.data}/>
                        </div>
                        
                    </Col>
                </Row>
            </div>
        );
    }

}

class IntentCard extends React.Component{

 
    render (){
        if (this.props.intent.intent){

            return(
                <div className ="bs-callout bs-callout-danger email-text">
                <h2 className = 'h2'><b>Intent</b>: {this.props.intent.intent}</h2>
                <p>
                    <b>From</b>: {this.props.email.from} <br/>
                    <b>Subject</b>: {this.props.email.subject}<br/>
                    <b>Message</b>:<br/>{this.props.email.redacted.join('\n')}
                </p>
                </div>
            )
        }else{
            return (
                <div className ="bs-callout bs-callout-danger email-text">
                            <h2 className = 'h2'><b>Intent</b>: not found</h2>
                           
                            </div>
            )
        }
    }
}



class MsgCard extends React.Component{
    render(){
       return(
        <div className ="bs-callout bs-callout-danger email-text">
        <h2 className = 'h2'><b>Incoming eMail</b></h2>
        <p >
            <b>From</b>: {this.props.email.from} <br/>
            <b>Subject</b>: {this.props.email.subject}<br/>
            <br/>{this.props.email.body.join('\n')}
        </p>
        </div>
       )
    }
}

class RequestCard extends React.Component{
    render(){
        if (this.props.data.request){
            var ext;
            if (!this.props.data.approved){
                ext = <Switch unCheckedChildren={<div>Approve</div>} onChange={this.props.approve}/>
            }else{
                ext =     <Switch disabled={this.props.data.approved} checkedChildren={<div>Approved</div>}  defaultChecked />
            }
            return(
                <Card  extra={ext} title={this.props.data.request} >
                <ReactCenter>
                    <Frm data={this.props.data}/>
                </ReactCenter>
                </Card>
            )
        }else{
            return (
                <Card  title="Request Not Found" >
                <ReactCenter>
                <Button type="dashed" size='large'>Build Request</Button>
                </ReactCenter>
                </Card>
            )
        }
    }
}

export default Summary;