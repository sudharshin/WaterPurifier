import React from "react";
import { Table } from "react-bootstrap";

const EnquiryInfo = () => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Email</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Michael</td><td>mike@gmail.com</td><td>Need product info</td></tr>
        <tr><td>2</td><td>Susan</td><td>susan@gmail.com</td><td>Requesting bulk price</td></tr>
      </tbody>
    </Table>
  );
};

export default EnquiryInfo;
