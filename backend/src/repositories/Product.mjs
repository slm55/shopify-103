import pool from "../db.mjs";

class ProductRepository {
  static async getProducts() {
    const response = await pool.query("SELECT * FROM products");

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getProduct(id) {
    const response = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }

  static async getProductsByTitle(title) {
    const response = await pool.query(
      `SELECT * FROM products WHERE title ILIKE $1`,
      [`${title}%`]
    );

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getProductsByCategory(category) {
    const response = await pool.query(
      "SELECT * FROM products WHERE category = $1",
      [category]
    );

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getProductsByCategories(categories) {
    const response = await pool.query(
      "SELECT * FROM products WHERE category = ANY($1)",
      [categories]
    );

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getProductsByPrice(from, to) {
    const response = await pool.query(
      "SELECT * FROM products WHERE price BETWEEN $1 AND $2",
      [from, to]
    );

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getProductsByRating(from) {
    const response = await pool.query(
      "SELECT * FROM products WHERE price > $1",
      [from]
    );

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getProductsByBrands(brands) {
    const response = await pool.query(
      "SELECT * FROM products WHERE brand = ANY($1)",
      [brands]
    );

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getBrands() {
    const response = await pool.query("SELECT DISTINCT brand FROM products");

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async getCategories() {
    const response = await pool.query("SELECT DISTINCT category FROM products");

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async sortByPrice(asc) {
    let query = "SELECT * FROM products ORDER BY price"
    if (!asc) {
      query += " DESC"
    }
    const response = await pool.query(query);

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }

  static async sortByTitle(asc) {
    const response = await pool.query(
      "SELECT * FROM products ORDER BY title $1",
      [asc ? "ASC" : "DESC"]
    );

    if (!response.rows.length) {
      return null;
    }

    return response.rows;
  }
}

export default ProductRepository;
