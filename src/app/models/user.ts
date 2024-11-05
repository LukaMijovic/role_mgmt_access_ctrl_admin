import { Time } from "@angular/common";

export class User {
    constructor(
        public UserID: number,
        public Firstname: string,
        public Lastname: string,
        public Email: string,
        public Telephone: string,
        public Birthdate: string,
        public UserRegistrationDate: Date,
        public roleId: number
    ) {

    }
}