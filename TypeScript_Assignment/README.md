# Organization Management System

## Overview

This project is an Organization Management system created using TypeScript and OOP concepts.

The organization contains employees with the following designations:

- Engineer
- Lead
- Manager
- Director
- CEO

## Project Setup

Install dependencies:

npm install

Build the TypeScript project:

npm run build

Run the application:

npm start

## Project Structure

src/
├── models/
│   └── Employee.ts
├── services/
│   └── OrganizationService.ts
├── utils/
│   └── Validation.ts
└── index.ts

### models

Contains the Employee base class and employee designation classes.

### services

Contains the organization CRUD operations and business validations.

### utils

Contains employee input validations.

### index.ts

Contains mock data and executes the organization functionalities.

## Design Approach

The application uses OOP concepts.

Employee is used as the base class and Engineer, Lead, Manager, Director and CEO extend the Employee class.

OrganizationService is responsible for managing employees and performing CRUD operations.

The reporting hierarchy is:

CEO
↓
Director
↓
Manager
↓
Lead
↓
Engineer

## Validations

The application validates:

- Employee ID uniqueness
- Only one CEO
- Valid reporting hierarchy
- Valid employee references
- Required employee fields
- Date of birth format
- Updating non-existent employees
- Deleting employees who have reportees

## Assumptions

- Employee IDs are unique.
- Date of birth must follow mm/dd/yyyy format.
- CEO does not report to anyone.
- Engineer does not have reportees.
- An employee with reportees cannot be deleted.
- Mock data is used to demonstrate the functionality.