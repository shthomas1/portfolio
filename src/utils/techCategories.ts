// src/utils/techCategories.ts

export const getTechCategory = (tech: string): string => {
  tech = tech.toLowerCase().trim();

  if (
    tech.includes("c#") ||
    tech.includes("rust") ||
    tech.includes(".net") ||
    tech.includes("lua") ||
    tech.includes("asp")
  ) {
    return "backend";
  } else if (tech.includes("mysql") || tech.includes("database")) {
    return "database";
  } else if (
    tech.includes("machine learning") ||
    tech.includes("gradient") ||
    tech.includes("random forest") ||
    tech.includes("ai")
  ) {
    return "data";
  } else if (
    tech.includes("aes") ||
    tech.includes("encrypt") ||
    tech.includes("security") ||
    tech.includes("pad")
  ) {
    return "security";
  } else if (
    tech.includes("development") ||
    tech.includes("consulting") ||
    tech.includes("solutions") ||
    tech.includes("integration")
  ) {
    return "service";
  } else if (
    tech.includes("html") ||
    tech.includes("css") ||
    tech.includes("javascript") ||
    tech.includes("js") ||
    tech.includes("design")
  ) {
    return "frontend";
  }

  return "frontend"; // Default category
};
