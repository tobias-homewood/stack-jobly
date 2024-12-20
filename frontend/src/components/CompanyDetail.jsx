import { useParams } from "react-router-dom";

const CompanyDetail = () => {
    const { handle } = useParams();
    return <div>Company Details for: {handle}</div>;
};

export default CompanyDetail;