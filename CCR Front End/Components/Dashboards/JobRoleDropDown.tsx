import React, { useEffect, useState } from "react";

const JobRoleDropDown = () => {
  const [selectedRole, setSelectedRole] = useState<string>(
    localStorage.getItem("selectedRole") || ""
  );

  useEffect(() => {
    return () => {
      setSelectedRole("");
      localStorage.removeItem(selectedRole);
    };
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const jobRole = e.target.value;
    setSelectedRole(jobRole);
    localStorage.setItem("selectedRole", jobRole);
  };

  return (
    <div>
      <h3>Job Roles</h3>
      <select value={selectedRole} onChange={handleSelectChange} style={{ width: '200px', padding: '10px', fontSize: '16px', marginTop: '10px' }}>
        <option hidden value="Select a job role">
          Select a job role
        </option>

        <option value="Java Developer">Java Developer</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="PHP Developer">PHP Developer</option>
        <option value="Python developer">Python developer</option>
        <option value="Data Scientist">Data Scientist</option>
      </select>
       
    </div>
  );
};

export default JobRoleDropDown;
