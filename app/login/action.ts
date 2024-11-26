"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  if (formData.get("password") == "12345") {
    return {
      is_user: true,
      errors: null,
    };
  } else {
    return {
      is_user: false,
      errors: ["wrong password"],
    };
  }
}
