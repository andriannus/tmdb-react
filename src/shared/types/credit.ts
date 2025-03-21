export type Credit = {
  adult: boolean;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type CreditCast = Credit & {
  cast_id: number;
  character: string;
  order: number;
};

export type CreditCrew = Credit & {
  department: string;
  job: string;
};
