
export const insertUserSql = "INSERT INTO user (email, user_name, gender, birth, user_address, user_spec_address, user_phone) VALUES (?, ?, ?, ?, ?, ?, ?);";

export const getUserID = "SELECT * FROM user WHERE user_id = ?";

export const getUserEmail = "SELECT * FROM user WHERE email = ?";

export const connectFoodCategory = "INSERT INTO user_favor_category (f_category_id, user_id) VALUES (?, ?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail";


export const getPreferByUserID =
"SELECT ufc.uf_category_id, ufc.f_category_id, ufc.user_id, fcl.f_category_name "
+ "FROM user_favor_category ufc JOIN food_category_list fcl on ufc.f_category_id = fcl.f_category_id "
+ "WHERE ufc.user_id = ? ORDER BY ufc.f_category_id ASC;";

export const challengeMissionSql = "insert into user_mission (user_id, mission_id) values (?, ?)";

export const getChallengeMissionSql = "select u_mission_id, user_id, um.mission_id, u_mission_status, mission_content, mission_deadline, mission_point, r.restaurant_name "
+"from user_mission um join mission m on um.mission_id = m.mission_id join restaurant r on m.restaurant_id = r.restaurant_id "
+"where u_mission_id = ?;";

export const reviewCount = "select count(*) as reviewCount from review ";

export const getMyReviewSql =
"select u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "from review r join user u on r.user_id = u.user_id "
+ "where r.user_id = ? and r.review_id <= ? "
+ "order by created_at desc "
+ "limit ?";

export const userMissionCount = "select count(*) as missionCount from user_mission;";

export const getUserMissionListSql =
"select um.u_mission_id , um.user_id, um.mission_id , um.u_mission_status , um.confirm_number , um.created_at , m.mission_content , m.mission_deadline , m.mission_point "
+ "from user_mission um left join mission m ON um.mission_id = m.mission_id "
+ "where um.user_id = ? and um.u_mission_id <= ? and u_mission_status = ? "
+ "order by created_at desc "
+ "limit ?;";

export const updateMissionStatusToSuccessSql =
"update user_mission set u_mission_status = 'success' where u_mission_id = ?;";