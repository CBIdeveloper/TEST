class BraidingItem {
  constructor({
    id,
    code,
    name,
    type,
    typeIndex,
    mobilizationPlan,
    mobilizationPlanId,
    mobilizationClassification,
    mobilizationClassificationId,
    firstLevelAgency,
    firstLevelAgencyId,
    secondaryAgency,
    secondaryAgencyId,

    searchKey,

    fetchCategoryData,
    queryCategoryData,
    fetchDetailData,
    fetchPlanData,

    planDataModel,

    fetchUniqueCategoryData,
    queryUniqueCategoryData,
    fetchUniqueDetailData,

    configList,
    planConfigList,
    categoryTableHeader,

    criteriaList,

    specialQuery,
  }) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.type = type;
    this.typeIndex = typeIndex;
    this.mobilizationPlan = mobilizationPlan;
    this.mobilizationPlanId = mobilizationPlanId;
    this.mobilizationClassification = mobilizationClassification;
    this.mobilizationClassificationId = mobilizationClassificationId;
    this.firstLevelAgency = firstLevelAgency;
    this.firstLevelAgencyId = firstLevelAgencyId;
    this.secondaryAgency = secondaryAgency;
    this.secondaryAgencyId = secondaryAgencyId;

    this.searchKey = searchKey || 'name';

    this.fetchCategoryData = fetchCategoryData || null;
    this.queryCategoryData = queryCategoryData || null;
    this.fetchDetailData = fetchDetailData || null;
    this.fetchPlanData = fetchPlanData || null;

    this.planDataModel = planDataModel;

    this.fetchUniqueCategoryData = fetchUniqueCategoryData || null;
    this.queryUniqueCategoryData = queryUniqueCategoryData || null;
    this.fetchUniqueDetailData = fetchUniqueDetailData || null;

    this.configList = configList || [];
    this.planConfigList = planConfigList || [];
    this.categoryTableHeader = categoryTableHeader || [];

    this.mobilizationAgency = `${this.firstLevelAgency}`;
    if (this.secondaryAgency !== '') {
      this.mobilizationAgency = `${this.firstLevelAgency}/${this.secondaryAgency}`;
    }

    this.criteriaList = criteriaList;

    this.specialQuery = specialQuery || false;
  }
}

export default BraidingItem;
