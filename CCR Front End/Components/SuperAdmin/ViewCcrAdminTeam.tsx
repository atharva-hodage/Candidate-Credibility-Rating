import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from '../Commom/Navbar';
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";

interface CcrAdmin {
    userId: number;
    userName: string;
    email: string;
    phoneNumber: number;
    role: string;
    createdAt: string;
  }
const ViewCcrAdminTeam = () => {
    const accessToken = Cookies.get("accessToken");
    const [ccrAdmins, setCcrAdmins] = useState<CcrAdmin[]>([]);
    const componentPDF= useRef(null);


    useEffect(() => {
      // Make an API request to fetch CCR admin data from your Spring Boot API
      fetch(`/getAllCcrAdminList`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
      }) // Replace with your API endpoint
        .then((response) => response.json())
        .then((data) => {
          setCcrAdmins(data);
        })
        .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    const generatePDF= useReactToPrint({
      content: ()=>componentPDF.current,
      documentTitle:"Userdata",
      onAfterPrint:()=>alert("Data saved in PDF")
  });

  return (
    <>
    <Navbar/>
        <div>
        <button className="btn btn-success" onClick={ generatePDF}>PDF</button> 
      <div ref={componentPDF} style={{width:'100%'}}>
      <h2>CCR Admin List</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {ccrAdmins.map((ccrAdmin) => (
            <tr key={ccrAdmin.userId}>
              <td>{ccrAdmin.userId}</td>
              <td>{ccrAdmin.userName}</td>
              <td>{ccrAdmin.email}</td>
              <td>{ccrAdmin.phoneNumber}</td>
              <td>{ccrAdmin.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  )
}

export default ViewCcrAdminTeam