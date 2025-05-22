export interface CalculatorFormFields {
  carValue: number;
  period: string;
  downPayment: number;
  residualValuePercentage: string;
  isEcoFriendly: boolean;
  monthlyPayment: string;
}

export interface PersonalInformationFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pid: string;
  dateOfBirth: number;
  maritalStatus: string;
  numberOfChildren: number;
  citizenship: string;
  monthlyIncome: number;
  languagePref: string;
}

export interface CarLeasingFormFields {
  make: string;
  model: string;
  modelVariant: string;
  year: string;
  fuelType: string;
  enginePower: number;
  engineSize: number;
  url: string;
  offer?: string;
  terms: boolean;
  confirmation: boolean;
}

export interface FormsPostRequest {
  ratesRequest: CalculatorFormFields;
  personalInformationRequest: PersonalInformationFormFields;
  leaseRequest: CarLeasingFormFields;
}

export interface CalculatorRequest {
  carValue: number;
  period: string;
  downPayment: number;
  residualValuePercentage: string;
  isEcoFriendly: boolean;
}

export interface CalculatorResponse {
  monthlyPayment: number;
}

export interface Model {
  id: number;
  name: string;
}

export interface Variant {
  id: number;
  name: string;
}

export interface ModelInfoAPIResponse {
  variants: Variant[];
  years: number[];
  fuelTypes: string[];
  enginePowers: number[];
  engineSizes: string[];
}

export interface ModelInfo {
  variants: Variant[];
  details: Details;
}

export interface Details {
  years: number[];
  fuelTypes: string[];
  enginePowers: number[];
  engineSizes: string[];
}

export interface PersonalInfoDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pid: string;
  dateOfBirth: string;
  maritalStatus: string;
  numberOfChildren: number;
  citizenship: string;
  monthlyIncome: string;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  isOpened: boolean;
  createdAt: string;
  status: Status;
  isHighRisk: boolean;
}

export interface sortAndFilterRequest {
  page: string,
  STATUS: Status[] | null,
  searchQuery: string | null,
}

export const enum Status {
  NEW = "NEW",
  UPDATED = "UPDATED",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface NoteRequest {
  applicationId: string;
  noteText: string;
}

export interface NoteResponse {
  noteText: string;
}

export interface NoteTextResponse {
  notesText: string;
  createdAt: string;
}

export interface MailTextResponse {
  mailText: string;
  createdAt: string;
}

export interface MailsAndNotesResponse {
  applicationId: string;
  notesTexts: NoteTextResponse[];
  mailTexts: MailTextResponse[];
}

export interface GeneralFormsResponse {
  ratesResponse: {
    id: string;
    carValue: string;
    period: number;
    downPayment: string;
    residualValuePercentage: string;
    isEcoFriendly: boolean;
    monthlyPayment: string;
  };
  personalInformationResponse: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    pid: string;
    dateOfBirth: string;
    maritalStatus: string;
    numberOfChildren: number;
    citizenship: string;
    monthlyIncome: string;
    languagePref: string;
  };
  leaseResponse: {
    id: string;
    make: string;
    model: string;
    modelVariant: string;
    year: string;
    fuelType: string;
    enginePower: string;
    engineSize: string;
    url: string;
    offer: string;
    terms: boolean;
    confirmation: boolean;
  };
}

export interface GeneralAllFormsResponse {
  ratesResponse: {
    id: string;
    carValue: string;
    period: number;
    downPayment: string;
    residualValuePercentage: string;
    isEcoFriendly: boolean;
    monthlyPayment: string;
  };
  personalInformationResponse: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    pid: string;
    dateOfBirth: string;
    maritalStatus: string;
    numberOfChildren: number;
    citizenship: string;
    monthlyIncome: string;
    languagePref: string;
  };
  leaseResponse: {
    id: string;
    make: string;
    model: string;
    modelVariant: string;
    year: string;
    fuelType: string;
    enginePower: string;
    engineSize: string;
    url: string;
    offer: string;
    terms: boolean;
    confirmation: boolean;
  };
  statusResponse: {
    id: string;
    applicationStatus: Status;
    isOpened: boolean;
    updatedAt: string;
    createdAt: string;
  };
}
export interface LoginFormFields {
  username: string;
  password: string;
}
export interface LoginFormRequest {
  username: string;
  password: string;
}

export interface MailRequest {
  applicationId: string;
  mailSubject: string;
  mailText: string;
  mailRecipient: string;
}
export interface MailResponse {
  applicationId: string;
  mailSubject: string;
  mailText: string;
  mailRecipient: string;
}

export const enum Months {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12
}

export interface ApplicationStatusCountResponse {
  newCount: number;
  acceptedCount: number,
  rejectedCount: number,
  pendingCount: number
}

export interface ApplicationDailyCountResponse {
  day: string,
  applicationCount: number
}

export interface AcceptedApplicationLoanValueResponse {
  thisYearSum: number,
  lastYearSum: number
}

export interface ApplicationMonthlyCountResponse {
  thisMonthCount: number,
  previousMonthCount: number
}

export interface HighRiskMonthlyCountResponse {
  currentMonthCount: number,
  lastMonthCount: number
}

export interface MailTemplateResponse{
  mailContent: string
}

export const enum MailTemplateType {
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED"
}