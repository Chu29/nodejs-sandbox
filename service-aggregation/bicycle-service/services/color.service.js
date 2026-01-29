import db from "../config/db.js";

/** GET ALL COLORS */
export const getColors = (req, res, next) => {
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
