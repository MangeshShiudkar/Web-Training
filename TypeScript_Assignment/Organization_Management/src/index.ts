import { Engineer, Lead, Manager, Director, CEO } from "./model/Employee";

import { OrganizationService } from "./services/OrganizationService";

const organization = new OrganizationService();

try {
  const ceo = new CEO("John Smith", "C001", "01/15/1975");
  organization.addEmployee(ceo);

  const director = new Director("Robert Brown","D001","03/20/1980","C001");
  organization.addEmployee(director);

  const manager = new Manager("Michael Wilson","M001","05/10/1985","D001");
  organization.addEmployee(manager);

  const lead = new Lead("David Miller","L001","07/25/1990","M001");
  organization.addEmployee(lead);

  const engineer = new Engineer("James Anderson","E001","09/12/1995","L001");
  organization.addEmployee(engineer);

  console.log("All Employees:");
  console.log(organization.getAllEmployees());

  console.log("\nEmployee with ID E001:");
  console.log(organization.getEmployeeById("E001"));

  console.log("\nUpdating Engineer E001:");
  const updatedEngineer = new Engineer("James Anderson Updated","E001","09/12/1995","L001");
  organization.updateEmployee("E001",updatedEngineer);

  console.log(organization.getEmployeeById("E001"));
  console.log("\nDeleting Engineer E001:");

  organization.deleteEmployee("E001");
  console.log(organization.getEmployeeById("E001"));
  
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}