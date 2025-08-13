const GetRemainingDays = (targetDate: Date | string): number => {
  const now = new Date();
  const due = new Date(targetDate);
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 남은 일 수
};

export { GetRemainingDays };
