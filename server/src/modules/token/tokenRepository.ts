import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Token {
  name: string;
  price: number;
  percent_price: number;
  image: string;
}

class TokenRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from token");

    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from token where id = ?",
      [id],
    );

    return rows[0];
  }

  async readByName(name: string) {
    const [rows] = await databaseClient.query<Rows>(
      `select * from token where name like '%${name}%'`,
    );

    return rows;
  }

  async create(token: Token) {
    const [result] = await databaseClient.query<Result>(
      "insert into token (name, price, percent_price, image) values (?, ?, ?, ?)",
      [token.name, token.price, token.percent_price, token.image],
    );
    return result;
  }

  getDataOnCoinMarketCap = async (id: number) => {
    try {
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${id}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || "",
          },
        },
      );
      const data = await response.json();
      const [_, value] = Object.entries(data.data)[0];

      return value;
    } catch (error) {
      console.error(error);
    }
  };

  getPriceOnCoinMarketCap = async (id: number) => {
    try {
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${id}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || "",
          },
        },
      );
      const data = await response.json();
      const [_, value] = Object.entries(data.data)[0];

      return value;
    } catch (error) {
      console.error(error);
    }
  };
}

export default new TokenRepository();
