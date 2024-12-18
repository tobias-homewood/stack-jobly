import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import JoblyApi from "../utils/api";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCompanies = async () => {
            setCompanies(await JoblyApi.allCompanies());
            setIsLoading(false);
        };
        getCompanies();
    }, []);

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    return (
        <div>
            {companies.map((company) => (
                <Card as={Link} to={company.handle} className="m-3 text-decoration-none" key={company.handle}>
                    <Card.Body>
                        <Card.Title>{company.name}</Card.Title>
                        <Card.Text>{company.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Companies;
