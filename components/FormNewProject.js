import NPLayout from "../components/NPLayout";

// pass through a function that is triggered by click event. Function updates State with Project Title and Teams

const FormNewProject = props => {
  return (
    <NPLayout>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-12 mx-auto'>
            <h2>Project Title and Teams</h2>
            <form>
              <label htmlFor='ProjectTitle'>Project Title:</label>
              <input
                type='text'
                name='ProjectTitle'
                className='form-control'
                id='ProjectTitle'
                placeholder='Project Title'
                // onChange={this.handleChange.bind(this)}
              />
              <br />
              <label htmlFor='TeamName1'>Team Name 1:</label>
              <input
                type='text'
                name='TeamName1'
                className='form-control'
                id='TeamName1'
                placeholder='Team Name 1'
                // onChange={this.handleChange.bind(this)}
              />
              <br />
              <label htmlFor='TeamName2'>Team Name 2:</label>
              <input
                type='text'
                name='TeamName2'
                className='form-control'
                id='TeamName2'
                placeholder='Team Name 2'
                // onChange={this.handleChange.bind(this)}
              />
              <br />
              {/* This  button will have a click even that adds the above information to the state, which should trigger the next form to appear */}
              <button onClick={newProject => props.createProject}>
                Continue on To Adding collaborators
              </button>
            </form>
          </div>
        </div>
      </div>
    </NPLayout>
  );
};

export default FormNewProject;
