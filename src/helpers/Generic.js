export default class Generic {

    static generateSlug(company_name) {
        return company_name.trim().replace(/ /g, "-").toLowerCase();
    }
}