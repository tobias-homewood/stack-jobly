import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import JoblyApi from "../utils/api";
import { Link } from "react-router-dom";
import { Button, Spinner, Form, InputGroup, Container } from "react-bootstrap";

const Companies = () => {
    // This is a list of all companies
    const [allCompanies, setAllCompanies] = useState([]);

    // This is a list of companies that are currently being displayed
    const [displayedCompanies, setDisplayedCompanies] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchCompanies = async () => {
        setIsLoading(true);
        setAllCompanies(await JoblyApi.allCompanies());
        setIsLoading(false);
    };

    // this is run ONCE at the beginning
    useEffect(() => {
        fetchCompanies();
    }, []);

    // this is run whenever the search term changes or the list of companies changes
    useEffect(() => {
        setDisplayedCompanies(
            allCompanies.filter((company) =>
                company.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, allCompanies]);

    return (
        <Container>
            <InputGroup className="my-3">
                <Form.Control
                    type="text"
                    placeholder="Search for a company"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={fetchCompanies}>Search</Button>
            </InputGroup>
            {isLoading && <Spinner animation="border" />}
            {!isLoading &&
                displayedCompanies.map((company) => (
                    <Card
                        as={Link}
                        to={company.handle}
                        className="my-3 text-decoration-none"
                        key={company.handle}
                    >
                        <Card.Body>
                            <Card.Title>{company.name}</Card.Title>
                            <Card.Text>{company.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
        </Container>
    );
};

export default Companies;
