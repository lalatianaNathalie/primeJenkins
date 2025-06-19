import React from "react";
import AreaCards from './../../components/admin/Dashboard/areaCards/AreaCards';
import AreaCharts from './../../components/admin/Dashboard/areaCharts/AreaCharts';
// import AreaTable from './../../components/admin/Dashboard/areaTable/AreaTable';
import AreaTop from './../../components/admin/Dashboard/areaTop/AreaTop';

const Dashboard = () => {
  
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards/>
      <AreaCharts />
      {/* <AreaTable /> */}
    </div>
  );
};

export default Dashboard;
