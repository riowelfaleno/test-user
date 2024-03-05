export interface CreateUserParam {
  name: string;
  address: string;
  email: string;
  password: string;
  photos: string[];
  creditCardType: string;
  creditCardNumber: string;
  creditCardName: string;
  creditCardExpiry: string;
  creditCardCvv: string;
}

export interface GetUserListParam {
  queryBy: string;
  orderBy: string;
  sort: string;
  offset: number;
  limit: number;
}

export interface GetUserDetailParam {
  userId: string;
}

export interface UpdateUserParam {
  userId: string;
  name?: string;
  address?: string;
  email?: string;
  password?: string;
  photos?: string[];
  creditCardType?: string;
  creditCardNumber?: string;
  creditCardName?: string;
  creditCardExpiry?: string;
  creditCardCvv?: string;
}
