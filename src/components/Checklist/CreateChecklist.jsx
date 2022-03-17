import React, {Fragment, useState} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";

const CreateChecklist = ({valueAdded, setValueAdded}) => {
    const [checkListName, setCheckListName] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const saveOrUpdateToLocalStorage = (checklist) => {

        const slug = checkListName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        checklist.push({name: checkListName, slug, tasks: []});
        let newCheckList = JSON.stringify(checklist);
        localStorage.setItem("checkList", newCheckList);
        setCheckListName("");
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false)
        }, 5000)
        setValueAdded(!valueAdded);
    }

    const createChecklist = (event) => {
        event.preventDefault();
        if(localStorage.checkList){
            let checklist = JSON.parse(localStorage.checkList);
            saveOrUpdateToLocalStorage(checklist)
        } else {
            let checkList = [];
            saveOrUpdateToLocalStorage(checkList)
        }
    };

    return (
        <Fragment>
            <Card style={{width: '50%'}}>
                <Card.Body>
                    <Card.Title>Create Checklist</Card.Title>
                    <Form className="mt-3" onSubmit={createChecklist}>
                        <Form.Group className="mb-3" controlId="formBasicChecklist">
                            <Form.Label>Checklist Name</Form.Label>
                            <Form.Control
                                required
                                onChange={(event) => setCheckListName(event.target.value)}
                                value={checkListName}
                                type="text"
                                placeholder="Enter your checklist name"
                            />
                        </Form.Group>
                        {showAlert &&
                        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                            Checklist created successfully
                        </Alert>}
                        <div className="d-flex justify-content-end">
                            <Button type="submit" variant="primary" size="sm">Create</Button>
                        </div>
                    </Form>

                </Card.Body>
            </Card>
        </Fragment>
    );
};

export default CreateChecklist;
