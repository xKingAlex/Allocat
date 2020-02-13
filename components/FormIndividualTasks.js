import NPLayout from "./NPLayout";

//This Will need to take in a click event that triggers a function NewProject that changes the state to update it with new Team Members.

const FormIndividualTasks = props => {
  return (
    <NPLayout>
      <div className='row mt-5'>
        <div className='col-md-12 mx-auto'>
          <h2>Add Tasks for {props.name} to Complete</h2>

          <div className='row'>
            <div className='col-md-8'>
              <form>
                <label htmlFor='TaskName'>Name of Tasks for: </label>
                <input
                  type='text'
                  name='TaskName'
                  className='form-control'
                  placeholder='Task Name'
                />
                <br />
                <label htmlFor='Collaborator'>Description of Task:</label>
                <input
                  type='text'
                  name='TaskDescription'
                  className='form-control'
                  placeholder='Task Description'
                />
                <br />
                <label htmlFor='Collaborator'>Due Date: </label>
                <input
                  type='text'
                  name='Collaborator'
                  className='form-control'
                  placeholder='Collaborator'
                />
                <br />
                <label htmlFor='Priority'>
                  Priority Level: (eventually a dropdown){" "}
                </label>
                <input
                  type='text'
                  name='Priority'
                  className='form-control'
                  placeholder='Priority'
                />
                <br />
                <button>Add Task</button>
                <br />
                <button>Continue on To Team 2 Tasks</button>
              </form>
            </div>
            <div className='col-md-4'>
              <p>This is where Tasks will show up</p>
            </div>
          </div>
        </div>
      </div>
    </NPLayout>
  );
};

export default FormIndividualTasks;
