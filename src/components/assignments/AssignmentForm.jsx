import React, { useState, Fragment, useContext } from 'react';
import AssignmentContext from '../../context/assignments/assignmentContext';

const AssignmentForm = () => {
  const assignmentContext = useContext(AssignmentContext);
  const [assignment, setAssignment] = useState({
    number: '',
  });

  const { number } = assignment;

  const onChange = (e) =>
    setAssignment({ ...assignment, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    assignmentContext.addAssignment(assignment);
    setAssignment({
      number: '',
    });
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label id='assignmentNumber'>Nummber</label>
          <input
            type='text'
            className='form-control'
            id='assignmentNumber'
            name='number'
            value={number}
            onChange={onChange}
          />
        </div>
        <button className='btn btn-primary mt-2' type='submit'>
          Einreichen
        </button>
      </form>
    </Fragment>
  );
};

export default AssignmentForm;
