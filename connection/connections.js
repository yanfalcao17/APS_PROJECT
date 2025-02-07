import * as SQLite from "expo-sqlite";

class Database {
  constructor() {
    if (!Database.instance) {
      this.db = SQLite.openDatabase("mongodb://localhost:27017/auth-api");
      Database.instance = this;
    }
    return Database.instance;
  }

  getDB() {
    return this.db;
  }
}

// Exporta a mesma instância para toda a aplicação
const databaseInstance = new Database();
Object.freeze(databaseInstance);
export default databaseInstance;
