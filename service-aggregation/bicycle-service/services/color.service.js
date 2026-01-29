import db from "../config/db.js";
import { STATUS_CODES } from "node:http";

/** GET ALL COLORS */
export const getColors = async (req, res, next) => {
  try {
    let query = "SELECT * FROM colors";

    const results = db.prepare(query).all();

    //Add HATEOS Links
    const colors = results.map((color) => {
      return {
        ...color,
        _links: {
          self: { href: `/colors/${color.id}` },
          collection: { href: "/colors" },
        },
      };
    });

    // return the final data
    res.json({
      data: colors,
    });
  } catch (error) {
    next(error);
  }
};

/** GET COLOR BY ID */
export const getColorById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let query = "SELECT * FROM colors WHERE id = ?";
    const result = db.prepare(query).get(id);

    if (!result) {
      let error = new Error(STATUS_CODES[404].message);
      error.status = 404;
      throw error;
    }

    //Add HATEOS Links
    const color = {
      ...result,
      _links: {
        self: { href: `/colors/${result.id}` },
        collection: { href: "/colors" },
      },
    };
    console.log(color);

    // return the final data
    res.json(color);
  } catch (error) {
    next(error);
  }
};
