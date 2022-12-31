import Locations from "./management/Locations";
import { useParams } from "react-router-dom";

export default () => {
    const { companyId } = useParams();
    return <Locations isMyLocations={false} companyId={companyId} />
}