const pool = require("./pool");

module.exports = {
	async createUser(firstName, lastName, email, password) {
		await pool.query(
			"INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4)",
			[firstName, lastName, email, password]
		);
	},
	async createMessage(userId, message) {
		await pool.query("INSERT INTO messages (user_id,message) VALUES ($1,$2)", [
			userId,
			message,
		]);
	},
	async getMessages() {
		const { rows } = await pool.query(
			"SELECT messages.*, users.first_name, users.last_name FROM messages JOIN users ON messages.user_id = users.id ORDER BY time_stamp DESC"
		);
		return rows;
	},
	async makeMember(userId) {
		await pool.query("UPDATE users SET is_member=TRUE WHERE id=$1", [userId]);
	},
	async makeAdmin(userId) {
		await pool.query("UPDATE users SET is_admin=TRUE WHERE id=$1", [userId]);
	},
	async deleteMessage(messageId) {
		await pool.query("DELETE FROM messages where id=$1",[messageId])
	}
};
