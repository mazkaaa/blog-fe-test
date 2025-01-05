import { useAuth } from "@/components/contexts";
import {
  IModalForm,
  IPostResponse,
  IUserResponse,
} from "@/components/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

interface PROPS extends IModalForm {
  setOpen: (open: boolean) => void;
}
type FieldType = {
  title: string;
  body: string;
  user_id: number;
};

export const ModalForm = ({ isOpen, type, setOpen, selectedData }: PROPS) => {
  const { authData } = useAuth();
  const [form] = Form.useForm();
  const data = selectedData as IPostResponse;

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/users");
      return res.data as IUserResponse[];
    },
    enabled: isOpen,
  });

  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: async (values: FieldType) => {
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/posts", values, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      setOpen(false);
      form.resetFields();
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async (values: FieldType) => {
      await axios.put(
        process.env.NEXT_PUBLIC_API_URL + "/posts/" + data.id,
        values,
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      setOpen(false);
      form.resetFields();
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (type === "add") {
      mutationCreate.mutate(values, {
        onSuccess: () => {
          message.success("Post created successfully");
        },
        onError: (err: any) => {
          message.error(
            err?.response?.data?.message || "Failed to create post"
          );
        },
      });
    } else {
      mutationUpdate.mutate(values, {
        onSuccess: () => {
          message.success("Post updated successfully");
        },
        onError: (err: any) => {
          message.error(
            err?.response?.data?.message || "Failed to update post"
          );
        },
      });
    }
  };

  useEffect(() => {
    if (type === "add") {
      form.resetFields();
    } else {
      if (data) {
        console.log(data);
        form.setFieldValue("title", data.title);
        form.setFieldValue("body", data.body);
        form.setFieldValue("user_id", data.user_id);
      }
    }
  }, [data, form, type]);

  return (
    <Modal
      footer={[
        <Button
          size="large"
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={() => {
            form.submit();
          }}
        >
          {type === "add" ? "Create" : "Update"}
        </Button>,
        <Button
          size="large"
          key="cancel"
          onClick={() => {
            if (setOpen) {
              setOpen(false);
            }
            form.resetFields();
          }}
        >
          Cancel
        </Button>,
      ]}
      title={type === "add" ? "Add new post" : "Edit post"}
      open={isOpen}
      onCancel={() => {
        if (setOpen) {
          setOpen(false);
        }
        form.resetFields();
      }}
      modalRender={(dom) => (
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          {dom}
        </Form>
      )}
    >
      <Form.Item<FieldType>
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input the title!",
          },
        ]}
      >
        <Input value={form.getFieldValue("title")} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Content"
        name="body"
        rules={[
          {
            required: true,
            message: "Please input the content!",
          },
        ]}
      >
        <Input.TextArea value={form.getFieldValue("body")} />
      </Form.Item>

      <Form.Item<FieldType>
        label="User"
        name="user_id"
        rules={[
          {
            required: true,
            message: "Please select the user!",
          },
        ]}
      >
        <Select
          value={form.getFieldValue("user_id")}
          placeholder="Select a user"
          options={
            usersData?.map((user) => ({
              label: user.name,
              value: user.id,
            })) || []
          }
        />
      </Form.Item>
    </Modal>
  );
};
