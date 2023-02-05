const Register = () => {
  return (
    <div className={'container mx-auto'}>
      <h1 className={'text-3xl font-bold'}>Register</h1>
      <form>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-">Your Email</span>
          </label>
          <label className="input-group">
            <span>Email</span>
            <input type="text" placeholder="info@site.com" className="input input-bordered" />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-">Your username</span>
          </label>
          <label className="input-group">
            <span>Username</span>
            <input type="text" placeholder="Test user" className="input input-bordered" />
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-">Your password</span>
          </label>
          <label className="input-group">
            <span>Password</span>
            <input type="password" className="input input-bordered" />
          </label>
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  )
};

export default Register;
