const validateColorData = (data, isPartial = false) => {
  const errors = [];

  if (!isPartial && !data.color) errors.push("Color is required.");
  if (
    data.color &&
    (typeof data.color !== "string" || data.color.trim() === "")
  )
    errors.push("color must be a non-empty string.");

  return errors;
};
