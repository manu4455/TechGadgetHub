import Category from "../models/category";
import ErrorHandler from "../utils/errorHandler";

export const createCategory = async (req, res, next) => {
    try {
      const { name, description, parent } = req.body;
      const category = await new Category({
        name,
        description,
        parent
      }).save();
      res.status(201).json({ success: true, category });
    } catch (error) {
      console.error('Category creation failed:', error);
      next(new ErrorHandler('Category creation failed', 500));
    }
  };

  export const getCategories = async (req, res, next) => {
    
    try {
       
      const categories = await Category.find().populate('parent');
      res.status(200).json({ success: true, categories });
    } catch (error) {
      console.error('Failed to retrieve categories:', error);
      next(new ErrorHandler('Failed to retrieve categories', 500));
    }
  };

  
  export const getCategory = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return next(new ErrorHandler('Category not found', 404));
      }
      res.status(200).json({ success: true, category });
    } catch (error) {
      console.error('Failed to retrieve category:', error);
      next(new ErrorHandler('Category not found', 404));
    }
  };

  export const updateCategory = async (req, res, next) => {
    
    try {
      let category = await Category.findById(req.query.id);
      if (!category) {
        return next(new ErrorHandler('Category not found', 404));
      }
  
      category = await Category.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({ success: true, category });
    } catch (error) {
      console.error('Failed to update category:', error);
      next(new ErrorHandler('Failed to update category', 500));
    }
  };
  
  export const deleteCategory = async (req, res, next) => {
    try {
      const category = await Category.findById(req.query.id);
      if (!category) {
        return next(new ErrorHandler('Category not found', 404));
      }
  
      // Optionally remove all products associated with this category or set them to null
      // await Product.updateMany({ category: req.params.id }, { $unset: { category: "" } });
  
      await category.remove();
      res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
      console.error('Failed to delete category:', error);
      next(new ErrorHandler('Failed to delete category', 500));
    }
  };
  