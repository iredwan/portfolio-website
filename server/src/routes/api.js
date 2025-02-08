import express from "express";
import * as UsersController from "../controllers/UsersController.js";
import * as FileUploadController from "../controllers/FileUploadController.js";
import * as BlogController from "../controllers/BlogController.js";
import * as TeamController from "../controllers/TeamController.js";
import * as ServiceController from "../controllers/ServiceController.js";
import * as ContactController from "../controllers/ContactController.js";
import upload from "../middlewares/FileUploads.js"

const router = express.Router();

// Admin User router
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.get("/logout", UsersController.logout);

// Blog router
router.post("/create-blog", BlogController.createBlog);
router.post("/update-blog/:id", BlogController.updateBlog);
router.get("/get-all-blog", BlogController.getAllBlog);
router.get("/get-blog/:id", BlogController.getBlog);
router.delete(
    "/delete-blog/:id",
    BlogController.deleteBlog
  );

  //Team router
  router.post("/add-member", TeamController.addMember);
  router.post("/update-member/:id", TeamController.updateMember);
  router.get("/get-a-member/:id", TeamController.getAMember);
  router.get("/get-all-member", TeamController.getAllMember);
  router.delete(
      "/delete-member/:id",
      TeamController.deleteMember
    );

    //Service router

    router.post("/add-service", ServiceController.addAService);
    router.post("/update-service/:id", ServiceController.updateAService);
    router.get("/get-all-service", ServiceController.getAllService);
    router.delete(
        "/delete-service/:id",
        ServiceController.deleteAService
      );


    //  Contact router
    router.post("/submit-contact-form", ContactController.submitContactForm);
    router.get("/get-all-contact", ContactController.getAllContacts);
    router.delete(
        "/delete-contact/:id",
        ContactController.deleteContact
      );


// file router
router.post("/file-upload", upload.array("file", 20), FileUploadController.fileUpload)



export default router;
