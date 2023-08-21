import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Input, Typography, Button } from "antd";
import FileBase64 from "react-file-base64";
import styles from "./styles";
import { createStory, updateStory } from "../../Redux/actions/stories";
import { Link } from "react-router-dom";

const { Title } = Typography;

function StoryForm({ selectedId, setSelectedId }) {
  console.log("selectedId", selectedId);
  const story = useSelector((state) =>
    selectedId ? state.stories.find((story) => story._id === selectedId) : null
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const user = JSON.parse(localStorage.getItem("profile"));
  const username = user?.result?.username;

  const onSubmit = (formValues) => {
    selectedId
      ? dispatch(updateStory(selectedId, { ...formValues, username }))
      : dispatch(createStory({ ...formValues, username }));
    reset();
  };

  useEffect(() => {
    console.log(story);
    if (story) {
      form.setFieldsValue(story); // Use setFieldsValue to set form values
    }
  }, [story, form]);
  const reset = () => {
    form.resetFields();
    setSelectedId(null);
  };

  if (!user) {
    return (
      <Card style={styles.formCard}>
        <Title level={4}>
          <span style={styles.formTitle}>Welcome to LinkHive !</span>
          <br />
          Please <Link to="/authform">login</Link> or{" "}
          <Link to="/authform">register</Link> for sharing instant moments or
          ideas. Please login to create a story
        </Title>
      </Card>
    );
  }
  return (
    <Card
      style={styles.formCard}
      title={
        <Title level={4} style={styles.formTitle}>
          {selectedId ? "Editing" : "Share"} a story
        </Title>
      }
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        size="middle"
        onFinish={onSubmit}
      >
        {/* <Form.Item name="username" label="Username"
          rules={[{ required: true }]}
        >
          <Input allowClear />
        </Form.Item> */}
        <Form.Item name="caption" label="Caption" rules={[{ required: true }]}>
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Input.TextArea allowClear autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: 'Please select an image', // Custom error message when not selected
            },
          ]}
        >
          <FileBase64
            type="file"
            multiple={false}
            onDone={(e) => {
              console.log('Selected Image:', e.base64);
              // Instead of setting form values directly, use form.setFieldsValue
              form.setFieldsValue({
                image: e.base64,
              });
            }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6,
          }}
        >
          <Button type="primary" block htmlType="submit">
            Share
          </Button>
        </Form.Item>

        {!selectedId ? null : (
          <Form.Item
            wrapperCol={{
              span: 16,
              offset: 6,
            }}
          >
            <Button
              type="primary"
              block
              htmlType="button"
              danger
              onClick={reset}
            >
              Discard
            </Button>
          </Form.Item>
        )}
      </Form>
    </Card>
  );
}

export default StoryForm;
