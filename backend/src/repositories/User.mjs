import pool from "../db.js";

class UserRepository {
  static async addUser(user) {
    const response = await pool.query(
      "INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.email, user.password, user.firstname, user.lastname]
    );

    return response.rows[0];
  }











  static async createUser({ userName, hashedPassword, role }) {
    const response = await pool.query(
      "INSERT INTO users (name, password, role) VALUES ($1, $2, $3) RETURNING *",
      [userName, hashedPassword, role]
    );

    return response.rows[0];
  }

  static async getUserData(email) {
    const response = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }
}

export default UserRepository;