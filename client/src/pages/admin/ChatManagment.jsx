import React, { useEffect, useState } from 'react';
import Table from '../../components/shared/Table';
import AdminLayout from '../../components/layout/AdminLayout';
import { Avatar, Stack } from '@mui/material';
import { dashboardData } from '../../components/constatns/sampleData';
import { transeformImage } from '../../lib/features';
import AvatarCard1 from '../../components/specific/AvatarCard1';

const columns = [
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <AvatarCard1 avatar={params.row.avatar} />
    )
  },
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 300,
    renderCell: (params) => (
      <AvatarCard1 max={100} avatar={params.row.members.map(member => member.avatar)} />
    )
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  }
];

const ChatManagment = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(dashboardData.chats.map((chat) => ({
      ...chat,
      id: chat._id,
      avatar: chat.avatar.map(url => transeformImage(url, 50)),
      members: chat.members.map(member => ({
        ...member,
        avatar: transeformImage(member.avatar, 50)
      }))
    })));
  }, []);

  return (
    <AdminLayout>
      <Table heading={"All Chats"} columns={columns} rows={rows} />
    </AdminLayout>
  );
}

export default ChatManagment;
