import React from 'react';
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";

const { Option } = Select;
const selectAfter = (
  <Select
    defaultValue="JPY"
    style={{
      width: 85,
    }}
  >
    <Option value="JPY">JPY ¥</Option>
    <Option value="CNY">CNY ¥</Option>
  </Select>
);
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};
const FigureForm = () => (
  <>
    <Form
      name="wrap"
      labelCol={{
        flex: "110px",
      }}
      labelAlign="left"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Base name"
        name="Base name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Price" name="Price" rules={[{ required: true }]}>
        <InputNumber addonAfter={selectAfter} defaultValue={0} />
      </Form.Item>

      <Form.Item
        label="Release Date"
        name="ReleaseDate"
        rules={[{ required: true }]}
      >
        <Switch defaultChecked onChange={onChange} />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </>
);

export default FigureForm;
