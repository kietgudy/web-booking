import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch.jsx";
import {
  CloudUploadOutlined,
  DeleteFilled,
  EditFilled,
  EyeFilled,
  PlusCircleOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { callFetchListBook } from "../../../services/api.js";

const BookTable = () => {
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter]);

  const fetchBook = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += filter;
    }
    const res = await callFetchListBook(query);
    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <div onClick={() => {}} style={{ cursor: "pointer" }}>
            <EyeFilled
              style={{
                fontSize: "17px",
                marginRight: "10px",
                marginTop: "3px",
              }}
            />
            <a>{record._id}</a>
          </div>
        );
      },
    },
    {
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true,
    },
    // {
    //   title: "Action",
    //   render: (text, record, index) => {
    //     return (
    //       <>
    //         <EditFilled
    //           style={{
    //             fontSize: "19px",
    //             color: "#00cd00",
    //             cursor: "pointer",
    //             marginRight: 15,
    //           }}
    //           onClick={() => {}}
    //         />
    //         <Popconfirm
    //           placement="left"
    //           title={"Xác nhận xóa người dùng"}
    //           description={"Bạn có chắc chắn muốn xóa người dùng này?"}
    //           okText="Xác nhận"
    //           cancelText="Hủy"
    //         >
    //           <DeleteFilled
    //             style={{ fontSize: "19px", color: "red", cursor: "pointer" }}
    //           />
    //         </Popconfirm>
    //       </>
    //     );
    //   },
    // },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };
  const handleSearch = (query) => {
    setFilter(query);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} />
        </Col>
        <Col span={24}>
          <Card
            title="QUẢN LÝ SÁCH"
            extra={
              <div style={{ display: "flex", gap: 15 }}>
                <Button type="primary">
                  Export
                  <UploadOutlined />
                </Button>
                <Button disabled={true} type="primary">
                  Import
                  <CloudUploadOutlined />
                </Button>
                <Button type="primary">
                  Add new
                  <PlusCircleOutlined />
                </Button>
                <ReloadOutlined type="ghost" style={{ fontSize: "17px" }} />
              </div>
            }
          >
            <Table
              columns={columns}
              loading={isLoading}
              dataSource={listBook}
              onChange={onChange}
              rowKey="_id"
              pagination={{
                current: current,
                pageSize: pageSize,
                showSizeChanger: true,
                total: total,
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BookTable;
