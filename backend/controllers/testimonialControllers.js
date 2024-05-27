
import Testimonial from "../models/testimonial";
import ErrorHandler from "../utils/errorHandler";

export const createTestimonial = async (req, res, next) => {
    try {
     

      const { user, comment } = req.body;
      const testimonial = await new Testimonial({
        user,
        comment
      }).save();
      res.status(201).json({ success: true, testimonial });
    } catch (error) {
      console.error('Testimonial creation failed:', error);
      next(new ErrorHandler('Testimonial creation failed', 500));
    }
  };

  export const getTestimonials = async (req, res, next) => {
    
    try {
       
      const testimonial = await Testimonial.find().populate('user');
      res.status(200).json({ success: true, testimonial });
    } catch (error) {
      console.error('Failed to retrieve testimonial:', error);
      next(new ErrorHandler('Failed to retrieve testimonial', 500));
    }
  };

  
  export const getTestimonial = async (req, res, next) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id).populate('user');
      if (!testimonial) {
        return next(new ErrorHandler('Testimonial not found', 404));
      }
      res.status(200).json({ success: true, testimonial });
    } catch (error) {
      console.error('Failed to retrieve testimonial:', error);
      next(new ErrorHandler('Testimonial not found', 404));
    }
  };

  export const updateTestimonial = async (req, res, next) => {
    
    try {
      let testimonial = await Testimonial.findById(req.query.id);
      if (!testimonial) {
        return next(new ErrorHandler('Testimonial not found', 404));
      }
  
      testimonial = await Testimonial.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({ success: true, testimonial });
    } catch (error) {
      console.error('Failed to update testimonial:', error);
      next(new ErrorHandler('Failed to update testimonial', 500));
    }
  };
  
  export const deleteCategory = async (req, res, next) => {
    try {
      const testimonial = await Testimonial.findById(req.query.id);
      if (!testimonial) {
        return next(new ErrorHandler('Testimonial not found', 404));
      }
  
      // Optionally remove all products associated with this testimonial or set them to null
      // await Product.updateMany({ testimonial: req.params.id }, { $unset: { testimonial: "" } });
  
      await testimonial.remove();
      res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      next(new ErrorHandler('Failed to delete testimonial', 500));
    }
  };
  