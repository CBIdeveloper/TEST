class PermissionApproveRequest {
    constructor({useStartDate, useEndDate, auditOpinion, status}) {
        this.use_start_date = useStartDate;
        this.use_end_date = useEndDate;
        this.audit_opinion = auditOpinion;
        this.status = status
    }
}

export default PermissionApproveRequest;