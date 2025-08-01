class SysUserAccountRequest {
    constructor({
                    // account,
                    password,
                    name,
                    pid,
                    email,
                    businessPhone,
                    telephoneExtension,
                    cellphone,
                    lineId,
                    jobPosition,
                    isPlansponsor,
                    businessPlan,
                    agencyType,
                    braidingCategoryIdList,
                    businessNeeds,
                    appliedIpAddress,
                    mobilizationPlanId,

                    firstlevelAgencyId,
                    secondaryAgencyId,
                    department,
                    maintainManufacturer,
                    levelId,
                    militaryAgencyId,
                    secondlevelmilitaryAgency,

                    cityId,
                    firstlevelUnitId,
                    unitName,

                    state,
                    roleMainId,
                    mobilizationType,

                    remark,

                    pamacc,
                    ztacc,
                    splacc,
                    toacc,
                    report
                }) {
        // this.account = account;
        this.password = password;

        this.name = name;
        this.pid = pid;
        this.email = email;
        this.business_phone = businessPhone;
        this.telephone_extension = telephoneExtension;
        this.cellphone = cellphone;
        this.line_id = lineId;
        this.job_position = jobPosition;
        this.is_plansponsor = isPlansponsor;
        this.business_plan = businessPlan;
        this.agency_type = agencyType;
        this.braiding_category_id_list = braidingCategoryIdList;
        this.business_needs = businessNeeds;
        this.applied_ip_address = appliedIpAddress;
        this.mobilization_plan_id = mobilizationPlanId;

        this.firstlevel_agency_id =
            firstlevelAgencyId === '' ? null : firstlevelAgencyId;
        this.secondary_agency_id =
            secondaryAgencyId === '' ? null : secondaryAgencyId;
        this.department = department === '' ? null : department;
        this.maintain_manufacturer = maintainManufacturer;

        this.city_id = cityId === '' ? null : cityId;
        this.firstlevel_unit_id = firstlevelUnitId === '' ? null : firstlevelUnitId;
        this.unit_name = unitName === '' ? null : unitName;

        this.state = state;

        this.role_main_id = roleMainId;

        this.mobilization_type = mobilizationType;
        this.level_id = levelId;
        this.militaryagency_id = militaryAgencyId;
        this.secondlevel_militaryagency = secondlevelmilitaryAgency;

        this.remark = remark;

        this.ztacc = ztacc;
        this.pamacc = pamacc;
        this.splacc = splacc;
        this.toacc = toacc;
        this.report = report;
    }
}

export default SysUserAccountRequest;
