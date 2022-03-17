import React, {useEffect, useState} from 'react';
import {Button, Card, Form, ListGroup, ProgressBar} from "react-bootstrap";
import ReactDragListView from 'react-drag-listview';

const SingleCheckList = ({tasks, checkList, taskAdded, setTaskAdded}) => {
    const [progress, setProgress] = useState(0)
    const [task, setTask] = useState('');

    useEffect(() => {
        let total = tasks.length;
        let completed = tasks.filter(item => item.selected !== "").length;
        setProgress(((100 * completed) / total).toFixed(0))
    }, [tasks])

    const updateCheckList = () => {
        let newCheckList = JSON.stringify(checkList);
        localStorage.setItem("checkList", newCheckList);
        setTaskAdded(!taskAdded);
    };

    const onSubmitTaskCreation = (e) => {
        e.preventDefault();
        tasks.push({label: task, selected: ""});
        updateCheckList();
        setTask("")
    };

    const handleRadioChange = (value, index) => {
        tasks.forEach((item, i) => {
            if(index === i){
                item.selected = value
            }
        })
        updateCheckList();
    }

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const item = tasks.splice(fromIndex, 1)[0];
            tasks.splice(toIndex, 0, item);
            updateCheckList();
        },
        nodeSelector: 'li',
        handleSelector: 'div'
    };

    return (
        <Card style={{width: '100%'}} className="mb-5">
            <Card.Body>
                <Card.Title>Create Task</Card.Title>
                <div className="mt-3 mb-4">
                    <Form onSubmit={onSubmitTaskCreation}>
                        <Form.Group className="mb-3" controlId="formBasicTask">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                required
                                onChange={(event) => setTask(event.target.value)}
                                value={task}
                                type="text"
                                placeholder="Enter your task"
                            />
                        </Form.Group>
                        <Button size="sm" type="submit">Add</Button>
                    </Form>

                </div>
                {tasks.length > 0 &&
                    <>
                        <Card.Title className="fw-bold">Your Tasks</Card.Title>
                        <div className="mb-4 mt-4">
                            <Card.Title>Tasks Completion Progress</Card.Title>
                            <ProgressBar now={progress} label={`${progress}%`}/>
                        </div>

                        <ReactDragListView {...dragProps}>
                            <ListGroup as="ol" numbered>
                                {tasks.map((item, index) => (
                                    <ListGroup.Item
                                        as="li"
                                        key={item.label}
                                        className="d-flex justify-content-between align-items-start "
                                    >
                                        {/*<a href="#">Drag</a>*/}
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold task-drag">{item.label}</div>
                                            <div className="mt-3 form-check form-check-inline">

                                                <input
                                                    onChange={() => handleRadioChange("pass", index)}
                                                    checked={item.selected === "pass"}
                                                    className="form-check-input form-check-input-success"
                                                    type="radio"
                                                    name={item.label}
                                                    id={`inlineRadio1${index}`}
                                                    value="pass"
                                                />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Pass</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    onChange={() => handleRadioChange("fail", index)}
                                                    checked={item.selected === "fail"}
                                                    className="form-check-input form-check-input-danger"
                                                    type="radio"
                                                    name={item.label}
                                                    id={`inlineRadio1${index}`}
                                                    value="fail"
                                                />
                                                <label className="form-check-label" htmlFor="inlineRadio2">Fail</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    onChange={() => handleRadioChange("n/a", index)}
                                                    checked={item.selected === "n/a"}
                                                    className="form-check-input form-check-input-secondary"
                                                    type="radio"
                                                    name={item.label}
                                                    id={`inlineRadio1${index}`}
                                                    value="n/a"
                                                />
                                                <label className="form-check-label" htmlFor="inlineRadio3">N/A </label>
                                            </div>
                                        </div>


                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ReactDragListView>
                        {/*<div className="d-flex justify-content-end mt-3">*/}
                        {/*    <Button size="sm" type="submit">Submit</Button>*/}
                        {/*</div>*/}
                    </>
                }
            </Card.Body>

        </Card>
    );
};

export default SingleCheckList;
