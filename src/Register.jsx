import "./Register.css";

export const Register = () => {
  return (
    <div className="container-fluid register vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left Panel */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center left-panel position-relative" >
         <div className="image-container">
          <img src="/Registerpage.jpg" alt="background" className="img-fluid" />
         </div>
          <h2 className="position-relative z-2 text-cnter p-4">
          <div className="d-block">Workforce Planning and Optimization</div>
          <div className="d-block">System</div>
          </h2>
        </div>

        {/* Right Panel - Form Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card p-5 shadow-lg form-container">
            <h2 className="text-dark text-center mb-4">Registraion Page</h2>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" placeholder="Enter First Name" />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" placeholder="Enter Last Name" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">E-mail Address</label>
                  <input type="email" className="form-control" placeholder="Enter E-mail Address" />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" placeholder="Enter Phone Number" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Role</label>
                  <select className="form-select" aria-label="Role selection">
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="hr">HR</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Employee ID</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Employee ID"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Enter Password" />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm</label>
                  <input type="password" className="form-control" placeholder="Confirm Password" />
                </div>
              </div>

              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="terms" />
                <label className="form-check-label" htmlFor="terms">
                  I agree to all the <span className="text-primary">Terms, Privacy Policy</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Create Account
              </button>

              <div className="text-center mt-3">
                Already have an account?{" "}
                <a href="/login" className="text-primary fw-bold">Log In</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
