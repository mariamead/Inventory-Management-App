import Joi, { ObjectSchema } from "joi";

export const lowStockIdSchema: ObjectSchema = Joi.object({
    id: Joi.number().integer().min(1).required().messages({
        "any.required": "ID is required",
        "number.base": "ID must be a number",
        "number.integer": "ID must be a whole number",
        "number.min": "ID must be greater than 0"
    })
});

export const lowStockPutSchema: ObjectSchema = Joi.object({
    id: Joi.number().integer().min(1).required().messages({
        "any.required": "ID is required",
        "number.base": "ID must be a number",
        "number.integer": "ID must be a whole number",
        "number.min": "ID must be greater than 0"
    }),
    quantity: Joi.number().integer().min(0).required().messages({
        "any.required": "Quantity is required",
        "number.base": "Quantity must be a number",
        "number.integer": "Quantity must be a whole number",
        "number.min": "Quantity must be 0 or greater"
    }),
    threshold: Joi.number().integer().min(0).required().messages({
        "any.required": "Threshold is required",
        "number.base": "Threshold must be a number",
        "number.integer": "Threshold must be a whole number",
        "number.min": "Threshold must be 0 or greater"
    })
});