export const validateBicycleData = (data, isPartial = false) => {
  const errors = [];

  if (!isPartial && !data.brand) errors.push("brand name is required");
  if (!isPartial && !data.brand) errors.push("color is required");
  if (
    data.brand !== undefined &&
    (typeof data.brand !== "string" || data.brand.trim() === "")
  )
    errors.push("brand must be a non-empty string");

  if (
    data.brand !== undefined &&
    (typeof data.brand !== "string" || data.brand.trim() === "")
  )
    errors.push("color must be a non-empty string");

  return errors;
};
