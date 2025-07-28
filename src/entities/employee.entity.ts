import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "./department.entity";
import { EmployeePayroll } from "./employeePayroll.entity";
import { PayrollRecord } from "./payrollRecord.entity";
import { Attendance } from "./attendance.entity";
import { LeaveBalance } from "./leaveBalance.entity";
import { LeaveRequest } from "./leaveRequest.entity";
import { EmploymentType } from "./employementType.entity";
import { Designation } from "./designation.entity";

export enum gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export enum EmployeeStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  LEFT = "Left",
}

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: "enum", enum: gender })
  gender: gender;

  @Column({ type: "date" })
  dob: Date;

  @Column({
    unique: true,
    length: 100,
    nullable: true,
  })
  personalEmail: string;

  @Column({
    unique: true,
    length: 100,
    nullable: true,
  })
  companyEmail: string;

  @Column({
    unique: true,
    length: 15,
    nullable: true,
  })
  phone: string;

  @Column({ type: "date" })
  hireDate: Date;

  @Column({ nullable: true })
  emergencyContactName: string;

  @Column({ nullable: true })
  emergencyPhone: string;

  @Column({ nullable: true })
  emergencyRelation: string;

  @Column({ nullable: true, type: "date" })
  contractEndDate: Date;

  @Column({ type: "date", nullable: true })
  retirementDate: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  passportNumber: string;

  @ManyToOne(() => Employee, (employee) => employee.subordinates, {
    nullable: true,
    onDelete: "SET NULL",
  })
  manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager, { nullable: true })
  subordinates: Employee[];

  @ManyToOne(() => Department, (department) => department.employees, {
    nullable: true,
    onDelete: "SET NULL",
  })
  department: Department;

  @OneToOne(
    () => EmployeePayroll,
    (employeePayRoll) => employeePayRoll.employee,
    { nullable: true }
  )
  payroll: EmployeePayroll;

  @OneToMany(() => PayrollRecord, (payrollRecord) => payrollRecord.employee, {
    nullable: true,
  })
  payrollRecord: PayrollRecord[];

  @OneToMany(() => Attendance, (attendance) => attendance.employee, {
    nullable: true,
  })
  attendances: Attendance[];

  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.employee, {
    nullable: true,
  })
  leaveBalances: LeaveBalance[];

  @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.employee, {
    nullable: true,
  })
  leaveRequests: LeaveRequest[];

  @OneToOne(() => EmploymentType, { nullable: true })
  @JoinColumn()
  employmentType: EmploymentType;

  @OneToOne(() => Designation, { nullable: true })
  @JoinColumn()
  designation: Designation;

  @Column({
    type: "enum",
    enum: EmployeeStatus,
    default: EmployeeStatus.ACTIVE,
  })
  status: EmployeeStatus;

  @CreateDateColumn()
  createdDate: Date;
}
