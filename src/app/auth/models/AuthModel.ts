export interface AuthModel {
    email: string;
    expires: Date | string;
    firstName: string;
    lastName: string;
    token: string;
    userId: number;
    companies: Company[];
}

export interface Company {
    additionalInformation: string;
    bankAccounts: string[];
    city: string;
    country: string;
    id: number;
    name: string;
    postalCode: string;
    streetAddress: string;
    vatOrPersonalCode: string;
    logo: string;
}
