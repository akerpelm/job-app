import { FormRow, FormRowDropdown } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchJobStatus,
    searchJobType,
    sort,
    sortOptions,
    jobStatusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          <FormRow
            labelText="search by position"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          <FormRowDropdown
            labelText="status"
            name="searchJobStatus"
            value={searchJobStatus}
            handleChange={handleSearch}
            options={["all", ...jobStatusOptions]}
          />
          <FormRowDropdown
            labelText="job type"
            name="searchJobType"
            value={searchJobType}
            handleChange={handleSearch}
            options={["all", ...jobTypeOptions]}
          />
          <FormRowDropdown
            name="sort"
            value={sort}
            handleChange={handleSearch}
            options={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filter Values
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
