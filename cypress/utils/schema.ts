import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
  allErrors: true,
  strict: false, 
});
addFormats(ajv);

function formatErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || !errors.length) return "";
  return errors
    .map((e) => {
      const path = e.instancePath || e.schemaPath || "";
      const expected = e.params ? JSON.stringify(e.params) : "";
      return `• ${path} ${e.message ?? ""} ${expected}`.trim();
    })
    .join("\n");
}

export function validarContrato(schema: unknown, data: unknown): void {
  const validate = ajv.compile(schema as object);
  const valid = validate(data);

  if (!valid) {
    const message =
      "Falha na validação de contrato (AJV):\n" + formatErrors(validate.errors);
    throw new Error(message);
  }
}
