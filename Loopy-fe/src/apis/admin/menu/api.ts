import axiosInstance from "../../axios";
import type {
  CreateOwnerMenuPayload,
  CreateOwnerMenuResponse,
  OwnerMenu,
} from "./type";

function ensureFile(fileOrBlob: File | Blob, fallbackName: string) {
  if (fileOrBlob instanceof File) return fileOrBlob;
  return new File([fileOrBlob], fallbackName, { type: fileOrBlob.type || "application/octet-stream" });
}

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
    const safeFile = ensureFile(menuImage, "menu-image.png");
    console.log(
      safeFile,
      safeFile instanceof File,
      safeFile.type,
      safeFile.name
    );
    fd.append("menuImage", safeFile);
  }

  const res = await axiosInstance.post<CreateOwnerMenuResponse>(
    "/api/v1/owner/cafes/menus",
    fd
  );
  return res.data.data;
}

