import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

const coloumns = [
  {field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200},
  {field:"attachtments",
  headerName:"Attachments",
  headerClassName:"table-header",
  width:200,
 renderCell: (params)=>(
  <Avatar alt={params.row.name }  src={params.row.avatar} />
 )
},
{
  field:"content",
  headerName:"Content",
  headerClassName:"table-header",
  width:400
},
{field:"sender",
  headerName:"Sent By",
  headerClassName:"table-header",
  width:200,
 renderCell: (params)=>(
  <Stack>
    <Avatar alt={params.row.name }  src={params.row.avatar} />
    <span>{params.row.sender.name}</span>
  </Stack>
 )
},
{
  field:"chat",
  headerName:"Chat",
  headerClassName:"table-header",
  width:220,
},
{
  field:"groupChat",
  headerName:"Group Chat",
  headerClassName:"table-header",
  width:200
},
{
  field:"createdAt",
  headerName:"Time",
  headerClassName:"table-header",
  width:250
},

]
const MessageManagment = () => {

  return (
    <AdminLayout>
        MessageManagement
    </AdminLayout>
  )
}

export default MessageManagment
