import { useState, useContext } from "react";
import CurrentUserContext from "../utils/currentUserContext";
import JoblyApi from "../utils/api";
import { Button, Card } from "react-bootstrap";

const Job = ({ job }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const [applied, setApplied] = useState(
        currentUser.applications.includes(job.id)
    );

    const applyForjob = async () => {
        if (applied) return;
        try {
            await JoblyApi.applyToJob(currentUser.username, job.id);
            currentUser.applications.push(job.id);
            setApplied(true);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Card className="my-3">
            <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle>{job.companyName}</Card.Subtitle>
                <Card.Text className="my-3">
                    Salary: {job.salary || 0} <br />
                    Equity: {job.equity || 0}
                </Card.Text>
                <div className="d-flex justify-content-end">
                    {applied ? (
                        <Button variant="success" disabled>
                            Applied
                        </Button>
                    ) : (
                        <Button variant="danger" onClick={applyForjob}>
                            Apply
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Job;
