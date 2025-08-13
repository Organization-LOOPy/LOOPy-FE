import axiosInstance from "../../axios";
import type {
  CreateOwnerMenuPayload,
  CreateOwnerMenuResponse,
  OwnerMenu,
} from "./type";

export async function createOwnerMenu(
  payload: CreateOwnerMenuPayload
): Promise<OwnerMenu> {
  const { name, price, description, isRepresentative, menuImage } = payload;

  const fd = new FormData();
  fd.append("name", name);
  fd.append("price", String(price)); 
  fd.append("description", description ?? "");
  fd.append("isRepresentative", String(Boolean(isRepresentative)));
  if (menuImage) {
    fd.append("menuImage", menuImage);
  }

  const res = await axiosInstance.post<CreateOwnerMenuResponse>(
    "/api/v1/owner/cafes/menus",
    fd
  );
  return res.data.data;
}
