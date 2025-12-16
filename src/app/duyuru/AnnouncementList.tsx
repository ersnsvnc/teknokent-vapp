import { Card } from 'antd';

type Announcement = {
  id: string;
  title: string;
  description: string;
  publishDate?: string;
};

type Props = {
  items: Announcement[];
};

const AnnouncementList = ({ items }: Props) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <h3 className="text-base font-semibold">{item.title}</h3>
          <p className="text-sm text-slate-700">{item.description}</p>
          {item.publishDate && (
            <p className="mt-1 text-xs text-slate-500">
              Yayın: {item.publishDate}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementList;
