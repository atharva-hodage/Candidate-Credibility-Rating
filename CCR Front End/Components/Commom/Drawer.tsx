import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaEdit, FaEye } from "react-icons/fa";
import "../Commom/DrawerCss.css";
import CcrAdminRatingForm from "../CcrRatingForm/Rating";
import AllCandidateListForCcrAdmin from "../CcrRatingForm/AllCandidateListForCcrAdmin";
import CcrLogo from "../../Images/CcrLogo.jpg";

const sidebarNavItems = [
  {
    display: "Home",
    icon: <FaHome />,
    section: "ccrAdminDashboard",
  },
  {
    display: "Update Rating Form",
    icon: <FaEdit />,
    section: "ccrAdminRatingForm",
  },
  {
    display: "See All Candidates",
    icon: <FaEye />,
    // to: "/allCandidateListForCcrAdmin",
    section: "allCandidateListForCcrAdmin",
  },
];

const Drawer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [page, setPage] = useState("");
  const fixedStepHeight = 200;
  // useEffect(() => {
  //   setTimeout(() => {
  //     const sidebarItem = sidebarRef.current?.querySelector("sidebarMenuItem");
  //     if (sidebarItem) {
  //       indicatorRef.current!.style.height = `${sidebarItem.clientHeight}px`;
  //       setStepHeight(sidebarItem.clientHeight);
  //     }
  //   }, 50);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current?.querySelector(".sidebarMenuItem");
      if (sidebarItem) {
        indicatorRef.current!.style.height = `${fixedStepHeight}px`; // Use the fixed value
      }
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="mainContainerOfDashboard">
      <div className="sidebar">
        <div >
          <img className="sidebarLogo" src={CcrLogo} alt="Logo" /> {/* Use the imported image */}
        </div>

        <div ref={sidebarRef} className="sidebarMenu">
          <div
            ref={indicatorRef}
            className="sidebarMenuIndicator"
            style={{
              transform: `translateX(-50%) translateY(${
                activeIndex * stepHeight
              }px)`,
            }}
          ></div>
          {sidebarNavItems.map((item, index) => (
            <div
              className={`sidebarMenuItem ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebarMenuItemIcon">{item.icon}</div>
              <div
                className="sidebarMenuItemText"
                onClick={() => setPage(item.section)}
              >
                {item.display}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rightSideOfDrawer">
        <div className="dashBoardTitle">CCR ADMIN DASHBOARD</div>
        {page === "ccrAdminRatingForm" && <CcrAdminRatingForm />}
        {page === "allCandidateListForCcrAdmin" && (
          <AllCandidateListForCcrAdmin />
        )}
      </div>
    </div>
  );
};

export default Drawer;
