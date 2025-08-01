import {dateObjectToDateTimeString} from "../../parsers/dateParser";

class PermissionApplicationRequest {
    constructor({ useStartDate, useEndDate, requirements }) {
        this.use_start_date = dateObjectToDateTimeString(useStartDate);
        this.use_end_date = dateObjectToDateTimeString(useEndDate);
        this.requirements = requirements;
    }
}

export default PermissionApplicationRequest;
