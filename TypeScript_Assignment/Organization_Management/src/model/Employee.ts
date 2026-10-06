export type Designation =
  | "Engineer"
  | "Lead"
  | "Manager"
  | "Director"
  | "CEO";

export abstract class Employee {
  constructor(
    public name: string,
    public id: string,
    public dateOfBirth: string,
    public designation: Designation,
    public reportsTo: string | null,
    public reportees: string[]
  ) {}
}

export class Engineer extends Employee {
  constructor(
    name: string,
    id: string,
    dateOfBirth: string,
    reportsTo: string
  ) {
    super(name, id, dateOfBirth, "Engineer", reportsTo, []);
  }
}

export class Lead extends Employee {
  constructor(
    name: string,
    id: string,
    dateOfBirth: string,
    reportsTo: string,
    reportees: string[] = []
  ) {
    super( name, id, dateOfBirth, "Lead", reportsTo, reportees);
  }
}

export class Manager extends Employee {
  constructor(
    name: string,
    id: string,
    dateOfBirth: string,
    reportsTo: string,
    reportees: string[] = []
  ) {
    super( name, id, dateOfBirth, "Manager", reportsTo, reportees);
  }
}

export class Director extends Employee {
  constructor(
    name: string,
    id: string,
    dateOfBirth: string,
    reportsTo: string,
    reportees: string[] = []
  ) {
    super( name, id, dateOfBirth, "Director", reportsTo, reportees);
  }
}

export class CEO extends Employee {
  constructor(
    name: string,
    id: string,
    dateOfBirth: string,
    reportees: string[] = []
  ) {
    super( name, id, dateOfBirth, "CEO", null, reportees);
  }
}