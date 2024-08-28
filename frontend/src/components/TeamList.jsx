import { useSelector, useDispatch } from 'react-redux';
import { removeFromTeam } from '../store/teamSlice';
import { Table, Button, Avatar } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { useState } from 'react';
import { Container, StyleTeam, StyleText } from '../styles/StyledComponents';
import { Link } from 'react-router-dom';
const TeamList = () => {
  const dispatch = useDispatch();
  const team = useSelector(state => state.team.members);
  const [currentPage] = useState(1);
  const handleRemoveFromTeam = (userId) => {
    dispatch(removeFromTeam(userId));
    toast.success('Removed Successfully');
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1 + (currentPage - 1) * 20, // Assuming 20 users per page
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar, record) => (
        <Avatar src={avatar} alt={`${record.first_name} ${record.last_name}`} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Availability',
      dataIndex: 'available',
      key: 'available',
      render: (available) => available ? 'Yes' : 'No',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleRemoveFromTeam(record._id)}>Remove</Button>
      ),
    },
  ];
  const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
`;
  return (
    <Container>
    <Toaster/>
   <StyleTeam>
      <StyleText>Team List</StyleText>
      <Link to="/" style={{textDecoration:"none", color:"#49BBBD"}}>← Back</Link>
      </StyleTeam>
      <StyledTable 
          dataSource={team} 
          columns={columns} 
          pagination={false}
          rowKey="_id"
        />
     </Container>
  );
};

export default TeamList;

