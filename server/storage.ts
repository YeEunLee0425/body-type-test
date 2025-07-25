import { type User, type InsertUser, type BodyTypeResult, type InsertBodyTypeResult } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createBodyTypeResult(result: InsertBodyTypeResult): Promise<BodyTypeResult>;
  getBodyTypeResult(id: string): Promise<BodyTypeResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bodyTypeResults: Map<string, BodyTypeResult>;

  constructor() {
    this.users = new Map();
    this.bodyTypeResults = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBodyTypeResult(insertResult: InsertBodyTypeResult): Promise<BodyTypeResult> {
    const id = randomUUID();
    const result: BodyTypeResult = { 
      ...insertResult, 
      id,
      createdAt: new Date()
    };
    this.bodyTypeResults.set(id, result);
    return result;
  }

  async getBodyTypeResult(id: string): Promise<BodyTypeResult | undefined> {
    return this.bodyTypeResults.get(id);
  }
}

export const storage = new MemStorage();
