export const getReviewsByReviewId = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.restaurant_id = ? AND r.review_id < ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"

export const getReviewsByReviewIdAtFirst = 
"SELECT u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "FROM review r JOIN user u on r.user_id = u.user_id "
+ "WHERE r.restaurant_id = ? "
+ "ORDER BY r.review_id DESC LIMIT ? ;"

export const checkUserIsExist = "select exists (select 1 from user u where u.user_id = ?) as flag";

export const insertReviewSql = "insert into review (user_id, restaurant_id, rate, review_content) values (?, ?, ?, ?)";

export const getReviewByReviewId = "select u.user_name, u.user_id, r.review_id, r.rate, r.review_content, r.created_at "
+ "from review r join user u on r.user_id = u.user_id "
+ "where r.review_id = ?;"

export const countMission = "select count(*) as missionCount from mission";

export const getStoreMissionSql =
"select * "
+ "from mission m "
+ "where m.restaurant_id = ? and m.mission_id < ? "
+ "order by created_at desc "
+ "limit ?;";