import React from 'react';
import ReactCenter from 'react-center';
import {Row, Col } from 'antd';
import { Button, Card} from 'antd';
import ProgressView from './ProgressView';
import DataView from './DataView';
import './Task.css';



class Task extends React.Component{
    constructor(props){
        super(props);
     
        console.log(props.data)
        
      
    }

    componentWillMount(){

    }
    render(){
        var textSize  = '45px'
        if (this.props.data.subject.length>67){
            textSize = '30px'
        }
        return(
            <ReactCenter>
            <div style={{ margin:'20px', padding:"20px" ,width:'100%',}}>
                <Row>
                    <Col >
                        <div className ="h1" style={{margin:'20px', fontSize:textSize}}>
                        {this.props.data.subject}
                     
                        </div>
                    </Col>
                </Row>

               <Row>
                    <Col>
                        <div style ={{margin:'20px',padding:'20px'}}>
                            <ProgressView data = {this.props.data}/>
                        </div>
                    </Col>
               </Row>

               <Row>
                    <Col>
                        <div style ={{margin:'20px',padding:'20px'}}>
                            <Card>
                                <DataView approve={this.props.approve} data = {this.props.data}/>
                            </Card>
                        </div>
                    </Col>
               </Row>
                
            </div>
            </ReactCenter>
        );
    }

}

export default Task;
