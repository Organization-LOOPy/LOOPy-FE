import { validateTime } from '../pages/Admin/Setting/_components/tabList/operation/TimeInput';

export const timeToMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export const isRangeValid = (start: string, end: string) =>
  validateTime(start) && validateTime(end) && timeToMinutes(start) <= timeToMinutes(end);

export const isBreakValid = (
  open: string,
  close: string,
  breakType: '있음' | '없음',
  breakStart: string,
  breakEnd: string
) => {
  if (breakType === '없음') return true;
  if (!validateTime(open) || !validateTime(close)) return false;
  if (!validateTime(breakStart) || !validateTime(breakEnd)) return false;
  if (!isRangeValid(open, close)) return false;

  const o = timeToMinutes(open);
  const c = timeToMinutes(close);
  const s = timeToMinutes(breakStart);
  const e = timeToMinutes(breakEnd);

  return o <= s && s < e && e <= c;
};

import type { TimeSectionValues } from '../pages/Admin/Setting/_components/tabList/operation/TimeSection';
export const validateTimeSectionValues = (v: TimeSectionValues) => {
  const errors: Record<string, string> = {};
  const check = (k: string, open: string, close: string, bt: '있음'|'없음', bs: string, be: string) => {
    if (open && !validateTime(open)) errors[`${k}.open`] = '형식은 HH:MM';
    if (close && !validateTime(close)) errors[`${k}.close`] = '형식은 HH:MM';
    if (open && close && !isRangeValid(open, close)) errors[`${k}.range`] = '종료≥시작이어야 합니다';
    if (!isBreakValid(open, close, bt, bs, be)) errors[`${k}.break`] = '브레이크는 영업시간 안에서 시작<종료';
  };

  if (v.type === 'all') {
    check('all', v.all.open, v.all.close, v.all.breakType, v.all.breakStart, v.all.breakEnd);
  } else if (v.type === 'weekdayWeekend') {
    check('weekday', v.weekday.open, v.weekday.close, v.weekday.breakType, v.weekday.breakStart, v.weekday.breakEnd);
    check('weekend', v.weekend.open, v.weekend.close, v.weekend.breakType, v.weekend.breakStart, v.weekend.breakEnd);
  } else if (v.type === 'byDay') {
    Object.entries(v.byDay).forEach(([day, s]) => {
      check(`byDay.${day}`, s.open, s.close, s.breakType, s.breakStart, s.breakEnd);
    });
  }
  return { ok: Object.keys(errors).length === 0, errors };
};
