import { useState, useEffect } from "react";
import JoblyApi from "../utils/api";
import Company from "./Company";
import { Button, Spinner, Form, InputGroup, Container } from "react-bootstrap";
import useLoading from "../hooks/useLoading";

const Companies = () => {
    // This is a list of companies that are currently being displayed
    const [displayedCompanies, setDisplayedCompanies, isLoading] = useLoading(JoblyApi.allCompanies());
    const [search, setSearch] = useState("");

    const searchCompanies = () => {
        setDisplayedCompanies(JoblyApi.searchCompanies(search));
    };

    return (
        <Container>
            <InputGroup className="my-3">
                <Form.Control
                    type="text"
                    placeholder="Search for a company"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={searchCompanies}>Search</Button>
            </InputGroup>
            {isLoading && <Spinner animation="border" />}
            {!isLoading &&
                displayedCompanies.map((company) => (
                    <Company key={company.handle} company={company} />
                ))}
        </Container>
    );
};

export default Companies;
