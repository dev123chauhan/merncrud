import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const UserCard = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;
export const StyleText = styled.h1`
  color: #49bbbd;
  
`;
export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
`;

export const UserInfo = styled.div`
  flex-grow: 1;
`;

export const Button = styled.button`
  background-color: #49bbbd;
  color: white;
  border: none;
  padding: 8px 9px;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
  }
`;

export const Input = styled.input`
  padding: 8px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

export const Select = styled.select`
  padding: 8px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const PageButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  background-color: ${({ $active }) => ($active ? "#49BBBD" : "#f0f0f0")};
  color: ${({ $active }) => ($active ? "white" : "black")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#49BBBD" : "#d0d0d0")};
  }
`;
export const Grid = styled.div`
  display: flex;
`;
export const StyleTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;
