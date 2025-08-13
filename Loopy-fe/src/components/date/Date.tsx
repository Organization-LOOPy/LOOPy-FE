interface DateProps {
  date: Date;
}

const Date: React.FC<DateProps> = ({ date }) => {
  const formattedDate = date
    .toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })
    .replace(/\.$/, '');

  return <>{formattedDate}</>;
};

export default Date;
