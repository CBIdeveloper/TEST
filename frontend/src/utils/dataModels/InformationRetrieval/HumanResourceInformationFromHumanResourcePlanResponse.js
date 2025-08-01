const snakeToCamelCase = (key) =>
  key.replace(/_([a-z])/g, (_, m) => m.toUpperCase());

const transformKey = (object, replacer) =>
  Object.fromEntries(Object.entries(object).map(([k, v]) => [replacer(k), v]));

class HumanResourceInformationFromHumanResourcePlanResponse {
  constructor({ matching_human_resource_plan_list }) {
    this.planList = matching_human_resource_plan_list.map((item) =>
      transformKey(item, snakeToCamelCase),
    );
  }
}

export default HumanResourceInformationFromHumanResourcePlanResponse;
