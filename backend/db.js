import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'database.json');

const initDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
};

export const readDB = () => {
  try {
    initDB();
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [] };
  }
};

export const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
};

export const findUserByEmail = (email) => {
  const db = readDB();
  return db.users.find(user => user.email === email);
};

export const findUserById = (id) => {
  const db = readDB();
  return db.users.find(user => user.id === id);
};

export const createUser = (userData) => {
  const db = readDB();
  const newUser = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    ...userData,
    createdAt: new Date().toISOString()
  };
  
  db.users.push(newUser);
  
  if (writeDB(db)) {
    return newUser;
  }
  return null;
};