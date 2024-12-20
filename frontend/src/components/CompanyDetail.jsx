import { useParams } from "react-router-dom";
import JoblyApi from "../utils/api";
import useLoading from "../hooks/useLoading";
import { Spinner, Container } from "react-bootstrap";
import Job from "./Job";

const CompanyDetail = () => {
    const { handle } = useParams();
    const [company, _, isLoading] = useLoading(
        JoblyApi.getCompany(handle)
    );

    if (isLoading) {
        return <Spinner animation="border" />;
    }
    return (
        <Container>
            <h1 className="text-light mt-3">{company.name}</h1>
            <p className="text-light">{company.description}</p>
            {company.jobs.map((job) => (
                <Job key={job.id} job={job} />
            ))}
        </Container>
    );
};

export default CompanyDetail;
