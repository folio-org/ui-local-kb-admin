
import { get } from 'lodash';
import showToast from './showToast';

export default function calloutLogic(props, prevProps, keyString, calloutFunc) {
  const prevJobId = get(prevProps, `location.state.${keyString}JobId`, '');
  const currentJobId = get(props, `location.state.${keyString}JobId`, '');
  if (prevJobId !== currentJobId) {
    const name = get(props, `location.state.${keyString}JobName`, '');
    if (name !== '') calloutFunc(showToast('ui-local-kb-admin.job.create.success', get(props, `location.state.${keyString}JobClass`, ''), 'success', { name }));
  }
}
