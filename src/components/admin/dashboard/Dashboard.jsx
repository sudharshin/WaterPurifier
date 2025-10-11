import React from "react";
import { Table } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Metric</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Total Orders</td><td>125</td></tr>
        <tr><td>2</td><td>Active Users</td><td>78</td></tr>
        <tr><td>3</td><td>Revenue</td><td>$12,340</td></tr>
      </tbody>
    </Table>
  );
};

export default Dashboard;
