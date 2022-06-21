import { FormRow, Alert, FormRowDropdown } from "../../components";
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
    handleChange,
  } = useAppContext();

  const handleJobInput = (event) => {
    const { name, value } = event.target;
    console.log(`${name}: ${value}`);
    handleChange(event.target);
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
          <FormRowDropdown
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            labelText="job type"
            options={jobTypeOptions}
          />
          <FormRowDropdown
            name="jobStatus"
            value={jobStatus}
            handleChange={handleJobInput}
            labelText="job status"
            options={jobStatusOptions}
          />
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
