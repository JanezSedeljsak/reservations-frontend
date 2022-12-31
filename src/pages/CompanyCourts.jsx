import LocationCourts from "./management/courts/LocationCourts";
import { useParams } from "react-router-dom";

export default () => {
    const { companyId } = useParams();
    return <LocationCourts isMyCourts={false} companyId={companyId} />
}