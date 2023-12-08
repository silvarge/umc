export const checkStoreIsExist = "select exists (select 1 from restaurant r where r.restaurant_id = ?) as flag";

export const insertMissionSql = "insert into mission (restaurant_id, mission_content, mission_deadline, mission_point) values (?, ?, ?, ?)";

export const getMissionByMissionIdSql = "select m.mission_id, r.restaurant_id, r.restaurant_name, m.mission_content, m.mission_deadline, m.mission_point "
+ "from mission m join restaurant r ON m.restaurant_id = r.restaurant_id "
+ "where m.mission_id = ?;";

export const getRegionIdSql = "select region_id from region where region_name = ?";

export const mappingRegionNStore = "insert into region_restaurant (rr_restaurant_id, rr_region_id) values (?, ?)";

export const getMappingRegion = "select rr.rr_id, rr.rr_restaurant_id, rr.rr_region_id, r.restaurant_name, r2.region_name "
+ "from region_restaurant rr join restaurant r ON rr.rr_restaurant_id = r.restaurant_id join region r2 ON rr.rr_region_id = r2.region_id "
+ "where rr.rr_id = ?";