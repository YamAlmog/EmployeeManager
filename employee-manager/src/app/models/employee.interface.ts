export interface Employee {
    id?: number;
    firstName: string;
    lastName: string;
    age: number;
    address: {
        city: string;
        street: string;
    };
    department: string;
} 