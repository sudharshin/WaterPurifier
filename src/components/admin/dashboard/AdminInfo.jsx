import React from "react";
import { Table } from "react-bootstrap";

const AdminInfo = () => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Admin Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>John Doe</td><td>john@example.com</td><td>Super Admin</td></tr>
        <tr><td>2</td><td>Jane Smith</td><td>jane@example.com</td><td>Moderator</td></tr>
      </tbody>
    </Table>
  );
};

export default AdminInfo;
