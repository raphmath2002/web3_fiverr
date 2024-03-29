import { Express, Request, Response } from "express";

import { createCategoryHandler, getJobsByCategoryHandler, getCategoriesHandler, deleteCategoryHandler, updateCategoryHandler } from "./controller/category.controller";
import { createJobHandler, getJobsHandler, getJobsByUserHandler, getPictureByJobHandler, deleteJobHandler, updateJobHandler } from "./controller/job.controller";
import { createPictureHandler, deletePictureHandler, getPicturesHandler  } from "./controller/picture.controller";

export default function (app: Express) {  

    app.post("/api/jobs", createJobHandler);
    app.get("/api/jobs", getJobsHandler);
    app.get("/api/jobs/:job_id", getJobsHandler);
    app.get("/api/jobs/:user_id/jobs", getJobsByUserHandler);
    app.get("/api/jobs/:job_id/pictures", getPictureByJobHandler);
    app.delete("/api/jobs/:job_id", deleteJobHandler);
    app.put("/api/jobs/:job_id", updateJobHandler);


    app.post("/api/pictures", createPictureHandler);
    app.delete("/api/pictures/:picture_id", deletePictureHandler);
    app.get("/api/pictures", getPicturesHandler);
    app.get("/api/pictures/:picture_id", getPicturesHandler);


    app.post("/api/categories", createCategoryHandler);
    app.get("/api/categories/:category_id/jobs", getJobsByCategoryHandler);
    app.get("/api/categories", getCategoriesHandler);
    app.get("/api/categories/:category_id", getCategoriesHandler);
    app.delete("/api/categories/:category_id", deleteCategoryHandler);
    app.put("/api/categories/:category_id", updateCategoryHandler);


    app.get("/alive", (req: Request, res: Response) => {
        res.status(200).send("ok");
    })

}