import "telefunc";

declare module "telefunc" {
  namespace Telefunc {
    interface Context {
      currentUser: {
        username: string;
      } | null;
      setCookie: (name: string, value: string, options: Record<string, unknown>) => void;
    }
  }
}
