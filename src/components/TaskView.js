import React from 'react';

import Task from './Task';
import ReactCenter from 'react-center';

class TaskView extends React.Component{

    constructor(props){
        super(props);
        this.caseid = this.props.match.params.number;
        this.url = '/api/hilton/emails?query={\"caseid\":\"'+this.caseid+'\"}';
        this.state = {
            doc:{},
            loading:true,
            justApproved:false
        };

        this.approve = this.approve.bind(this)
    }

    approve(e){
       
        var newdoc = this.state.doc;
        var id = newdoc._id;
        var url = '/api/hilton/emails/'+id;
        
        if(newdoc.approved){
            return
        }
    
        newdoc.approved = true;

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({"approved":true}),
            mode:'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data=>{
                this.setState({
                    doc:newdoc
                })
                console.log(data);
            })

            
            fetch('/api/send/htn.approved', {
                method: 'POST',
                body: JSON.stringify({data:[newdoc]}),
                mode:'cors',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(response => response.json())
                .then(data=>{
                    console.log('Message Approval Sent to Queue')
                })
    }


    componentDidMount(){
        fetch(this.url)
        .then(results=>{return results.json()})
        .then((emails)=>{

            if(emails.length !==0){
                this.setState({
                    doc:emails[0],
                    loading:false
                });
            }
        });
        
    }

    render(){

        if (this.state.loading){
            return (
                <div className ="h1">Loading...</div>
            );
        }else{
            return(
                <div><Task approve={this.approve} data={this.state.doc}/></div>
            )
        }
        
    }
}

export default TaskView;