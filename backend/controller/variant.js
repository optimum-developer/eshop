const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const Variant = require('../model/variant');
const {
	isSeller,
	isAuthenticated,
	isAdminAuthenticated,
	isAdmin,
} = require('../middleware/auth');
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require('fs');

// create variant
router.post(
	'/create-variant',
	upload.array('images'),
	catchAsyncErrors(async (req, res, next) => {
		try {
			console.log("Variant-Body", req.body)
			const variantData = req.body
			
			const files = req.files;
			console.log("files", files)
			const imageUrls = files.map((file) => `${file.filename}`);
			variantData.images = imageUrls;

			console.log('variant data--', variantData);

			const variant = await Variant.create(variantData);

			res.status(201).json({
				success: true,
				variant,
			});
		} catch (error) {
			console.log('catch error', error);
			return next(new ErrorHandler(error, 400));
		}
	})
);

// get all variants of a product
router.get(
	'/get-all-variants/:id',
	catchAsyncErrors(async (req, res, next) => {
		try {
			console.log(req.params.id);
			const variants = await Variant.find({ productId: req.params.id });

			res.status(201).json({
				success: true,
				variants,
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

// delete variant of a product
router.delete(
	'/delete-product-variant/:id',
	isSeller,
	catchAsyncErrors(async (req, res, next) => {
		try {
			// const productId = req.params.id;

			const deletedVariants = await Variant.deleteMany({
				productId: req.params.id,
			});
			// console.log(variantData);

			if (deletedVariants.length === 0) {
				return res.status(404).json({
					success: false,
					message: 'No variants found for this product id',
				});
			}

			// variantData.images.forEach((imageUrl) => {
			// 	const filename = imageUrl;
			// 	const filePath = `uploads/${filename}`;

			// 	fs.unlink(filePath, (err) => {
			// 		if (err) {
			// 			console.log(err);
			// 		}
			// 	});
			// });

			res.status(201).json({
				success: true,
				message: 'Variants Deleted successfully!',
			});
		} catch (error) {
			return next(new ErrorHandler(error, 400));
		}
	})
);

module.exports = router;
