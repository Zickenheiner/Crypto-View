import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface Token {
  address: string;
  name: string;
  symbol: string;
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
      "insert into token (address, name, symbol, price, percent_price, image) values (?, ?, ?, ?, ?, ?)",
      [
        token.address,
        token.name,
        token.symbol,
        token.price,
        token.percent_price,
        token.image,
      ],
    );
    return result;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from token where id = ?",
      [id],
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

  getPriceOnCoinMarketCap = async (symbol: string) => {
    try {
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
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
