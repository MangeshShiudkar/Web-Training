import {Employee,Designation} from "../model/Employee";

import {validateRequiredFields,validateDateOfBirth} from "../utils/Validation";

export class OrganizationService {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    validateRequiredFields(employee.name,employee.id, employee.dateOfBirth);
    validateDateOfBirth(employee.dateOfBirth);
    if (this.getEmployeeById(employee.id)) {
      throw new Error(`Employee with ID ${employee.id} already exists.`);
    }
    if (employee.designation === "CEO") {
      const existingCEO = this.employees.find((existingEmployee) =>
          existingEmployee.designation === "CEO"
      );
      if (existingCEO) {
        throw new Error("Only one CEO can exist in the organization.");
      }
    }
    this.validateReportingRelationship(employee);
    this.employees.push(employee);
    this.addEmployeeToReportees(employee);
  }

  updateEmployee(id: string,employee: Employee): void {
    const existingEmployee = this.getEmployeeById(id);
    if (!existingEmployee) {
      throw new Error(`Employee with ID ${id} does not exist.`);
    }
    if (employee.id !== id) {
      throw new Error("Employee ID cannot be changed.");
    }
    validateRequiredFields(employee.name, employee.id, employee.dateOfBirth);
    validateDateOfBirth(employee.dateOfBirth);
    const duplicateEmployee = this.employees.find((existingEmployee) =>
        existingEmployee.id === employee.id && existingEmployee.id !== id
    );
    if (duplicateEmployee) {
      throw new Error(`Employee with ID ${employee.id} already exists.`);
    }
    if (employee.designation === "CEO") {
      const existingCEO = this.employees.find((existingEmployee) =>
          existingEmployee.designation === "CEO" && existingEmployee.id !== id
      );
      if (existingCEO) {
        throw new Error("Only one CEO can exist in the organization.");
      }
    }
    this.validateReportingRelationship(employee,id);
    this.removeEmployeeFromReportees(existingEmployee);
    this.employees[this.employees.indexOf(existingEmployee)] = employee;
    this.addEmployeeToReportees(employee);
  }

  deleteEmployee(id: string): void {
    const employee = this.getEmployeeById(id);
    if (!employee) {
      throw new Error(`Employee with ID ${id} does not exist.`);
    }
    if (employee.reportees.length > 0) {
      throw new Error(`Employee ${id} cannot be deleted because the employee has reportees.`);
    }
    this.removeEmployeeFromReportees(employee);
    this.employees = this.employees.filter((existingEmployee) =>
        existingEmployee.id !== id
    );
  }

  getAllEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find((employee) => 
        employee.id === id
    );
  }

  private validateReportingRelationship(employee: Employee, updatingId?: string): void {
    if (employee.designation === "CEO") {
      if (employee.reportsTo !== null) {
        throw new Error("CEO should not report to anyone.");
      }
      if (employee.reportees.some((reporteeId) =>
          reporteeId === employee.id
      )) {
        throw new Error("Employee cannot report to itself.");
      }
      return;
    }
    if (!employee.reportsTo) {
      throw new Error(`${employee.designation} must have a reportsTo employee.`);
    }
    if (employee.reportsTo === employee.id) {
      throw new Error("Employee cannot report to itself.");
    }
    const manager = this.getEmployeeById(employee.reportsTo);
    if (!manager) {
      throw new Error(`Employee ${employee.reportsTo} does not exist.`);
    }
    if (updatingId === manager.id) {
      throw new Error("Invalid reporting relationship.");
    }
    const expectedDesignation = this.getExpectedManagerDesignation(employee.designation);
    if (manager.designation !== expectedDesignation) {
      throw new Error(`${employee.designation} must report to a ${expectedDesignation}.`);
    }
    for (const reporteeId of employee.reportees) {
      const reportee = this.getEmployeeById(reporteeId);
      if (!reportee) {
        throw new Error(`Employee ${reporteeId} does not exist.`);
      }
      if (reportee.reportsTo !== employee.id) {
        throw new Error(`Employee ${reporteeId} does not report to ${employee.id}.`);
      }
    }
    if (employee.designation === "Engineer") {
      if (employee.reportees.length > 0) {
        throw new Error("Engineer cannot have reportees.");
      }
    }
  }

  private getExpectedManagerDesignation(designation: Designation): Designation {
    switch (designation) {
      case "Engineer":
        return "Lead";
      case "Lead":
        return "Manager";
      case "Manager":
        return "Director";
      case "Director":
        return "CEO";
      case "CEO":
        return "CEO";
    }
  }

  private addEmployeeToReportees(employee: Employee): void {
    if (!employee.reportsTo) {
      return;
    }
    const reportingPerson = this.getEmployeeById(employee.reportsTo);
    if (!reportingPerson) {
      return;
    }
    if (!reportingPerson.reportees.includes(employee.id)) {
      reportingPerson.reportees.push(employee.id);
    }
  }

  private removeEmployeeFromReportees(employee: Employee): void {
    if (!employee.reportsTo) {
      return;
    }
    const reportingPerson = this.getEmployeeById(employee.reportsTo);
    if (!reportingPerson) {
      return;
    }
    reportingPerson.reportees = reportingPerson.reportees.filter((reporteeId) =>
          reporteeId !== employee.id
    );
  }
}