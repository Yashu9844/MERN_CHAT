import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';
import { dashboardData } from '../../components/constatns/sampleData';
import { transeformImage } from '../../lib/features';
import { Avatar, Stack } from '@mui/material';
import moment from 'moment';


const columns = [
  { field: "id", headerName: "ID", headerClassName: "table-header", width: 200 },
  {
    field: "attachments", // Corrected field name from 'attachtments'
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack>
        <Avatar alt={params.row.name} src={params.row.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]); // Set default empty array for rows

  useEffect(() => {
    if (dashboardData.messages) {
      // Only transform data if messages exist
      setRows(
        dashboardData.messages.map((message) => ({
          ...message,
          id: message._id, // Assuming _id is available in message object
          attachments: message.attachment.map((attachment) => transeformImage(attachment, 50)), // Corrected function name from 'transeformImage'
          // Assuming 'avatar' and 'members' are defined elsewhere
          sender: {
            name: message.sender.name,
            avatar: transeformImage(message.sender.avatar, 50),
          },
          createAt:moment(message.createAt).format("MMMM Do YYYY,h:mm:ss")
        }))
      );
    }
  }, [dashboardData.messages]); // Added dashboardData.messages to the dependency array

  return (
    <AdminLayout>
      <Table heading={"All Messages"} columns={columns} rows={rows} /> {/* Corrected 'coloumns' to 'columns' */}
    </AdminLayout>
  );
};

export default MessageManagement;
