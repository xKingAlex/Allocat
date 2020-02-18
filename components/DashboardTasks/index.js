import React, { Component } from "react";
import NPLayout from "../NPLayout";
import { Form } from "react-bootstrap";
import { Card, Modal, Button } from "react-bootstrap";
import axios from "axios";

export default class DashboardTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      setShowForm: false,
      show: false,
      setShow: false,
      TaskName: "",
      TaskDescription: "",
      TaskTeam: "",
      TaskDueDate: "",
      allTeams: [],
      allTasks: []
    };
  }

  componentDidMount() {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    this.getAllProjectTaskInfo(splitUrl);
  }

  async getAllProjectTaskInfo(projectId) {
    await this.getAllTeams(projectId);
    await this.getAllTasks(projectId);

    console.log(this.state);
  }

  async getAllTeams(projectId) {
    var newArr = [];

    await axios.get(`/api/allTeams/${projectId}`).then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        newArr.push(response.data[i].teamName);
      }
    });

    this.setState({
      allTeams: newArr
    });
  }

  async getAllTasks(projectId) {
    var newArr = [];
    var allTeams = this.state.allTeams;

    await axios.get(`/api/allTasks/${projectId}`).then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        var newTask = {
          name: response.data[i].taskName,
          description: response.data[i].taskDescription,
          dueDate: response.data[i].taskDueDate,
          priority: response.data[i].taskPriority,
          team: response.data[i].taskTeam,
          status: response.data[i].taskStatus
        }

        newArr.push(newTask);
      }
    });

    this.setState({
      allTasks: newArr
    });
  }


  handleChange = e => {
    let objName = e.target.name;
    let objValue = e.target.value;

    this.setState({
      [objName]: objValue
    });

  };

  handleCreateTask = () => {
    var url = window.location.href;
    var splitUrl = url.split("/")[4];

    let newTask = {
      projectId: splitUrl,
      taskName: this.state.TaskName,
      taskDescription: this.state.TaskDescription,
      taskDueDate: this.state.TaskDueDate,
      taskPriority: "",
      taskTeam: this.state.TaskTeam,
      taskStatus: "Unassigned"
    }

    axios.post("/api/newTask", newTask).then((response) => {

      if (response.status === 200) {
        console.log("created task");
      }
    });

    this.handleShowAllTasks();
  };

  handleClose = () => {
    this.setState({
      setShowForm: false
    });
  };

  handleShow = () => {
    this.setState({
      setShowForm: true
    });
  };

  handleShowModal = () => {
    this.setState({
      show: true
    });
  };

  handleHideModal = () => {
    this.setState({
      show: false

    });
  };

  handleNewShow = () => {
    this.setState({
      showForm: true
    });
  };

  handleShowAllTasks = () => {
    this.setState({
      showForm: false
    });
  };

  render() {
    if (this.state.showForm) {
      return (
        <NPLayout>
          <div className='col-md-12'>
            <Button onClick={() => this.handleShowAllTasks()}>
              Back to All Tasks
            </Button>
          </div>
          <div className='row mt-5'>
            <div className='col-md-12 mx-auto'>
              <h2>Add Tasks to Complete</h2>

              <div className='row'>
                <div className='col-md-8'>
                  <Form>
                    <label htmlFor='TaskName'>Name of Tasks:</label>
                    <input
                      type='text'
                      name='TaskName'
                      className='form-control'
                      placeholder='Task Name'
                      onChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <label htmlFor='TaskDescription'>
                      Description of Task:
                    </label>
                    <input
                      type='text'
                      name='TaskDescription'
                      className='form-control'
                      placeholder='Task Description'
                      onChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <label htmlFor='TaskTeam'>
                      Which Team is This a Task For?
                    </label>
                    <input
                      type='text'
                      name='TaskTeam'
                      className='form-control'
                      placeholder='Team Name'
                      onChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <label htmlFor='taskDueDate'>Due Date (MM/DD/YY): </label>
                    <input
                      type='text'
                      name='TaskDueDate'
                      className='form-control'
                      placeholder='02/29/20'
                      onChange={this.handleChange.bind(this)}
                    />
                    <br />
                    <Form.Group>
                      <Form.Label>Priority Level</Form.Label>
                      <Form.Control as='select'>
                        <option>High Priority</option>
                        <option>Medium Priority</option>
                        <option>Low Priority</option>
                      </Form.Control>
                    </Form.Group>
                    <br />
                    <button
                      type='button'
                      onClick={() => this.handleCreateTask()}
                    >
                      Add Task
                    </button>
                    <br />
                  </Form>
                </div>
                <div className='col-md-4'>
                  <p>This is where Tasks will show up</p>
                </div>
              </div>
            </div>
          </div>
        </NPLayout>
      );
    } else {
      return (
        <div className='mt-5'>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Create a New Task</Card.Title>
              <Card.Text>Assigned or Unassigned</Card.Text>
              <Button variant='primary' onClick={() => this.handleNewShow()}>
                Create a New Task
              </Button>
            </Card.Body>
          </Card>

          {
            this.state.allTeams.map(team => {
              return (
                <div>
                  <h1>{team}</h1>
                  {
                    this.state.allTasks.map(task => {
                      if (task.team === team) {
                        return (
                          <Card style={{ width: "18rem" }}>
                            <Card.Body>
                              <Card.Title>{task.name}</Card.Title>
                              <Card.Subtitle className='mb-2 text-muted'>
                                {task.priority}
                              </Card.Subtitle>
                              <Card.Text>{task.status}</Card.Text>
                              <Button variant='danger'>Claim Task</Button>
                              <Button variant='primary' onClick={() => this.handleShowModal()}>
                                View Details
                              </Button>
                            </Card.Body>
                          </Card>
                        )
                      }
                    })
                  }
                </div>
              )
            })
          }


          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Project Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='container'>
                <div className='row'>Project Description will go here</div>
                <div className='row'>Level of Priority</div>
                <div className='row'>Due Date</div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => this.handleHideModal()}
              >
                Close
              </Button>
              <Button variant='danger' onClick={() => this.handleClose()}>
                Claim Task
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
}