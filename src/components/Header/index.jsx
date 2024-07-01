import React, { useState } from "react";
import { Divider, Badge, Drawer, Button, Avatar, Popover } from "antd";
import {
  DownOutlined,
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { callLogout } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../redux/account/accountSlice";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.order.carts);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction()); //update redux reset data user
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  let items = [
    {
      label: <label style={{ cursor: "pointer" }}>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  if (user?.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  const contentPopover = () => {
    return (
      <div className="pop-cart-body">
        <div className="pop-cart-content">
          {carts?.map((book, index) => {
            return (
              <div className="book" key={`book-${index}`}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    book?.detail?.thumbnail
                  }`}
                  alt=""
                />
                <span className="book-name">{book?.detail?.mainText}</span>
                <span className="book-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(book?.detail.price ?? 0)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="pop-cart-footer">
          <button>Xem giỏ hàng</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <Link to={"/"} className="page-header__logo">
              <img src="./logo.png" alt="BookShop" style={{ height: "88px" }} />
            </Link>
            <div className="page-header__search">
              <SearchOutlined
                style={{ fontSize: "18px" }}
                className="icon-search"
              />
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
              <Button className="custom-button" type="link">
                Tìm kiếm
              </Button>
            </div>
          </div>
          <nav className="page-header__bottom">
            <div id="navigation" className="navigation">
              <Link to={"/"} className="navigation-home">
                <HomeOutlined />
                Trang chủ
              </Link>
              <div className="navigation__item">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}>Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <Avatar src={urlAvatar} />
                        {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </div>
              <div className="navigation__item">
                <Popover
                  className="popover-carts"
                  placement="topRight"
                  rootClassName="popover-carts"
                  title={"Sản phẩm mới thêm"}
                  content={contentPopover}
                  arrow={true}
                >
                  <Badge count={carts?.length ?? 0} size={"small"} showZero>
                    <ShoppingCartOutlined
                      style={{ fontSize: "25px", color: "#1b92cd" }}
                    />
                  </Badge>
                </Popover>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p>Đăng xuất</p>
        <Divider />
      </Drawer>
    </>
  );
};

export default Header;
