import  { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUser } from '../store/usersSlice';
import { Input, Select, Pagination, PageButton, Container, Button, Avatar, StyleText, StyleTeam, ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton, StyledForm, FormGroup, Label, StyledInput, StyledSelect, SubmitButton } from '../styles/StyledComponents';
import { Spin, Table } from 'antd';
import styled from 'styled-components';
import { addToTeam } from '../store/teamSlice';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
`;


const UserList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { users, status, totalPages } = useSelector(state => state.users);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('');
  const [gender, setGender] = useState('');
  const [available, setAvailable] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, search, domain, gender, available }));
  }, [dispatch, search, domain, gender, available]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(fetchUsers({ page, search, domain, gender, available }));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleAddToTeam = (user) => {
    toast.success('Successfully added to team!');
    dispatch(addToTeam(user));
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ id: editingUser._id, userData: formData })).unwrap();
      toast.success('User updated successfully!');
      setIsModalVisible(false);
      setEditingUser(null);
      setFormData({});
    } catch (error) {
      console.log(error)
      toast.error('Failed to update user');
    }
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
      render: (text, record) => <Avatar src={record.avatar} alt={`${record.first_name} ${record.last_name}`} />,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => `${record.first_name} ${record.last_name}`,
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
      render: (text, record) => (
        <Button onClick={() => handleAddToTeam(record)}>Add to Team</Button>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => showEditModal(record)} style={{ marginLeft: '10px' }}>Edit</Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Toaster/>
      <StyleTeam>
        <StyleText>User List</StyleText>
        <Link to="/team" style={{textDecoration:"none", color:"#49BBBD"}}>Go to team →</Link>
      </StyleTeam>
      <div>
        <Input 
          type="text" 
          placeholder="Search by name" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <Select value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option value="">All Domains</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </Select>
        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>
        <Select value={available} onChange={(e) => setAvailable(e.target.value)}>
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </Select>
      </div>
      {status === 'loading' && (
        <div style={{display: "flex", justifyContent: "center", marginTop: "10rem",  marginBottom: "20rem"}}>
          <Spin size="large" />
        </div>
      )}
      {status === 'failed' && <div>Error loading users</div>}
      {status === 'succeeded' && (
        <StyledTable 
          dataSource={users} 
          columns={columns} 
          pagination={false}
          rowKey="_id"
        />
      )}
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <PageButton
            key={page}
            $active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}
      </Pagination>
      {isModalVisible && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit User</ModalTitle>
              <CloseButton onClick={handleCancel}>&times;</CloseButton>
            </ModalHeader>
            <StyledForm onSubmit={handleUpdate}>
              <FormGroup>
                <Label htmlFor="first_name">First Name</Label>
                <StyledInput
                  id="first_name"
                  name="first_name"
                  value={formData.first_name || ''}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="last_name">Last Name</Label>
                <StyledInput
                  id="last_name"
                  name="last_name"
                  value={formData.last_name || ''}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <StyledInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="domain">Domain</Label>
                <StyledInput
                  id="domain"
                  name="domain"
                  value={formData.domain || ''}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="gender">Gender</Label>
                <StyledSelect
                  id="gender"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </StyledSelect>
              </FormGroup>
              <FormGroup>
                <Label>
                  <StyledInput
                    type="checkbox"
                    name="available"
                    checked={formData.available || false}
                    onChange={handleInputChange}
                  />
                  Available
                </Label>
              </FormGroup>
              <SubmitButton type="submit">Update User</SubmitButton>
            </StyledForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default UserList;









