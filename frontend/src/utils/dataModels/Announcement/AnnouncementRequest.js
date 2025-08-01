import { dateObjectToDateString } from '../../parsers/dateParser';

class AnnouncementRequest {
  constructor({
    title,
    isPinned,
    announcementBeganAt,
    announcementEndedAt,
    content,
  }) {
    this.title = title;
    this.is_pinned = isPinned;
    this.announcement_began_at = dateObjectToDateString(announcementBeganAt);
    this.announcement_ended_at = dateObjectToDateString(announcementEndedAt);
    this.content = content;
  }
}

export default AnnouncementRequest;
