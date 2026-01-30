const validateBrandData = (data, isPartial = false) => {
  const errors = [];

  if (!isPartial && !data.brand) errors.push("Brand is required.");
  if (
    data.brand &&
    (typeof data.brand !== "string" || data.brand.trim() === "")
  )
    errors.push("brand must be a non-empty string.");

  return errors;
};
