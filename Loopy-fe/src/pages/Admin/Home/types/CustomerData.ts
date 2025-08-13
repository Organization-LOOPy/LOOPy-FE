export type Coupon = {
  expiry: string;
  title: string;
};

export type Challenge = {
  expiry: string;
  title: string;
};

export type Customer = {
  name: string;
  points: number;
  stamps: number;
  coupons: Coupon[];
  challenges: Challenge[];
};
