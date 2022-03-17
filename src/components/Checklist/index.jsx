import React, {Fragment, useEffect, useState} from 'react';
import CreateChecklist from "./CreateChecklist";
import {Col, ListGroup, Row, Tab} from "react-bootstrap";
import SingleCheckList from "./SingleCheckList";

const Index = () => {
    const [checkList, setChecklist] = useState([]);
    const [valueAdded, setValueAdded] = useState(false);
    const [taskAdded, setTaskAdded] = useState(false);

    useEffect(() => {
     if(localStorage.checkList){
         let list = JSON.parse(localStorage.checkList);
         setChecklist(list)
     }
    }, [valueAdded, taskAdded]);

    return (
        <Fragment>
            <CreateChecklist valueAdded={valueAdded} setValueAdded={setValueAdded}/>

            <div className="mt-4">


                {checkList.length > 0 &&
                    <>
                        <h3>Your Lists</h3>

                        <Tab.Container id="list-group-tabs-example" defaultActiveKey={`#${checkList[0].slug}`}>
                            <Row>
                                <Col sm={4}>
                                    <ListGroup>
                                        {checkList.map(item => (
                                            <ListGroup.Item key={item.slug} action href={`#${item.slug}`}>
                                                {item.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                                <Col sm={8}>
                                    <Tab.Content>
                                        {checkList.map(item => (
                                            <Tab.Pane key={item.slug} eventKey={`#${item.slug}`}>
                                                <SingleCheckList taskAdded={taskAdded} setTaskAdded={setTaskAdded} checkList={checkList} tasks={item.tasks}/>
                                            </Tab.Pane>
                                        ))}
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </>
               }
            </div>

        </Fragment>
    );
};

export default Index;
