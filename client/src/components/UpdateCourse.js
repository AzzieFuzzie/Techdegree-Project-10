import React, { Component } from 'react';
import { BrowserHistory } from 'react-router-dom';
import Form from './Form';
import Errors from './Errors';

class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    materialsNeeded: '',
    estimatedTime: '',

    errors: [],
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.retrieveCourse();
    this.submit();
  }

  render() {
    const { title, description, materialsNeeded, estimatedTime, errors } =
      this.state;

    return (
      <div className='wrap'>
        <h1>Update Course</h1>

        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText='Update course'
          elements={() => (
            <React.Fragment>
              <div className='main--grid'>
                <div>
                  <label>Course Title</label>
                  <input
                    id='1'
                    type='text'
                    value={title}
                    onChange={this.change}
                    name='title'
                  />
                  <p>By {}</p>
                  <label>Course Description</label>
                  <textarea
                    id='2'
                    type='text'
                    value={description}
                    onChange={this.change}
                    name='description'
                  ></textarea>
                </div>
                <div>
                  <label>Estimated Time</label>
                  <input
                    id='3'
                    type='text'
                    value={estimatedTime}
                    onChange={this.change}
                    name='estimatedTime'
                  />
                  <label>Materials Needed</label>
                  <textarea
                    id='4'
                    type='text'
                    value={materialsNeeded}
                    onChange={this.change}
                    name='materialsNeeded'
                  ></textarea>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  // Retrieves single course
  retrieveCourse = () => {
    const { context } = this.props;

    context.data
      .getOneCourse(`courses/${params.id}`)
      .then((data) => {
        this.setState({
          title: data.title,
          description: data.description,
          materialsNeeded: data.materialsNeeded,
          estimatedTime: data.estimatedTime,
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  };

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const id = this.props.match.params.id;

    const { title, description, materialsNeeded, estimatedTime } = this.state;
    // Updated course
    const updatedCourse = {
      title,
      description,
      materialsNeeded,
      estimatedTime,
      id,
    };

    context.data
      .updateCourse(updatedCourse, authUser.emailAddress, authUser.password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
          return <Errors />;
        } else {
          this.props.history.push('/courses/update');
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  };
  cancel = () => {
    this.props.history.push('/');
  };
}

export default UpdateCourse;
