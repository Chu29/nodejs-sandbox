import { Router } from "express";
import createError from "http-errors";
const router = Router();

const { BICYCLE_SERVICE_PORT = 4040, BRAND_SERVICE_PORT = 5050 } = process.env;

const bicycleService = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandService = `http://localhost:${BRAND_SERVICE_PORT}`;

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const noop = Function.prototype;
  const signal = AbortSignal.timeout(5000);

  const bicycleReq = await fetch(`${bicycleService}/colors/${id}`, {
    signal,
  });

  const brandReq = await fetch(`${brandService}/brands/${id}`, {
    signal,
  });

  if (bicycleReq.status === 404 || brandReq.status === 404) {
    next(createError(404, "Bicycle or Brand not found"));
  }

  if (bicycleReq.status === 400 || brandReq.status === 400) {
    next(createError(400, "Bad Request to Bicycle or Brand service"));
  }

  const bicycleProm = bicycleReq.json();
  const brandProm = brandReq.json();

  bicycleProm.catch(noop);
  brandProm.catch(noop);

  const results = await Promise.allSettled([bicycleProm, brandProm]);

  for (const { reason } of results) {
    if (reason) console.log(reason);
  }

  const [bicycle, brand] = results.map(({ value }) => value);

  if (bicycle && brand) {
    res.setHeader("Content-Type", "application/json");
    res.send({ id: bicycle.id, color: bicycle.color, brand: brand.brand });
  }
});

export default router;
