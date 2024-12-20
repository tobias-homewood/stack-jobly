import { useState, useEffect } from "react";
import JoblyApi from "../utils/api";
import Job from "./Job";
import { Button, Spinner, Form, InputGroup, Container } from "react-bootstrap";
import useLoading from "../hooks/useLoading";

const Jobs = () => {
    // This is a list of jobs that are currently being displayed
    const [displayedJobs, setDisplayedJobs, isLoading] = useLoading(
        JoblyApi.allJobs()
    );
    const [search, setSearch] = useState("");

    const searchJobs = () => {
        setDisplayedJobs(JoblyApi.searchJobs(search));
    };

    return (
        <Container>
            <InputGroup className="my-3">
                <Form.Control
                    type="text"
                    placeholder="Search for a job"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={searchJobs}>Search</Button>
            </InputGroup>
            {isLoading && <Spinner animation="border" />}
            {!isLoading &&
                displayedJobs.map((job) => <Job key={job.id} job={job} />)}
        </Container>
    );
};

export default Jobs;