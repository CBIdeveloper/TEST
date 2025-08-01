import store from '../../store/store';
import { setLoading } from '../../store/loading/slice';

const openBlobInTab = (blob) => {
  const filename = blob.headers['content-disposition']
    .split('filename=')[1]
    .split(';')[0];
  const contentType = blob.headers['content-type'];
  const url = window.URL.createObjectURL(
    new Blob([blob.data], {
      type: contentType,
    }),
  );
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noreferrer noopener';
  anchor.download = decodeURI(filename);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  store.dispatch(setLoading(false));
};

export default {
  openBlobInTab,
};
