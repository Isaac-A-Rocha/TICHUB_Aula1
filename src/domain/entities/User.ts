import type { UserRole } from "../types/UserRole.js";

export class User {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly email: string,
    public readonly role: UserRole
  ) {}
}