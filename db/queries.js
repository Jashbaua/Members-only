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
		const { rows } = await pool.query("SELECT * FROM messages ORDER BY time_stamp DESC")
		return rows
	}
};
