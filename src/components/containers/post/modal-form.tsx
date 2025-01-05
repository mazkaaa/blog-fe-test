import { IModalForm } from "@/components/interfaces";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, Modal } from "antd";
import axios from "axios";
import React from "react";

interface PROPS extends IModalForm {}
type FieldType = {
  name?: string;
  token?: string;
};

export const ModalForm = ({ isOpen, type }: PROPS) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {};

  const {} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/users");
    },
  });

  return (
    <Modal
      footer={[]}
      title={type === "add" ? "Add new post" : "Edit post"}
      open={isOpen}
    >
      <div className="space-y-4">
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
