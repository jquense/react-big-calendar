import { igniteClientSDK } from '@mondaydotcomorg/ignite-client-sdk';
import { REACT_BIG_CALENDAR_SINGLETON_BACKEND } from './features-consts';

export const canIgniteFeature = (feature) => {
  return igniteClientSDK.isReleased(feature);
};

export const canUseReactBigCalendarSingletonBackend = () => {
  return canIgniteFeature(REACT_BIG_CALENDAR_SINGLETON_BACKEND);
};
