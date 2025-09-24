import bcrypt from 'bcryptjs';
import { findUserByEmail, findUserById, createUser } from '../db.js';

export class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.createdAt = userData.createdAt;
  }

  static async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  static async create(userData) {
    try {
      const existingUser = findUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const hashedPassword = await User.hashPassword(userData.password);
      
      const newUserData = {
        name: userData.name,
        email: userData.email,
        password: hashedPassword
      };

      const savedUser = createUser(newUserData);
      if (!savedUser) {
        throw new Error('Failed to create user');
      }

      return new User(savedUser);
    } catch (error) {
      throw error;
    }
  }

  static findByEmail(email) {
    const userData = findUserByEmail(email);
    return userData ? new User(userData) : null;
  }

  static findById(id) {
    const userData = findUserById(id);
    return userData ? new User(userData) : null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}