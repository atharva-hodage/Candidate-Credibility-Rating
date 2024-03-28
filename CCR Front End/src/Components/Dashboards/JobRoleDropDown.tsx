import React, { useState } from "react";

const JobRoleDropDown = () => {
  const [selectedRole, setSelectedRole] = useState<string>(
    localStorage.getItem('selectedRole') || ''
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const jobRole =  e.target.value;
    setSelectedRole(jobRole);
    localStorage.setItem('selectedRole' ,jobRole)
  };

  return (
    <div>
      <h3>Job Roles</h3>
      <select value={selectedRole} onChange={handleSelectChange}>
        <option value="Java Developer">Java Developer</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="PHP Developer">PHP Developer</option>
        <option value="Python developer">Python developer</option>
        <option value="Data Scientist">Data Scientist</option>
      </select>
      {selectedRole && <p>Selected Role : {selectedRole}</p>}
    </div>
  );
};

export default JobRoleDropDown;
