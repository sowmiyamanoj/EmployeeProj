import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
  profileDetails: {
    employeeName: string;
    employeeID: string;
    email: string;
    employeeAge: number;
    employeeDOJ: string;
    employeeGender: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ show, onHide, profileDetails }) => {
  return (
        <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton>
        <Modal.Title >Profile Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontWeight: 500, fontSize: '19px'}}>
          Name: <p style={{display:'inline-flex' , textTransform:'uppercase', marginBottom:0}}>{profileDetails.employeeName} </p>
        </p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Employee ID: {profileDetails.employeeID}</p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Email ID: {profileDetails.email}</p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Date of Joining: {profileDetails.employeeDOJ}</p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Age: {profileDetails.employeeAge}</p>
        <p style={{ fontWeight: 500, fontSize: '16px' }}>Gender: {profileDetails.employeeGender}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
