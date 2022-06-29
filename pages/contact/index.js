import React, { useCallback, useContext, useEffect } from "react";
import Hero from "../../components/Hero";
import { useFormik } from "formik";
import { ContactValidationSchema } from "../../validations";
import { toast } from "react-toastify";
import Image from "next/image";
import Head from "next/head";
// import dynamic from "next/dynamic";
import { ThemeContext } from "../../context/ThemeContext";
// import ContactIllustration from "../../components/ContactIllustration";
// const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"));

const Contact = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      message: "",
      // token: "",
      // verified: false,
    },
    validationSchema: ContactValidationSchema,
    onSubmit: async (values) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email/send`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 200) {
            toast.success(data.message);
            formik.resetForm();
            window.grecaptcha.reset();
          } else {
            toast.error(data.message);
          }
        })
        .catch(() => {
          toast.error("Une erreur est survenue lors de l'envoie du mail");
        });
    },
  });

  const handleChange = useCallback(
    (value) => {
      formik.setFieldValue("verified", true);
      formik.setFieldValue("token", value);
    },
    [formik]
  );

  useEffect(() => {
    formik.setValues({ ...formik.values, verified: false }, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleTheme]);

  return (
    <>
      <Head>
        <title>Brandon Seveste - Me contacter</title>
        <meta name="description" content="Développeur web et web mobile" />
      </Head>
      <Hero
        title={"Me contacter"}
        text={
          "Si vous souhaitez prendre contact avec moi pour des questions spécifiques ou professionnelles, merci de remplir le formulaire ci-dessous."
        }
        linkText={"A propos de moi"}
        linkUrl={"/"}
      />
      <div className="contact">
        <div className="container">
          <h2 className="active">Me contacter</h2>
          <div className="contact_wrapper">
            <div className="contact_image">
              {theme &&
                (theme === "dark" ? (
                  <Image
                    src={"/image/mail.svg"}
                    width={"457px"}
                    height={"377px"}
                    alt="mail illustration"
                    quality={100}
                    priority
                  />
                ) : (
                  <Image
                    src={"/image/mail-light.svg"}
                    width={"457px"}
                    height={"377px"}
                    alt="mail illustration"
                    quality={100}
                    priority
                  />
                ))}
            </div>
            <form className="contact_form" autoComplete="off">
              <div className="contact_form__group wrapper_fullname">
                <div className="lastname contact_form__group">
                  <label htmlFor="lastname">Nom:</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    className={`input_controll ${
                      formik.errors.lastname ? "input-error" : ""
                    }`}
                    aria-label="votre nom"
                  />
                  {formik.errors.lastname && (
                    <p className="error">{formik.errors.lastname}</p>
                  )}
                </div>
                <div className="firstname">
                  <label htmlFor="firstname">Prénom:</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    className={`input_controll ${
                      formik.errors.firstname ? "input-error" : ""
                    }`}
                    aria-label="votre prénom"
                  />
                  {formik.errors.firstname && (
                    <p className="error">{formik.errors.firstname}</p>
                  )}
                </div>
              </div>
              <div className="contact_form__group">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={`input_controll ${
                    formik.errors.email ? "input-error" : ""
                  }`}
                  aria-label="votre email"
                />
                <p className="text-muted">
                  Votre e-mail me servira à vous répondre en cas de besoin.
                </p>
                {formik.errors.email && (
                  <p className="error">{formik.errors.email}</p>
                )}
              </div>

              <div className="contact_form__group">
                <label htmlFor="message">Message:</label>
                <textarea
                  rows={10}
                  id="message"
                  name="message"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  className={`input_controll ${
                    formik.errors.message ? "input-error" : ""
                  }`}
                  aria-label="votre message"
                />
                {formik.errors.message && (
                  <p className="error">{formik.errors.message}</p>
                )}
              </div>
              {/* <div className="contact_form__group">
                {theme === "dark" ? (
                  <ReCAPTCHA
                    sitekey="6Lcsg5QgAAAAAHpS3WIAZg8hnBishalUjczuVIPt"
                    onChange={handleChange}
                    theme={"dark"}
                    ref={ref}
                  />
                ) : (
                  <>
                    <span></span>
                    <ReCAPTCHA
                      sitekey="6Lcsg5QgAAAAAHpS3WIAZg8hnBishalUjczuVIPt"
                      onChange={handleChange}
                      theme={"light"}
                      ref={ref}
                    />
                  </>
                )}
                {formik.errors.verified && !formik.values.verified && (
                  <p className="error">{formik.errors.verified}</p>
                )}
              </div> */}
              <div className="contact_form__group">
                <button
                  type="submit"
                  className="button pulse"
                  onClick={formik.handleSubmit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="envoyer le message"
                >
                  {formik.isSubmitting ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-clockwise rotate"
                        viewBox="0 0 16 16"
                        style={{ display: "block", marginRight: "1rem" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                        />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                      </svg>
                      Envoyer{" "}
                    </>
                  ) : (
                    "Envoyer"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
