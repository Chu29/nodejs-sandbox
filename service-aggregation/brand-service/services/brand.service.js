import db from "../config/brandsDB.js";
import { STATUS_CODES } from "node:http";

/** GET ALL BRANDS */
export const getBrands = async (req, res, next) => {
  try {
    let query = " SELECT * FROM brands";
    const results = db.prepare(query).all();

    //Add HATEOS Links
    const brands = results.map((brand) => {
      return {
        ...brand,
        _links: {
          self: { href: `/brands/${brand.id}` },
          collection: { href: "/brands" },
        },
      };
    });

    // return the final data
    res.json({
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

export const getBrandById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let query = "SELECT * FROM brands WHERE id = ?";
    const result = db.prepare(query).get(id);

    if (!result) {
      let error = new Error(STATUS_CODES[404].message);
      error.status = 404;
      throw error;
    }

    //Add HATEOS Links
    const brand = {
      ...result,
      _links: {
        self: { href: `/brands/${result.id}` },
        collection: { href: "/brands" },
      },
    };

    // return the final data
    res.json(brand);
  } catch (error) {
    next(error);
  }
};
