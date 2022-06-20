import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const CreateJob = () => {
  const {
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    jobStatus,
    jobStatusOptions,
    isEditing,
  } = useAppContext();

  const handleJobInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(`${name}: ${value}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    console.log("created job");
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit job" : "Create Job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="Job Location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <div className="form-row">
            <label htmlFor="jobType" className="form-label">
              job type
            </label>
            <select
              name="jobType"
              value={jobType}
              onChange={handleJobInput}
              className="form-select"
            >
              {jobTypeOptions.map((item, index) => {
                <option value={item.value} key={index}></option>;
              })}
            </select>
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default CreateJob;
