import { IModalForm } from "@/components/interfaces";
import { Button, Form, FormProps, Input, Modal } from "antd";
import React from "react";

interface PROPS extends IModalForm {}
type FieldType = {
  name?: string;
  token?: string;
};

export const ModalForm = ({ isOpen, type }: PROPS) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {};

  return (
    <Modal
      footer={[]}
      title={type === "add" ? "Add new post" : "Edit post"}
      open={isOpen}
    >
      <div className="space-y-4">
        <section>
          <p>
            Welcome to our blog. You need to sign in before you can use the
            blog.
          </p>
        </section>
        <section>
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Token"
              name="token"
              rules={[{ required: true, message: "Please input your token!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                className="w-full"
                size="large"
                type="primary"
                htmlType="submit"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </Modal>
  );
};
