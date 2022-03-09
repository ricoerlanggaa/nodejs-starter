const user = require('../models').user;
module.exports = {
    detail (req, res) {
        const { id } = req.decoded.users;
        user.findByPk(id)
        .then(async (user) => {
            const data = {
                id: user.id,
                role_id: user.role_id,
                name: user.name,
                email: user.email,
                username: user.username,
                phone_number: user.phone_number,
            }
            return res.status(200).send({
                success: true,
                message: "Get Profile Success",
                data
            });
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                message: err.message,
            });
        });
    }
}