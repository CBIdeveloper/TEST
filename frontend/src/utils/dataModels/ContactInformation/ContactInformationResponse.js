class ContactInformationResponse {
  constructor({
    name,
    job_position,
    email,
    business_phone,
    telephone_extension,
    cellphone,
    city_name,
    firstlevel_unit_full_name,
    firstlevel_agency_full_name,
    firstlevel_agency_short_name,
    secondary_agency_full_name,
    secondary_agency_short_name,
    maintain_manufacturer,
    agency_type,
    militaryagency_id,
    level_id,
    is_plansponsor,
    mobilization_classification_id,
    mobilization_classification_name,
    plan_id,
    plan_name,
    business_plan,
  }) {
    this.name = name;
    this.jobPosition = job_position;
    this.email = email;
    this.businessPhone = business_phone;
    this.telephoneExtension = telephone_extension;
    this.cellphone = cellphone;

    this.fullTelephone =
      this.telephoneExtension === null
        ? this.businessPhone
        : `${this.businessPhone} 分機${this.telephoneExtension}`;

    this.city = city_name === null ? '' : city_name;
    this.militaryId = militaryagency_id === null ? '' : militaryagency_id;
    this.levelId = level_id === null ? '' : level_id;
    this.firstlevelUnit =
      firstlevel_unit_full_name === null ? '' : firstlevel_unit_full_name;
    this.firstlevelAgency =
      firstlevel_agency_short_name === null ? '' : firstlevel_agency_short_name;
    this.secondaryAgency =
      secondary_agency_short_name === null ? '' : secondary_agency_short_name;
    if (agency_type === '1' || agency_type === '2') {
      this.workPlace = `${this.firstlevelAgency}${this.secondaryAgency}${this.city}${this.firstlevelUnit}`;
    } else if (agency_type === '3') {
      this.workPlace = maintain_manufacturer;
    } else if (agency_type === '4') {
      if (militaryagency_id === '001001') {
        this.workPlace = '後備指揮部';
      } else if (militaryagency_id === '001002') {
        this.workPlace = '資通電軍指揮部';
      } else if (militaryagency_id === '002001') {
        this.workPlace = '第一作戰區';
      } else if (militaryagency_id === '002002') {
        this.workPlace = '第二作戰區';
      } else if (militaryagency_id === '002003') {
        this.workPlace = '第三作戰區';
      } else if (militaryagency_id === '002004') {
        this.workPlace = '第四作戰區';
      } else if (militaryagency_id === '002005') {
        this.workPlace = '第五作戰區';
      } else if (militaryagency_id === '002006') {
        this.workPlace = '北區後備指揮部';
      } else if (militaryagency_id === '002007') {
        this.workPlace = '中區後備指揮部';
      } else if (militaryagency_id === '002008') {
        this.workPlace = '南區後備指揮部';
      } else if (militaryagency_id === '003001') {
        this.workPlace = '基隆市後備指揮部';
      } else if (militaryagency_id === '003002') {
        this.workPlace = '新北市後備指揮部';
      } else if (militaryagency_id === '003003') {
        this.workPlace = '臺北市後備指揮部';
      } else if (militaryagency_id === '003004') {
        this.workPlace = '桃園市後備指揮部';
      } else if (militaryagency_id === '003005') {
        this.workPlace = '新竹市後備指揮部';
      } else if (militaryagency_id === '003006') {
        this.workPlace = '新竹縣後備指揮部';
      } else if (militaryagency_id === '003007') {
        this.workPlace = '苗栗縣後備指揮部';
      } else if (militaryagency_id === '003008') {
        this.workPlace = '臺中市後備指揮部';
      } else if (militaryagency_id === '003009') {
        this.workPlace = '南投縣後備指揮部';
      } else if (militaryagency_id === '003010') {
        this.workPlace = '彰化縣後備指揮部';
      } else if (militaryagency_id === '003011') {
        this.workPlace = '雲林縣後備指揮部';
      } else if (militaryagency_id === '003012') {
        this.workPlace = '嘉義市後備指揮部';
      } else if (militaryagency_id === '003013') {
        this.workPlace = '嘉義縣後備指揮部';
      } else if (militaryagency_id === '003014') {
        this.workPlace = '台南市後備指揮部';
      } else if (militaryagency_id === '003015') {
        this.workPlace = '高雄市後備指揮部';
      } else if (militaryagency_id === '003016') {
        this.workPlace = '屏東縣後備指揮部';
      } else if (militaryagency_id === '003017') {
        this.workPlace = '宜蘭縣後備指揮部';
      } else if (militaryagency_id === '003018') {
        this.workPlace = '台東縣後備指揮部';
      } else if (militaryagency_id === '003019') {
        this.workPlace = '花蓮縣後備指揮部';
      } else if (militaryagency_id === '003020') {
        this.workPlace = '澎湖縣後備指揮部';
      } else if (militaryagency_id === '003021') {
        this.workPlace = '金門縣後備服務中心';
      } else if (militaryagency_id === '003022') {
        this.workPlace = '連江縣後備服務中心';
      }
    }
    this.isPlansponsor = is_plansponsor;
    this.mobilizationClassificationId = mobilization_classification_id;
    this.mobilizationClassificationName = mobilization_classification_name
    this.planId = plan_id;
    this.planName = plan_name;
    this.businessPlan = business_plan;
  }
}

export default ContactInformationResponse;
