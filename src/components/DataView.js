import React from 'react';
import ReactCenter from 'react-center';
import { Tabs, Icon } from 'antd';
import Summary from './Summary';
import EmailTab from './Emails';

const TabPane = Tabs.TabPane;

class DataView extends React.Component{
    
    
    render(){
        console.log(this.state);
        return (
            <Tabs defaultActiveKey="1" style ={{minHeight:'300px'}}>
                <TabPane tab="Summary" key="1"><ReactCenter><Summary approve = {this.props.approve} data={this.props.data}/></ReactCenter></TabPane>
                <TabPane tab="Emails" key="2"><ReactCenter><EmailTab emails={this.props.data.emails}/>.</ReactCenter></TabPane>
                <TabPane tab="Ticket Status" key="4">Content of Tab Pane 3</TabPane>
            </Tabs>
        );
    }
}

export default DataView;