import db from "../config/brandsDB.js";
import { STATUS_CODES } from "node:http";
import validateBrandData from "../helpers/validateBrandData.js";

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

/** GET BRAND BY ID */
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

/** CREATE BRAND */
export const createBrand = async (req, res, next) => {
  const { brand } = req.body;
  const errors = validateBrandData({ brand });
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const query = "INSERT INTO brands (brand) VALUES (?)";
    const result = db.prepare(query).run(brand);

    const newBrand = db
      .prepare("SELECT * FROM brands WHERE id = ?")
      .get(result.lastInsertRowid);

    //Add HATEOS Links
    const brandWithLinks = {
      ...newBrand,
      _links: {
        self: { href: `/brands/${newBrand.id}` },
        collection: { href: "/brands" },
      },
    };

    // return the final data
    res.location(`/brands/${newBrand.id}`);
    res.status(201).json(brandWithLinks);
  } catch (error) {
    next(error);
  }
};
