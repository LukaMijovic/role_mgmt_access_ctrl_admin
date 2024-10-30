import { Time } from "@angular/common";

export class User {
    constructor(
        public userId: number,
        public Firstname: string,
        public Lastname: string,
        public Email: string,
        public Telephone: string,
        public Birthdate: string,
        public userRegistration: Date,
        public roleId: number
    ) {

    }
}