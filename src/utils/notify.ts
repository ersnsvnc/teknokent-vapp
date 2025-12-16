import { notification } from 'antd';

type NotifyType = 'success' | 'error' | 'warning' | 'info';

export const notify = (type: NotifyType, title: string) => {
  notification[type]({
    title,
  });
};
