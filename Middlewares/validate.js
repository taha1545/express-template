const { validationResult } = require('express-validator');
const fs = require('fs');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Failed to delete file:', err.message);
            });
        }
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg,
            })),
        });
    }

    next();
};

module.exports = handleValidationErrors;
