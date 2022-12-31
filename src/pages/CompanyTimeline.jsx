import { useParams } from "react-router-dom";
import CourtTimeline from "./management/courts/CourtTimeline";

export default () => {
    const { companyId } = useParams();
    return <CourtTimeline isMyTimeline={false} companyId={companyId} />
}