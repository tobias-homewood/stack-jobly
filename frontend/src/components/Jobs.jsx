import { useState, useEffect } from "react";
import JoblyApi from "../utils/api";
import Job from "./Job";
import { Button, Spinner, Form, InputGroup, Container } from "react-bootstrap";

const Jobs = () => {
  const [displayedJobs, setDisplayedJobs] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchJobs = async () => {
        setIsLoading(true);
        setDisplayedJobs(await JoblyApi.allJobs());
        setIsLoading(false);
    };

    const searchJobs = async () => {
        if (!search) {
            return fetchJobs();
        }
        setIsLoading(true);
        setDisplayedJobs(await JoblyApi.searchJobs(search));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

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
                displayedJobs.map((job) => (
                    <Job key={job.id} job={job} />
                ))}
        </Container>
    );
}

export default Jobs