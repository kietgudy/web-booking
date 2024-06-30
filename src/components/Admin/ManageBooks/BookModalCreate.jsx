import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import React, { useState } from "react";

const BookModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate } = props;
  const [form] = Form.useForm();
  //fetch

  return (
    <Modal
      title="Thêm mới sách"
      open={openModalCreate}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => setOpenModalCreate(false)}
      okText={"Tạo mới"}
      cancelText={"Hủy"}
      width={"50vw"}
      maskClosable={false}
    >
      <Divider />
      <Form form={form} name="create" autoComplete="off">
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Tên sách"
              name="mainText"
              rules={[
                { required: true, message: "Vui lòng nhập tên hiển thị!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Tác giả"
              name="author"
              rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Giá tiền"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                addonAfter="VND"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Thể loại"
              name="category"
              rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
            >
              <Select
                defaultValue={null}
                showSearch
                allowClear
                //  onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Đã bán"
              name="sold"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng đã bán!" },
              ]}
              initialValue={0}
            >
              <InputNumber min={0} defaultValue={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Ảnh Thumbnail"
              name="thumbnail"
            >
              <Upload
                name="thumbnail"
                listType="picture-card"
                className="avatar-uploader"
                maxCount={1}
                multiple={false}
              >
                <div>
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item labelCol={{ span: 24 }} label="Ảnh Slider" name="slider">
              <Upload
                multiple
                name="slider"
                listType="picture-card"
                className="avatar-uploader"
              >
                <div>
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default BookModalCreate;