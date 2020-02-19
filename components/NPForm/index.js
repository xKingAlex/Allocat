import Nav from "../Nav/index";
import NPLayout from "../NPLayout/index";
import NewTeam from "../NewTeam/index";
import NewCollaborator from "../NewCollaborator/index";

const NPForm = props => {
  var isOnPage1 = props.pageNum === 0;
  var isOnPage2 = props.pageNum === 1;
  var isOnPage3 = props.pageNum === 2;

  return (
    <div>
      <Nav pageTitle='Project Creation' />
      {isOnPage1 ? (
        <div>
          <NPLayout>
            <div className='row'>
              <div className='col-md-12 mx-auto'>
                <h2>Project Info</h2>
                <form>
                  <label htmlFor='projectName'>Project Name:</label>
                  <input
                    type='text'
                    name='projectName'
                    className='form-control'
                    id='projectName'
                    placeholder='Project Title'
                    onChange={props.handleTeamNameChange}
                  />
                  <label htmlFor='ProjectDescription'>
                    Project Description:
                  </label>
                  <input
                    type='text'
                    name='projectDescription'
                    className='form-control'
                    rows='5'
                    id='projectDescription'
                    placeholder='Project Description'
                    onChange={props.handleChange}
                  />
                  <label htmlFor='ProjectDescription'>Project Due Date:</label>
                  <input
                    type='text'
                    name='projectDueDate'
                    className='form-control'
                    rows='5'
                    id='projectDueDate'
                    placeholder='02/29/20'
                    onChange={props.handleTeamNameChange}
                  />
                </form>
              </div>
            </div>
            <button onClick={() => props.handleNextPage()}>Next</button>
          </NPLayout>
        </div>
      ) : isOnPage2 ? (
        <div>
          <NPLayout>
            <h2>Project Teams</h2>
            {props.numberOfTeams.map((team, index) => {
              var i = parseInt(index);
              var elementNum = i + 1;

              return (
                <NewTeam
                  elementNum={elementNum}
                  handleChange={props.handleTeamNameChange}
                />
              );
            })}
            <button type='button' onClick={() => props.handleNewTeam()}>
              Add Another Team
            </button>
            <br />
            <button onClick={() => props.handleLastPage()}>Last</button>
            <button onClick={() => props.handleNextPage()}>Next</button>
          </NPLayout>
        </div>
      ) : (
        <div>
          <NPLayout>
            <h2>Project Collaborators</h2>
            <NewCollaborator
              value={props.collaboratorEmail}
              handleChange={props.handleChange}
            />
            {props.foundCollaborator ? (
              <p>{props.collaboratorName}</p>
            ) : props.searchedForCollaborator ? (
              <p>No user found...</p>
            ) : (
              <p></p>
            )}
            <button type='button' onClick={() => props.handleCollabSearch()}>
              Search
            </button>
            <button
              type='button'
              onClick={() => props.handleAddNewCollaborator()}
            >
              Add
            </button>
            <br />
            <button onClick={() => props.handleLastPage()}>Last</button>
            <br />
            <button type='button' onClick={() => props.handleNewProject()}>
              Create Project
            </button>
          </NPLayout>
        </div>
      )}
    </div>
  );
};

export default NPForm;
