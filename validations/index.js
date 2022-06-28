import * as Yup from "yup";

export const ContactValidationSchema = Yup.object().shape({
  lastname: Yup.string()
    .min(3, "Minimum de 3 caractères")
    .required("Votre nom est obligatoire"),
  firstname: Yup.string()
    .min(3, "Minimum de 3 caractères")
    .required("Votre prénom est obligatoire"),
  email: Yup.string()
    .email("Email incorrect")
    .required("Votre email est obligatoire"),
  // verified: Yup.bool().oneOf(
  //   [true],
  //   "Cocher la case ci-dessus, afin de vérifier que vous n'êtes pas un robot"
  // ),
  message: Yup.string()
    .min(20, "Le message doit comporter au minimum 20 caractères")
    .required("Le message est obligatoire"),
});
