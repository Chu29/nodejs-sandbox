import db from "../config/colorsDB.js";
import { STATUS_CODES } from "node:http";
import validateColorData from "../helpers/validateColorData.js";

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

    // return the final data
    res.json(color);
  } catch (error) {
    next(error);
  }
};

/** CREATE NEW COLOR */
export const createColor = async (req, res, next) => {
  const { color } = req.body;
  const errors = validateColorData({ color });
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const query = db.prepare("INSERT INTO colors (color) VALUES (?)");
    const result = query.run(color.trim());

    const newColor = db
      .prepare("SELECT * FROM colors WHERE id = ?")
      .get(result.lastInsertRowid);

    // Add HATEOS Links
    const colorWithLinks = {
      ...newColor,
      _links: {
        self: { href: `/colors/${newColor.id}` },
        collection: { href: "/colors" },
      },
    };

    res.location(`/colors/${newColor.id}`);
    res.status(201).json(colorWithLinks);
  } catch (error) {
    next(error);
  }
};

/** UPDATE COLOR */
export const updateColor = async (req, res, next) => {
  const id = req.params.id;
  const { color } = req.body;
  const errors = validateColorData({ color });

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const query = db.prepare("UPDATE colors SET color = ? WHERE id = ?");
    const result = query.run(color.trim(), id);

    if (result.changes === 0) {
      let error = new Error(STATUS_CODES[404].message);
      error.status = 404;
      throw error;
    }

    // get the updated color
    const updatedColor = db
      .prepare("SELECT * FROM colors WHERE id = ?")
      .get(id);

    // Add HATEOS Links
    const colorWithLinks = {
      ...updatedColor,
      _links: {
        self: { href: `/colors/${updatedColor.id}` },
        collection: { href: "/colors" },
      },
    };

    res.send(colorWithLinks);
  } catch (error) {}
};

/** DELETE COLOR */
export const deleteColor = async (req, res, next) => {
  const id = req.params.id;

  try {
    const query = db.prepare("DELETE FROM colors WHERE id = ?");
    const result = query.run(id);

    if (result.changes === 0) {
      let error = new Error(STATUS_CODES[404]);
      error.status = 404;
      throw error;
    }

    res.status(204).send("Item deleted successfully");
  } catch (error) {
    next(error);
  }
};
