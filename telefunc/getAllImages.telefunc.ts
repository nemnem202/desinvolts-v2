import FileController from "@/server/controller/file-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";

export async function onGetAllImages(): Promise<{ publicUrl: string }[]> {
  const { isAuthenticated } = await authenticateUser();
  if (!isAuthenticated) throw new Error("Not authenticated");
  return new FileController().getAllImages();
}
