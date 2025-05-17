import { api } from "@/lib/axios";
import { LoginSchemaType, SignupSchemaType } from "@/modules/schemas/index.schema";

export const login = async ({ data }: { data: LoginSchemaType }) => {
  const res = await api.post("/auth/signin", data);

  return res.data;
};

export const signup = async ({ data }: { data: SignupSchemaType }) => {
  const res = await api.post("/auth/signup", data);

  return res.data;
};
