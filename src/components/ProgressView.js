import React from 'react';
import { Steps } from 'antd';
import Progress from 'antd/lib/progress/progress';



const Step = Steps.Step;

class ProgressView extends React.Component{

    constructor(props){
        super(props);
        this.getCurrent = this.getCurrent.bind(this);
        this.state = {
            current:this.getCurrent(this.props.data)
        }
    };

    getCurrent(data){
        var result =0;
        if (data.handoff)
            result = 5;
        else if (data.botHasReplied)
            result = 4;
        else if (data.ticket)
            result = 3
        else if (data.approved)
            result = 2
        else if (data.intent.intent)
            result = 1;
        else 
            result = 0;
        
        return result;
    }

    componentWillReceiveProps(){
        this.setState({
            current:this.getCurrent(this.props.data)
        });
    }

    render(){
        return (
            <div>
            <Steps  progressDot current={this.state.current}>
                <Step title="Intent Found" />
                <Step title="Approval"  />
                <Step title="Incident Created" description="" />
                <Step title="Bot Replied" description="" />
                <Step title="Finished" description="" />
            </Steps>
            </div>
        );
    }
}

export default ProgressView;