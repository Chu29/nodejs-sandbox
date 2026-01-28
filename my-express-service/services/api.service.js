import database from "../config/db.js";
import { STATUS_CODES } from "node:http";
import { validateBicycleData } from "../helpers/validateBicycleData.js";

/** GET bicycle listing */
export const getBicycles = async (req, res, next) => {
  try {
    const { limit = 5, offset = 0, brand, color } = req.query;

    let query = "SELECT * FROM bicycles";
    const params = []; // db search parameters
    const conditions = []; // db query conditions

    if (brand) {
      conditions.push("brand = ?");
      params.push(brand);
    }

    if (color) {
      conditions.push("color = ?");
      params.push(color);
    }

    if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");

    query += " LIMIT ? OFFSET ? ";
    params.push(parseInt(limit), parseInt(offset));

    const result = database.prepare(query).all(...params);

    // Add HATEOS links
    const bicycles = result.map((bicycle) => ({
      ...bicycle,
      _links: {
        self: { href: `/bicycles/${bicycle.id}` },
        collection: { href: "/bicycles" },
      },
    }));

    // return json data to the user
    res.json({
      data: bicycles,
      _links: {
        self: { href: `bicycles?limit=${limit}&offset=${offset}` },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBicycleByID = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = database
      .prepare("SELECT * FROM bicycles WHERE id = ?")
      .get(id);

    if (!result) {
      let error = new Error(STATUS_CODES[404]);
      error.status = 404;
      throw error;
    }

    // Add HATEOAS links
    const bicycle = {
      ...result,
      _links: {
        self: { href: `/bicycles/${result.id}` },
        collection: { href: "/bicycles" },
      },
    };

    res.json(bicycle);
  } catch (error) {
    next(error);
  }
};

export const createNewBicycle = async (req, res, next) => {
  const { brand, color } = req.body;

  // validate user input
  const errors = validateBicycleData({ brand, color });

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const qry = database.prepare(
      "INSERT INTO bicycles (brand, color) VALUES (?, ?)",
    );
    const info = qry.run(brand.trim(), color.trim());

    // Fetch the created resource
    const newBicycle = database
      .prepare("SELECT * FROM bicycles WHERE id = ?")
      .get(info.lastInsertRowid);

    // Add HATEOAS links
    const bicycle = {
      ...newBicycle,
      _links: {
        self: { href: `/bicycles/${newBicycle.id}` },
        collection: { href: "/bicycles" },
      },
    };

    // Set Location header
    res.location(`/bicycles/${newBicycle.id}`);
    res.status(201).json(bicycle);
  } catch (error) {
    next(error);
  }
};
