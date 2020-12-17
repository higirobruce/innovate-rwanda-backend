import { Router } from "express";
import CompanyTypes from "../../controllers/CompanyTypes";

const types = Router();

types.get("/company-types", CompanyTypes.getCompanyTypes);

export default types;