import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Company = ({ company }) => {
    return (
        <Card
            as={Link}
            to={company.handle}
            className="my-3 text-decoration-none"
        >
            <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Text>{company.description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Company;
