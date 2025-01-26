export const businessPointsSpatialIndex = `
  CREATE INDEX business_points_location_idx 
  ON business_points USING GIST (location);
`;
