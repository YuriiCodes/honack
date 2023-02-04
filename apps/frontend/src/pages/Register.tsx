const Register = () => {
  return (
    <div>
      <form>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <label className="input-group">
            <span>Email</span>
            <input type="text" placeholder="info@site.com" className="input input-bordered" />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Your username</span>
          </label>
          <label className="input-group">
            <span>Username</span>
            <input type="text" placeholder="Test user" className="input input-bordered" />
          </label>
        </div>
      </form>
    </div>
  )
};

export default Register;
