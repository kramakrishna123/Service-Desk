
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button, Radio ,} from 'antd';
const FormItem = Form.Item;
const {TextArea} = Input;


class Frm extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }
  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    const index = this.props.data.intent.index;
    const summary = this.props.data.emails[index].redacted.join('\n');
    return (
      <div style ={{width:'100%'}}>
        <Form layout={formLayout}>
    
          <FormItem label="Requestor" {...formItemLayout}>
            <Input value ={this.props.data.from.name} />
          </FormItem>
          <FormItem label="Summary" {...formItemLayout}>
            <TextArea value={summary} rows={3}/>
          </FormItem>
          <FormItem label="Description" {...formItemLayout}>
            <TextArea value={this.props.data.text_body} rows={16} />
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}


export default Frm;