export declare const insertUser: (name: string, phoneno: string, address: string, label: string) => Promise<{
    name: string;
    phoneno: string;
    address: string;
    label: string;
    id: number;
}>;
export declare const getAllContacts: () => Promise<{
    name: string;
    phoneno: string;
    address: string;
    label: string;
    id: number;
}[]>;
//# sourceMappingURL=service.d.ts.map