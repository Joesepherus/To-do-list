import { Injectable } from "@angular/core";

@Injectable()
export class GlobalsService {
  adminId = localStorage.getItem("adminId");
  SERVER_URL = "https://the-questioners.herokuapp.com:420";
  constructor() {}

  setAdminId(adminId) {
    this.adminId = adminId;
  }

  getAdminId() {
    return this.adminId;
  }

  getServerURL() {
    return this.SERVER_URL;
  }
}
