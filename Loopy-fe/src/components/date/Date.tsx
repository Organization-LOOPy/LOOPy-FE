interface DateProps {
  date: string | Date;
}

const Date: React.FC<DateProps> = ({ date }) => {
  // string이면 Date로 변환
  const d: Date = typeof date === 'string' ? new window.Date(date) : date;

  const formattedDate = d
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\.$/, ''); // 마지막 점 제거

  return <>{formattedDate}</>;
};

export default Date;
