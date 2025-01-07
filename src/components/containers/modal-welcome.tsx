import { Button, Form, FormProps, Input, Modal } from 'antd';
import React, { useCallback } from 'react';

interface PROPS {
  isOpen: boolean;
  onLogin: (data: { name: string; token: string }) => void;
}
type FieldType = {
  name?: string;
  token?: string;
};

export const ModalWelcome = ({ isOpen, onLogin }: PROPS) => {
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (values.name && values.token) {
      onLogin({
        name: values.name,
        token: values.token,
      });
    }
  };

  return (
    <Modal
      footer={[
        <Button
          className="w-full"
          size="large"
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={() => {
            form.submit();
          }}
        >
          Sign in
        </Button>,
      ]}
      closable={false}
      title="Welcome guest!"
      open={isOpen}
      modalRender={(dom) => (
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          {dom}
        </Form>
      )}
    >
      <div className="space-y-4">
        <section>
          <p>
            Welcome to our blog. You need to sign in before you can use the
            blog.
          </p>
        </section>
        <section>
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Token"
            name="token"
            rules={[{ required: true, message: 'Please input your token!' }]}
          >
            <Input.Password />
          </Form.Item>
        </section>
      </div>
    </Modal>
  );
};
