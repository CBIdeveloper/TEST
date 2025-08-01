import BooleanType from '../../constants/BooleanType';
import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';

class AnnouncementResponse {
  constructor({
    id,
    title,
    isPinned,
    announcementBeganAt,
    announcementEndedAt,
    content,
    announcementAttachments,
  }) {
    const isPinnedItem = BooleanType.find((item) => item.value === isPinned);

    this.id = id;
    this.isPinned = isPinned;
    this.title = title;
    this.announcementBeganAt = DateHelper.momentDate(announcementBeganAt);
    this.announcementEndedAt = DateHelper.momentDate(announcementEndedAt);
    this.content = content;
    this.announcementAttachments = announcementAttachments;
    this.announcementAttachmentsIdList = announcementAttachments.map(
      (item) => item.id,
    );
    this.announcementAttachmentsNameList = announcementAttachments.map(
      (item) => item.uploadedFileName,
    );

    this.announcementBeganAtString = dateObjectToDateString(
      this.announcementBeganAt,
    );
    this.announcementEndedAtString = dateObjectToDateString(
      this.announcementEndedAt,
    );

    this.displayedTitle = isPinned ? `[置頂]${title}` : title;

    this.isPinnedString = isPinnedItem === undefined ? '' : isPinnedItem.text;
  }
}

export default AnnouncementResponse;
