import React, { useEffect, useState } from "react";
import useHelmet from "../hooks/useHelmet";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkFetchListUser,
  thunkFetchUserDetail,
} from "../store/asyncThunk/userThunk";
import { Avatar, Button, Flex, Modal, Spin, Table, message } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { MESSAGE_STATUS, setAlertMessage } from "../store/app/alertSlice";
import UserRequester from "../service/userRequester";
import { setUserDetail, setUserPageLoading } from "../store/common/userSlice";
import UpdateForm from "../components/user/UpdateForm";
const UserPage = () => {
  useHelmet("App - User");
  const dispatch = useDispatch();
  const { loading, listUser, userDetail } = useSelector(
    (store) => store.common.user
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const promise = dispatch(thunkFetchListUser());
    return () => {
      promise.abort();
    };
  }, []);

  const handleDeleteUser = async (id) => {
    dispatch(setUserPageLoading(true));
    try {
      const res = await UserRequester.deleteUser(id);
      if (res.status === 200) {
        dispatch(thunkFetchListUser());
        dispatch(
          setAlertMessage({
            message: "delete successfully.",
            status: MESSAGE_STATUS.succes,
          })
        );
      }
    } catch (err) {
      dispatch(
        setAlertMessage({
          message: err.response.data,
          status: MESSAGE_STATUS.error,
        })
      );
    } finally {
      dispatch(setUserPageLoading(false));
    }
  };

  const handleFetchUserDetail = (id) => {
    dispatch(thunkFetchUserDetail({id, setOpenModal}));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render(ele, data) {
        return <Avatar key={data.id} src={ele} size={"large"} />;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Ful Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "action",
      render(id) {
        return (
          <Flex key={id} gap={4} align="center">
            <Button
              onClick={() => handleDeleteUser(id)}
              danger
              icon={<DeleteFilled />}
            />
            <Button
              onClick={() => handleFetchUserDetail(id)}
              icon={<EditFilled />}
            />
          </Flex>
        );
      },
    },
  ];

  const dataSource = listUser.map((ele) => ({
    key: ele.id,
    userName: ele.username,
    fullName: ele.full_name,
    email: ele.email,
    dateOfBirth: ele.date_of_birth,
    role: ele.role,
    avatar: ele.avatar,
  }));

  return (
    <div className="overflow-y-scroll h-full">
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={dataSource} />
      </Spin>
      <Modal
        className="pt-6"
        title="Update User"
        children={userDetail && <UpdateForm defaultValue={userDetail ?? undefined} />}
        open={openModal}
        onCancel={() => {
          setOpenModal(false)
          dispatch(setUserDetail(null))
        }}
        footer={[]}
      />
    </div>
  );
};

export default UserPage;
