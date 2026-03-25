import { ApiResponse, ApiRoute } from "@/types/server";
import { errorToast, successToast } from "./utils";
import { logger } from "./logger";

type JsonObject = Record<string, unknown>;

type Query = Record<string, string | number | boolean>;

export default class ApiHandler {
  static async post<Body extends JsonObject | FormData, Response>(
    path: string,
    body: Body,
  ): Promise<ApiResponse<Response>> {
    try {
      const isFormData = body instanceof FormData;

      const res = await fetch(path, {
        body: isFormData ? body : JSON.stringify(body),
        method: "POST",
        headers: isFormData ? {} : { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${res.status}`);
      }
      const text = await res.text();
      let data: ApiResponse<Response>;
      try {
        data = JSON.parse(text) as ApiResponse<Response>;
      } catch (err) {
        throw new Error("Invalid JSON response");
      }

      return data;
    } catch (err) {
      errorToast("Une erreur innatendue est survenue :/", String(err));
      logger.error("Echec de POST à ", path);
      return {
        success: false,
        message: String(err),
      };
    }
  }

  static async get<Response>(path: string, query?: Query): Promise<ApiResponse<Response>> {
    try {
      const params = query ? new URLSearchParams(query as Record<string, string>).toString() : "";
      const fetchurl = path + "?" + params;
      const res = await fetch(fetchurl, { method: "GET" });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${res.status}`);
      }

      const text = await res.text();
      let data: ApiResponse<Response>;
      try {
        data = JSON.parse(text) as ApiResponse<Response>;
      } catch (err) {
        throw new Error("Invalid JSON response");
      }

      if (!data.success) {
        data.message && errorToast(data.message, data.description);
      } else {
        data.message && successToast(data.message, data.description);
      }

      return data;
    } catch (err) {
      errorToast("Une erreur innatendue est survenue :/", String(err));
      logger.error("DEBUG API ERROR:", err);
      logger.error("Echec de GET à ", path);
      return {
        success: false,
        message: String(err),
      };
    }
  }
}
