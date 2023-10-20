export class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
    address: string;
    role: string;
  
    constructor() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.mobile = '';
      this.address = '';
      this.role = 'User'; // Default role value
    }
  }
  