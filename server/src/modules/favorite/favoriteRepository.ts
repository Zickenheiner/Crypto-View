import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class FavoriteRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from favorite where user_id = ?",
      [id],
    );

    return rows;
  }

  async create(userId: number, tokenId: number) {
    const [result] = await databaseClient.query<Result>(
      "insert into favorite (user_id, token_id) values (?, ?)",
      [userId, tokenId],
    );

    return result.insertId;
  }

  async delete(userId: number, tokenId: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from favorite where user_id = ? and token_id = ?",
      [userId, tokenId],
    );

    return result.affectedRows;
  }
}

export default new FavoriteRepository();
