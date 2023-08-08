import { gql, useMutation } from "@apollo/client";
import { getApolloAuthClient } from "@faustwp/core";
import { Form, Formik } from "formik";
import { ReCaptcha } from "next-recaptcha-v3";
import React, { useState } from "react";
import {
  StyledFormikEmailInput,
  StyledFormikPhoneInput,
  StyledFormikSelect,
  StyledFormikTextarea,
  StyledNameInput,
} from "../../FormHelper/FormHelper";

const interests = [
  { label: "Interest 1", value: "interest one" },
  { label: "Interest 2", value: "interest two" },
  { label: "Interest 3", value: "interest three" },
  { label: "Interest 4", value: "interest four" },
];

const authClient = getApolloAuthClient();

export default function ContactForm() {
  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    interests: "Suggestions",
    phone: "",
    token: "",
    overall_questions: "",
  };
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [thisValues, setThisValues] = useState(initialValues);
  const [error, setError] = useState("");

  const [submitForm] = useMutation(
    gql`
      mutation submitForm(
        $firstName: String
        $lastName: String
        $email: String
        $phone: String
        $interest: String
        $question: String
        $token: String
      ) {
        submitGfForm(
          input: {
            entryMeta: { createdById: 0 }
            id: "1"
            fieldValues: [
              { nameValues: { first: $firstName, last: $lastName }, id: 1 }
              { emailValues: { value: $email }, id: 2 }
              { value: $interest, id: 4 }
              { value: $phone, id: 5 }
              { value: $question, id: 3 }
              { value: $token, id: 6 }
            ]
            saveAsDraft: false
          }
        ) {
          errors {
            message
            id
          }
          confirmation {
            type
            message
            url
          }
          entry {
            id
            ... on GfSubmittedEntry {
              id
              databaseId
            }
          }
        }
      }
    `,
    { client: authClient }
  );

  const updateRecaptcha = (token) => {
    thisValues.token = token;
    // console.log(thisValues);
  };

  return (
    <Formik
      initialValues={thisValues}
      onSubmit={(values, actions) => {
        // alert(JSON.stringify(values, null, 2));
        setThisValues(values);
        setSubmitting(true);

        submitForm({
          variables: {
            firstName: values.first_name,
            lastName: values.last_name,
            email: values.email,
            phone: values.phone,
            interest: values.interests,
            question: values.overall_questions,
            token: thisValues.token,
          },
        })
          .then(function (response) {
            console.log(response);
            setSubmitted(true);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setSubmitting(false);
            actions.resetForm();
          });

        /* setTimeout(() => {
          navigate("/thank-you")
        }, 6000) */
      }}
    >
      {() => (
        <Form name="Contact" method="POST">
          {/* <!--Name--> */}
          <StyledNameInput label={"Full Name"} required={true} tint={"dark"} />

          {/* <!--Email--> */}
          <StyledFormikEmailInput
            name="email"
            id="email"
            label={"Email"}
            tint={"dark"}
          />

          {/* <!--Phone--> */}
          <StyledFormikPhoneInput
            name="phone"
            id="phone"
            required={false}
            label={"Phone"}
          />

          {/* <!--Select--> */}
          <StyledFormikSelect
            options={interests}
            id={"interests"}
            label={"What Do You Have a Question About?"}
            required={true}
          />

          {/* <!--Text Area--> */}
          <StyledFormikTextarea
            placeholder={"Ask us a Question or Leave a Message..."}
            id={"overall_questions"}
            name={"overall_questions"}
            label={"Any Questions That We Can Answer?"}
          />

          <ReCaptcha onValidate={updateRecaptcha} action="contact" />

          <button
            type="submit"
            className="z-10 mt-6 inline-flex items-center justify-center px-5 py-3 border 
                      border-transparent text-base font-medium rounded-md 
                      bg-gray-700 hover:bg-balsam-fir-500
              text-gray-100 hover:text-gray-700"
          >
            {submitting && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="animate-spin h-5 w-5 mr-3 fill-white"
              >
                <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
              </svg>
            )}
            Submit
          </button>

          {error !== "" && (
            <p className="bg-dull-red my-8 p-4 text-dull-white">
              There's an error that goes like this: {error}
            </p>
          )}
          {submitted && (
            <p className="bg-split-blue my-8 p-4 text-dull-white">
              Form was submitted.
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
}
