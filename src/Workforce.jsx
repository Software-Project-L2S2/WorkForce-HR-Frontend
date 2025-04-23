import React from "react";
import "./Workforce.css";
import { NavBar } from "./Navbar/NavBar";


export const Workforce = () => {
  
  return (
    <div className="container-fluid vh-100 overflow-auto bg-light Workforce-page">

<div className="nav-container">
    <NavBar/>
</div>

      {/* Sidebar */}
      <div className="row">
       
       

        {/* Main Content */}
        <div className="col-md-12">
          {/* Stats Cards */}
          <div className="row g-3 p-3">
            <div className="col-md-3">
              <div className="card bg-success text-dark p-3 shadow">
                <h5>Total Promotions</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>15</h2>
                  <i class="bi bi-arrow-down-circle"></i>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-danger text-dark p-3 shadow">
                <h5>Total Exit</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>20</h2>
                  <i class="bi bi-arrow-down-circle"></i>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-primary text-dark p-3 shadow">
                <h5>Total Transfer</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>20</h2>
                  <i class="bi bi-arrow-down-circle"></i>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning text-dark p-3 shadow">
                <h5>Total Attrition</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>15</h2>
                  <i class="bi bi-arrow-down-circle"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Data Tables */}
          <div className="row p-3">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5>Promotions, Transfers, and Exits Panels</h5>
                  
                </div>
                
                <div className="card-body p-0"> {/*Remove padding to table use full width  */}
                <div className="table-responsive">
                  <table className="table table-striped table-hover mb-0">
                    <thead className="table-light">
                    <tr>
                          <th style={{width: '20%'}}>Department</th>
                          <th style={{width: '15%'}}>Transfer</th>
                          <th style={{width: '15%'}}>Promotions</th>
                          <th style={{width: '15%'}}>Exits</th>
                          <th style={{width: '15%'}}>Attrition</th>
                        </tr>
                    </thead>
                    <tbody>
                      {/* Table rows */}
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
              </div>
              <div className="card mb-4">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5>Details Table for Promotions, Transfers, and Exits (January 2025)</h5>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary">
                      <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/jq51fuoOMA/c8so5lpr.png" 
                        alt="sort" style={{ width: "13px" }} />
                    </button>
                   
                  </div>
                </div>
                
                <div className="card-body p-0">
                  <div className="table-responsive">
                  <table className="table table-stripped table-hover mb-0">
                    <thead className="table-light">
                    <tr>
                          <th style={{width: '10%'}}>ID</th>
                          <th style={{width: '15%'}}>Name</th>
                          <th style={{width: '15%'}}>Action</th>
                          <th style={{width: '15%'}}>Old Department</th>
                          <th style={{width: '15%'}}>New Department</th>
                          <th style={{width: '20%'}}>Note</th>
                          <th style={{width: '10%'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      {/* Table rows */}
                    </tbody>
                  </table>
                </div>
              </div>
              </div>

            {/* Right Column */}
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5>Details Table for Attrition (2025 January)</h5>
                  <button className="btn btn-sm btn-light">EDIT</button>
                </div>
                
                <div className="card-body p-0">
                  <div className="table-responsive">
                  <table className="table table-striped table-hover mb-0">
                    <thead className="table-light ">
                    <tr>
                          <th style={{width: '15%'}}>Timeframe</th>
                          <th style={{width: '15%'}}>Department</th>
                          <th style={{width: '20%'}}>Employee Name</th>
                          <th style={{width: '15%'}}>Position</th>
                          <th style={{width: '15%'}}>Attrition Type</th>
                          <th style={{width: '20%'}}>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                      {/* Table rows */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Workforce;