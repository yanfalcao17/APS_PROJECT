import mongoose from "mongoose";

class Database {
  constructor() {
    if (!Database.instance) {
      this._connect();
      Database.instance = this;
    }
    return Database.instance;
  }

  async _connect() {
    try {
      this.db = await mongoose.connect("mongodb://localhost:27017/auth-api", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Conectado ao MongoDB");
    } catch (error) {
      console.error("❌ Erro ao conectar ao MongoDB:", error);
    }
  }

  getDB() {
    return this.db;
  }
}

const databaseInstance = new Database();
Object.freeze(databaseInstance);
export default databaseInstance;
